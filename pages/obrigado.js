import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Obrigado() {
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    // Trava de segurança para não acessarem direto
    const veioDoSite = document.referrer.includes('nath-vip-vercel-app.vercel.app');
    if (veioDoSite) {
      setAutorizado(true);
    } else {
      setTimeout(() => { window.location.href = '/'; }, 2000);
    }
  }, []);

  if (!autorizado) {
    return (
      <div className="bg-[#0b0e11] min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#ff5a00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0e11] min-h-screen text-white font-sans flex flex-col items-center justify-center p-6 overflow-hidden relative">
      <Head>
        <title>Acesso Liberado! ✅</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {/* Brilhos de fundo para dar profundidade */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-[#ff5a00]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] text-center shadow-2xl">
        <div className="w-24 h-24 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)] animate-pulse">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Pagamento<br/>Confirmado!
        </h1>

        <p className="text-gray-400 text-sm mb-12 font-medium leading-relaxed">
          Seu lugar no meu VIP está garantido.<br/>
          Toque no botão abaixo para liberar o conteúdo. 👇
        </p>

        <a href="https://t.me/+R7NykZfhGwJhNWQx" 
           className="group relative inline-flex items-center justify-center w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#24A1DE] to-[#0088cc] rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <button className="relative w-full bg-[#24A1DE] text-white font-black py-6 rounded-[2rem] text-lg uppercase tracking-widest shadow-2xl transition-all active:scale-95">
            ENTRAR NO TELEGRAM VIP
          </button>
        </a>

        <div className="mt-12 pt-8 border-t border-white/5 space-y-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em]">Suporte Exclusivo</span>
            <p className="text-xs text-gray-300">Instagram: <span className="text-[#ff5a00] font-bold">@nath_elloy</span></p>
          </div>
        </div>
      </div>

      <p className="mt-10 text-[9px] text-gray-600 uppercase tracking-[0.4em] font-bold">© @nath_elloy • Original Content</p>
    </div>
  );
}