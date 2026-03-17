"use client";

import { useState } from "react";

const INITIAL_VALUES = {
  name: "",
  email: "",
  resume_link: "",
  cover_note: "",
};

export default function ApplyForm({ jobId }) {
  const [form, setForm] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });
    setErrors({});

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          job_id: jobId,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setErrors(payload.errors || {});
        setStatus({
          type: "error",
          message: payload.message || "Failed to submit application.",
        });
        return;
      }

      setForm(INITIAL_VALUES);
      setStatus({
        type: "success",
        message: "Application submitted successfully.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      className="mt-6 grid gap-4 rounded-[4px] border border-[#dbe1ef] bg-white p-5 shadow-[0_10px_30px_rgba(35,50,89,0.06)]"
      onSubmit={handleSubmit}
    >
      <h2 className="m-0 text-[24px] font-bold text-[#223258]">Apply Now</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-[13px] font-medium text-[#5e6883]">
          Name
          <input
            className="h-11 rounded-[3px] border border-[#d7deef] px-3 text-[14px] text-[#25355b] outline-none focus:border-[#5c69ef]"
            name="name"
            onChange={handleChange}
            placeholder="Your full name"
            type="text"
            value={form.name}
          />
          {errors.name ? <span className="text-[12px] text-[#d64f4f]">{errors.name}</span> : null}
        </label>

        <label className="grid gap-1 text-[13px] font-medium text-[#5e6883]">
          Email
          <input
            className="h-11 rounded-[3px] border border-[#d7deef] px-3 text-[14px] text-[#25355b] outline-none focus:border-[#5c69ef]"
            name="email"
            onChange={handleChange}
            placeholder="your@email.com"
            type="email"
            value={form.email}
          />
          {errors.email ? <span className="text-[12px] text-[#d64f4f]">{errors.email}</span> : null}
        </label>
      </div>

      <label className="grid gap-1 text-[13px] font-medium text-[#5e6883]">
        Resume Link (URL)
        <input
          className="h-11 rounded-[3px] border border-[#d7deef] px-3 text-[14px] text-[#25355b] outline-none focus:border-[#5c69ef]"
          name="resume_link"
          onChange={handleChange}
          placeholder="https://..."
          type="url"
          value={form.resume_link}
        />
        {errors.resume_link ? (
          <span className="text-[12px] text-[#d64f4f]">{errors.resume_link}</span>
        ) : null}
      </label>

      <label className="grid gap-1 text-[13px] font-medium text-[#5e6883]">
        Cover Note
        <textarea
          className="min-h-32 rounded-[3px] border border-[#d7deef] px-3 py-2 text-[14px] text-[#25355b] outline-none focus:border-[#5c69ef]"
          name="cover_note"
          onChange={handleChange}
          placeholder="Why are you a good fit for this role?"
          value={form.cover_note}
        />
        {errors.cover_note ? (
          <span className="text-[12px] text-[#d64f4f]">{errors.cover_note}</span>
        ) : null}
      </label>

      <button
        className="h-11 w-fit rounded-[3px] bg-[#4d55eb] px-6 text-[14px] font-semibold text-white hover:bg-[#3a45d8] disabled:cursor-not-allowed disabled:opacity-70"
        disabled={submitting}
        type="submit"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>

      {status.type === "success" ? (
        <p className="m-0 text-[13px] text-[#1c9b67]">{status.message}</p>
      ) : null}
      {status.type === "error" ? (
        <p className="m-0 text-[13px] text-[#d64f4f]">{status.message}</p>
      ) : null}
    </form>
  );
}
