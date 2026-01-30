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
    <div className="bg-[#0b0e11] min-h-screen text-white font-sans pb-40">
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

      {/* Perfil e Bio */}
      <div className="px-5 -mt-12 relative z-10">
        <div className="w-24 h-24 rounded-full border-4 border-[#0b0e11] overflow-hidden bg-gray-800 shadow-2xl">
          <img src="/avatar.png" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-black mt-3">@nath_elloy ✅</h1>
        <p className="text-gray-400 text-sm mt-1 italic border-l-2 border-[#ff5a00] pl-3 opacity-80">
          "Graças a Deus sou piranha!"<br/>Assine meu conteúdo exclusivo abaixo. 👇
        </p>
      </div>

      {/* PREVIEW PREMIUM COM O SEU VÍDEO REAL */}
      <div className="px-5 mt-10">
        <div className="relative w-full aspect-video bg-[#161b22] rounded-[2rem] overflow-hidden border border-gray-800 flex items-center justify-center shadow-2xl">
           <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110"
           >
              <source src="/video_preview.mp4" type="video/mp4" />
           </video>
           
           <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-3">
                 <span className="text-3xl drop-shadow-lg">🔒</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Preview Bloqueado</p>
           </div>
        </div>

        {/* Grade de Mídias */}
        <div className="flex justify-between items-center mt-10 mb-4 px-1">
           <h2 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Mídias</h2>
           <span className="bg-[#161b22] text-[10px] px-3 py-1 rounded-full border border-gray-800 text-gray-500">148 itens</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="aspect-square bg-[#161b22] rounded-2xl flex items-center justify-center border border-white/5 shadow-lg">
              <span className="text-xl opacity-20">🔒</span>
            </div>
          ))}
        </div>
      </div>

      {/* Planos */}
      <div className="px-5 mt-12 space-y-3">
        {Object.values(plans).map((p) => (
          <div key={p.id} onClick={() => setSelectedPlan(p.id)} 
               className={`p-5 rounded-[2rem] border-2 transition-all cursor-pointer flex justify-between items-center ${selectedPlan === p.id ? 'border-[#ff5a00] bg-[#ff5a00]/5 shadow-lg' : 'border-white/5 bg-[#0d1117]'}`}>
            <span className="font-bold text-xs uppercase tracking-tight">{p.title}</span>
            <span className="text-[#ff5a00] font-black text-lg">R$ {p.price.toFixed(2).replace('.', ',')}</span>
          </div>
        ))}
      </div>

      {/* Botão de Pagamento (Limpo, sem o 'N') */}
      <div className="fixed bottom-8 left-0 w-full px-5 z-50">
        {!pixData ? (
          <button onClick={handleCheckout} disabled={loading} className="w-full bg-[#ff5a00] h-20 rounded-[2.5rem] font-black text-white uppercase flex items-center justify-center shadow-[0_20px_50px_rgba(255,90,0,0.4)] active:scale-95 transition-all text-sm tracking-tighter">
            {loading ? 'GERANDO ACESSO...' : 'CLIQUE AQUI PARA DESBLOQUEAR AGORA'}
          </button>
        ) : (
          <div className="bg-[#161b22] p-8 rounded-[3rem] border border-gray-700 shadow-2xl text-center animate-in slide-in-from-bottom">
             <div className="bg-white p-4 rounded-3xl inline-block mb-6 shadow-xl">
                <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} className="w-44 h-44" />
             </div>
             <button onClick={() => { navigator.clipboard.writeText(pixData.qr_code); alert('Copiado!'); }} 
                     className="w-full bg-white text-black font-black py-5 rounded-[2rem] text-sm mb-4 uppercase">
                COPIAR CÓDIGO PIX
             </button>
             <button onClick={() => setPixData(null)} className="text-[10px] text-gray-500 uppercase font-bold underline">Escolher outro plano</button>
          </div>
        )}
      </div>
    </div>
  );
}