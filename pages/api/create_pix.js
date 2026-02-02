export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { plan } = req.body;

  try {
    // Gerando um ID único para a transação para evitar duplicidade
    const idempotencyKey = `key_${new Date().getTime()}`;

    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // USANDO O NOME EXATO DA SUA VARIÁVEL NA VERCEL:
        'Authorization': `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
        'X-Idempotency-Key': idempotencyKey
      },
      body: JSON.stringify({
        transaction_amount: plan.price,
        description: `Plano ${plan.title} - @nath_elloy`,
        payment_method_id: 'pix',
        // Define que o PIX expira em 30 minutos
        date_of_expiration: new Date(new Date().getTime() + 30 * 60000).toISOString(),
        payer: {
          email: 'cliente@email.com', // O MP exige um e-mail, mesmo que fictício para PIX
          first_name: 'Cliente',
          last_name: 'VIP'
        }
      })
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      console.error('Erro MP:', data);
      res.status(500).json({ error: 'Erro ao gerar o pagamento', details: data });
    }
  } catch (error) {
    console.error('Erro de conexão:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
} 

