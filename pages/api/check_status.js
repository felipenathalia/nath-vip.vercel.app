export default async function handler(req, res) {
  const { id } = req.query;
  
  // Impede o erro 304 (Cache) que apareceu no seu console
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: {
        // Mudamos aqui para MERCADO_PAGO_TOKEN conforme seu print da Vercel
        Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`
      }
    });
    const data = await response.json();
    
    // Retorna o status real para o site fazer o redirecionamento
    res.status(200).json({ status: data.status });
  } catch (error) {
    res.status(500).json({ error: "Erro na consulta" });
  }
}