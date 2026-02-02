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

  useEffect(() => {
    let interval;
    if (pixData?.payment_id) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/check_status?id=${pixData.payment_id}`);
          const data = await res.json();
          if (data.status === 'approved') {
            clearInterval(interval);
            window.location.href = '/obrigado';
          }
        } catch (e) { console.error("Erro ao verificar"); }
      }, 3000);
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
    } catch (e) { alert('Erro no Pix'); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0b0e11] min-h-screen text-white font-sans pb-10">
      <Head>
        <title>@nath_elloy | VIP Oficial</title>
        {/* Adicionei uma versão no script para forçar atualização */}
        <script src="https://cdn.tailwindcss.com?v=3.4.1"></script>
      </Head>

      <div className="fixed top-0 w-full h-14 bg-[#0b0e11]/95 backdrop-blur-md border-b border-gray-800 z-50 flex items-center px-4">
        <img src="/logo.png" className="w-8 h-8 object-contain rounded-lg" alt="P" />
        <span className="ml-3 text-sm font-bold tracking-tight">@nath_elloy</span>
      </div>

      <div className="relative h-48 w-full bg-cover bg-center" style={{ backgroundImage: "url('/banner.jpg')" }}></div>

      <div className="px-5 -mt-12 relative z-10">
        <div className="w-24 h-24 rounded-full border-4 border-[#0b0e11] overflow-hidden bg-gray-800 shadow-2xl">
          <img src="/avatar.png" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-black mt-3 flex items-center gap-2">@nath_elloy ✅</h1>
      </div>

      <div className="px-5 mt-10">
        <div className="relative w-full aspect-video bg-[#161b22] rounded-[2rem] overflow-hidden border border-gray-800">
           <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/video_preview.mp4" type="video/mp4" />
           </video>
        </div>
      </div>

      <div className="px-6 mt-12 text-center">
        <p className="text-gray-200 text-[15px] leading-relaxed font-medium italic">
          Abaixo você pode escolher o tempo que irá me espiar e poder ter meu WhatsApp pessoal para gente conversar e o melhor.. <br/>
          <span className="text-[#ff5a00] font-extrabold not-italic text-lg">COM CHAMADAS DE VIDEO SURPRESA LA DENTRO DO MEU VIP..🥰</span>
        </p>
      </div>

      <div className="mt-8 text-center px-10">
        <p className="text-[#ff5a00] text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
           👇 ESCOLHA O PLANO E CLIQUE EM CIMA PARA GERAR SEU PAGAMENTO 👇
        </p>
      </div>

      <div className="px-5 mt-6 space-y-4">
        {Object.values(plans).map((p) => (
          <button 
            key={p.id} 
            onClick={() => handleCheckout(p)}
            className="w-full p-6 rounded-[2rem] border-2 border-white/5 bg-[#0d1117] active:scale-95 transition-all flex justify-between items-center"
          >
            <span className="font-black text-sm uppercase">{p.title}</span>
            <span className="text-[#ff5a00] font-black text-lg">R$ {p.price.toFixed(2).replace('.', ',')}</span>
          </button>
        ))}
      </div>

      {/* MODAL PIX SEM RODAPÉ */}
      {pixData && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6 backdrop-blur-md">
          <div className="bg-[#161b22] w-full max-w-sm p-8 rounded-[3.5rem] border border-gray-700 text-center">
             <div className="bg-white p-4 rounded-3xl inline-block mb-6">
                <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} className="w-44 h-44" />
             </div>
             <button onClick={() => { navigator.clipboard.writeText(pixData.qr_code); alert('Copiado!'); }} 
                     className="w-full bg-[#ff5a00] text-white font-black py-6 rounded-[2.5rem] text-sm mb-4 uppercase">
                COPIAR CÓDIGO PIX
             </button>
             <button onClick={() => setPixData(null)} className="text-[10px] text-gray-500 uppercase underline">Voltar</button>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center text-[#ff5a00] font-black animate-pulse">
          GERANDO...
        </div>
      )}
    </div>
  );
}