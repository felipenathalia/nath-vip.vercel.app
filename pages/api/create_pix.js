export default async function handler(req, res) {
  // Garante que só aceita requisições do tipo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { plan } = req.body;
  const token = process.env.MP_ACCESS_TOKEN;

  // Validação básica para evitar que o código quebre se o plano não chegar
  if (!plan || !plan.price) {
    return res.status(400).json({ error: 'Dados do plano ausentes' });
  }

  try {
    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        // Chave de idempotência evita cobranças duplicadas e erros de rede
        'X-Idempotency-Key': `pix-${Date.now()}`
      },
      body: JSON.stringify({
        transaction_amount: Number(plan.price),
        description: `Assinatura VIP - ${plan.title}`,
        payment_method_id: 'pix',
        // O Mercado Pago EXIGE um e-mail para validar o Pix, mesmo que seja genérico
        payer: {
          email: 'cliente_vip@pagamento.com',
          first_name: 'Cliente',
          last_name: 'VIP'
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro retornado pelo Mercado Pago:', data);
      return res.status(response.status).json({ 
        error: data.message || 'Erro ao processar com Mercado Pago' 
      });
    }

    // Se chegar aqui, o Pix foi gerado com sucesso!
    return res.status(200).json(data);

  } catch (error) {
    console.error('Erro interno na rota de Pix:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}