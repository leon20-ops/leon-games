import logo from '../assets/images/logo.png';
// --- FOOTER ---
function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.04] pt-16 pb-12 text-sm text-neutral-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

        <div className="col-span-2">
          {/* Logo */}
                      <img
                        src={logo}
                        alt="Leon Games logo"
                        className="w-20 h-20 object-contain"
                      />
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
            <li><a href="#games" className="hover:text-white transition-colors">Number Prediction</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">System</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#security" className="hover:text-white transition-colors">Security Controls</a></li>
            <li><a href="#worldwide" className="hover:text-white transition-colors">Global Network</a></li>
            <li><a href="#payments" className="hover:text-white transition-colors">Payment Infrastructure</a></li>
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