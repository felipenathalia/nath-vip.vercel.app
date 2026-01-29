export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Apenas POST' });

  const { plan } = req.body;
  
  // USANDO O NOME DA SUA VARIÁVEL DO BOT
  const token = process.env.MERCADO_PAGO_TOKEN; 

  try {
    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-Idempotency-Key': `pix-${Date.now()}`
      },
      body: JSON.stringify({
        transaction_amount: Number(plan.price),
        description: "Infoproduto rentavel", // Exatamente como no seu Bot
        payment_method_id: 'pix',
        payer: {
          email: 'natyelloy@proton.me', // Seu e-mail validado
          first_name: 'Cliente',
          last_name: 'VIP'
        },
        // Duração de 30 minutos como no seu ENV
        date_of_expiration: new Date(Date.now() + 30 * 60000).toISOString()
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro MP:', data);
      return res.status(response.status).json({ error: data.message || 'Erro no MP' });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno' });
  }
}