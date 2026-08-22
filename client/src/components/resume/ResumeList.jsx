import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Eye,
  Download,
  Trash2,
  Loader2,
  FolderOpen,
  CalendarDays,
  HardDrive,
} from "lucide-react";

import resumeService from "../../services/resumeService";

function ResumeList() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadResumes = async () => {
    try {
      const data = await resumeService.getResumes();
      setResumes(data.resumes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await resumeService.deleteResume(id);

      setResumes((prev) =>
        prev.filter((resume) => resume._id !== id)
      );

      alert("Resume deleted successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete resume"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[24px] border border-slate-200 bg-slate-50/70">
        <div className="cp-ai-orb">
          <Loader2
            size={22}
            className="animate-spin text-blue-600"
          />
        </div>

        <p className="mt-5 text-sm font-semibold text-slate-700">
          Loading your resume library
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Preparing your uploaded documents...
        </p>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[280px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 p-8 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-blue-600 shadow-[0_12px_30px_rgba(37,99,235,0.08)] ring-1 ring-blue-100">
          <FolderOpen size={28} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-slate-900">
          No resumes uploaded yet
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          Upload your first resume to start building your CareerPilot document library.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.06,
          },
        },
      }}
      className="space-y-4"
    >
      {resumes.map((resume) => {
        const fileUrl = `http://localhost:5000/${resume.fileUrl.replace(
          /\\/g,
          "/"
        )}`;

        return (
          <motion.div
            key={resume._id}
            variants={{
              hidden: {
                opacity: 0,
                y: 12,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            whileHover={{
              y: -2,
            }}
            className="group relative overflow-hidden rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-100/25 blur-3xl" />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex min-w-0 items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  <FileText size={21} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-slate-900">
                    {resume.fileName}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200/80">
                      <HardDrive size={12} />
                      {(resume.fileSize / 1024).toFixed(2)} KB
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200/80">
                      <CalendarDays size={12} />
                      {new Date(
                        resume.createdAt
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cp-btn cp-btn-secondary px-4 py-2.5 text-sm"
                >
                  <Eye size={16} />
                  View
                </a>

                <a
                  href={fileUrl}
                  download
                  className="cp-btn bg-emerald-600 px-4 py-2.5 text-sm text-white shadow-sm hover:bg-emerald-700"
                >
                  <Download size={16} />
                  Download
                </a>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(resume._id)
                  }
                  className="cp-btn bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 ring-1 ring-rose-100 hover:bg-rose-100"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>

            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default ResumeList;
