import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[var(--max)] flex-col items-start justify-center px-5 md:px-8">
      <p className="data mb-6 tracking-[0.24em] text-chrome">404</p>
      <h1 className="h-section mb-4 max-w-[16ch]">الصفحة التي تبحث عنها غير موجودة</h1>
      <p className="mb-10 max-w-[38ch] text-[0.9375rem] text-text-2">
        ربما تغيّر الرابط أو أُزيلت الصفحة. عد إلى المتجر أو تصفّح التشكيلة
        الجديدة.
      </p>
      <Link href="/" className="btn-solid text-[0.9375rem]">
        العودة إلى المتجر
      </Link>
    </div>
  );
}
