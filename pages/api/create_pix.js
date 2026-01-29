import mercadopago from 'mercadopago';

// Aqui ele vai buscar a senha no lugar seguro
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { plan } = req.body;
  try {
    const payment = await mercadopago.payment.create({
      transaction_amount: Number(plan.price),
      description: `@nath_elloy - ${plan.title}`,
      payment_method_id: 'pix',
      payer: { email: process.env.MP_EMAIL, first_name: 'Cliente', last_name: 'P' }
    });
    res.status(200).json({ qr_code: payment.body.point_of_interaction.transaction_data.qr_code });
  } catch (e) { res.status(500).json({ error: e.message }); }
}