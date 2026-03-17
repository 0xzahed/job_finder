"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminJobForm from "@/components/jobs/AdminJobForm";
import AdminJobsTable from "@/components/jobs/AdminJobsTable";

const CATEGORIES = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
];

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  async function loadJobs() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/jobs");
      const payload = await response.json();

      if (!response.ok) {
        setError(payload.message || "Failed to load jobs.");
        return;
      }

      setJobs(payload.data.jobs || []);
    } catch {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  async function handleCreateJob(jobData) {
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      const payload = await response.json();

      if (!response.ok) {
        return {
          ok: false,
          message: payload.message,
          errors: payload.errors,
        };
      }

      await loadJobs();
      return { ok: true };
    } catch {
      return {
        ok: false,
        message: "Network error. Please try again.",
      };
    }
  }

  async function handleDeleteJob(id) {
    const confirmed = window.confirm("Delete this job listing?");
    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const payload = await response.json();
        window.alert(payload.message || "Delete failed.");
        return;
      }

      await loadJobs();
    } catch {
      window.alert("Network error while deleting.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f5fb] pb-16 pt-8 text-[#233253]">
      <div className="mx-auto w-full max-w-[1310px] px-5 md:px-10 lg:px-[58px]">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="m-0 text-[clamp(34px,3.4vw,52px)] font-extrabold tracking-[-0.8px] text-[#223258]">
              Admin <span className="text-[#2d9df5]">Panel</span>
            </h1>
            <p className="mt-2 text-[14px] text-[#6f7893]">
              Create and manage job listings.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link className="text-[14px] font-semibold text-[#4d55eb] hover:text-[#313fd6]" href="/">
              Home
            </Link>
            <Link className="text-[14px] font-semibold text-[#4d55eb] hover:text-[#313fd6]" href="/jobs">
              Browse Jobs
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          <AdminJobForm categories={CATEGORIES} onCreate={handleCreateJob} />

          <section className="grid gap-3">
            <h2 className="m-0 text-[24px] font-bold text-[#223258]">Manage Jobs</h2>
            {loading ? <p className="text-[14px] text-[#6f7893]">Loading jobs...</p> : null}
            {error ? <p className="text-[14px] text-[#d64f4f]">{error}</p> : null}
            {!loading && !error ? (
              <AdminJobsTable deletingId={deletingId} jobs={jobs} onDelete={handleDeleteJob} />
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
