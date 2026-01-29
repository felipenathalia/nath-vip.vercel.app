export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Apenas POST' });

  const { plan } = req.body;
  const token = process.env.MP_ACCESS_TOKEN;

  try {
    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-Idempotency-Key': Buffer.from(Date.now().toString()).toString('base64') // Chave única
      },
      body: JSON.stringify({
        transaction_amount: Number(plan.price),
        description: `Acesso VIP - ${plan.title}`,
        payment_method_id: 'pix',
        payer: {
          email: 'pagamento@nath-vip.com', // E-mail fixo apenas para validar a transação
          first_name: 'Cliente',
          last_name: 'Premium'
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro detalhado do MP:', data);
      return res.status(response.status).json({ error: data.message || 'Erro no MP' });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno' });
  }
}