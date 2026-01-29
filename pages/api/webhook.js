export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action, data } = req.body;

    if (action === "payment.updated" || action === "payment.created") {
      const paymentId = data.id;

      // 1. Validar o pagamento no Mercado Pago
      const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      });
      const payment = await mpResponse.json();

      if (payment.status === 'approved') {
        const valorVenda = payment.transaction_amount;
        const telegramToken = process.env.TELEGRAM_TOKEN;

        // 2. GERAR LINK DO VIP (1 acesso / 6 horas)
        const expireDate = Math.floor(Date.now() / 1000) + (6 * 60 * 60);
        const tgVipResponse = await fetch(`https://api.telegram.org/bot${telegramToken}/createChatInviteLink`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: "-1002370747508", // ID DO VIP
            member_limit: 1,
            expire_date: expireDate
          })
        });
        const vipData = await tgVipResponse.json();
        const linkVip = vipData.result.invite_link;

        // 3. ENVIAR NOTIFICAÇÃO DE VENDA PARA VOCÊ
        const msgVenda = `🎉 Parabéns! Você realizou uma nova venda. 🎉\n\n🛍️ Detalhes da venda:\n\n- Valor Total: R$ ${valorVenda} 💰`;
        
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: "-1002277499591", // ID DO GRUPO DE AVISO
            text: msgVenda
          })
        });

        // NOTA: Para a página de obrigado ler esse 'linkVip', 
        // o ideal é salvar no Supabase aqui.
        console.log(`Venda de R$ ${valorVenda} aprovada. Link: ${linkVip}`);
      }
    }
    return res.status(200).json({ ok: true });
  }
  res.status(405).send('Método não permitido');
}