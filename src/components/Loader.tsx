"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { INTRO_DONE_EVENT, markIntroSeen, shouldPlayIntro } from "@/lib/intro";
import Wordmark from "./Wordmark";

/**
 * The opening sequence — the one orchestrated moment on the site.
 *
 * The wordmark wipes in from the leading edge, holds, then the plate lifts to
 * expose the hero. It runs once per browser session: coming back to the
 * homepage from a product page should not make you sit through it again.
 */
const Loader = () => {
  const [visible, setVisible] = useState(false);

  // The plate cannot be decided during render: the server has no session
  // storage and no motion preference, so rendering it on the first client pass
  // would be a hydration mismatch. It is turned on immediately after mount
  // instead — the same reason `CartContext` reads its storage in an effect.
  /* eslint-disable react-hooks/set-state-in-effect -- see note above */
  useEffect(() => {
    if (!shouldPlayIntro()) return;

    setVisible(true);
    document.body.style.overflow = "hidden";

    const done = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      markIntroSeen();
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    }, 1750);

    return () => {
      window.clearTimeout(done);
      document.body.style.overflow = "";
    };
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-abyss"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="relative w-[min(62vw,32rem)]">
            <motion.div
              initial={{ clipPath: "inset(0 0 0 100%)" }}
              animate={{ clipPath: "inset(0 0 0 0%)" }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <Wordmark className="h-auto w-full" priority />
            </motion.div>

            {/* Hairline closing under the mark as the wipe completes. */}
            <motion.span
              className="absolute -bottom-6 start-0 block h-px bg-line-strong"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
