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
        'X-Idempotency-Key': `pix-${Date.now()}`
      },
      body: JSON.stringify({
        transaction_amount: Number(parseFloat(plan.price).toFixed(2)), // Força 2 casas decimais
        description: `Acesso VIP - ${plan.title}`,
        payment_method_id: 'pix',
        payer: {
          email: 'natyelloy@proton.me',
          first_name: 'Assinante',
          last_name: 'VIP'
        },
        // Adicionando tempo de expiração (30 minutos) para evitar erro 400
        date_of_expiration: new Date(Date.now() + 30 * 60000).toISOString()
      })
    });