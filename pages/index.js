import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { Check, Lock, Copy, Smartphone, Play, VolumeX, ShieldCheck } from 'lucide-react';

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState('mensal');
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const plans = {
    mensal: { id: 'mensal', title: '1 Mês', price: 19.90 },
    semestral: { id: 'semestral', title: '6 Meses', price: 24.90 },
    anual: { id: 'anual', title: '1 Ano (Bônus Whats)', price: 34.90 }
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
    } catch (e) { alert('Erro ao gerar Pix'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-24 font-sans">
      <Head>
        <title>Nath Elloy | Privacy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      {/* Header com P Laranja */}
      <div className="fixed top-0 w-full h-14 bg-[#0f0f0f]/90 backdrop-blur-md z-50 flex items-center px-4 border-b border-gray-800">
        <div className="bg-[#ff5a00] w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xl text-white">P</div>
        <span className="ml-3 text-sm font-medium text-gray-300">privacy.com.br/@nath_elloy</span>
      </div>

      <div className="pt-14 relative h-48">
         <img src="/banner.jpg" className="w-full h-full object-cover opacity-60" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent"></div>
      </div>

      <div className="px-5 -mt-12 relative z-10">
        <img src="/avatar.png" className="w-24 h-24 rounded-full border-4 border-[#0f0f0f] object-cover bg-gray-800" />
        <h1 className="text-xl font-bold mt-2 flex items-center gap-1">
          Nath Elloy <Check size={16} className="text-blue-400" />
        </h1>
        <p className="text-gray-400 text-sm">@nath_elloy</p>
        <p className="mt-3 text-gray-300 text-sm leading-relaxed border-l-2 border-[#ff5a00] pl-3">
          🔥 Graças a Deus sou piranha! Conteúdo sem censura. Assine abaixo! 👇
        </p>
      </div>

      {/* Vídeo Preview Borrado */}
      <div className="px-4 mt-6">
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-black border border-gray-800">
            <video ref={videoRef} src="/video_preview.mp4" className="w-full h-full object-cover blur-[6px] opacity-40" playsInline muted loop autoPlay />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Lock size={30} className="text-[#ff5a00] mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest">Conteúdo Bloqueado</p>
            </div>
        </div>
      </div>

      {/* Planos */}
      <div className="px-4 mt-6 space-y-3">
        {Object.values(plans).map((p) => (
          <div key={p.id} onClick={() => setSelectedPlan(p.id)} className={`p-4 rounded-xl border-2 transition-all ${selectedPlan === p.id ? 'border-[#ff5a00] bg-[#ff5a00]/10' : 'border-gray-800 bg-[#151515]'}`}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm">{p.title}</span>
              <span className="text-[#ff5a00] font-bold">R$ {p.price.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Botão Fixo */}
      <div className="fixed bottom-0 w-full bg-[#0f0f0f] p-4 border-t border-gray-800 z-50">
        {!pixData ? (
          <button onClick={handleCheckout} disabled={loading} className="w-full bg-[#ff5a00] py-3 rounded-xl font-bold uppercase shadow-lg shadow-orange-900/20">
            {loading ? 'Gerando...' : 'Assinar Agora'}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input readOnly value={pixData.qr_code} className="bg-gray-800 text-xs p-3 rounded-lg w-full truncate border border-gray-700" />
              <button onClick={() => {navigator.clipboard.writeText(pixData.qr_code); alert('Copiado!')}} className="bg-white text-black font-bold px-4 rounded-lg text-xs">Copiar</button>
            </div>
            <p className="text-[10px] text-gray-500 text-center uppercase tracking-tighter">Pague o Pix e o link do Telegram será liberado em instantes</p>
          </div>
        )}
      </div>
    </div>
  );
}