"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LookbookShot } from "@/lib/types";

/**
 * Asymmetric triptych: one tall frame at the start of the line, two stacked
 * beside it, separated by the same 1px the product grid uses.
 *
 * Each frame drifts at its own rate as the section passes — no more than 30px,
 * which is enough to separate the planes and not enough to notice as an effect.
 * The images sit at 1.12 scale so the drift never exposes an edge.
 */
const Lookbook = ({ shots }: { shots: LookbookShot[] }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const frames = gsap.utils.toArray<HTMLElement>("[data-parallax]", section);

      frames.forEach((frame) => {
        const distance = Number(frame.dataset.parallax ?? 0);
        gsap.fromTo(
          frame,
          { y: -distance, scale: 1.12 },
          {
            y: distance,
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  const [lead, ...rest] = shots;

  return (
    <section
      id="lookbook"
      ref={sectionRef}
      className="scroll-mt-16 bg-abyss py-20 md:py-28"
    >
      <div className="mx-auto max-w-[var(--max)] px-5 md:px-8">
        <div className="grid gap-px bg-line md:grid-cols-[3fr_2fr]">
          {/* Lead frame, with the title set into it */}
          <figure className="relative aspect-4/5 overflow-hidden bg-elevated md:aspect-auto md:min-h-[38rem]">
            <div data-parallax="18" className="absolute inset-0">
              <Image
                src={lead.src}
                alt={lead.alt}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="grade-editorial object-cover"
              />
            </div>

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.85)_0%,rgba(10,10,10,0.1)_55%)]"
            />

            <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-9">
              <p className="meta mb-3 text-text-2">لوك بوك</p>
              <h2 className="h-section max-w-[12ch]">
                صوّرناها بالليل
              </h2>
              <p className="prose-ar mt-4 max-w-[38ch] text-[0.9375rem] text-text-2">
                في مواقف الرياض بعد نص الليل. فلاش واحد وبس — لا إضاءة
                استوديو ولا تعديل ألوان.
              </p>
            </figcaption>
          </figure>

          {/* Two stacked frames */}
          <div className="grid gap-px bg-line">
            {rest.map((shot, i) => (
              <figure
                key={shot.src}
                className="relative aspect-4/3 overflow-hidden bg-elevated md:aspect-auto"
              >
                <div
                  data-parallax={i === 0 ? "-24" : "28"}
                  className="absolute inset-0"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 36vw"
                    className="grade-editorial object-cover"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lookbook;
