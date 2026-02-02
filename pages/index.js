import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState(null);
  const [checkMessage, setCheckMessage] = useState('');

  const plans = {
    mensal: { id: 'mensal', title: '1 Mês', price: 1.00 },
    semestral: { id: 'semestral', title: '6 Meses', price: 24.90 },
    anual: { id: 'anual', title: '1 Ano + WhatsApp', price: 34.90 }
  };

  const verifyPayment = async (isManual = false) => {
    if (!pixData?.payment_id) return;
    try {
      const res = await fetch(`/api/check_status?id=${pixData.payment_id}&t=${new Date().getTime()}`);
      const data = await res.json();
      
      if (data.status === 'approved' || data.status === 'pago') {
        // REDIRECIONAMENTO SEGURO COM ID
        window.location.href = `/obrigado?id=${pixData.payment_id}`; 
      } else if (isManual) {
        setCheckMessage('⛔️ 𝗦𝗲𝘂 𝗽𝗮𝗴𝗮𝗺𝗲𝗻𝘁𝗼 𝗮𝗶𝗻𝗱𝗮 𝗻𝗮̃𝗼 𝗳𝗼𝗶 𝗰𝗿𝗲𝗱𝗶𝘁𝗮𝗱𝗼...');
        setTimeout(() => setCheckMessage(''), 8000);
      }
    } catch (e) { console.error("Erro na verificação"); }
  };

  useEffect(() => {
    let interval;
    if (pixData?.payment_id) {
      interval = setInterval(() => verifyPayment(false), 5000);
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
    } catch (e) { alert('Erro ao gerar Pix'); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0b0e11] min-h-screen text-white font-sans pb-20 overflow-x-hidden">
      <Head>
        <title>@nath_elloy | OFICIAL</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="fixed top-0 w-full h-14 bg-[#0b0e11]/95 backdrop-blur-md border-b border-gray-800 z-50 flex items-center px-6">
        <span className="text-sm font-bold tracking-tight">@nath_elloy</span>
      </div>

      <div className="relative h-44 w-full bg-cover bg-center mt-14 shadow-inner" style={{ backgroundImage: "url('/banner.jpg')" }}></div>

      <div className="px-5 -mt-10 relative z-10 flex items-end gap-4">
        <div className="w-24 h-24 rounded-full border-4 border-[#0b0e11] overflow-hidden bg-gray-900 shadow-2xl">
          <img src="/avatar.png" className="w-full h-full object-cover" alt="Perfil" />
        </div>
        <div className="pb-1">
           <h1 className="text-2xl font-black italic uppercase">@nath_elloy ✅</h1>
        </div>
      </div>

      <div className="px-5 mt-8">
        <div className="relative w-full aspect-video bg-[#161b22] rounded-[2rem] overflow-hidden border border-gray-800">
           <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50">
              <source src="/video_preview.mp4" type="video/mp4" />
           </video>
           <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
              <span className="text-2xl mb-2">🔒</span>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70">Acesso Restrito</p>
           </div>
        </div>
      </div>

      {/* BOTÕES COM ANCORAGEM NO ANUAL */}
      <div className="px-5 mt-6 space-y-3">
        {/* MENSAL */}
        <button onClick={() => handleCheckout(plans.mensal)} className="w-full p-5 rounded-[2rem] border border-white/5 bg-[#0d1117] flex justify-between items-center opacity-60">
          <span className="font-black text-[10px] uppercase text-gray-500 italic">1 Mês Básico</span>
          <span className="text-gray-500 font-black text-sm italic">R$ 1,00</span>
        </button>

        {/* SEMESTRAL */}
        <button onClick={() => handleCheckout(plans.semestral)} className="w-full p-5 rounded-[2rem] border border-white/5 bg-[#0d1117] flex justify-between items-center">
          <span className="font-black text-xs uppercase italic text-white">6 Meses + WhatsApp</span>
          <span className="text-white font-black text-lg italic">R$ 24,90</span>
        </button>

        {/* ANUAL (A ESTRELA) */}
        <button onClick={() => handleCheckout(plans.anual)} className="w-full p-6 rounded-[2rem] border-2 border-[#ff5a00] bg-gradient-to-r from-[#0d1117] via-[#1a130f] to-[#0d1117] flex justify-between items-center shadow-[0_0_25px_rgba(255,90,0,0.3)] animate-pulse">
          <div className="flex flex-col items-start text-left">
            <span className="bg-[#ff5a00] text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase mb-1">Melhor Escolha</span>
            <span className="font-black text-sm uppercase italic">1 Ano + WhatsApp + Bônus 💎</span>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[#ff5a00] font-black text-2xl italic leading-none">R$ 34,90</span>
             <span className="text-[9px] text-gray-500 line-through mt-1">DE R$ 97,00</span>
          </div>
        </button>
      </div>

      {pixData && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-6 backdrop-blur-md">
          <div className="bg-[#161b22] w-full max-w-sm p-6 rounded-[3rem] border border-gray-700 text-center shadow-2xl">
             <div className="bg-white p-4 rounded-3xl inline-block mb-4">
                <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} className="w-40 h-40" alt="QR Code" />
             </div>
             <button onClick={() => { navigator.clipboard.writeText(pixData.qr_code); alert('Copiado!'); }} className="w-full bg-white/10 text-white font-black py-4 rounded-2xl text-xs mb-3 uppercase border border-white/10">COPIAR CÓDIGO PIX</button>
             <button onClick={() => verifyPayment(true)} className="w-full bg-[#ff5a00] text-white font-black py-5 rounded-[2rem] text-sm mb-4 uppercase shadow-lg shadow-[#ff5a00]/20">VERIFICAR PAGAMENTO 🔔</button>
             {checkMessage && <div className="text-[10px] text-red-400 font-bold mb-4">{checkMessage}</div>}
             <button onClick={() => setPixData(null)} className="text-[10px] text-gray-500 uppercase underline italic font-bold">Voltar</button>
          </div>
        </div>
      )}
    </div>
  );
}