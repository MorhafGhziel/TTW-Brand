"use client";

import AnchorLink from "./AnchorLink";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { INTRO_DONE_EVENT, shouldPlayIntro } from "@/lib/intro";

const LINES = {
  eyebrow: "تشكيلة خريف ٢٠٢٦",
  headline: "أعمق من الموضة",
  sub: "استكشف الأعماق. ارتدِ الثقة.",
  cta: "تسوق الآن",
};

/**
 * Full-bleed opening on the brand's own footage. One statement, bottom-start,
 * over a gradient heavy enough to hold the type at any frame of the loop.
 */
const Hero = () => {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  // No plate this load means nothing to wait for. Framer paints `initial` on
  // the first render either way, so the server and client markup agree.
  const [ready, setReady] = useState(() => !shouldPlayIntro());

  useEffect(() => {
    if (ready) return;
    const onDone = () => setReady(true);
    window.addEventListener(INTRO_DONE_EVENT, onDone);
    return () => window.removeEventListener(INTRO_DONE_EVENT, onDone);
  }, [ready]);

  useEffect(() => {
    if (reduced) videoRef.current?.pause();
  }, [reduced]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay },
  });

  return (
    <section className="relative h-svh min-h-[34rem] w-full overflow-hidden bg-abyss">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="graded absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-video2.mp4" type="video/mp4" />
      </video>

      {/* Reads the frame down toward the copy without flattening the image. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.3)_0%,rgba(10,10,10,0.15)_35%,rgba(10,10,10,0.75)_100%)]"
      />

      <div className="relative flex h-full flex-col justify-end px-[8vw] pb-[max(4rem,10vh)]">
        <motion.p {...rise(0.05)} className="meta flex items-center gap-3 text-text-2">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-chrome" />
          {LINES.eyebrow}
        </motion.p>

        <motion.h1 {...rise(0.15)} className="h-hero mt-5 max-w-[14ch]">
          {LINES.headline}
        </motion.h1>

        <motion.p
          {...rise(0.25)}
          className="mt-5 max-w-[34ch] text-[1.0625rem] text-text-2"
        >
          {LINES.sub}
        </motion.p>

        <motion.div {...rise(0.35)} className="mt-9">
          <AnchorLink href="/#new-drop" className="btn-solid text-[0.9375rem]">
            {LINES.cta}
          </AnchorLink>
        </motion.div>
      </div>

      {/* Scroll indicator: a hairline that fills downward and empties again. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <span className="relative block h-12 w-px bg-line-strong">
          <span className="animate-scroll-pulse absolute inset-0 block bg-text" />
        </span>
      </div>
    </section>
  );
};

export default Hero;
