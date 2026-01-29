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
    setPixData(null); // Limpa dados anteriores
    try {
      const res = await fetch('/api/create_pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plans[selectedPlan] })
      });
      
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro na API');

      // Capturamos o QR Code (Imagem) e o Copia e Cola (Texto)
      if (data.point_of_interaction?.transaction_data) {
        setPixData({ 
          qr_code_base64: data.point_of_interaction.transaction_data.qr_code_base64,
          qr_code: data.point_of_interaction.transaction_data.qr_code,
          payment_id: data.id 
        });
      } else {
        throw new Error('Dados do Pix não retornados pelo Mercado Pago.');
      }
    } catch (e) {
      alert('Atenção: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixData.qr_code);
    alert('Código Pix copiado com sucesso!');
  };

  return (
    <div className="bg-[#0b0e11] min-h-screen text-white font-sans pb-40">
      <Head>
        <title>@nath_elloy | VIP</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {/* Header, Banner e Perfil (Mantendo seu estilo) */}
      <div className="fixed top-0 w-full h-14 bg-[#0b0e11]/90 backdrop-blur-md border-b border-gray-800 z-50 flex items-center px-4">
        <div className="bg-[#ff5a00] w-8 h-8 rounded-lg flex items-center justify-center font-black text-white">P</div>
        <span className="ml-3 text-sm font-bold">@nath_elloy</span>
      </div>

      <div className="relative h-48 w-full bg-cover bg-center" style={{ backgroundImage: "url('/banner.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e11] via-transparent to-transparent"></div>
      </div>

      <div className="px-5 -mt-12 relative z-10">
        <div className="w-24 h-24 rounded-full border-4 border-[#0b0e11] overflow-hidden bg-gray-800">
          <img src="/avatar.png" alt="Perfil" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-black mt-3 text-white">@nath_elloy ✅</h1>
        <p className="text-gray-400 text-sm mt-1 italic border-l-2 border-[#ff5a00] pl-3">Assine meu conteúdo exclusivo abaixo. 👇</p>
      </div>

      {/* Planos */}
      <div className="px-5 mt-10 space-y-3">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Escolha seu plano</p>
        {Object.values(plans).map((p) => (
          <div key={p.id} onClick={() => setSelectedPlan(p.id)} 
               className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center ${selectedPlan === p.id ? 'border-[#ff5a00] bg-[#ff5a00]/10' : 'border-gray-800 bg-[#161b22]'}`}>
            <span className="font-bold">{p.title}</span>
            <span className="text-[#ff5a00] font-black">R$ {p.price.toFixed(2).replace('.', ',')}</span>
          </div>
        ))}
      </div>

      {/* ÁREA DO PIX FIXA NO RODAPÉ */}
      <div className="fixed bottom-0 w-full bg-[#0b0e11] p-4 border-t border-gray-800 z-50">
        {!pixData ? (
          <button onClick={handleCheckout} disabled={loading} className="w-full bg-[#ff5a00] py-5 rounded-2xl font-black text-white uppercase tracking-tighter shadow-xl disabled:opacity-50">
            {loading ? 'Gerando seu Pix...' : 'Destravar Tudo Agora'}
          </button>
        ) : (
          <div className="bg-[#161b22] p-4 rounded-2xl border border-gray-700 flex flex-col items-center">
             <p className="text-[10px] text-green-500 font-bold mb-3 uppercase">Pix Gerado com Sucesso!</p>
             
             {/* QR CODE IMAGEM */}
             <div className="bg-white p-2 rounded-lg mb-4">
                <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} alt="QR Code Pix" className="w-32 h-32" />
             </div>

             {/* COPIA E COLA SEPARADO */}
             <button onClick={copyToClipboard} className="w-full bg-white text-black font-black py-4 rounded-xl text-sm mb-3 uppercase flex items-center justify-center gap-2">
                <span>📋</span> COPIAR CÓDIGO PIX
             </button>

             <a href={`/obrigado?payment_id=${pixData.payment_id}`} className="text-[10px] text-gray-500 uppercase font-bold underline">Já paguei, liberar acesso</a>
          </div>
        )}
      </div>
    </div>
  );
} 