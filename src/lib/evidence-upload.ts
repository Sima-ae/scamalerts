import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import {
  EVIDENCE_ALLOWED_MIME,
  EVIDENCE_MAX_BYTES,
} from "@/lib/evidence-limits";

export {
  EVIDENCE_MAX_FILES,
  EVIDENCE_MAX_BYTES,
  EVIDENCE_ALLOWED_MIME,
} from "@/lib/evidence-limits";

const ALLOWED = new Set<string>(EVIDENCE_ALLOWED_MIME);
const EVIDENCE_ROOT = path.join(process.cwd(), "uploads", "evidence");

export function isAllowedEvidenceFile(file: File): boolean {
  return ALLOWED.has(file.type) && file.size > 0 && file.size <= EVIDENCE_MAX_BYTES;
}

function safeFilename(name: string): string {
  const base = path.basename(name).replace(/[^a-zA-Z0-9._-]+/g, "-");
  const trimmed = base.replace(/^-+|-+$/g, "").slice(0, 120);
  return trimmed || "bestand";
}

export async function saveEvidenceFile(
  reportId: string,
  file: File,
): Promise<{
  filename: string;
  storagePath: string;
  mimeType: string;
  sizeBytes: number;
}> {
  const filename = safeFilename(file.name);
  const dir = path.join(EVIDENCE_ROOT, reportId);
  await mkdir(dir, { recursive: true });
  const storedName = `${randomUUID()}-${filename}`;
  const absolute = path.join(dir, storedName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(absolute, buffer);
  return {
    filename,
    storagePath: path.join("uploads", "evidence", reportId, storedName),
    mimeType: file.type,
    sizeBytes: buffer.length,
  };
}
