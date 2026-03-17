export default function SearchBar() {
  return (
    <form
      className="mt-8 grid w-full max-w-[700px] overflow-hidden border-[7px] border-white bg-white shadow-[0_10px_26px_rgba(71,88,138,0.1)] sm:mt-9 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)_auto] lg:w-[700px]"
      action="/jobs"
      method="get"
    >
      <label className="flex min-h-12 items-center gap-3 px-4 md:min-h-[58px] md:px-5" htmlFor="keyword">
        <svg className="h-[18px] w-[18px] shrink-0 fill-[#243554]" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10.5 3a7.5 7.5 0 015.94 12.08l4.24 4.24-1.42 1.42-4.24-4.24A7.5 7.5 0 1110.5 3zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" />
        </svg>
        <span className="relative flex-1">
          <input
            className="w-full border-none bg-transparent pb-[8px] text-[13px] text-[#5a6173] outline-none placeholder:text-[#a7adbf]"
            id="keyword"
            name="q"
            placeholder="Job title or keyword"
          />
          <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#d8dff0]" aria-hidden="true" />
        </span>
      </label>

      <label
        className="relative flex min-h-12 items-center gap-3 border-t border-[#e7eaf2] px-4 md:min-h-[58px] md:border-l md:border-t-0 md:px-5"
        htmlFor="location"
      >
        <svg className="h-[18px] w-[18px] shrink-0 fill-[#243554]" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a7 7 0 017 7c0 4.85-5.18 11.63-6.12 12.83a1.1 1.1 0 01-1.76 0C10.18 20.63 5 13.85 5 9a7 7 0 017-7zm0 2a5 5 0 00-5 5c0 3.14 2.98 7.81 5 10.54 2.02-2.73 5-7.4 5-10.54a5 5 0 00-5-5zm0 2.5A2.5 2.5 0 1112 11a2.5 2.5 0 010-5z" />
        </svg>
        <span className="relative flex-1">
          <input
            className="w-full border-none bg-transparent pb-[8px] pr-7 text-[13px] text-[#4f5873] outline-none placeholder:text-[#a7adbf]"
            id="location"
            name="location"
            placeholder="Florence, Italy"
          />
          <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#d8dff0]" aria-hidden="true" />
        </span>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 fill-[#7e88a2]"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.15l3.71-3.92a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </label>

      <button
        className="min-h-12 w-full cursor-pointer border-none bg-[#4f56ea] px-7 text-[16px] font-bold text-white md:min-h-[58px] md:min-w-[188px] md:px-8"
        type="submit"
      >
        Search my job
      </button>
    </form>
  );
}
