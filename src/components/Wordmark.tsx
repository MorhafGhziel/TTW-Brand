import Image from "next/image";

/**
 * The ABYSS wordmark, drawn from the brand's own SVG rather than typeset in a
 * webfont. `unoptimized` keeps it a vector all the way to the browser.
 *
 * The file is a cleaned export of `Abyss.svg`: the original's letterforms
 * carried no fill (so they rendered black on black) and it shipped a stray
 * artboard rectangle outside the viewBox. See `scripts/` note in the README if
 * the mark is ever re-exported from Illustrator.
 *
 * Sizing is the caller's job — set a height class and the 4.56:1 ratio does
 * the rest.
 */
const Wordmark = ({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) => (
  <Image
    src="/icons/abyss-wordmark.svg"
    alt="ABYSS"
    width={994}
    height={218}
    unoptimized
    priority={priority}
    className={`w-auto ${className}`}
  />
);

export default Wordmark;
