export default async function handler(req, res) {
  const { id } = req.query;
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: { 'Authorization': `Bearer ${process.env.MERCADO_PAGO_TOKEN}` }
    });
    const data = await response.json();

    // SÓ ENVIA SE FOR APROVADO
    if (data.status === 'approved') {
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_GROUP_LOGS,
          text: `✅ VENDA NO SITE\n💰 VALOR: R$ ${data.transaction_amount}`
        })
      });
    }

    res.status(200).json({ status: data.status });
  } catch (error) {
    res.status(500).json({ error: "Erro na consulta" });
  }
}