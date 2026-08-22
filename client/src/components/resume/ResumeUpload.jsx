import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import resumeService from "../../services/resumeService";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    try {
      setLoading(true);

      const data = await resumeService.uploadResume(file);

      alert(data.message);

      setFile(null);
    } catch (error) {
      alert(
        error.response?.data?.message || "Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <motion.label
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="group relative block cursor-pointer overflow-hidden rounded-[24px] border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50/60 p-7 text-center transition-all duration-300 hover:border-blue-300 hover:shadow-[0_16px_40px_rgba(37,99,235,0.08)]"
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="sr-only"
        />

        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-blue-600 shadow-[0_12px_30px_rgba(37,99,235,0.1)] ring-1 ring-blue-100 transition-transform duration-300 group-hover:scale-105">
          <UploadCloud size={28} />
        </div>

        <h3 className="relative mt-5 text-lg font-bold text-slate-900">
          Choose your resume
        </h3>

        <p className="relative mt-2 text-sm leading-6 text-slate-500">
          Upload a PDF, DOC, or DOCX file.
        </p>

        <div className="relative mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm">
          <FileText size={14} />
          PDF • DOC • DOCX
        </div>
      </motion.label>

      {file && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-[18px] border border-emerald-100 bg-emerald-50/70 px-4 py-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-emerald-600 ring-1 ring-emerald-100">
            <CheckCircle2 size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              {file.name}
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              {(file.size / 1024).toFixed(2)} KB selected
            </p>
          </div>
        </motion.div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="cp-btn cp-btn-primary w-full px-5 py-3.5"
      >
        {loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Uploading Resume...
          </>
        ) : (
          <>
            <UploadCloud size={18} />
            Upload Resume
          </>
        )}
      </button>
    </div>
  );
}

export default ResumeUpload;