import Reveal from "./Reveal";

/** The statement, split so three words can carry the chrome. */
const STATEMENT: { text: string; chrome?: boolean }[] = [
  { text: "أبيس", chrome: true },
  { text: " مو براند لبس وبس. كل دروب ننزله بكمية " },
  { text: "محدودة", chrome: true },
  { text: "، ينزل مرة وحدة وما يتعاد. اللي " },
  { text: "يلحق", chrome: true },
  { text: " يلحق." },
];

const Manifesto = () => (
  <section id="manifesto" className="scroll-mt-16 bg-surface py-28 md:py-36">
    <div className="mx-auto max-w-[50rem] px-5 md:px-8">
      <Reveal>
        <p className="meta mb-8 text-text-3">قصتنا</p>

        <blockquote className="text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1.45] font-bold">
          {STATEMENT.map((part, i) => (
            <span key={i} className={part.chrome ? "text-chrome" : undefined}>
              {part.text}
            </span>
          ))}
        </blockquote>

        <p className="prose-ar mt-10 text-[0.9375rem] text-text-2">
          نصمّم في الرياض ونطبع كمية وحدة بس. أي قطعة تخلص ما نعيدها — مو عشان
          نسوي هايب، بس عشان الخامة اللي نشتغل عليها ما تنزل عن مستواها لو
          طبعناها بالجملة.
        </p>
      </Reveal>
    </div>
  </section>
);

export default Manifesto;
