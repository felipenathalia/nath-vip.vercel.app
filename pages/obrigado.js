import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Obrigado() {
  const [vipLink, setVipLink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aqui o site busca o link gerado pelo seu bot/api
    // Simulando a busca do link único
    const fetchLink = async () => {
      try {
        // Na prática, aqui buscaríamos o link salvo no banco após o Webhook
        // Para o teste, vamos simular que o link chegou
        setTimeout(() => {
          setVipLink("https://t.me/+R7NykZfhGwJhNWQx"); // Aqui entrará o link gerado de 6h
          setLoading(false);
        }, 2000);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchLink();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 py-10 font-sans text-center">
      <Head>
        <title>Acesso Liberado! ✨</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="w-full max-w-md bg-[#111] p-8 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#ff5a00]"></div>
        
        <h1 className="text-2xl font-black uppercase italic tracking-tighter text-white">
          P-A-G-O C-O-M S-U-C-E-S-S-O!
        </h1>
        
        <div className="mt-8 space-y-6 text-left">
          {loading ? (
            <div className="flex flex-col items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#ff5a00]"></div>
              <p className="mt-4 text-[10px] uppercase font-bold text-gray-500 tracking-widest">Gerando seu link exclusivo...</p>
            </div>
          ) : (
            <>
              {/* BOTÃO AZUL COM O LINK GERADO */}
              <a href={vipLink} className="block w-full bg-[#0088cc] py-5 rounded-2xl font-black uppercase text-lg shadow-xl shadow-blue-900/40 text-center animate-bounce">
                тεłεgяคм (ENTRAR AGORA)
              </a>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                <p className="text-[11px] text-gray-300 leading-tight">
                  ⚠️ <b>IMPORTANTE:</b> Este link é de <b>acesso único</b> e expira em <b>6 horas</b>. Entre agora!
                </p>
                <p className="text-[11px] text-gray-300 leading-tight border-t border-white/5 pt-2">
                  📍 <b>COMO ACHAR DEPOIS:</b> Se você se perder, basta pesquisar por <span className="text-[#ff5a00] font-bold">"Nath Elloy VIP"</span> na sua lupa do Telegram.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <p className="mt-8 text-[9px] text-gray-600 font-bold uppercase tracking-widest">
        Acesso garantido • Nath Elloy
      </p>
    </div>
  );
}