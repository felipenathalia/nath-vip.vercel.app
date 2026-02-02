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
        window.location.href = '/obrigado'; 
      } else if (isManual) {
        setCheckMessage('⛔️ 𝗦𝗲𝘂 𝗽𝗮𝗴𝗮𝗺𝗲𝗻𝘁𝗼 𝗮𝗶𝗻𝗱𝗮 𝗻𝗮̃𝗼 𝗳𝗼𝗶 𝗰𝗿𝗲𝗱𝗶𝘁𝗮𝗱𝗼 𝗲𝗺 𝗻𝗼𝘀𝘀𝗼 𝘀𝗶𝘀𝘁𝗲𝗺𝗮. O Pagamento para ser aprovado, demora em torno de 𝟯-𝟱 𝗠𝗶𝗻𝘂𝘁𝗼𝘀 𝗮𝗽𝗼́𝘀 𝗮 𝗰𝗼𝗺𝗽𝗿𝗮 𝗳𝗲𝗶𝘁𝗮. Logo após você clica em “ 𝗩𝗘𝗥𝗜𝗙𝗜𝗖𝗔𝗥 𝗣𝗔𝗚𝗔𝗠𝗘𝗡𝗧𝗢 🔔 “ Novamente.');
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
    setCheckMessage('');
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
           <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">482 Mídias • 15.2k Curtidas</p>
        </div>
      </div>

      <div className="px-5 mt-8">
        <div className="relative w-full aspect-video bg-[#161b22] rounded-[2rem] overflow-hidden border border-gray-800 shadow-2xl">
           <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50">
              <source src="/video_preview.mp4" type="video/mp4" />
           </video>
           <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
              <span className="text-2xl mb-2">🔒</span>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70">Acesso Restrito</p>
           </div>
        </div>
      </div>

      {/* GRADE COLORIDA ENIGMÁTICA VOLTOU */}
      <div className="px-5 mt-6 grid grid-cols-3 gap-3">
        {[
          "bg-gradient-to-br from-gray-900 to-purple-900/40",
          "bg-gradient-to-br from-gray-900 to-blue-900/40",
          "bg-gradient-to-br from-gray-900 to-red-900/40",
          "bg-gradient-to-br from-gray-900 to-emerald-900/40",
          "bg-gradient-to-br from-gray-900 to-pink-900/40",
          "bg-gradient-to-br from-gray-900 to-indigo-900/40"
        ].map((bg, i) => (
          <div key={i} className={`aspect-square ${bg} rounded-2xl border border-gray-800 flex items-center justify-center shadow-inner`}>
             <span className="text-xl opacity-20">🔒</span>
          </div>
        ))}
      </div>

      <div className="px-6 mt-10 text-center">
        <p className="text-gray-300 text-sm leading-relaxed italic">
          Desbloqueie agora meu conteúdo sem censura e tenha acesso ao meu <span className="text-[#ff5a00] font-bold">WhatsApp Pessoal</span>.🥰
        </p>
      </div>

      <div className="px-5 mt-6 space-y-3">
        {Object.values(plans).map((p) => (
          <button key={p.id} onClick={() => handleCheckout(p)} className="w-full p-5 rounded-[2rem] border border-white/5 bg-[#0d1117] flex justify-between items-center shadow-xl transition-all active:scale-95">
            <span className="font-black text-xs uppercase">{p.title}</span>
            <span className="text-[#ff5a00] font-black text-lg">R$ {p.price.toFixed(2).replace('.', ',')}</span>
          </button>
        ))}
      </div>

      {pixData && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-6 backdrop-blur-md">
          <div className="bg-[#161b22] w-full max-w-sm p-6 rounded-[3rem] border border-gray-700 text-center shadow-2xl">
             <div className="bg-white p-4 rounded-3xl inline-block mb-4">
                <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} className="w-40 h-40" alt="QR Code" />
             </div>
             
             <button onClick={() => { navigator.clipboard.writeText(pixData.qr_code); alert('Copiado!'); }} 
                     className="w-full bg-white/10 text-white font-black py-4 rounded-2xl text-xs mb-3 uppercase border border-white/10">
                COPIAR CÓDIGO PIX
             </button>

             <button onClick={() => verifyPayment(true)} 
                     className="w-full bg-[#ff5a00] text-white font-black py-5 rounded-[2rem] text-sm mb-4 uppercase shadow-lg shadow-[#ff5a00]/20">
                VERIFICAR PAGAMENTO 🔔
             </button>

             {checkMessage && (
               <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl mb-4 text-[10px] text-red-400 font-bold leading-tight">
                 {checkMessage}
               </div>
             )}

             <button onClick={() => setPixData(null)} className="text-[10px] text-gray-500 uppercase underline italic font-bold">Voltar</button>
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