import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState(null);

  const plans = {
    mensal: { id: 'mensal', title: '1 Mês', price: 1.00 },
    semestral: { id: 'semestral', title: '6 Meses', price: 24.90 },
    anual: { id: 'anual', title: '1 Ano + WhatsApp', price: 34.90 }
  };

  return (
    <div className="bg-[#1a1d21] min-h-screen text-white font-sans pb-10">
      <Head>
        <title>@nath_elloy | VIP Oficial</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {/* Header com ícone P */}
      <div className="fixed top-0 w-full h-14 bg-[#1a1d21] border-b border-gray-700 z-50 flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#ff5a00] w-8 h-8 rounded flex items-center justify-center font-black text-white">P</div>
          <span className="font-bold text-sm">@nath_elloy</span>
        </div>
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>
      </div>

      <div className="pt-14 max-w-2xl mx-auto bg-[#24272c] min-h-screen shadow-2xl rounded-b-3xl">
        
        {/* Banner e Perfil */}
        <div className="relative h-40 bg-cover bg-center m-4 rounded-3xl" style={{ backgroundImage: "url('/banner.jpg')" }}>
            <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
            <div className="absolute -bottom-6 left-6 flex flex-col">
                 <h1 className="text-3xl font-black flex items-center gap-2 drop-shadow-lg">@nath_elloy <span className="text-green-500 text-xl">✅</span></h1>
                 <p className="text-gray-300 text-sm font-bold">VIP Oficial</p>
                 <p className="text-gray-400 text-xs italic">482 Mídias • 15.2k Curtidas</p>
            </div>
        </div>

        {/* Avatar e Bio */}
        <div className="px-6 mt-10 flex gap-4 items-start">
            <div className="w-24 h-24 rounded-full border-4 border-[#ff5a00] p-1 shrink-0">
                <img src="/avatar.png" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="text-[13px] text-gray-300 leading-relaxed italic pt-2">
               "Graças a Deus sou piranha!" <br/> Assine meu conteúdo exclusivo abaixo. 👆
            </div>
        </div>

        {/* Grade de 6 Imagens com Cadeado */}
        <div className="px-6 mt-8 grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-gray-800 rounded-xl relative overflow-hidden border border-white/5">
              <img src="/avatar.png" className="w-full h-full object-cover blur-md opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl opacity-50 text-white">🔒</span>
              </div>
            </div>
          ))}
        </div>

        {/* Texto Persuasivo */}
        <div className="px-8 mt-10 text-center">
            <p className="text-[14px] text-gray-300 italic">
                Abaixo você pode escolher o tempo que irá me espiar e poder ter meu WhatsApp pessoal para conversar e o melhor...
                <br/>
                <span className="text-[#ff5a00] font-black not-italic">CHAMADAS DE VÍDEO SURPRESA LA DENTRO! 🥰</span>
            </p>
            <p className="text-[10px] mt-6 text-[#ff5a00] font-bold uppercase tracking-widest">
                👇 ESCOLHA O PLANO E CLIQUE PARA SEU PAGAMENTO 👇
            </p>
        </div>

        {/* Botões de Planos (Estilo o Desenho) */}
        <div className="px-6 mt-6 space-y-3 pb-20">
            {Object.values(plans).map((p) => (
                <button key={p.id} className="w-full h-16 bg-[#1a1d21] rounded-2xl flex border border-white/5 overflow-hidden">
                    <div className="bg-[#ff5a00] w-1/3 flex items-center justify-center font-black text-sm uppercase italic">
                        {p.title}
                    </div>
                    <div className="w-2/3 flex items-center justify-center font-black text-[#ff5a00] text-lg">
                        R$ {p.price.toFixed(2).replace('.', ',')}
                    </div>
                </button>
            ))}
        </div>
      </div>
    </div>
  );
}