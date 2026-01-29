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
        <title>@nath_elloy | VIP</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {/* Header fixo */}
      <div className="fixed top-0 w-full h-14 bg-[#0b0e11]/90 backdrop-blur-md border-b border-gray-800 z-50 flex items-center px-4">
        <div className="bg-[#ff5a00] w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs">P</div>
        <span className="ml-3 text-sm font-bold">@nath_elloy</span>
      </div>

      {/* Banner */}
      <div className="relative h-48 w-full bg-cover bg-center" style={{ backgroundImage: "url('/banner.jpg')" }}></div>

      {/* Perfil */}
      <div className="px-5 -mt-12 relative z-10">
        <div className="w-24 h-24 rounded-full border-4 border-[#0b0e11] overflow-hidden bg-gray-800">
          <img src="/avatar.png" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-black mt-3">@nath_elloy ✅</h1>
        <p className="text-gray-400 text-sm mt-1 italic border-l-2 border-[#ff5a00] pl-3 italic opacity-80">
          "Graças a Deus sou piranha!"<br/>Assine meu conteúdo exclusivo abaixo. 👇
        </p>
      </div>

      {/* Seção de Mídias (O "Preview Bloqueado" da sua foto) */}
      <div className="px-5 mt-10">
        <div className="relative w-full aspect-video bg-[#161b22] rounded-3xl overflow-hidden border border-gray-800 flex flex-col items-center justify-center mb-6">
           <div className="text-3xl mb-2">🔒</div>
           <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Preview Bloqueado</p>
        </div>

        <div className="flex justify-between items-center mb-4">
           <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mídias</h2>
           <span className="bg-[#161b22] text-[10px] px-3 py-1 rounded-full border border-gray-800 text-gray-400">148 itens</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="aspect-square bg-[#161b22] rounded-2xl flex items-center justify-center border border-gray-800 shadow-inner">
              <span className="text-xl opacity-20">🔒</span>
            </div>
          ))}
        </div>
      </div>

      {/* Planos */}
      <div className="px-5 mt-12 space-y-3">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Escolha seu plano</p>
        {Object.values(plans).map((p) => (
          <div key={p.id} onClick={() => setSelectedPlan(p.id)} 
               className={`p-5 rounded-[2rem] border-2 transition-all cursor-pointer flex justify-between items-center ${selectedPlan === p.id ? 'border-[#ff5a00] bg-[#ff5a00]/5' : 'border-gray-800 bg-[#0d1117]'}`}>
            <span className="font-bold text-sm uppercase tracking-tight">{p.title}</span>
            <span className="text-[#ff5a00] font-black text-lg">R$ {p.price.toFixed(2).replace('.', ',')}</span>
          </div>
        ))}
      </div>

      {/* Botão de Pagamento Flutuante */}
      <div className="fixed bottom-8 left-0 w-full px-5 z-50">
        {!pixData ? (
          <button onClick={handleCheckout} disabled={loading} className="w-full bg-[#ff5a00] h-20 rounded-[2.5rem] font-black text-white uppercase flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(255,90,0,0.3)] hover:scale-[1.02] transition-transform active:scale-95">
            <div className="bg-black/20 w-10 h-10 rounded-full flex items-center justify-center text-sm">N</div>
            {loading ? 'GERANDO PIX...' : 'DESTRAVAR TUDO AGORA - CLIQUE AQUI'}
          </button>
        ) : (
          <div className="bg-[#161b22] p-8 rounded-[3rem] border border-gray-700 shadow-2xl text-center">
             <div className="bg-white p-4 rounded-3xl inline-block mb-6 shadow-xl">
                <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} className="w-44 h-44" />
             </div>
             <button onClick={() => { navigator.clipboard.writeText(pixData.qr_code); alert('Código copiado!'); }} 
                     className="w-full bg-white text-black font-black py-5 rounded-[2rem] text-sm mb-4 uppercase tracking-tighter">
                COPIAR CÓDIGO PIX
             </button>
             <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Acesso imediato após o pagamento</p>
             <button onClick={() => setPixData(null)} className="mt-4 text-gray-600 text-[10px] underline uppercase">Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
}