import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState(null);

  const plans = {
    mensal: { id: 'mensal', title: '1 Mês', price: 1.00 },
    semestral: { id: 'semestral', title: '6 Meses', price: 24.90 },
    anual: { id: 'anual', title: '1 Ano + WhatsApp', price: 34.90 }
  };

  // RASTREADOR DE PAGAMENTO PERSISTENTE
  useEffect(() => {
    let interval;
    if (pixData?.payment_id) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/check_status?id=${pixData.payment_id}`);
          const data = await res.json();
          
          console.log("Status do pagamento:", data.status);

          // Se o status for aprovado, pula para a próxima página imediatamente
          if (data.status === 'approved' || data.status === 'pago') {
            clearInterval(interval);
            window.location.href = '/obrigado'; 
          }
        } catch (e) { 
          console.error("Erro ao rastrear pagamento"); 
        }
      }, 3000); // Tenta a cada 3 segundos
    }
    return () => clearInterval(interval);
  }, [pixData]);

  const handleCheckout = async (plan) => {
    setLoading(true);
    try {
      const res = await fetch('/api/create_pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plan })
      });
      const data = await res.json();
      if (data.point_of_interaction?.transaction_data) {
        setPixData({ 
          qr_code: data.point_of_interaction.transaction_data.qr_code,
          qr_code_base64: data.point_of_interaction.transaction_data.qr_code_base64,
          payment_id: data.id 
        });
      }
    } catch (e) { 
      alert('Erro ao gerar Pix. Verifique sua conexão.'); 
    } finally { 
      setLoading(false); 
    }
  };

  return (