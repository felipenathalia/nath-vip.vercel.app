import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Obrigado() {
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('id');
    if (paymentId) {
      setAutorizado(true);
    } else {
      window.location.href = '/';
    }
  }, []);

  if (!autorizado) {
    return (
      <>
        <Head>
          <style>{`body { background-color: #0b0e11; margin: 0; }`}</style>
        </Head>
        <div className="min-h-screen bg-[#0b0e11]" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white font-sans flex flex-col items-center justify-center px-6 py-12 text-center">
      <Head>
        <title>Acesso Liberado! 🔥</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          body { background-color: #0b0e11; margin: 0; }
          .glass-box { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); }
          .step-number { background: #ff5a00; color: black; font-weight: 900; width: 18px; height: 18px; border-radius: 50%; display: flex; items-center; justify-content: center; font-size: 10px; flex-shrink: 0; }
        `}</style>
      </Head>
      
      <div className="w-20 h-20 bg-[#22c55e] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-bounce">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <h1 className="text-3xl font-black mb-2 uppercase italic text-[#ff5a00] tracking-tighter">Pagamento Confirmado!</h1>
      <p className="text-gray-300 mb-8 italic text-sm">Toque no botão abaixo para entrar no VIP! 👇</p>
      
      <a href="https://t.me/+R7NykZfhGwJhNWQx" target="_blank" rel="noopener noreferrer"
        className="w-full max-w-sm bg-[#24A1DE] py-6 rounded-[2.5rem] font-black text-lg shadow-[0_15px_40px_rgba(36,161,222,0.3)] hover:scale-105 transition-transform flex items-center justify-center mb-10 uppercase"
      >
        ENTRAR NO GRUPO VIP
      </a>

      {/* --- TUTORIAL DE DESBLOQUEIO DE CONTEÚDO SENSÍVEL --- */}
      <div className="w-full max-w-md bg-white/[0.05] border border-[#ff5a00]/30 p-6 rounded-[2.5rem] mb-8 text-left">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl">🔞</span>
          <h3 className="text-white font-black uppercase text-xs tracking-widest">Atenção (Usuários de iPhone/Web)</h3>
        </div>
        
        <p className="text-[11px] text-gray-400 leading-relaxed mb-5 italic">
          Se o grupo aparecer como "bloqueado" ou "conteúdo sensível", siga estes passos para liberar agora:
        </p>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="step-number">1</div>
            <p className="text-[10px] text-gray-300 uppercase font-bold">Acesse <span className="text-[#24A1DE]">web.telegram.org</span> no seu navegador.</p>
          </div>
          <div className="flex gap-3">
            <div className="step-number">2</div>
            <p className="text-[10px] text-gray-300 uppercase font-bold">Vá em <span className="text-white text-xs">Configurações</span> (Settings).</p>
          </div>
          <div className="flex gap-3">
            <div className="step-number">3</div>
            <p className="text-[10px] text-gray-300 uppercase font-bold">Clique em <span className="text-white text-xs">Privacidade e Segurança</span>.</p>
          </div>
          <div className="flex gap-3">
            <div className="step-number">4</div>
            <p className="text-[10px] text-[#ff5a00] uppercase font-black italic">Ative a opção "Filtragem de Conteúdo Sensível".</p>
          </div>
        </div>

        <p className="mt-5 text-[9px] text-gray-500 italic text-center leading-tight">
          Pronto! Após isso, reinicie seu app do Telegram e o conteúdo estará liberado.
        </p>
      </div>

      {/* Suporte */}
      <div className="w-full max-w-md glass-box p-6 rounded-[2rem] text-xs text-gray-500">
        <p className="leading-relaxed">Suporte: <span className="text-[#ff5a00] font-bold">@nathpessoal</span></p>
      </div>

      <p className="mt-10 text-[9px] text-gray-700 uppercase tracking-[0.4em] font-bold">@NATH_ELLOY</p>
    </div>
  );
}