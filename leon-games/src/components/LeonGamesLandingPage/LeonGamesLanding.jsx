import { Navigation } from "../NavBar";
import HeroSection from "../HeroSection";
import { FeaturedGamesSection } from "../FeaturedGamesSection";
import { HowItWorksSection } from "../HowItWorksSection";
import { LiveActivitySection } from "../LiveActivitySection";
import { TrustSection } from "../TrustSection";
import { PaymentsSection } from "../PaymentsSection";
import { GrowthSection } from "../GrowthSection";
import VideoAdSection from "../VideoAdSection";
import FinalCTASection from "../FinalCTASection";
import Footer from "../Footer";

export default function LeonGamesLanding() {
    return (
        <div className="bg-[#050505] text-white font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-400 min-h-screen overflow-x-hidden relative">
            {/* Background Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0 opacity-80" />

            <div className="relative z-10">
                <Navigation />

                <HeroSection />
                <FeaturedGamesSection />
                <HowItWorksSection />
                <PaymentsSection />
                <TrustSection />
                <LiveActivitySection />
                <GrowthSection />
                <VideoAdSection />
                <FinalCTASection />

                <Footer />
            </div>
        </div>
    );
}
