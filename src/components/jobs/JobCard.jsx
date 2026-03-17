import Link from "next/link";
import { excerpt, formatJobDate } from "@/lib/formatters";

export default function JobCard({ job }) {
  return (
    <article className="rounded-[4px] border border-[#dde3f1] bg-white p-5 shadow-[0_10px_30px_rgba(37,51,90,0.06)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-[#edf1ff] px-3 py-1 text-[12px] font-semibold text-[#4a59df]">
          {job.category}
        </span>
        <span className="text-[12px] text-[#7f889f]">{formatJobDate(job.created_at)}</span>
      </div>

      <h3 className="mt-4 text-[22px] font-bold leading-[1.2] text-[#223258]">
        <Link className="hover:text-[#4455e8]" href={`/jobs/${job.id}`}>
          {job.title}
        </Link>
      </h3>

      <p className="mt-2 text-[14px] text-[#69728a]">
        {job.company} - {job.location}
      </p>

      <p className="mt-4 text-[14px] leading-[1.6] text-[#7a839c]">
        {excerpt(job.description, 150)}
      </p>

      <div className="mt-5">
        <Link
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#4b57ea] hover:text-[#2f3fd9]"
          href={`/jobs/${job.id}`}
        >
          View Details
          <span aria-hidden="true">{"->"}</span>
        </Link>
      </div>
    </article>
  );
}
