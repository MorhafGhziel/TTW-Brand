import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[var(--max)] flex-col items-start justify-center px-5 md:px-8">
      <p className="data mb-6 tracking-[0.24em] text-chrome">404</p>
      <h1 className="h-section mb-4 max-w-[16ch]">ما لقينا هالصفحة</h1>
      <p className="mb-10 max-w-[38ch] text-[0.9375rem] text-text-2">
        يمكن الرابط تغيّر، أو القطعة خلصت. ارجع للمتجر وشوف الدروب الجديد.
      </p>
      <Link href="/" className="btn-solid text-[0.9375rem]">
        ارجع للمتجر
      </Link>
    </div>
  );
}
