<div className="px-5 mt-6 space-y-4">
        {/* PLANO 1 MÊS */}
        <button onClick={() => handleCheckout(plans.mensal)} className="w-full p-5 rounded-[2rem] border border-white/5 bg-[#0d1117] flex justify-between items-center shadow-xl transition-all active:scale-95">
          <div className="flex flex-col items-start">
            <span className="font-black text-xs uppercase text-gray-400">Acesso Mensal</span>
            <span className="font-black text-[10px] text-gray-600 uppercase">Conteúdo Básico</span>
          </div>
          <span className="text-[#ff5a00] font-black text-lg">R$ 1,00</span>
        </button>

        {/* PLANO 6 MESES - AGORA COM WHATSAPP */}
        <button onClick={() => handleCheckout(plans.semestral)} className="w-full p-5 rounded-[2rem] border border-[#ff5a00]/30 bg-[#0d1117] flex justify-between items-center shadow-xl transition-all active:scale-95 relative overflow-hidden">
          <div className="flex flex-col items-start">
            <span className="font-black text-xs uppercase">6 Meses + <span className="text-green-500">WhatsApp</span></span>
            <span className="font-black text-[10px] text-[#ff5a00] uppercase tracking-tighter">O mais vendido 🔥</span>
          </div>
          <span className="text-[#ff5a00] font-black text-lg">R$ 24,90</span>
        </button>

        {/* PLANO ANUAL - O COMBO COMPLETO */}
        <button onClick={() => handleCheckout(plans.anual)} className="w-full p-6 rounded-[2rem] border-2 border-[#ff5a00] bg-gradient-to-r from-[#0d1117] to-[#1a130f] flex justify-between items-center shadow-[0_0_20px_rgba(255,90,0,0.2)] transition-all active:scale-95">
          <div className="flex flex-col items-start">
            <span className="font-black text-sm uppercase">1 Ano + <span className="text-green-500">WhatsApp</span></span>
            <span className="font-black text-[11px] text-emerald-400 uppercase italic">Bônus Exclusivo 💎</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[#ff5a00] font-black text-xl">R$ 34,90</span>
            <span className="text-[9px] text-gray-500 line-through">R$ 97,00</span>
          </div>
        </button>
      </div>