"use client";

import { useState } from "react";

const INITIAL_JOB = {
  title: "",
  company: "",
  location: "",
  category: "",
  description: "",
};

export default function AdminJobForm({ categories, onCreate }) {
  const [form, setForm] = useState(INITIAL_JOB);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "idle", text: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setErrors({});
    setMessage({ type: "idle", text: "" });

    const result = await onCreate(form);

    if (result.ok) {
      setForm(INITIAL_JOB);
      setMessage({ type: "success", text: "Job created successfully." });
    } else {
      setErrors(result.errors || {});
      setMessage({
        type: "error",
        text: result.message || "Could not create job.",
      });
    }

    setSubmitting(false);
  }

  return (
    <form
      className="grid gap-4 rounded-[4px] border border-[#dbe2ef] bg-white p-5 shadow-[0_10px_30px_rgba(33,48,88,0.06)]"
      onSubmit={handleSubmit}
    >
      <h2 className="m-0 text-[24px] font-bold text-[#223258]">Add New Job</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-[13px] text-[#5f6883]">
          Job Title
          <input
            className="h-11 rounded-[3px] border border-[#d6deee] px-3 text-[14px] outline-none focus:border-[#5d69ef]"
            name="title"
            onChange={handleChange}
            placeholder="e.g. Product Designer"
            type="text"
            value={form.title}
          />
          {errors.title ? <span className="text-[12px] text-[#d64f4f]">{errors.title}</span> : null}
        </label>

        <label className="grid gap-1 text-[13px] text-[#5f6883]">
          Company
          <input
            className="h-11 rounded-[3px] border border-[#d6deee] px-3 text-[14px] outline-none focus:border-[#5d69ef]"
            name="company"
            onChange={handleChange}
            placeholder="Company name"
            type="text"
            value={form.company}
          />
          {errors.company ? <span className="text-[12px] text-[#d64f4f]">{errors.company}</span> : null}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-[13px] text-[#5f6883]">
          Location
          <input
            className="h-11 rounded-[3px] border border-[#d6deee] px-3 text-[14px] outline-none focus:border-[#5d69ef]"
            name="location"
            onChange={handleChange}
            placeholder="City, Country"
            type="text"
            value={form.location}
          />
          {errors.location ? <span className="text-[12px] text-[#d64f4f]">{errors.location}</span> : null}
        </label>

        <label className="grid gap-1 text-[13px] text-[#5f6883]">
          Category
          <select
            className="h-11 rounded-[3px] border border-[#d6deee] px-3 text-[14px] outline-none focus:border-[#5d69ef]"
            name="category"
            onChange={handleChange}
            value={form.category}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? <span className="text-[12px] text-[#d64f4f]">{errors.category}</span> : null}
        </label>
      </div>

      <label className="grid gap-1 text-[13px] text-[#5f6883]">
        Description
        <textarea
          className="min-h-32 rounded-[3px] border border-[#d6deee] px-3 py-2 text-[14px] outline-none focus:border-[#5d69ef]"
          name="description"
          onChange={handleChange}
          placeholder="Write the full job description"
          value={form.description}
        />
        {errors.description ? <span className="text-[12px] text-[#d64f4f]">{errors.description}</span> : null}
      </label>

      <button
        className="h-11 w-fit rounded-[3px] bg-[#4d55eb] px-6 text-[14px] font-semibold text-white hover:bg-[#3c46d8] disabled:cursor-not-allowed disabled:opacity-70"
        disabled={submitting}
        type="submit"
      >
        {submitting ? "Creating..." : "Create Job"}
      </button>

      {message.type === "success" ? (
        <p className="m-0 text-[13px] text-[#1c9b67]">{message.text}</p>
      ) : null}
      {message.type === "error" ? (
        <p className="m-0 text-[13px] text-[#d64f4f]">{message.text}</p>
      ) : null}
    </form>
  );
}
