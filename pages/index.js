import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState('mensal');
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) { videoRef.current.play().catch(() => {}); }
  }, []);

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
      if (data.qr_code) setPixData(data);
    } catch (e) { alert('Erro no Pix'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <Head>
        <title>@nath_elloy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {/* HEADER - APENAS O P E O USER */}
      <div className="fixed top-0 w-full h-14 bg-[#0f0f0f] border-b border-gray-800 z-50 flex items-center px-4">
        <div className="bg-[#ff5a00] w-8 h-8 rounded-lg flex items-center justify-center font-black text-white">P</div>
        <span className="ml-3 text-gray-300 text-sm font-bold">@nath_elloy</span>
      </div>

      {/* BANNER */}
      <div className="pt-14 relative h-40 w-full">
        <img src="/banner.jpg" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent"></div>
      </div>

      {/* PERFIL */}
      <div className="px-5 -mt-10 relative z-10">
        <img src="/avatar.png" className="w-20 h-20 rounded-full border-4 border-[#0f0f0f] object-cover bg-gray-900" />
        <h1 className="text-xl font-bold mt-2">@nath_elloy ✅</h1>
        <div className="mt-2 border-l-2 border-[#ff5a00] pl-3 text-gray-400 text-xs italic">
          "Graças a Deus sou piranha!" <br/> Assine meu conteúdo exclusivo abaixo. 👇
        </div>
      </div>

      {/* VÍDEO PREVIEW */}
      <div className="px-4 mt-6">
        <div className="relative w-full h-40 rounded-xl overflow-hidden bg-black border border-gray-800">
          <video ref={videoRef} src="/video_preview.mp4" className="w-full h-full object-cover blur-md opacity-30" playsInline muted loop autoPlay />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#ff5a00]">
            <span className="text-2xl">🔒</span>
            <p className="text-[9px] font-bold uppercase text-white mt-1">Preview Bloqueado</p>
          </div>
        </div>
      </div>

      {/* GRADE DE FOTOS CINZAS (MÍDIAS BLOQUEADAS) */}
      <div className="px-4 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Mídias</h2>
          <span className="text-[10px] bg-gray-800 px-2 py-1 rounded text-gray-400">148 itens</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-gray-900 rounded-md flex items-center justify-center border border-gray-800">
              <span className="text-gray-700 text-lg">🔒</span>
            </div>
          ))}
        </div>
      </div>

      {/* PLANOS */}
      <div className="px-4 mt-8 space-y-3 pb-32">
        <p className="text-[10px] font-bold text-gray-500 uppercase ml-1">Escolha seu plano</p>
        {Object.values(plans).map((p) => (
          <div key={p.id} onClick={() => setSelectedPlan(p.id)} 
               className={`p-4 rounded-xl border-2 transition-all ${selectedPlan === p.id ? 'border-[#ff5a00] bg-[#ff5a00]/5' : 'border-gray-800 bg-[#151515]'}`}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-gray-200">{p.title}</span>
              <span className="text-[#ff5a00] font-bold">R$ {p.price.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* BOTÃO FIXO */}
      <div className="fixed bottom-0 w-full bg-[#0f0f0f] p-4 border-t border-gray-800 z-50">
        {!pixData ? (
          <button onClick={handleCheckout} disabled={loading} className="w-full bg-[#ff5a00] py-4 rounded-xl font-black text-white uppercase text-sm shadow-lg shadow-orange-900/20">
            {loading ? 'Processando...' : 'Destravar Tudo Agora'}
          </button>
        ) : (
          <div className="bg-[#1a1a1a] p-3 rounded-xl border border-gray-800">
            <p className="text-[10px] text-green-500 font-bold mb-2 text-center uppercase">Pix Gerado! Copie e pague:</p>
            <div className="flex gap-2">
              <input readOnly value={pixData.qr_code} className="bg-black text-gray-500 text-[10px] p-2 rounded w-full border border-gray-800 outline-none" />
              <button onClick={() => {navigator.clipboard.writeText(pixData.qr_code); alert('Copiado!')}} className="bg-white text-black font-bold px-4 rounded text-[10px]">COPIAR</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
