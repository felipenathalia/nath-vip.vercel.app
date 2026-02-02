import Head from 'next/head';

export default function Obrigado() {
  return (
    <div className="bg-[#0b0e11] min-h-screen text-white flex flex-col items-center justify-center px-6 py-12 text-center">
      <Head>
        <title>Acesso Liberado! 🔥</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      
      {/* Ícone de Sucesso */}
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
      
      {/* Botão Principal do Telegram */}
      <a 
        href="https://t.me/+R7NykZfhGwJhNWQx" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full max-w-sm bg-[#24A1DE] py-6 rounded-[2.5rem] font-black text-lg shadow-[0_15px_40px_rgba(36,161,222,0.3)] hover:scale-105 transition-transform flex items-center justify-center mb-12"
      >
        ENTRAR NO MEU TELEGRAM VIP
      </a>

      {/* Seção de Instruções e Suporte */}
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-6 rounded-[2rem] text-sm text-gray-400">
        <h2 className="text-white font-bold mb-3 uppercase text-xs tracking-widest">Ainda não tem o Telegram?</h2>
        <p className="mb-6">
          Basta baixar o app na sua loja de aplicativos (App Store ou Play Store), criar sua conta e clicar no botão azul acima novamente.
        </p>

        <div className="h-[1px] bg-white/10 w-full mb-6"></div>

        <h2 className="text-white font-bold mb-3 uppercase text-xs tracking-widest">Precisa de Suporte?</h2>
        <p>
          Me chame na <span className="text-white font-bold text-[#ff5a00]">DM do Instagram</span> ou no Telegram pelo usuário <span className="text-white font-bold">@nathpessoal</span>. 
          <br/><br/>
          Você será respondido em até 24 horas! 🥰
        </p>
      </div>

      <p className="mt-8 text-[10px] text-gray-600 uppercase tracking-[0.2em]">
        @nath_elloy • Todos os direitos reservados
      </p>
    </div>
  );
}