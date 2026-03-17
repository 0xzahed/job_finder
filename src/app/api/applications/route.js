import { createApplication, getJobById } from "@/lib/db";
import { validateApplicationPayload } from "@/lib/validation";

function success(data, status = 200) {
  return Response.json({ success: true, data }, { status });
}

function failure(message, status = 400, errors) {
  return Response.json({ success: false, message, errors }, { status });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return failure("Invalid JSON body.");
  }

  const validation = validateApplicationPayload(body);
  if (!validation.valid) {
    return failure("Validation failed.", 422, validation.errors);
  }

  const job = getJobById(validation.data.jobId);
  if (!job) {
    return failure("Job not found.", 404);
  }

  const application = createApplication(validation.data);
  return success({ application }, 201);
}
