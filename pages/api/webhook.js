export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action, data } = req.body;

    // Log para você ver no painel da Vercel se o Mercado Pago chamou o site
    console.log("Webhook recebido:", action, data?.id);

    if (action === "payment.updated" || action === "payment.created") {
      try {
        const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
          headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
        });
        const paymentData = await mpRes.json();

        if (paymentData.status === 'approved') {
          const message = `✅ **VENDA NO SITE**\n\n💰 Valor: R$ ${paymentData.transaction_amount}\n📧 Cliente: ${paymentData.payer.email}`;
          
          await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              chat_id: process.env.TELEGRAM_GROUP_LOGS, 
              text: message, 
              parse_mode: 'Markdown' 
            })
          });
        }
      } catch (e) {
        console.error("Erro no Webhook:", e.message);
      }
    }
    return res.status(200).send('OK');
  }
  return res.status(405).send('Method Not Allowed');
}