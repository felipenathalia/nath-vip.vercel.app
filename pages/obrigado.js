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
      <div style={{ backgroundColor: '#0b0e11', minHeight: '100vh', width: '100%' }}>
        <Head><style>{`body { background-color: #0b0e11; margin: 0; }`}</style></Head>
      </div>
    );
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
        <style>{`body { background-color: #0b0e11; margin: 0; }`}</style>
      </Head>
      
      {/* Ícone de Sucesso */}
      <div style={{ 
        width: '70px', height: '70px', backgroundColor: '#22c55e', borderRadius: '50%', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px',
        boxShadow: '0 0 30px rgba(34,197,94,0.4)'
      }}>
        <span style={{ fontSize: '35px' }}>✓</span>
      </div>
      
      <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#ff5a00', textTransform: 'uppercase', fontStyle: 'italic', margin: '0' }}>
        Pagamento Confirmado!
      </h1>
      <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '25px', marginTop: '5px' }}>Toque no botão abaixo para entrar agora 👇</p>
      
      {/* Botão Principal */}
      <a href="https://t.me/+R7NykZfhGwJhNWQx" target="_blank" rel="noopener noreferrer" style={{ 
        width: '100%', maxWidth: '350px', backgroundColor: '#24A1DE', color: 'white', 
        padding: '22px', borderRadius: '40px', fontWeight: '900', fontSize: '18px', 
        textDecoration: 'none', display: 'block', marginBottom: '30px',
        boxShadow: '0 10px 30px rgba(36,161,222,0.4)', textTransform: 'uppercase'
      }}>
        ENTRAR NO MEU VIP
      </a>

      {/* BLOCO 1: NÃO TEM TELEGRAM? */}
      <div style={{ 
        width: '100%', maxWidth: '400px', backgroundColor: 'rgba(255,255,255,0.03)', 
        border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '25px', marginBottom: '15px' 
      }}>
        <h3 style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '10px' }}>
          Ainda não tem o Telegram instalado?
        </h3>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <a href="https://apps.apple.com/app/telegram-messenger/id682247445" target="_blank" style={{ fontSize: '9px', color: '#fff', border: '1px solid #444', padding: '8px 12px', borderRadius: '10px', textDecoration: 'none' }}>Baixar p/ iPhone</a>
          <a href="https://play.google.com/store/apps/details?id=org.telegram.messenger" target="_blank" style={{ fontSize: '9px', color: '#fff', border: '1px solid #444', padding: '8px 12px', borderRadius: '10px', textDecoration: 'none' }}>Baixar p/ Android</a>
        </div>
      </div>

      {/* BLOCO 2: PRIVACIDADE +18 (DESBLOQUEIO) */}
      <div style={{ 
        width: '100%', maxWidth: '400px', backgroundColor: 'rgba(255,90,0,0.05)', 
        border: '1px solid rgba(255,90,0,0.2)', padding: '25px', borderRadius: '25px', textAlign: 'left' 
      }}>
        <h3 style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '15px', color: '#ff5a00' }}>
          ⚠️ ATENÇÃO (Instruções de Acesso)
        </h3>
        <p style={{ fontSize: '10px', color: '#d1d5db', marginBottom: '15px', lineHeight: '1.5' }}>
          Se o grupo aparecer como <b>"Conteúdo Sensível"</b> no seu iPhone, faça isso:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '9px' }}>
          <p style={{ margin: 0 }}>1. Acesse <b>web.telegram.org</b> no seu navegador.</p>
          <p style={{ margin: 0 }}>2. Vá em <b>Settings</b> > <b>Privacy and Security</b>.</p>
          <p style={{ margin: 0, color: '#ff5a00', fontWeight: 'bold' }}>3. Ative a opção: "Disable Filtering" (Conteúdo Sensível).</p>
          <p style={{ margin: 0 }}>4. Reinicie seu App e aproveite o conteúdo! 🥰</p>
        </div>
      </div>

      <p style={{ marginTop: '30px', fontSize: '10px', color: '#4b5563', fontWeight: 'bold' }}>Suporte: @nathpessoal</p>
    </div>
  );
}