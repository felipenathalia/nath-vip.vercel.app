import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Obrigado() {
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    // 1. Verifica se tem ID na URL (Segurança básica)
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('id');

    if (paymentId) {
      setAutorizado(true);
    } else {
      // Se não tiver ID, manda pra home
      window.location.href = '/';
    }
  }, []);

  // Se não estiver autorizado ainda, mostra tela preta (sem nada escrito)
  if (!autorizado) {
    return <div style={{ backgroundColor: '#0b0e11', minHeight: '100vh', width: '100%' }} />;
  }

  return (
    // Usamos style inline no background para garantir que nunca fique branco, mesmo se o Tailwind demorar
    <div style={{ backgroundColor: '#0b0e11', minHeight: '100vh' }} className="text-white font-sans flex flex-col items-center justify-center px-6 py-12 text-center">
      <Head>
        <title>Acesso Liberado! 🔥</title>
        {/* Carrega o Tailwind com prioridade */}
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      
      {/* Ícone de Sucesso */}
      <div className="w-20 h-20 bg-[#22c55e] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-bounce">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <h1 className="text-3xl font-black mb-2 uppercase italic text-[#ff5a00] tracking-tighter">
        Pagamento Confirmado!
      </h1>
      
      <p className="text-gray-300 mb-10 italic text-sm leading-relaxed">
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

      {/* Caixa de Informações */}
      <div className="w-full max-w-md bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] text-xs text-gray-400">
        <h2 className="text-white font-bold mb-3 uppercase text-[10px] tracking-widest">Acesso Monitorado</h2>
        <p className="mb-6 leading-relaxed">
          Seu acesso foi validado. Caso o botão acima não funcione, verifique se você já tem o Telegram instalado.
        </p>
        <div className="h-[1px] bg-white/10 w-full mb-6"></div>
        <p className="leading-relaxed">
          Suporte: <span className="text-[#ff5a00] font-bold">@nathpessoal</span>
        </p>
      </div>

      <p className="mt-12 text-[9px] text-gray-600 uppercase tracking-[0.4em] font-bold">
        @NATH_ELLOY • TODOS OS DIREITOS RESERVADOS
      </p>
    </div>
  );
}