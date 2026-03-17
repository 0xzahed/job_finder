"use client";

import { formatJobDate } from "@/lib/formatters";

export default function AdminJobsTable({ jobs, deletingId, onDelete }) {
  if (!jobs.length) {
    return (
      <div className="rounded-[4px] border border-[#dbe2ef] bg-white p-5 text-[14px] text-[#7a849d]">
        No jobs found.
      </div>
    );
  }

  return (
    <div className="overflow-auto rounded-[4px] border border-[#dbe2ef] bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead className="bg-[#f5f7fd]">
          <tr>
            <th className="px-4 py-3 text-[12px] uppercase tracking-[0.4px] text-[#6d7690]">Title</th>
            <th className="px-4 py-3 text-[12px] uppercase tracking-[0.4px] text-[#6d7690]">Company</th>
            <th className="px-4 py-3 text-[12px] uppercase tracking-[0.4px] text-[#6d7690]">Category</th>
            <th className="px-4 py-3 text-[12px] uppercase tracking-[0.4px] text-[#6d7690]">Created</th>
            <th className="px-4 py-3 text-[12px] uppercase tracking-[0.4px] text-[#6d7690]">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr className="border-t border-[#ebeff7]" key={job.id}>
              <td className="px-4 py-3 text-[14px] font-semibold text-[#223258]">{job.title}</td>
              <td className="px-4 py-3 text-[14px] text-[#566180]">{job.company}</td>
              <td className="px-4 py-3 text-[14px] text-[#566180]">{job.category}</td>
              <td className="px-4 py-3 text-[14px] text-[#566180]">{formatJobDate(job.created_at)}</td>
              <td className="px-4 py-3">
                <button
                  className="rounded-[3px] border border-[#e2b6b6] px-3 py-1.5 text-[13px] font-semibold text-[#cd4f4f] hover:bg-[#fff4f4] disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={deletingId === job.id}
                  onClick={() => onDelete(job.id)}
                  type="button"
                >
                  {deletingId === job.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
