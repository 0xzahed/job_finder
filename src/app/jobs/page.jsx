"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";

const INITIAL_FILTERS = {
  q: "",
  category: "",
  location: "",
};

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = useMemo(
    () => [...new Set(jobs.map((job) => job.category).filter(Boolean))].sort(),
    [jobs],
  );

  const locations = useMemo(
    () => [...new Set(jobs.map((job) => job.location).filter(Boolean))].sort(),
    [jobs],
  );

  const fetchJobs = useCallback(async (activeFilters) => {
    setLoading(true);
    setError("");

    const params = new URLSearchParams();
    if (activeFilters.q) params.set("q", activeFilters.q);
    if (activeFilters.category) params.set("category", activeFilters.category);
    if (activeFilters.location) params.set("location", activeFilters.location);

    try {
      const response = await fetch(`/api/jobs?${params.toString()}`);
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
  }, []);

  useEffect(() => {
    fetchJobs(INITIAL_FILTERS);
  }, [fetchJobs]);

  function handleFilterChange(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    fetchJobs(filters);
  }

  function handleReset() {
    setFilters(INITIAL_FILTERS);
    fetchJobs(INITIAL_FILTERS);
  }

  return (
    <main className="min-h-screen bg-[#f4f5fb] pb-16 pt-8 text-[#233253]">
      <div className="mx-auto w-full max-w-[1310px] px-5 md:px-10 lg:px-[58px]">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="m-0 text-[clamp(34px,3.5vw,54px)] font-extrabold tracking-[-0.8px] text-[#223258]">
              Browse <span className="text-[#2d9df5]">Jobs</span>
            </h1>
            <p className="mt-2 text-[14px] text-[#6f7893]">
              Find your next opportunity from our latest listings.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link className="text-[14px] font-semibold text-[#4d55eb] hover:text-[#313fd6]" href="/">
              Back to Home
            </Link>
            <Link
              className="rounded-[3px] bg-[#4d55eb] px-4 py-2 text-[14px] font-semibold text-white hover:bg-[#3945d8]"
              href="/admin"
            >
              Admin Panel
            </Link>
          </div>
        </div>

        <JobFilters
          categories={categories}
          filters={filters}
          locations={locations}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          onSubmit={handleSearchSubmit}
        />

        {loading ? <p className="mt-6 text-[14px] text-[#6f7893]">Loading jobs...</p> : null}
        {error ? <p className="mt-6 text-[14px] text-[#d64f4f]">{error}</p> : null}

        {!loading && !error ? (
          <>
            <p className="mb-4 mt-6 text-[14px] text-[#6f7893]">{jobs.length} jobs found</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job) => (
                <JobCard job={job} key={job.id} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}
