import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyForm from "@/components/jobs/ApplyForm";
import { getJobById } from "@/lib/db";
import { formatJobDate } from "@/lib/formatters";

export default async function JobDetailsPage({ params }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams?.id);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const job = getJobById(id);
  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f5fb] pb-16 pt-8 text-[#233253]">
      <div className="mx-auto w-full max-w-[980px] px-5 md:px-8">
        <Link className="text-[14px] font-semibold text-[#4d55eb] hover:text-[#313fd6]" href="/jobs">
          {"<-"} Back to jobs
        </Link>

        <article className="mt-4 rounded-[4px] border border-[#dbe2ef] bg-white p-6 shadow-[0_12px_34px_rgba(34,50,89,0.07)] md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-[12px] font-semibold text-[#4d55eb]">
              {job.category}
            </span>
            <span className="text-[13px] text-[#7a839c]">Posted {formatJobDate(job.created_at)}</span>
          </div>

          <h1 className="mt-4 text-[clamp(34px,3.5vw,52px)] font-extrabold tracking-[-0.8px] text-[#223258]">
            {job.title}
          </h1>

          <p className="mt-2 text-[16px] text-[#606a85]">
            {job.company} - {job.location}
          </p>

          <div className="mt-6 border-t border-[#e5e9f4] pt-6">
            <h2 className="m-0 text-[22px] font-bold text-[#223258]">Job Description</h2>
            <p className="mt-3 whitespace-pre-wrap text-[15px] leading-[1.8] text-[#66708a]">
              {job.description}
            </p>
          </div>
        </article>

        <ApplyForm jobId={job.id} />
      </div>
    </main>
  );
}
