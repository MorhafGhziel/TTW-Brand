"use client";

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      >
        <source src="/videos/hero-video2.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1
          className="text-white text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-[0.3em] drop-shadow-[0_4px_60px_rgba(0,0,0,0.5)]"
          style={{ fontFamily: "var(--font-intranet), sans-serif", animation: "heroTextReveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
        >
          Made In Abyss
        </h1>
        <p
          className="text-white/0 text-sm md:text-base tracking-[0.4em] uppercase mt-6"
          style={{ fontFamily: "var(--font-intranet), sans-serif", animation: "heroSubReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards" }}
        >
          Wear the victory
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 left-1/2"
        style={{ animation: "scrollIndicator 2s ease-in-out infinite" }}
      >
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-white/40">
          <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="2.5" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
