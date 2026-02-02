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
    return <div style={{ backgroundColor: '#0b0e11', minHeight: '100vh' }} />;
  }

  return (
    <div style={{ 
      backgroundColor: '#0b0e11', minHeight: '100vh', color: 'white', 
      fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' 
    }}>
      <Head>
        <title>Acesso Liberado! 🔥</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div style={{ 
        width: '60px', height: '60px', backgroundColor: '#22c55e', borderRadius: '50%', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px',
        boxShadow: '0 0 20px rgba(34,197,94,0.3)'
      }}>
        <span style={{ fontSize: '30px' }}>✓</span>
      </div>
      
      <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#ff5a00', textTransform: 'uppercase', fontStyle: 'italic', margin: '0' }}>
        Pagamento Confirmado!
      </h1>

      {/* AVISO DE CONFIGURAÇÃO - AGORA MAIS VISÍVEL E ANTES DO BOTÃO */}
      <div style={{ 
        width: '100%', maxWidth: '400px', backgroundColor: 'rgba(255,90,0,0.1)', 
        border: '1px solid #ff5a00', padding: '15px', borderRadius: '20px', margin: '20px 0', textAlign: 'left' 
      }}>
        <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#ff5a00', marginBottom: '10px', textTransform: 'uppercase', textAlign: 'center' }}>
          ⚠️ LEIA ANTES DE ENTRAR (IMPORTANTE)
        </p>
        <p style={{ fontSize: '10px', color: '#fff', lineHeight: '1.4', margin: '0' }}>
          Se ao entrar o grupo estiver <b>vazio ou bloqueado</b> (comum em Android e iPhone), você precisa liberar o acesso:
          <br/><br/>
          1. Acesse <b>web.telegram.org</b> no navegador do seu celular.<br/>
          2. Vá em <b>Configurações</b> {'>'} <b>Privacidade e Segurança</b>.<br/>
          3. Ative a opção: <b>"Filtragem de Conteúdo Sensível"</b>.<br/>
          <span style={{ color: '#ff5a00' }}><b>4. Reinicie o App e o conteúdo aparecerá na hora!</b></span>
        </p>
      </div>
      
      <a href="https://t.me/+R7NykZfhGwJhNWQx" target="_blank" rel="noopener noreferrer" style={{ 
        width: '100%', maxWidth: '350px', backgroundColor: '#24A1DE', color: 'white', 
        padding: '22px', borderRadius: '40px', fontWeight: '900', fontSize: '18px', 
        textDecoration: 'none', display: 'block', marginBottom: '20px',
        boxShadow: '0 10px 30px rgba(36,161,222,0.4)', textTransform: 'uppercase'
      }}>
        ENTRAR NO MEU VIP AGORA
      </a>

      {/* INSTALAÇÃO DO APP */}
      <div style={{ 
        width: '100%', maxWidth: '400px', backgroundColor: 'rgba(255,255,255,0.03)', 
        border: '1px solid rgba(255,255,255,0.1)', padding: '15px', borderRadius: '20px' 
      }}>
        <p style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '10px' }}>Não tem o Telegram instalado?</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <a href="https://apps.apple.com/app/telegram-messenger/id682247445" target="_blank" style={{ fontSize: '9px', color: '#fff', border: '1px solid #444', padding: '8px 12px', borderRadius: '10px', textDecoration: 'none' }}>iPhone</a>
          <a href="https://play.google.com/store/apps/details?id=org.telegram.messenger" target="_blank" style={{ fontSize: '9px', color: '#fff', border: '1px solid #444', padding: '8px 12px', borderRadius: '10px', textDecoration: 'none' }}>Android</a>
        </div>
      </div>

      <p style={{ marginTop: '25px', fontSize: '9px', color: '#4b5563', fontWeight: 'bold' }}>Suporte: @nathpessoal</p>
    </div>
  );
}