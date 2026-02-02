export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID do pagamento é obrigatório" });
  }

  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    });
    
    const data = await response.json();

    // Retorna o status para o site (ex: pending, approved, rejected)
    res.status(200).json({ status: data.status });
  } catch (error) {
    console.error("Erro na API Mercado Pago:", error);
    res.status(500).json({ error: "Erro ao consultar pagamento" });
  }
}