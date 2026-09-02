import Reveal from "./Reveal";

/** The statement, split so three words can carry the chrome. */
const STATEMENT: { text: string; chrome?: boolean }[] = [
  { text: "أبيس", chrome: true },
  { text: " ليست مجرد ملابس. إنها حالة. " },
  { text: "عمق", chrome: true },
  { text: " لا نهاية له في عالم سطحي. نصنع للذين يجرؤون على الظهور بشكل " },
  { text: "مختلف", chrome: true },
  { text: "." },
];

const Manifesto = () => (
  <section id="manifesto" className="scroll-mt-16 bg-surface py-28 md:py-36">
    <div className="mx-auto max-w-[50rem] px-5 md:px-8">
      <Reveal>
        <p className="meta mb-8 text-text-3">رسالتنا</p>

        <blockquote className="font-kufi text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1.45] font-bold">
          {STATEMENT.map((part, i) => (
            <span key={i} className={part.chrome ? "text-chrome" : undefined}>
              {part.text}
            </span>
          ))}
        </blockquote>

        <p className="prose-ar mt-10 text-[0.9375rem] text-text-2">
          نصمّم في الرياض وننتج بكميات محدودة. كل إصدار يُطبع مرة واحدة، وما ينفد
          لا يعود. هذه ليست ندرة مصطنعة — إنها الطريقة الوحيدة للحفاظ على مستوى
          الخامة الذي نريده.
        </p>
      </Reveal>
    </div>
  </section>
);

export default Manifesto;
