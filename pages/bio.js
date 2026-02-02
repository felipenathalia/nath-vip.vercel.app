import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Links() {
  const [city, setCity] = useState('Sua Região');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => { if (data.city) setCity(data.city); })
      .catch(() => setCity('Sua Região'));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-6 py-12 font-sans relative overflow-hidden text-center">
      <Head>
        <title>@nath_elloy</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="absolute inset-0 z-0">
        <img src="/banner.jpg" className="w-full h-full object-cover opacity-10 blur-md" />
      </div>

      <div className="z-10 w-full max-w-md flex flex-col items-center">
        <div className="relative">
          <img src="/avatar.png" className="w-28 h-28 rounded-full border-4 border-green-500 shadow-2xl object-cover" />
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-[#0a0a0a] rounded-full"></div>
        </div>

        <h1 className="text-2xl font-black mt-4 tracking-tight">@nath_elloy ✅</h1>
        
        <div className="mt-4 flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
            Online agora em <span className="text-white font-black">{city}</span>
          </p>
        </div>

        <p className="mt-6 text-sm text-gray-400 italic px-6">
          "Só 19 aninhos... 🎀 Vem ver meu lado mais doce (e o mais escondido também) ✨"
        </p>

        <div className="w-full mt-10 space-y-4">
          
          {/* BOTÃO LARANJA */}
          <a href="/" className="flex items-center justify-center w-full bg-[#ff5a00] p-5 rounded-2xl shadow-xl active:scale-95 transition-transform">
            <span className="text-white font-black uppercase text-xl italic tracking-tighter">LARANJINHA 🍊</span>
          </a>

          {/* BOTÃO AZUL */}
          <a href="https://t.me/nathseloy_bot" className="flex items-center justify-center w-full bg-[#0088cc] p-5 rounded-2xl shadow-xl active:scale-95 transition-transform">
            <span className="text-white font-black text-xl tracking-tighter">тεłεgяคм</span>
          </a>

          <p className="mt-4 text-[10px] text-gray-500 font-bold uppercase">
            Não tem Telegram? <a href="/instrucoes" className="text-white underline tracking-tighter">clique aqui para aprender a baixar</a>
          </p>

        </div>

        <p className="mt-24 text-[9px] text-gray-600 font-bold uppercase tracking-widest">
          Copyright © 2026 • @nath_elloy
        </p>
      </div>
    </div>
  );
}