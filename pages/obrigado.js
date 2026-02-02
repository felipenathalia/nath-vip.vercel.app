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
      backgroundColor: '#0b0e11', 
      minHeight: '100vh', 
      color: 'white', 
      fontFamily: 'sans-serif', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '40px 20px', 
      textAlign: 'center' 
    }}>
      <Head>
        <title>Acesso Liberado! 🔥</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {/* Ícone de Sucesso */}
      <div style={{ 
        width: '80px', height: '80px', backgroundColor: '#22c55e', borderRadius: '50%', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px',
        boxShadow: '0 0 30px rgba(34,197,94,0.4)'
      }}>
        <span style={{ fontSize: '40px' }}>✓</span>
      </div>
      
      <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#ff5a00', textTransform: 'uppercase', fontStyle: 'italic', margin: '0 0 10px 0' }}>
        Pagamento Confirmado!
      </h1>
      <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '30px' }}>Toque no botão abaixo para entrar no VIP! 👇</p>
      
      {/* Botão Telegram */}
      <a href="https://t.me/+R7NykZfhGwJhNWQx" target="_blank" rel="noopener noreferrer" style={{ 
        width: '100%', maxWidth: '350px', backgroundColor: '#24A1DE', color: 'white', 
        padding: '20px', borderRadius: '40px', fontWeight: '900', fontSize: '18px', 
        textDecoration: 'none', display: 'block', marginBottom: '40px',
        boxShadow: '0 15px 40px rgba(36,161,222,0.3)', textTransform: 'uppercase'
      }}>
        ENTRAR NO GRUPO VIP
      </a>

      {/* Tutorial de Desbloqueio */}
      <div style={{ 
        width: '100%', maxWidth: '400px', backgroundColor: 'rgba(255,255,255,0.05)', 
        border: '1px solid rgba(255,90,0,0.3)', padding: '25px', borderRadius: '30px', textAlign: 'left' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <span>🔞</span>
          <h3 style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', margin: 0 }}>Instruções de Privacidade (iOS/Web)</h3>
        </div>
        
        <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '20px', fontStyle: 'italic' }}>
          Se o grupo aparecer como bloqueado, siga estes passos no seu navegador:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {[
            { n: '1', t: 'Acesse web.telegram.org no navegador.' },
            { n: '2', t: 'Vá em Configurações (Settings).' },
            { n: '3', t: 'Clique em Privacidade e Segurança.' },
            { n: '4', t: 'Ative "Filtragem de Conteúdo Sensível".', color: '#ff5a00' }
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ backgroundColor: '#ff5a00', color: 'black', fontWeight: '900', width: '20px', height: '20px', borderRadius: '50%', textAlign: 'center', fontSize: '12px' }}>{step.n}</span>
              <p style={{ fontSize: '10px', fontWeight: 'bold', margin: 0, color: step.color || '#d1d5db', textTransform: 'uppercase' }}>{step.t}</p>
            </div>
          ))}
        </div>
      </div>

      <p style={{ marginTop: '40px', fontSize: '10px', color: '#4b5563', fontWeight: 'bold' }}>Suporte: @nathpessoal</p>
    </div>
  );
}