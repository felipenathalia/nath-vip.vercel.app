import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Obrigado() {
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // TRAVA DE SEGURANÇA: Só abre se tiver o ID do pagamento
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('id');

    if (!paymentId) {
      window.location.href = '/'; // Expulsa se tentar acessar direto
    } else {
      setCarregando(false);
    }
  }, []);

  if (carregando) {
    return <div className="bg-[#0b0e11] min-h-screen" />; // Tela preta enquanto verifica
  }

  return (
    <div className="bg-[#0b0e11] min-h-screen text-white font-sans flex flex-col items-center justify-center px-6 py-12 text-center">
      <Head>
        <title>Acesso Liberado! 🔥</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      
      <div className="w-20 h-20 bg-[#22c55e] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <h1 className="text-3xl font-black mb-2 uppercase italic text-[#ff5a00] tracking-tighter">Pagamento Confirmado!</h1>
      <p className="text-gray-300 mb-10 italic text-sm text-center Leading-relaxed">
        Seu lugar no meu VIP está garantido. <br/> 
        Toque no botão abaixo para entrar agora! 👇
      </p>
      
      <a href="https://t.me/+R7NykZfhGwJhNWQx" target="_blank" rel="noopener noreferrer" className="w-full max-w-sm bg-[#24A1DE] py-6 rounded-[2.5rem] font-black text-lg shadow-[0_15px_40px_rgba(36,161,222,0.3)] hover:scale-105 transition-transform flex items-center justify-center mb-12 uppercase">
        ENTRAR NO MEU TELEGRAM VIP
      </a>

      <div className="w-full max-w-md bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] text-xs text-gray-400">
        <h2 className="text-white font-bold mb-3 uppercase text-[10px] tracking-widest">Acesso Monitorado</h2>
        <p className="mb-6 leading-relaxed">Seu acesso foi validado com sucesso através do Mercado Pago.</p>
        <p className="leading-relaxed">Suporte: <span className="text-[#ff5a00] font-bold">@nathpessoal</span></p>
      </div>
    </div>
  );
}