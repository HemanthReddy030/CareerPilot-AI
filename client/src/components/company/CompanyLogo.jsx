import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CompanyLogo = ({ company, size = "md", className = "" }) => {
    const [imageState, setImageState] = useState("loading"); // "loading" | "loaded" | "error"
    const [logoUrl, setLogoUrl] = useState("");

    const companyName = company || "Company";

    useEffect(() => {
        if (!company) {
            setImageState("error");
            return;
        }

        setImageState("loading");

        // Clean company name suffix to improve domain matching
        const normalized = company
            .toLowerCase()
            .replace(/\s+(inc|corp|ltd|co|corporation|incorporated|limited|llc)\b/gi, "")
            .trim()
            .replace(/[^a-z0-9]/g, ""); // Keep only alphanumeric to be safe

        setLogoUrl(`https://logo.clearbit.com/${normalized}.com`);
    }, [company]);

    // Tailwind dimensions based on size prop
    const sizeClasses = {
        sm: "w-10 h-10 text-sm rounded-xl",
        md: "w-16 h-16 text-xl rounded-2xl",
        lg: "w-24 h-24 text-3xl rounded-3xl",
        xl: "w-32 h-32 text-4xl rounded-[2rem]",
    };

    const currentSizeClass = sizeClasses[size] || sizeClasses.md;

    // Get initials fallback: Google -> G, IBM -> IBM, Amazon -> A, Microsoft -> M
    const getInitials = (name) => {
        const cleanName = name.trim();
        if (cleanName.length <= 3) {
            return cleanName.toUpperCase();
        }
        return cleanName[0].toUpperCase();
    };

    // Consistent gradient based on company name hash
    const getGradientClass = (name) => {
        const gradients = [
            "from-blue-500 to-indigo-600 text-white",
            "from-purple-500 to-pink-600 text-white",
            "from-emerald-500 to-teal-600 text-white",
            "from-orange-500 to-rose-600 text-white",
            "from-cyan-500 to-blue-600 text-white",
            "from-violet-600 to-fuchsia-800 text-white"
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % gradients.length;
        return gradients[index];
    };

    return (
        <div className={`relative flex items-center justify-center overflow-hidden bg-white border border-slate-100 shadow-sm shrink-0 ${currentSizeClass} ${className}`}>
            <AnimatePresence mode="wait">
                {imageState === "loading" && (
                    <motion.div
                        key="skeleton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-100 animate-pulse"
                    />
                )}
            </AnimatePresence>

            {imageState !== "error" && logoUrl && (
                <img
                    src={logoUrl}
                    alt={`${companyName} logo`}
                    className={`w-full h-full object-contain p-2 transition-all duration-300 ${
                        imageState === "loaded" ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                    onLoad={() => setImageState("loaded")}
                    onError={() => setImageState("error")}
                />
            )}

            {imageState === "error" && (
                <motion.div
                    key="fallback"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`absolute inset-0 flex items-center justify-center font-bold tracking-wider bg-gradient-to-br ${getGradientClass(companyName)}`}
                >
                    {getInitials(companyName)}
                </motion.div>
            )}
        </div>
    );
};

export default CompanyLogo;
