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
    <div className="bg-[#0b0e11] min-h-screen text-white font-sans pb-40 selection:bg-[#ff5a00]/30">
      <Head>
        <title>@nath_elloy | VIP Oficial</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {/* Header Estilizado */}
      <div className="fixed top-0 w-full h-16 bg-[#0b0e11]/80 backdrop-blur-xl border-b border-white/5 z-50 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#ff5a00] w-9 h-9 rounded-xl flex items-center justify-center font-black shadow-[0_0_15px_rgba(255,90,0,0.4)]">P</div>
          <span className="font-bold tracking-tight">@nath_elloy</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
      </div>

      {/* Banner com Overlay */}
      <div className="relative h-56 w-full bg-cover bg-center shadow-inner" style={{ backgroundImage: "url('/banner.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e11] via-transparent to-transparent"></div>
      </div>

      {/* Perfil e Bio Premium */}
      <div className="px-6 -mt-14 relative z-10">
        <div className="w-28 h-28 rounded-full border-[5px] border-[#0b0e11] overflow-hidden bg-[#161b22] shadow-2xl">
          <img src="/avatar.png" className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <h1 className="text-2xl font-black tracking-tighter">@nath_elloy</h1>
          <span className="text-blue-400 text-xl">✅</span>
        </div>
        <div className="mt-3 border-l-2 border-[#ff5a00] pl-4 py-1 bg-white/5 rounded-r-xl">
          <p className="text-gray-300 text-sm leading-relaxed italic opacity-90">
            "Graças a Deus sou piranha!"<br/>
            <span className="text-[#ff5a00] font-semibold not-italic text-xs">Assine meu conteúdo exclusivo abaixo. 👇</span>
          </p>
        </div>
      </div>

      {/* Seção Preview de Vídeo (O Diferencial) */}
      <div className="px-6 mt-10">
        <div className="relative w-full aspect-video bg-[#161b22] rounded-[2rem] overflow-hidden border border-white/5 group shadow-2xl">
           {/* Imagem/Vídeo Desfocado de fundo */}
           <img src="/banner.jpg" className="w-full h-full object-cover blur-md opacity-40 scale-110" />
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-3 shadow-inner">
                 <span className="text-3xl">🔒</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Preview Bloqueado</p>
           </div>
        </div>

        {/* Grade de Mídias Estilo App */}
        <div className="flex justify-between items-center mt-8 mb-4">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mídias Exclusivas</h2>
           <span className="bg-[#ff5a00]/10 text-[#ff5a00] text-[10px] px-3 py-1 rounded-full border border-[#ff5a00]/20 font-bold">148 itens</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="aspect-square bg-[#161b22] rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden group shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <span className="text-xl opacity-30 group-hover:scale-125 transition-transform duration-300">🔒</span>
            </div>
          ))}
        </div>
      </div>

      {/* Seleção de Planos Premium */}
      <div className="px-6 mt-12 space-y-4">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Planos de Acesso</p>
        {Object.values(plans).map((p) => (
          <div key={p.id} onClick={() => setSelectedPlan(p.id)} 
               className={`p-5 rounded-[1.8rem] border-2 transition-all duration-300 cursor-pointer flex justify-between items-center group ${selectedPlan === p.id ? 'border-[#ff5a00] bg-[#ff5a00]/5 shadow-[0_0_25px_rgba(255,90,0,0.1)]' : 'border-white/5 bg-[#161b22] hover:border-white/20'}`}>
            <div className="flex flex-col">
              <span className={`text-[10px] font-bold uppercase mb-1 ${selectedPlan === p.id ? 'text-[#ff5a00]' : 'text-gray-500'}`}>Plano</span>
              <span className="font-black text-sm uppercase tracking-tight">{p.title}</span>
            </div>
            <div className="text-right">
              <span className="text-[#ff5a00] font-black text-xl tracking-tighter italic">R$ {p.price.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Botão de Checkout Flutuante Premium */}
      <div className="fixed bottom-10 left-0 w-full px-6 z-50">
        {!pixData ? (
          <button onClick={handleCheckout} disabled={loading} className="w-full bg-[#ff5a00] h-[85px] rounded-[2.5rem] font-black text-white uppercase flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(255,90,0,0.4)] active:scale-95 transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <div className="bg-black/30 w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-inner font-black">N</div>
            <span className="text-lg tracking-tighter">{loading ? 'PROCESSANDO...' : 'DESTRAVAR AGORA'}</span>
          </button>
        ) : (
          <div className="bg-[#1c2128] p-8 rounded-[3rem] border border-white/10 shadow-2xl text-center animate-in slide-in-from-bottom duration-500">
             <div className="flex justify-between items-center mb-6 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-green-500 font-bold text-[10px] uppercase">Aguardando Pagamento</span>
                </div>
                <button onClick={() => setPixData(null)} className="text-gray-500 text-[10px] uppercase font-bold hover:text-white">Voltar</button>
             </div>
             
             <div className="bg-white p-5 rounded-[2.5rem] inline-block mb-8 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} className="w-48 h-48" />
             </div>

             <button onClick={() => { navigator.clipboard.writeText(pixData.qr_code); alert('Copiado com sucesso!'); }} 
                     className="w-full bg-white text-black font-black py-6 rounded-3xl text-sm mb-4 uppercase tracking-tighter hover:bg-gray-100 transition-colors shadow-xl">
                COPIAR CÓDIGO PIX
             </button>
             <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest opacity-60">Liberação automática via sistema</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}