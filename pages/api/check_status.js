export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
      }
    });
    const data = await response.json();
    // Retorna o status real vindo do Mercado Pago
    res.status(200).json({ status: data.status });
  } catch (error) {
    res.status(500).json({ error: "Erro na consulta" });
  }
}