import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-7 gap-y-4 pt-1 lg:flex-nowrap">
      <Link className="inline-flex items-center" href="/">
        <Image src="/Logo.png" alt="QuickHire" width={116} height={27} priority />
      </Link>

      <nav
        className="order-3 flex w-full gap-5 text-[14px] font-medium text-[#4f5a73] sm:order-none sm:ml-[38px] sm:mr-auto sm:w-auto sm:gap-[24px]"
        aria-label="Main navigation"
      >
        <Link className="hover:text-[#3f4b6d]" href="/jobs">
          Find Jobs
        </Link>
        <Link className="hover:text-[#3f4b6d]" href="/jobs">
          Browse Companies
        </Link>
      </nav>

      <div className="flex items-center gap-0">
        <Link className="text-[14px] font-bold text-[#4656e8] hover:text-[#3f4b6d]" href="/admin">
          Login
        </Link>
        <span className="mx-4 h-12 w-px bg-[#d8dced]" aria-hidden="true" />
        <Link
          className="rounded-[1px] bg-[#4656e8] px-7 py-[11px] text-[14px] font-bold text-white"
          href="/jobs"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
}
