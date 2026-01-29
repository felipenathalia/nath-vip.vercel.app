import Head from 'next/head';

export default function Instrucoes() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-8 text-center font-sans">
      <Head>
        <title>Como baixar тεłεgяคм</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      
      <div className="w-full max-w-sm bg-[#151515] p-8 rounded-3xl border border-gray-800 shadow-2xl">
        <h2 className="text-xl font-black text-[#ff5a00] uppercase italic tracking-tighter">Passo a Passo ✈️</h2>
        
        <div className="mt-8 space-y-6 text-left border-l-2 border-gray-800 ml-2">
          <div className="relative pl-6">
            <div className="absolute left-[-5px] top-1 w-2 h-2 bg-[#ff5a00] rounded-full"></div>
            <p className="text-xs text-gray-200 font-black uppercase">1. Baixe o App</p>
            <p className="text-[10px] text-gray-500 leading-tight">Procure por "Telegram" na App Store ou Play Store do seu celular.</p>
          </div>
          
          <div className="relative pl-6">
            <div className="absolute left-[-5px] top-1 w-2 h-2 bg-[#ff5a00] rounded-full"></div>
            <p className="text-xs text-gray-200 font-black uppercase">2. Ative sua conta</p>
            <p className="text-[10px] text-gray-500 leading-tight">Coloque seu número. Você receberá um código via SMS para confirmar.</p>
          </div>

          <div className="relative pl-6">
            <div className="absolute left-[-5px] top-1 w-2 h-2 bg-[#ff5a00] rounded-full"></div>
            <p className="text-xs text-gray-200 font-black uppercase">3. Volte para a Nath</p>
            <p className="text-[10px] text-gray-500 leading-tight">Agora é só clicar no botão azul (тεłεgяคм) para liberar seu acesso.</p>
          </div>
        </div>

        <a href="/links" className="mt-10 block w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">
          Voltar para os links
        </a>
      </div>
      
      <p className="mt-8 text-[9px] text-gray-700 font-bold uppercase tracking-widest">
        Seguro • Privado • Criptografado
      </p>
    </div>
  );
}