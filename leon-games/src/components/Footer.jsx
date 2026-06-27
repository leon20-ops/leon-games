// --- FOOTER ---
function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.04] pt-16 pb-12 text-sm text-neutral-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

        <div className="col-span-2">
          <div className="flex items-center gap-6 mb-4">
            <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-[#111111] border border-white/[0.08] transition-colors overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="font-mono font-black text-sm text-neutral-100 tracking-tighter">
                L//G
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-widest text-white leading-none">
                LEON <span className="text-emerald-400 font-light">GAMES</span>
              </span>
            </div>
          </div>
          <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
            The premium international 1v1 skill matchmaking framework. Built for raw competitive capability, protected value custody, and clear transparency.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Games</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#games" className="hover:text-white transition-colors">Rock Paper Scissors</a></li>
            <li><a href="#games" className="hover:text-white transition-colors">Penalty Shootout</a></li>
            <li><a href="#games" className="hover:text-white transition-colors">Reaction Speed</a></li>
            <li><a href="#games" className="hover:text-white transition-colors">Tic Tac Toe</a></li>
            <li><a href="#games" className="hover:text-white transition-colors">Connect Four</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">System</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#security" className="hover:text-white transition-colors">Security Controls</a></li>
            <li><a href="#worldwide" className="hover:text-white transition-colors">Global Network</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Edge Infrastructure</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Regulatory</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Responsible Skill-Gaming</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Framework</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
        <div>
          © {new Date().getFullYear()} Leon Games Inc. All international rights protected.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
          <a href="#" className="hover:text-white transition-colors">Telegram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;