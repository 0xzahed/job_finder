"use client";

export default function JobFilters({
  filters,
  categories,
  locations,
  onFilterChange,
  onSubmit,
  onReset,
}) {
  function handleChange(event) {
    const { name, value } = event.target;
    onFilterChange(name, value);
  }

  return (
    <form
      className="grid gap-3 rounded-[4px] border border-[#dde3f1] bg-white p-4 shadow-[0_8px_24px_rgba(36,49,89,0.06)] md:grid-cols-[1.1fr_0.8fr_0.8fr_auto_auto]"
      onSubmit={onSubmit}
    >
      <input
        className="h-11 rounded-[3px] border border-[#d8deee] px-3 text-[14px] text-[#273455] outline-none focus:border-[#5b69ee]"
        name="q"
        onChange={handleChange}
        placeholder="Search by title, company, keyword"
        type="text"
        value={filters.q}
      />

      <select
        className="h-11 rounded-[3px] border border-[#d8deee] px-3 text-[14px] text-[#273455] outline-none focus:border-[#5b69ee]"
        name="category"
        onChange={handleChange}
        value={filters.category}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        className="h-11 rounded-[3px] border border-[#d8deee] px-3 text-[14px] text-[#273455] outline-none focus:border-[#5b69ee]"
        name="location"
        onChange={handleChange}
        value={filters.location}
      >
        <option value="">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      <button
        className="h-11 rounded-[3px] bg-[#4d55eb] px-4 text-[14px] font-semibold text-white hover:bg-[#3a45d8]"
        type="submit"
      >
        Search
      </button>

      <button
        className="h-11 rounded-[3px] border border-[#ccd3e8] px-4 text-[14px] font-semibold text-[#4e5b7e] hover:bg-[#f2f4fb]"
        onClick={onReset}
        type="button"
      >
        Reset
      </button>
    </form>
  );
}
