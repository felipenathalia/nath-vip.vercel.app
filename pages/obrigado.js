import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Obrigado() {
  const [status, setStatus] = useState('verificando'); // verificando, autorizado, negado

  useEffect(() => {
    // Trava de segurança: verifica se veio do seu site
    const veioDoSite = document.referrer.includes('nath-vip-vercel-app.vercel.app');
    
    if (veioDoSite) {
      setStatus('autorizado');
    } else {
      setStatus('negado');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  }, []);

  // Enquanto verifica ou se for negado, mostra apenas o fundo escuro (sem texto quebrado)
  if (status !== 'autorizado') {
    return (
      <div className="bg-[#0b0e11] min-h-screen flex items-center justify-center">
        <Head>
           <script src="https://cdn.tailwindcss.com"></script>
        </Head>
        <div className="w-10 h-10 border-4 border-[#ff5a00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0e11] min-h-screen text-white font-sans flex flex-col items-center justify-center px-6 py-12 text-center opacity-0 animate-[fadeIn_0.5s_ease-in_forward] style={{animationFillMode: 'forwards'}}">
      <Head>
        <title>Acesso Liberado! 🔥</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </Head>
      
      {/* Ícone de Sucesso */}
      <div className="w-20 h-20 bg-[#22c55e] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
        <div className="w-10 h-10 border-b-4 border-r-4 border-white rotate-45 mb-2 mr-1"></div>
      </div>
      
      <h1 className="text-3xl font-black mb-2 uppercase italic text-[#ff5a00] tracking-tighter">
        Pagamento Confirmado!
      </h1>
      
      <p className="text-gray-300 mb-10 italic text-sm">
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

      <div className="w-full max-w-md bg-[#161b22] border border-white/5 p-8 rounded-[2.5rem] text-xs text-gray-400 shadow-2xl">
        <h2 className="text-white font-bold mb-3 uppercase text-[10px] tracking-widest">Ainda não tem o Telegram?</h2>
        <p className="mb-6 leading-relaxed">
          Baixe o app, crie sua conta e clique no botão azul acima novamente.
        </p>

        <div className="h-[1px] bg-white/5 w-full mb-6"></div>

        <h2 className="text-white font-bold mb-3 uppercase text-[10px] tracking-widest">Precisa de Suporte?</h2>
        <p className="leading-relaxed">
          Me chame na <span className="text-[#ff5a00] font-bold">DM do Instagram</span> ou no Telegram pelo usuário <span className="text-white font-bold">@nathpessoal</span>. 
        </p>
      </div>

      <p className="mt-12 text-[9px] text-gray-600 uppercase tracking-[0.2em] font-bold">
        @NATH_ELLOY • TODOS OS DIREITOS RESERVADOS
      </p>
    </div>
  );
}