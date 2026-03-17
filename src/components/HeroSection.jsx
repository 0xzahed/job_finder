import Image from "next/image";
import SearchBar from "./SearchBar";

export default function HeroSection() {
  return (
    <section className="relative mt-4 grid min-h-[500px] grid-cols-1 items-center gap-8 overflow-hidden lg:mt-5 lg:min-h-[540px] lg:grid-cols-[minmax(420px,1fr)_minmax(420px,1fr)] lg:gap-0">
      <div className="relative z-10 pb-6 pt-2 lg:pb-10 lg:pt-5">
        <h1 className="m-0 max-w-[520px] text-[clamp(46px,5.25vw,74px)] font-extrabold leading-[0.98] tracking-[-1.3px] text-[#223258]">
          Discover
          <br />
          more than
          <br />
          <span className="relative inline-block text-[#2d9df5]">
            5000+ Jobs
            <span
              className="absolute bottom-[-16px] left-[2px] right-[-14px] h-[11px] bg-[length:100%_100%] bg-no-repeat"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 460 30' fill='none'%3E%3Cpath d='M5 15c79-9 144 7 239 3 91-4 151-13 216-16' stroke='%232d9df5' stroke-width='7' stroke-linecap='round'/%3E%3Cpath d='M9 24c102-9 237 6 400-4 14 0 30-2 50-4' stroke='%232d9df5' stroke-width='5' stroke-linecap='round' opacity='.95'/%3E%3C/svg%3E\")",
              }}
            />
          </span>
        </h1>

        <p className="mt-7 max-w-[520px] text-[clamp(14px,1.15vw,16px)] leading-[1.5] text-[#7f879d] lg:mt-8">
          Great platform for the job seeker that searching for
          <br />
          new career heights and passionate about startups.
        </p>

        <SearchBar />

        <p className="mt-3 text-[12px] leading-[1.4] text-[#717c95]">
          Popular : <span className="font-medium text-[#525b73]">UI Designer, UX Researcher, Android, Admin</span>
        </p>
      </div>

      <div className="relative flex min-h-[300px] items-end justify-center self-stretch lg:min-h-[520px] lg:justify-end" aria-hidden="true">
        <Image
          className="pointer-events-none absolute inset-0 h-full w-full object-contain object-center lg:translate-x-5 lg:object-right"
          src="/header-bg.png"
          alt=""
          width={997}
          height={794}
        />
        <Image
          className="relative z-10 h-auto w-full max-w-[420px] object-contain lg:max-w-[470px] lg:translate-x-3 lg:translate-y-2"
          src="/header-image.png"
          alt=""
          width={501}
          height={707}
          priority
        />
      </div>
      <span
        className="pointer-events-none absolute bottom-[-78px] right-[-120px] hidden h-[170px] w-[430px] rotate-[-28deg] bg-white lg:block"
        aria-hidden="true"
      />
    </section>
  );
}
