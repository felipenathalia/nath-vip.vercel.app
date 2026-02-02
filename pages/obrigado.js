import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Obrigado() {
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    // Verifica se o usuário veio da sua página de pagamento
    const veioDoSite = document.referrer.includes('nath-vip-vercel-app.vercel.app');
    
    if (veioDoSite) {
      setAutorizado(true);
    } else {
      // Se tentou acessar direto, manda de volta para o início em 2 segundos
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  }, []);

  if (!autorizado) {
    return (
      <div className="bg-[#0b0e11] min-h-screen text-white flex items-center justify-center font-sans">
        <p className="text-gray-500 animate-pulse uppercase tracking-widest text-xs">Verificando acesso...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0e11] min-h-screen text-white flex flex-col items-center justify-center px-6 py-12 text-center">
      <Head>
        <title>Acesso Liberado! 🔥</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)] animate-bounce">
        <span className="text-4xl">✅</span>
      </div>
      
      <h1 className="text-3xl font-black mb-2 uppercase italic text-[#ff5a00] tracking-tighter">
        Pagamento Confirmado!
      </h1>
      
      <p className="text-gray-300 mb-10 italic">
        Seu lugar no meu VIP está garantido. <br/> 
        Toque no botão abaixo para entrar agora! 👇
      </p>
      
      <a 
        href="https://t.me/+R7NykZfhGwJhNWQx" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full max-w-sm bg-[#24A1DE] py-6 rounded-[2.5rem] font-black text-lg shadow-[0_15px_40px_rgba(36,161,222,0.3)] hover:scale-105 transition-transform flex items-center justify-center mb-12 uppercase"
      >
        ENTRAR NO MEU TELEGRAM VIP
      </a>

      <div className="w-full max-w-md bg-white/5 border border-white/10 p-6 rounded-[2rem] text-[10px] text-gray-500 uppercase font-bold">
        @nath_elloy • Acesso restrito e monitorado
      </div>
    </div>
  );
}