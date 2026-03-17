const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateJobPayload(body) {
  const errors = {};

  const title = normalizeText(body?.title);
  const company = normalizeText(body?.company);
  const location = normalizeText(body?.location);
  const category = normalizeText(body?.category);
  const description = normalizeText(body?.description);

  if (!title) errors.title = "Title is required.";
  if (!company) errors.company = "Company is required.";
  if (!location) errors.location = "Location is required.";
  if (!category) errors.category = "Category is required.";
  if (!description) errors.description = "Description is required.";
  if (description && description.length < 20) {
    errors.description = "Description should be at least 20 characters.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: { title, company, location, category, description },
  };
}

export function validateApplicationPayload(body) {
  const errors = {};

  const jobId = Number(body?.job_id);
  const name = normalizeText(body?.name);
  const email = normalizeText(body?.email);
  const resumeLink = normalizeText(body?.resume_link);
  const coverNote = normalizeText(body?.cover_note);

  if (!Number.isInteger(jobId) || jobId <= 0) {
    errors.job_id = "Valid job_id is required.";
  }
  if (!isNonEmptyString(name)) {
    errors.name = "Name is required.";
  }
  if (!isNonEmptyString(email)) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Email format is invalid.";
  }
  if (!isNonEmptyString(resumeLink)) {
    errors.resume_link = "Resume link is required.";
  } else if (!isValidUrl(resumeLink)) {
    errors.resume_link = "Resume link must be a valid URL.";
  }
  if (!isNonEmptyString(coverNote)) {
    errors.cover_note = "Cover note is required.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: { jobId, name, email, resumeLink, coverNote },
  };
}
