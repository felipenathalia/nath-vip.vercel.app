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
        <p className="text-gray-400 text-sm mt-1 italic border-l-2 border-[#ff5a00] pl-3 opacity-80">
          "Graças a Deus sou piranha!"
        </p>
      </div>

      {/* PREVIEW VIDEO */}
      <div className="px-5 mt-10">
        <div className="relative w-full aspect-video bg-[#161b22] rounded-[2rem] overflow-hidden border border-gray-800 flex items-center justify-center">
           <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110">
              <source src="/video_preview.mp4" type="video/mp4" />
           </video>
           <div className="relative z-10 flex flex-col items-center text-center px-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-3">
                 <span className="text-3xl">🔒</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Conteúdo Privado</p>
           </div>
        </div>
      </div>

      {/* TEXTO PERSUASIVO ACIMA DOS PLANOS */}
      <div className="px-6 mt-12 text-center">
        <p className="text-gray-300 text-sm leading-relaxed font-medium italic">
          Abaixo você pode escolher o tempo que irá me espiar e poder ter meu WhatsApp pessoal para gente conversar e o melhor.. <span className="text-[#ff5a00] font-bold">COM CHAMADAS DE VIDEO SURPRESA LA DENTRO DO MEU VIP..🥰</span>
        </p>
      </div>

      {/* SEÇÃO DE PLANOS (O CLIQUE GERA O PIX DIRETAMENTE) */}
      <div className="px-5 mt-8 space-y-4">
        {Object.values(plans).map((p) => (
          <button 
            key={p.id} 
            onClick={() => handleCheckout(p)}
            disabled={loading}
            className="w-full p-6 rounded-[2rem] border-2 border-white/5 bg-[#0d1117] transition-all hover:border-[#ff5a00] active:scale-95 flex justify-between items-center shadow-lg"
          >
            <div className="text-left">
              <span className="text-[10px] font-black text-[#ff5a00] uppercase block mb-1">Assinar Plano</span>
              <span className="font-black text-sm uppercase tracking-tight">{p.title}</span>
            </div>
            <span className="text-[#ff5a00] font-black text-xl italic">R$ {p.price.toFixed(2).replace('.', ',')}</span>
          </button>
        ))}
      </div>

      {/* INSTRUÇÃO ABAIXO DOS PLANOS */}
      <div className="mt-6 text-center">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
           ESCOLHA O PLANO E CLIQUE EM CIMA PARA GERAR SEU PAGAMENTO
        </p>
      </div>

      {/* MODAL DE PIX (SO APARECE APOS CLICAR NO PLANO) */}
      {pixData && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-[#161b22] w-full max-w-sm p-8 rounded-[3rem] border border-gray-700 shadow-2xl text-center">
             <div className="bg-white p-4 rounded-3xl inline-block mb-6 shadow-xl">
                <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} className="w-44 h-44" />
             </div>
             <button onClick={() => { navigator.clipboard.writeText(pixData.qr_code); alert('Copiado!'); }} 
                     className="w-full bg-white text-black font-black py-5 rounded-[2rem] text-sm mb-4 uppercase">
                COPIAR CÓDIGO PIX
             </button>
             <button onClick={() => setPixData(null)} className="text-[10px] text-gray-500 uppercase font-bold underline">Fechar e mudar plano</button>
             <p className="mt-4 text-[9px] text-gray-600 uppercase tracking-widest">O acesso é liberado após a confirmação</p>
          </div>
        </div>
      )}

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center">
          <div className="text-[#ff5a00] font-black animate-pulse">GERANDO PAGAMENTO...</div>
        </div>
      )}
    </div>
  );
}