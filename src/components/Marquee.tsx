import { Fragment } from "react";

interface RunProps {
  latin: string;
  arabic: string;
  repeat: number;
}

/** One pass of the sequence. The track renders two, back to back. */
const Run = ({ latin, arabic, repeat }: RunProps) => (
  <div className="flex shrink-0 items-baseline">
    {Array.from({ length: repeat }).map((_, i) => (
      <Fragment key={i}>
        <span className="outline-type px-6 tracking-[0.06em] whitespace-nowrap text-[#3a3a3a]">
          {latin}
        </span>
        <span className="px-4 text-[#2b2b2b]">·</span>
        <span
          dir="rtl"
          className="font-kufi px-6 font-bold whitespace-nowrap text-transparent [-webkit-text-stroke:1px_#333]"
        >
          {arabic}
        </span>
        <span className="px-4 text-[#2b2b2b]">·</span>
      </Fragment>
    ))}
  </div>
);

/**
 * Infinite outline marquee.
 *
 * The latin runs in IntraNet's Outline cut — real outline glyphs, not a
 * stroked fill. Arabic has no outline cut, so it gets a stroke with a
 * transparent fill to match. Both read as hollow at this size.
 *
 * The track holds the sequence twice and slides exactly half its own width,
 * which is what makes the loop seamless.
 */
const Marquee = ({
  latin,
  arabic,
  repeat = 4,
}: {
  latin: string;
  arabic: string;
  repeat?: number;
}) => (
  <div
    dir="ltr"
    aria-hidden="true"
    className="relative flex overflow-hidden border-y border-line py-6 text-[clamp(2.25rem,6vw,4.5rem)] leading-none select-none"
  >
    <div className="animate-marquee flex">
      <Run latin={latin} arabic={arabic} repeat={repeat} />
      <Run latin={latin} arabic={arabic} repeat={repeat} />
    </div>
  </div>
);

export default Marquee;
