import Link from "next/link";

export default function JobNotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center bg-[#f4f5fb] px-5 text-center">
      <div>
        <h1 className="text-[36px] font-extrabold text-[#223258]">Job Not Found</h1>
        <p className="mt-2 text-[15px] text-[#6d7690]">
          The job listing you are looking for does not exist.
        </p>
        <Link
          className="mt-6 inline-flex rounded-[3px] bg-[#4d55eb] px-5 py-2 text-[14px] font-semibold text-white"
          href="/jobs"
        >
          Browse Jobs
        </Link>
      </div>
    </main>
  );
}
