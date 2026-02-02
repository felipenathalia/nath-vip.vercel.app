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
        } catch (e) { console.error("Erro"); }
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
    <div className="bg-[#0b0e11] min-h-screen text-white font-sans pb-20 overflow-x-hidden">
      <Head>
        <title>@nath_elloy | OFICIAL V3</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {/* HEADER LIMPO */}
      <div className="fixed top-0 w-full h-14 bg-[#0b0e11]/95 backdrop-blur-md border-b border-gray-800 z-50 flex items-center px-6">
        <span className="text-sm font-bold tracking-tight">@nath_elloy</span>
      </div>

      {/* BANNER */}
      <div className="relative h-44 w-full bg-cover bg-center mt-14 shadow-inner" style={{ backgroundImage: "url('/banner.jpg')" }}></div>

      {/* PERFIL COM NÚMERO DE MÍDIAS */}
      <div className="px-5 -mt-10 relative z-10 flex items-end gap-4">
        <div className="w-24 h-24 rounded-full border-4 border-[#0b0e11] overflow-hidden bg-gray-900 shadow-2xl">
          <img src="/avatar.png" className="w-full h-full object-cover" />
        </div>
        <div className="pb-1">
           <h1 className="text-2xl font-black flex items-center gap-2 italic uppercase">@nath_elloy ✅</h1>
           <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">482 Mídias • 15.2k Curtidas</p>
        </div>
      </div>

      {/* VÍDEO COM CADEADO CENTRAL */}
      <div className="px-5 mt-8">
        <div className="relative w-full aspect-video bg-[#161b22] rounded-[2rem] overflow-hidden border border-gray-800 shadow-2xl">
           <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover blur-sm">
              <source src="/video_preview.mp4" type="video/mp4" />
           </video>
           <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-2">
                 <span className="text-2xl text-white">🔒</span>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70">Acesso Restrito</p>
           </div>
        </div>
      </div>

      {/* GRADE DE 6 IMAGENS COM CADEADO */}
      <div className="px-5 mt-6 grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square bg-[#161b22] rounded-2xl relative overflow-hidden border border-gray-800">
             <img src="/avatar.png" className="w-full h-full object-cover blur-lg opacity-20" />
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl opacity-30">🔒</span>
             </div>
          </div>
        ))}
      </div>

      {/* TEXTO DE VENDAS */}
      <div className="px-6 mt-10 text-center">
        <p className="text-gray-300 text-sm leading-relaxed italic">
          Escolha o tempo que irá me espiar e tenha meu <span className="text-[#ff5a00] font-bold">WhatsApp Pessoal</span> para gente conversar..🥰
        </p>
        <p className="text-[#ff5a00] text-[9px] font-black uppercase tracking-[0.2em] mt-6 animate-pulse italic">
           👇 CLIQUE NO PLANO PARA GERAR SEU PAGAMENTO 👇
        </p>
      </div>

      {/* BOTÕES DE PLANOS */}
      <div className="px-5 mt-6 space-y-3">
        {Object.values(plans).map((p) => (
          <button 
            key={p.id} 
            onClick={() => handleCheckout(p)}
            className="w-full p-5 rounded-[2rem] border border-white/5 bg-[#0d1117] active:scale-95 transition-all flex justify-between items-center shadow-xl"
          >
            <span className="font-black text-xs uppercase tracking-tighter">{p.title}</span>
            <span className="text-[#ff5a00] font-black text-lg italic italic">R$ {p.price.toFixed(2).replace('.', ',')}</span>
          </button>
        ))}
      </div>

      {/* MODAL PIX */}
      {pixData && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-6 backdrop-blur-md">
          <div className="bg-[#161b22] w-full max-w-sm p-8 rounded-[3rem] border border-gray-700 text-center">
             <div className="bg-white p-4 rounded-3xl inline-block mb-6 shadow-2xl">
                <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} className="w-44 h-44" />
             </div>
             <button onClick={() => { navigator.clipboard.writeText(pixData.qr_code); alert('Copiado!'); }} 
                     className="w-full bg-[#ff5a00] text-white font-black py-6 rounded-[2rem] text-sm mb-4 uppercase">
                COPIAR CÓDIGO PIX
             </button>
             <button onClick={() => setPixData(null)} className="text-[10px] text-gray-400 uppercase font-bold underline italic">Voltar</button>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black/80 z-[210] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#ff5a00] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}