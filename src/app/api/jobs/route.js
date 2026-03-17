import { createJob, listJobs } from "@/lib/db";
import { validateJobPayload } from "@/lib/validation";

function success(data, status = 200) {
  return Response.json({ success: true, data }, { status });
}

function failure(message, status = 400, errors) {
  return Response.json({ success: false, message, errors }, { status });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const location = searchParams.get("location") || "";

  const jobs = listJobs({ search: q, category, location });
  return success({ jobs, total: jobs.length });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return failure("Invalid JSON body.");
  }

  const validation = validateJobPayload(body);
  if (!validation.valid) {
    return failure("Validation failed.", 422, validation.errors);
  }

  const job = createJob(validation.data);
  return success({ job }, 201);
}
