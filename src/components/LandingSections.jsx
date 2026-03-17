import Image from "next/image";

function SectionHeading({ title, accent, href }) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <h2 className="m-0 text-[clamp(32px,3vw,46px)] font-extrabold leading-none tracking-[-0.8px] text-[#212f52]">
        {title}
        <span className="text-[#2d9df5]">{accent}</span>
      </h2>
      <a className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#4856e5] hover:text-[#2738d6]" href={href}>
        Show all jobs
        <span aria-hidden="true">{"->"}</span>
      </a>
    </div>
  );
}

const companies = [
  { name: "vodafone", mark: "ring" },
  { name: "intel.", mark: "dot" },
  { name: "TESLA", mark: "plain" },
  { name: "AMD", mark: "chip" },
  { name: "Talkit", mark: "plain" },
];

function CompanyMark({ mark }) {
  if (mark === "ring") {
    return (
      <span className="relative inline-block h-6 w-6 shrink-0">
        <span className="absolute inset-0 rounded-full border-[4px] border-[#b4b8c8]" />
        <span className="absolute left-[7px] top-[7px] h-[8px] w-[8px] rounded-full bg-[#b4b8c8]" />
      </span>
    );
  }

  if (mark === "dot") {
    return <span className="inline-block h-5 w-5 shrink-0 rounded-full bg-[#c6cada]" />;
  }

  if (mark === "chip") {
    return (
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center border-2 border-[#b4b8c8]">
        <span className="block h-2.5 w-2.5 bg-[#c6cada]" />
      </span>
    );
  }

  return null;
}

export function CompanyStrip() {
  return (
    <section className="bg-[#f4f5fb]">
      <div className="mx-auto max-w-[1310px] px-5 pb-10 pt-5 md:px-10 lg:px-[58px]">
        <p className="m-0 text-[13px] text-[#9aa2b7]">Companies we helped grow</p>
        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-6 text-[#b0b5c5] sm:grid-cols-3 md:grid-cols-5">
          {companies.map((company) => (
            <div className="flex items-center gap-2.5 text-[32px] font-semibold tracking-[0.2px] md:text-[37px]" key={company.name}>
              <CompanyMark mark={company.mark} />
              <span>{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryIcon({ type, active }) {
  const color = active ? "#ffffff" : "#4c55ea";

  if (type === "design") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
        <path d="M3 17l4 4 14-14-4-4L3 17z" />
        <path d="M12 4l4 4" />
        <path d="M3 8h5M8 3v5" />
      </svg>
    );
  }

  if (type === "sales") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
        <path d="M5 20V11M11 20V7M17 20V3" />
        <circle cx="5" cy="7" r="2" />
        <path d="M3 7h4" />
      </svg>
    );
  }

  if (type === "marketing") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
        <path d="M3 12l11-5v10L3 12z" />
        <path d="M14 9h4a2 2 0 012 2v2a2 2 0 01-2 2h-4" />
        <path d="M6 14l2 5" />
      </svg>
    );
  }

  if (type === "finance") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <path d="M7 11h3M14 15h4" />
      </svg>
    );
  }

  if (type === "technology") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    );
  }

  if (type === "engineering") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
        <path d="M8 7l-4 5 4 5M16 7l4 5-4 5M10 18l4-12" />
      </svg>
    );
  }

  if (type === "business") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a1 1 0 011-1h6a1 1 0 011 1v2M3 12h18" />
      </svg>
    );
  }

  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
      <circle cx="8" cy="9" r="3" />
      <circle cx="16" cy="9" r="3" />
      <path d="M2 20c0-3.3 2.7-6 6-6M16 14c3.3 0 6 2.7 6 6M8 14h8" />
    </svg>
  );
}

const categories = [
  { title: "Design", jobs: "235 jobs available", type: "design" },
  { title: "Sales", jobs: "756 jobs available", type: "sales" },
  { title: "Marketing", jobs: "140 jobs available", type: "marketing", active: true },
  { title: "Finance", jobs: "325 jobs available", type: "finance" },
  { title: "Technology", jobs: "436 jobs available", type: "technology" },
  { title: "Engineering", jobs: "542 jobs available", type: "engineering" },
  { title: "Business", jobs: "211 jobs available", type: "business" },
  { title: "Human Resource", jobs: "346 jobs available", type: "hr" },
];

export function CategorySection() {
  return (
    <section className="py-12 lg:py-16">
      <SectionHeading title="Explore by " accent="category" href="/jobs" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((item) => (
          <a
            className={`min-h-[154px] border px-6 py-7 transition ${
              item.active
                ? "border-[#4d55eb] bg-[#4d55eb] text-white shadow-[0_20px_40px_rgba(77,85,235,0.28)]"
                : "border-[#e0e5f1] bg-[#f8faff] text-[#27355a] hover:border-[#cfd7ea] hover:bg-white"
            }`}
            href="#"
            key={item.title}
          >
            <CategoryIcon type={item.type} active={item.active} />
            <h3 className="mt-7 text-[23px] font-bold tracking-[-0.3px]">{item.title}</h3>
            <p className={`mt-1.5 text-[14px] ${item.active ? "text-[#dee3ff]" : "text-[#8b93a8]"}`}>{item.jobs}</p>
            <span className={`mt-1.5 inline-flex text-[18px] ${item.active ? "text-white" : "text-[#5563de]"}`}>{"->"}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function PromoSection() {
  return (
    <section className="py-7 lg:py-10">
      <div
        className="relative overflow-hidden bg-[#4b4fe9] px-7 py-9 text-white lg:px-12 lg:py-12"
        style={{ clipPath: "polygon(10% 0,100% 0,100% 77%,89% 100%,0 100%,0 18%)" }}
      >
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(280px,1fr)_minmax(430px,1.2fr)]">
          <div>
            <h3 className="m-0 max-w-[360px] text-[clamp(41px,3.4vw,58px)] font-extrabold leading-[1.06] tracking-[-0.8px]">
              Start posting
              <br />
              jobs today
            </h3>
            <p className="mt-5 text-[15px] text-[#d9ddff]">Start posting jobs for only $10.</p>
            <a
              className="mt-6 inline-flex rounded-[2px] bg-white px-6 py-3 text-[14px] font-bold text-[#4b4fe9] hover:bg-[#eef1ff]"
              href="#"
            >
              Sign Up For Free
            </a>
          </div>
          <Image
            className="mx-auto h-auto w-full max-w-[510px] border border-[#dfe3f4] bg-white"
            src="/3.1 Dashboard Company.png"
            alt="Dashboard preview"
            width={564}
            height={346}
          />
        </div>
      </div>
    </section>
  );
}

const featuredJobs = [
  { title: "Email Marketing", company: "Revolut", location: "Madrid, Spain", type: "Marketing", tag: "Design", logo: "R" },
  { title: "Brand Designer", company: "Dropbox", location: "San Fransisco, US", type: "Design", tag: "Business", logo: "D" },
  { title: "Email Marketing", company: "Pitch", location: "Berlin, Germany", type: "Marketing", tag: "Marketing", logo: "P" },
  { title: "Visual Designer", company: "Blinkist", location: "Granada, Spain", type: "Design", tag: "Design", logo: "B" },
  { title: "Product Designer", company: "ClassPass", location: "Manchester, UK", type: "Marketing", tag: "Design", logo: "C" },
  { title: "Lead Designer", company: "Canva", location: "Ontario, Canada", type: "Design", tag: "Business", logo: "CV" },
  { title: "Brand Strategist", company: "GoDaddy", location: "Marseille, France", type: "Marketing", tag: "Marketing", logo: "G" },
  { title: "Data Analyst", company: "Twitter", location: "San Diego, US", type: "Technology", tag: "Technology", logo: "T" },
];

function JobPill({ text, tone }) {
  const tones = {
    Marketing: "bg-[#fff2dd] text-[#d69f4e]",
    Design: "bg-[#e6f8ef] text-[#3bbf8c]",
    Business: "bg-[#ece8ff] text-[#7157dd]",
    Technology: "bg-[#ffe8e7] text-[#e06a61]",
  };

  return <span className={`rounded-full px-2 py-[3px] text-[10px] font-semibold ${tones[tone] || tones.Design}`}>{text}</span>;
}

function BrandAvatar({ value, index }) {
  const colors = ["bg-[#ebedf5] text-[#20263c]", "bg-[#0f65da] text-white", "bg-black text-white", "bg-[#1cc765] text-white"];
  const palette = colors[index % colors.length];

  return <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold ${palette}`}>{value}</span>;
}

export function FeaturedJobsSection() {
  return (
    <section className="py-8 lg:py-12">
      <SectionHeading title="Featured " accent="jobs" href="/jobs" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredJobs.map((job, index) => (
          <article className="min-h-[238px] border border-[#e2e7f2] bg-[#f9fbff] p-4" key={`${job.title}-${index}`}>
            <div className="flex items-center justify-between">
              <BrandAvatar value={job.logo} index={index} />
              <span className="border border-[#6976ea] px-[8px] py-[2px] text-[11px] font-medium text-[#5766e2]">Full Time</span>
            </div>
            <h3 className="mt-5 text-[17px] font-bold text-[#243459]">{job.title}</h3>
            <p className="mt-2 text-[13px] text-[#606a82]">
              {job.company} - {job.location}
            </p>
            <p className="mt-3 overflow-hidden text-[12px] leading-[1.5] text-[#8f98ad] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
              {job.company} is looking for {job.title.toLowerCase()} to help the team design better user experiences.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <JobPill text={job.type} tone={job.type} />
              <JobPill text={job.tag} tone={job.tag} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const latestJobs = [
  { title: "Social Media Assistant", company: "Nomad", location: "Paris, France", type: "Full-Time", tag: "Marketing", role: "Design", logo: "N", color: "bg-[#63c997]" },
  { title: "Social Media Assistant", company: "Netlify", location: "Paris, France", type: "Full-Time", tag: "Marketing", role: "Design", logo: "N", color: "bg-[#2caec4]" },
  { title: "Brand Designer", company: "Dropbox", location: "San Francisco, USA", type: "Full-Time", tag: "Marketing", role: "Design", logo: "D", color: "bg-[#1e72eb]" },
  { title: "Brand Designer", company: "Maze", location: "San Fransisco, USA", type: "Full-Time", tag: "Marketing", role: "Design", logo: "M", color: "bg-[#1f73ec]" },
  { title: "Interactive Developer", company: "Terraform", location: "Hamburg, Germany", type: "Full-Time", tag: "Marketing", role: "Design", logo: "T", color: "bg-[#35c6de]" },
  { title: "Interactive Developer", company: "Udacity", location: "Hamburg, Germany", type: "Full-Time", tag: "Marketing", role: "Design", logo: "U", color: "bg-[#19a8d8]" },
  { title: "HR Manager", company: "Packer", location: "Lucern, Switzerland", type: "Full-Time", tag: "Marketing", role: "Design", logo: "P", color: "bg-[#ff6f57]" },
  { title: "HR Manager", company: "Webflow", location: "Lucern, Switzerland", type: "Full-Time", tag: "Marketing", role: "Design", logo: "W", color: "bg-[#5d6dff]" },
];

function LatestCard({ job }) {
  return (
    <article className="flex items-center gap-4 border border-[#e3e7f3] bg-white p-4">
      <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[16px] font-bold text-white ${job.color}`}>
        {job.logo}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="m-0 truncate text-[16px] font-bold tracking-[-0.25px] text-[#243459]">{job.title}</h3>
        <p className="mt-[2px] text-[13px] text-[#707a92]">
          {job.company} - {job.location}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <JobPill text={job.type} tone="Design" />
          <JobPill text={job.tag} tone="Marketing" />
          <span className="rounded-full border border-[#6675ef] px-2 py-[3px] text-[10px] font-semibold text-[#6675ef]">{job.role}</span>
        </div>
      </div>
    </article>
  );
}

export function LatestJobsSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f6fd] py-14 lg:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          backgroundImage: "url('/header-bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "1150px auto",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1310px] px-5 md:px-10 lg:px-[58px]">
        <SectionHeading title="Latest " accent="jobs open" href="/jobs" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {latestJobs.map((job, index) => (
            <LatestCard job={job} key={`${job.title}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialDot({ label }) {
  return (
    <a
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#4b546e] text-[11px] font-semibold text-[#c4cbdd] hover:border-[#6a7390] hover:text-white"
      href="#"
    >
      {label}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#1b2236] text-[#c6cede]">
      <div className="mx-auto max-w-[1310px] px-5 py-12 md:px-10 lg:px-[58px]">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.7fr_0.7fr_1fr]">
          <div>
            <Image className="h-auto w-[116px] brightness-[3.2] grayscale" src="/Logo.png" alt="QuickHire" width={152} height={36} />
            <p className="mt-5 max-w-[340px] text-[14px] leading-[1.7] text-[#9ca6bf]">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>
          <div>
            <p className="m-0 text-[16px] font-bold text-white">About</p>
            <ul className="mt-5 space-y-3 text-[14px] text-[#a7b1c8]">
              <li>
                <a href="#">Companies</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Advice</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="m-0 text-[16px] font-bold text-white">Resources</p>
            <ul className="mt-5 space-y-3 text-[14px] text-[#a7b1c8]">
              <li>
                <a href="#">Help Docs</a>
              </li>
              <li>
                <a href="#">Guide</a>
              </li>
              <li>
                <a href="#">Updates</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="m-0 text-[16px] font-bold text-white">Get job notifications</p>
            <p className="mt-5 text-[14px] leading-[1.7] text-[#9ca6bf]">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <form className="mt-6 flex overflow-hidden border border-[#4c546b]">
              <input
                className="w-full border-0 bg-white px-4 py-3 text-[13px] text-[#2a3452] outline-none"
                placeholder="Email Address"
                type="email"
              />
              <button className="bg-[#4d55eb] px-5 text-[13px] font-semibold text-white" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-between gap-6 border-t border-[#343d58] pt-6">
          <p className="m-0 text-[13px] text-[#8e97ae]">2021 @ QuickHire. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <SocialDot label="f" />
            <SocialDot label="x" />
            <SocialDot label="ig" />
            <SocialDot label="in" />
            <SocialDot label="tw" />
          </div>
        </div>
      </div>
    </footer>
  );
}
