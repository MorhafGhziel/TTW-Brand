"use client";

import { useState, type FormEvent } from "react";
import { isValidEmail } from "@/lib/orders";

/**
 * Drop notifications.
 *
 * There is no list backend yet, so submitting resolves locally. When the
 * endpoint exists, POST here and keep the states as they are.
 */
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("اكتب إيميل صحيح");
      return;
    }

    setError(null);
    setDone(true);
  };

  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-[var(--max)] gap-8 px-5 py-16 md:grid-cols-[1fr_auto] md:items-end md:px-8 md:py-20">
        <div>
          <h2 className="h-sub max-w-[22ch]">
            خلك أول من يدري بالدروب الجاي
          </h2>
          <p className="mt-3 max-w-[42ch] text-[0.9375rem] text-text-2">
            رسالة وحدة قبل كل دروب، ووحدة إذا رجع شي نفد. ولا شي ثاني.
          </p>
        </div>

        {done ? (
          <p
            role="status"
            className="text-[0.9375rem] text-text md:w-[24rem] md:justify-self-end"
          >
            تم. بنراسلك قبل ما ينزل الدروب الجاي.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="md:w-[24rem] md:justify-self-end"
          >
            <div className="flex items-center gap-4 border-b border-white/20 focus-within:border-text">
              <label htmlFor="newsletter-email" className="sr-only">
                الإيميل
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="إيميلك"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "newsletter-error" : undefined}
                className="w-full bg-transparent py-3 text-[0.9375rem] text-text outline-none placeholder:text-text-3"
              />
              <button
                type="submit"
                className="shrink-0 py-3 text-[0.875rem] font-bold text-text transition-colors duration-300 hover:text-chrome"
              >
                سجّلني
              </button>
            </div>

            {error && (
              <p id="newsletter-error" className="mt-2 text-[0.8125rem] text-error">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
