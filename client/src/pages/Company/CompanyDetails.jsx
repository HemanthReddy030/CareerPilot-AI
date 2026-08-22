import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import DashboardLayout from "../../layouts/DashboardLayout";
import CompanyLogo from "../../components/company/CompanyLogo";

import {
    Building2,
    Globe,
    MapPin,
    Users,
    Calendar,
    Briefcase,
    Award,
    Code2,
    Brain,
    CheckCircle2,
    ExternalLink,
    DollarSign,
} from "lucide-react";

import { getCompanyDetails } from "../../services/companyService";

function CompanyDetails() {
    const { company } = useParams();
    const [loading, setLoading] = useState(true);
    const [companyInfo, setCompanyInfo] = useState(null);

    useEffect(() => {
        loadCompany();
    }, [company]);

    const loadCompany = async () => {
        try {
            setLoading(true);
            const data = await getCompanyDetails(company);
            setCompanyInfo(data.data);
        } catch (error) {
            console.error(error);
            alert("Failed to load company information.");
        } finally {
            setLoading(false);
        }
    };

    // Framer Motion Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 15, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="space-y-8 animate-pulse max-w-7xl mx-auto p-4 md:p-6">
                    {/* Hero Skeleton */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
                        <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-8">
                            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left w-full">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-200 rounded-3xl shrink-0" />
                                <div className="flex-1 space-y-4 w-full">
                                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start">
                                        <div className="h-8 w-48 bg-slate-200 rounded" />
                                        <div className="h-6 w-24 bg-slate-200 rounded-full" />
                                    </div>
                                    <div className="h-5 w-72 bg-slate-200 rounded mx-auto md:mx-0" />
                                    <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="h-8 w-24 bg-slate-200 rounded-full" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Facts Grid Skeleton */}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm h-32 flex flex-col justify-between">
                                <div className="w-10 h-10 rounded-xl bg-slate-200" />
                                <div className="space-y-2">
                                    <div className="h-3 w-12 bg-slate-200 rounded" />
                                    <div className="h-4 w-20 bg-slate-200 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 2-Column Grid Skeletons */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm h-64 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-200" />
                                    <div className="h-6 w-36 bg-slate-200 rounded" />
                                </div>
                                <div className="space-y-2.5">
                                    <div className="h-4 w-full bg-slate-200 rounded" />
                                    <div className="h-4 w-11/12 bg-slate-200 rounded" />
                                    <div className="h-4 w-4/5 bg-slate-200 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    if (!companyInfo) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white border border-slate-100 rounded-3xl p-10 shadow-lg max-w-md w-full"
                    >
                        <div className="w-16 h-16 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Building2 size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Company Not Found
                        </h2>
                        <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                            We couldn't retrieve AI details for "{company}". This might be due to a temporary network issue or invalid company name.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
                            <button
                                onClick={loadCompany}
                                className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => window.history.back()}
                                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm"
                            >
                                Go Back
                            </button>
                        </div>
                    </motion.div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8 max-w-7xl mx-auto p-4 md:p-6"
            >
                {/* Hero Section */}
                <motion.div
                    variants={itemVariants}
                    className="relative bg-white border border-slate-100 rounded-3xl shadow-sm p-6 md:p-8 overflow-hidden group hover:shadow-md transition-shadow duration-300"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/5 via-blue-500/0 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />

                    <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-8 relative z-10">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                            <CompanyLogo
                                company={companyInfo.company}
                                size="xl"
                                className="shadow-md rounded-3xl"
                            />
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                                        {companyInfo.company}
                                    </h1>
                                    <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100">
                                        AI Verified Insights
                                    </span>
                                </div>
                                <p className="text-lg md:text-xl text-slate-500 mt-2 font-medium">
                                    {companyInfo.tagline}
                                </p>

                                <div className="flex flex-wrap gap-2.5 mt-5 justify-center md:justify-start">
                                    <span className="bg-blue-50/50 text-blue-700 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-sm font-semibold border border-blue-100/50">
                                        <Building2 size={16} />
                                        {companyInfo.industry}
                                    </span>
                                    <span className="bg-emerald-50/50 text-emerald-700 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-sm font-semibold border border-emerald-100/50">
                                        <MapPin size={16} />
                                        {companyInfo.headquarters}
                                    </span>
                                    <span className="bg-violet-50/50 text-violet-700 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-sm font-semibold border border-violet-100/50">
                                        <Calendar size={16} />
                                        {companyInfo.founded}
                                    </span>
                                    <span className="bg-amber-50/50 text-amber-700 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-sm font-semibold border border-amber-100/50">
                                        <Users size={16} />
                                        {companyInfo.employees}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                            {companyInfo.website && (
                                <a
                                    href={companyInfo.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white px-6 py-3 rounded-xl flex items-center gap-2.5 justify-center font-semibold shadow-sm hover:shadow-indigo-100"
                                >
                                    <Globe size={18} />
                                    Official Website
                                    <ExternalLink size={14} className="opacity-70" />
                                </a>
                            )}
                            {companyInfo.careerPage && (
                                <a
                                    href={companyInfo.careerPage}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all text-slate-700 px-6 py-3 rounded-xl flex items-center gap-2.5 justify-center font-semibold shadow-sm"
                                >
                                    <Briefcase size={18} className="text-slate-500" />
                                    Careers Page
                                    <ExternalLink size={14} className="opacity-70 text-slate-400" />
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Quick Facts Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                    {[
                        {
                            label: "Industry",
                            value: companyInfo.industry,
                            icon: Building2,
                            colorClass: "text-blue-600 bg-blue-50 border-blue-100",
                        },
                        {
                            label: "Founded",
                            value: companyInfo.founded,
                            icon: Calendar,
                            colorClass: "text-violet-600 bg-violet-50 border-violet-100",
                        },
                        {
                            label: "Headquarters",
                            value: companyInfo.headquarters,
                            icon: MapPin,
                            colorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
                        },
                        {
                            label: "Employees",
                            value: companyInfo.employees,
                            icon: Users,
                            colorClass: "text-amber-600 bg-amber-50 border-amber-100",
                        },
                        {
                            label: "Salary Range",
                            value: companyInfo.salaryRange || "N/A",
                            icon: DollarSign,
                            colorClass: "text-sky-600 bg-sky-50 border-sky-100",
                        },
                        {
                            label: "Difficulty",
                            value: companyInfo.interviewDifficulty || "N/A",
                            icon: Award,
                            colorClass: "text-rose-600 bg-rose-50 border-rose-100",
                        },
                    ].map((fact, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${fact.colorClass.split(" ").slice(1).join(" ")} mb-3`}>
                                <fact.icon size={20} className={fact.colorClass.split(" ")[0]} />
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                                    {fact.label}
                                </span>
                                <span className="text-sm font-bold text-slate-700 block mt-1 line-clamp-2">
                                    {fact.value}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* AI Insights Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Culture */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 md:p-8 relative overflow-hidden group hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100">
                                <Brain size={24} className="text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                AI Company Culture
                            </h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                            {companyInfo.culture}
                        </p>
                    </motion.div>

                    {/* Resume Tips */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 md:p-8 relative overflow-hidden group hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-green-50 rounded-xl border border-green-100">
                                <Award size={24} className="text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Resume Tips
                            </h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                            {companyInfo.resumeTips}
                        </p>
                    </motion.div>
                </div>

                {/* Tech Stack & Skills */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Tech Stack */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                                <Code2 size={24} className="text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Tech Stack
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {companyInfo.techStack?.map((tech, index) => (
                                <motion.span
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="bg-slate-50 border border-slate-100/80 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-colors duration-200 cursor-default"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                            {!companyInfo.techStack?.length && (
                                <span className="text-slate-400 text-sm italic">Not specified</span>
                            )}
                        </div>
                    </motion.div>

                    {/* Skills */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                                <CheckCircle2 size={24} className="text-emerald-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Skills Required
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {companyInfo.skillsRequired?.map((skill, index) => (
                                <motion.span
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="bg-slate-50 border border-slate-100/80 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-colors duration-200 cursor-default"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                            {!companyInfo.skillsRequired?.length && (
                                <span className="text-slate-400 text-sm italic">Not specified</span>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Hiring Process */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow duration-300"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100">
                            <Briefcase size={24} className="text-indigo-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Hiring Process Timeline
                        </h2>
                    </div>

                    <div className="relative pl-6 border-l-2 border-slate-100 ml-4 space-y-6">
                        {companyInfo.hiringProcess?.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Circle badge on timeline line */}
                                <div className="absolute -left-[38px] top-1.5 w-6 h-6 rounded-full bg-indigo-600 border-4 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-white z-10">
                                    {index + 1}
                                </div>

                                <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100/80 rounded-2xl p-5 transition-colors duration-200">
                                    <h3 className="font-semibold text-slate-700 text-base leading-relaxed">
                                        {step}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                        {!companyInfo.hiringProcess?.length && (
                            <div className="text-slate-400 text-sm italic pl-2">Not specified</div>
                        )}
                    </div>
                </motion.div>

                {/* Preparation & Reference Info */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Preparation Tips */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100">
                                <Brain size={24} className="text-amber-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Preparation Tips
                            </h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {companyInfo.preparationTips}
                        </p>
                    </motion.div>

                    {/* Quick Facts reference list */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-100">
                                <Globe size={24} className="text-sky-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Quick Facts Reference
                            </h2>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {[
                                { label: "Company Name", value: companyInfo.company },
                                { label: "Industry Sector", value: companyInfo.industry },
                                { label: "Year Founded", value: companyInfo.founded },
                                { label: "Headquarters", value: companyInfo.headquarters },
                                { label: "Employee Count", value: companyInfo.employees },
                                { label: "Interview Difficulty", value: companyInfo.interviewDifficulty },
                                { label: "Salary Range Estimate", value: companyInfo.salaryRange },
                            ].map((item, idx) => (
                                <div key={idx} className="flex justify-between py-3.5 text-sm font-medium">
                                    <span className="text-slate-400">{item.label}</span>
                                    <span className="text-slate-700 text-right">{item.value || "N/A"}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Footer Call to Action */}
                <motion.div
                    variants={itemVariants}
                    className="relative bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 rounded-3xl shadow-md p-8 md:p-10 text-center text-white overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                            Ready to Apply at {companyInfo.company}?
                        </h2>
                        <p className="mt-4 text-sm md:text-base text-indigo-100 opacity-90 leading-relaxed">
                            Get ahead of the competition. Prepare your resume with our AI tips, hone the required skills, and practice typical interview questions before submitting your application.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            {companyInfo.website && (
                                <a
                                    href={companyInfo.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-white text-indigo-700 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all px-6 py-3 rounded-xl font-bold shadow-sm"
                                >
                                    Visit Website
                                </a>
                            )}
                            {companyInfo.careerPage && (
                                <a
                                    href={companyInfo.careerPage}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-indigo-900/40 border border-indigo-400/30 text-white hover:bg-indigo-900/60 hover:scale-105 active:scale-95 transition-all px-6 py-3 rounded-xl font-bold"
                                >
                                    View Careers
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </DashboardLayout>
    );
}

export default CompanyDetails;