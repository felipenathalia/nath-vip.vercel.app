import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState('mensal');
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState(null);

  const plans = {
    mensal: { id: 'mensal', title: '1 Mês', price: 19.90 },
    semestral: { id: 'semestral', title: '6 Meses', price: 24.90 },
    anual: { id: 'anual', title: '1 Ano + WhatsApp', price: 34.90 }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create_pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plans[selectedPlan] })
      });
      const data = await res.json();
      if (data.point_of_interaction?.transaction_data) {
        setPixData({ 
          qr_code: data.point_of_interaction.transaction_data.qr_code,
          qr_code_base64: data.point_of_interaction.transaction_data.qr_code_base64,
          payment_id: data.id 
        });
      }
    } catch (e) { alert('Erro ao gerar Pix'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ backgroundColor: '#0b0e11', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', paddingBottom: '160px' }}>
      <Head>
        <title>@nath_elloy | VIP</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {/* Banner & Perfil */}
      <div style={{ height: '180px', width: '100%', backgroundImage: "url('/banner.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div style={{ padding: '0 20px', marginTop: '-45px' }}>
        <img src="/avatar.png" style={{ width: '90px', height: '90px', borderRadius: '50%', border: '4px solid #0b0e11', objectFit: 'cover' }} />
        <h1 style={{ fontSize: '22px', fontWeight: '900', marginTop: '10px' }}>@nath_elloy ✅</h1>
      </div>

      {/* SEÇÃO DAS CAIXAS BLOQUEADAS (O que você pediu) */}
      <div style={{ padding: '20px' }}>
        {/* Card Principal de Preview */}
        <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#161b22', borderRadius: '24px', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔒</div>
            <p style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', opacity: 0.5 }}>Preview Bloqueado</p>
        </div>

        {/* Título Mídias */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase' }}>Mídias</h2>
          <span style={{ backgroundColor: '#161b22', fontSize: '10px', padding: '4px 10px', borderRadius: '12px', color: '#8b949e', border: '1px solid #30363d' }}>148 itens</span>
        </div>

        {/* Grade de Fotos Bloqueadas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ aspectRatio: '1/1', backgroundColor: '#161b22', borderRadius: '16px', border: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '20px', opacity: 0.2 }}>🔒</span>
            </div>
          ))}
        </div>
      </div>

      {/* Planos */}
      <div style={{ padding: '0 20px' }}>
         {Object.values(plans).map((p) => (
          <div key={p.id} onClick={() => setSelectedPlan(p.id)} 
               style={{ padding: '18px', borderRadius: '20px', border: selectedPlan === p.id ? '2px solid #ff5a00' : '1px solid #30363d', backgroundColor: '#0d1117', display: 'flex', justifyContent: 'space-between', marginBottom: '10px', cursor: 'pointer' }}>
            <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{p.title}</span>
            <span style={{ color: '#ff5a00', fontWeight: '900' }}>R$ {p.price.toFixed(2).replace('.', ',')}</span>
          </div>
        ))}
      </div>

      {/* Botão de Pagamento */}
      <div style={{ position: 'fixed', bottom: '30px', left: 0, width: '100%', padding: '0 20px' }}>
        {!pixData ? (
          <button onClick={handleCheckout} style={{ width: '100%', backgroundColor: '#ff5a00', height: '70px', borderRadius: '35px', color: 'white', fontWeight: '900', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>N</div>
            {loading ? 'PROCESSANDO...' : 'DESTRAVAR TUDO AGORA'}
          </button>
        ) : (
          <div style={{ backgroundColor: '#161b22', padding: '25px', borderRadius: '30px', border: '1px solid #30363d', textAlign: 'center' }}>
             <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} style={{ width: '160px', backgroundColor: 'white', padding: '10px', borderRadius: '15px', marginBottom: '15px' }} />
             <button onClick={() => { navigator.clipboard.writeText(pixData.qr_code); alert('Copiado!'); }} style={{ width: '100%', padding: '15px', borderRadius: '15px', fontWeight: '900' }}>COPIAR PIX</button>
          </div>
        )}
      </div>
    </div>
  );
} 