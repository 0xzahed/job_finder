import { deleteJobById, getJobById } from "@/lib/db";

function success(data, status = 200) {
  return Response.json({ success: true, data }, { status });
}

function failure(message, status = 400) {
  return Response.json({ success: false, message }, { status });
}

function parseId(rawId) {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}

export async function GET(_request, context) {
  const params = await context.params;
  const id = parseId(params?.id);

  if (!id) {
    return failure("Invalid job id.", 400);
  }

  const job = getJobById(id);
  if (!job) {
    return failure("Job not found.", 404);
  }

  return success({ job });
}

export async function DELETE(_request, context) {
  const params = await context.params;
  const id = parseId(params?.id);

  if (!id) {
    return failure("Invalid job id.", 400);
  }

  const removed = deleteJobById(id);
  if (!removed) {
    return failure("Job not found.", 404);
  }

  return success({ deleted: true });
}
