import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState(null);

  const plans = {
    mensal: { id: 'mensal', title: '1 Mês', price: 19.90 },
    semestral: { id: 'semestral', title: '6 Meses', price: 24.90 },
    anual: { id: 'anual', title: '1 Ano + WhatsApp', price: 34.90 }
  };

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
    } catch (e) { alert('Erro ao gerar Pix'); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0b0e11] min-h-screen text-white font-sans pb-20">
      <Head>
        <title>@nath_elloy | VIP Oficial</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {/* Header */}
      <div className="fixed top-0 w-full h-14 bg-[#0b0e11]/90 backdrop-blur-md border-b border-gray-800 z-50 flex items-center px-4">
        <span className="ml-3 text-sm font-bold tracking-tight">@nath_elloy</span>
      </div>

      {/* Banner */}
      <div className="relative h-48 w-full bg-cover bg-center" style={{ backgroundImage: "url('/banner.jpg')" }}></div>

      {/* Perfil */}
      <div className="px-5 -mt-12 relative z-10">
        <div className="w-24 h-24 rounded-full border-4 border-[#0b0e11] overflow-hidden bg-gray-800 shadow-2xl">
          <img src="/avatar.png" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-black mt-3">@nath_elloy ✅</h1>
      </div>

      {/* VIDEO PREVIEW (SEM BLUR NO CÓDIGO) */}
      <div className="px-5 mt-10">
        <div className="relative w-full aspect-video bg-[#161b22] rounded-[2rem] overflow-hidden border border-gray-800 shadow-2xl">
           <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/video_preview.mp4" type="video/mp4" />
           </video>
        </div>
      </div>

      {/* TEXTO DE VENDAS PERSUASIVO */}
      <div className="px-6 mt-12 text-center">
        <p className="text-gray-200 text-[15px] leading-relaxed font-medium italic">
          Abaixo você pode escolher o tempo que irá me espiar e poder ter meu WhatsApp pessoal para gente conversar e o melhor.. <br/>
          <span className="text-[#ff5a00] font-extrabold not-italic text-lg">COM CHAMADAS DE VIDEO SURPRESA LA DENTRO DO MEU VIP..🥰</span>
        </p>
      </div>

      {/* PLANOS - CADA UM É UM BOTÃO */}
      <div className="px-5 mt-8 space-y-4">
        {Object.values(plans).map((p) => (
          <button 
            key={p.id} 
            onClick={() => handleCheckout(p)}
            className="w-full p-6 rounded-[2.5rem] border-2 border-[#ff5a00]/20 bg-[#0d1117] active:scale-95 transition-all flex justify-between items-center group shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#ff5a00]"
          >
            <div className="text-left flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#ff5a00] animate-ping"></div>
              <span className="font-black text-sm uppercase tracking-tighter">{p.title}</span>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[#ff5a00] font-black text-xl italic">R$ {p.price.toFixed(2).replace('.', ',')}</span>
               <span className="text-white/20 text-xs">➔</span>
            </div>
          </button>
        ))}
      </div>

      {/* INSTRUÇÃO DESENHADA PRO LEAD */}
      <div className="mt-8 text-center px-10">
        <div className="inline-block bg-[#ff5a00]/10 border border-[#ff5a00]/20 px-4 py-2 rounded-full mb-2">
           <p className="text-[#ff5a00] text-[10px] font-black uppercase tracking-[0.2em]">
              👇 TOQUE NO PLANO DESEJADO ABAIXO 👇
           </p>
        </div>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-tight block mt-2">
           ESCOLHA O PLANO E CLIQUE EM CIMA PARA GERAR SEU PAGAMENTO
        </p>
      </div>

      {/* MODAL DO PIX */}
      {pixData && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6 backdrop-blur-md">
          <div className="bg-[#161b22] w-full max-w-sm p-8 rounded-[3.5rem] border border-gray-700 text-center shadow-[0_0_60px_rgba(0,0,0,1)]">
             <h3 className="text-[#ff5a00] font-black text-xs uppercase mb-6 tracking-widest">Pagamento Seguro via Pix</h3>
             <div className="bg-white p-4 rounded-3xl inline-block mb-8">
                <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} className="w-48 h-48" />
             </div>
             <button onClick={() => { navigator.clipboard.writeText(pixData.qr_code); alert('Copiado com sucesso!'); }} 
                     className="w-full bg-[#ff5a00] text-white font-black py-6 rounded-[2.5rem] text-sm mb-4 shadow-[0_15px_30px_rgba(255,90,0,0.3)] uppercase">
                COPIAR CÓDIGO PIX
             </button>
             <button onClick={() => setPixData(null)} className="text-[10px] text-gray-500 uppercase font-bold underline tracking-widest">Cancelar e Voltar</button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 z-[110] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#ff5a00] border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-[#ff5a00] font-black uppercase tracking-widest text-sm">Gerando seu acesso...</div>
        </div>
      )}
    </div>
  );
}