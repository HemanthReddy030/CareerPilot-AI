import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  UserCircle,
  Search,
  Sparkles,
  X,
  Briefcase,
  Building2,
  FileText,
  Mail,
  Calendar,
  Settings,
  ChartBar,
  User,
  LogOut,
  ChevronRight,
  CheckCheck,
  Command,
} from "lucide-react";

import jobService from "../../services/jobService";
import { getJobEmails } from "../../services/gmailService";

function Navbar({ collapsed }) {
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [jobs, setJobs] = useState([]);
  const [emails, setEmails] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [userData, setUserData] = useState(null);

  const [readIds, setReadIds] = useState(() => {
    try {
      const read = localStorage.getItem("read_notification_ids");
      return read ? JSON.parse(read) : [];
    } catch {
      return [];
    }
  });

  const searchContainerRef = useRef(null);
  const bellRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse stored user", err);
      }
    }

    const fetchData = async () => {
      try {
        const jobsData = await jobService.getJobs();

        if (jobsData && jobsData.jobs) {
          setJobs(jobsData.jobs);
        }
      } catch (err) {
        console.error(
          "Failed to load jobs for global search:",
          err
        );
      }

      try {
        const emailsData = await getJobEmails();

        if (emailsData && emailsData.emails) {
          setEmails(emailsData.emails);
        }
      } catch (err) {
        console.warn(
          "Gmail not connected or error fetching emails:",
          err
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const compiled = [];

    jobs.forEach((job) => {
      const date = new Date(
        job.updatedAt ||
        job.appliedDate ||
        Date.now()
      );

      if (job.status === "Interview") {
        compiled.push({
          id: `job-interview-${job._id}`,
          title: "Interview Scheduled",
          message: `Your interview at ${job.company} for ${job.position} has been scheduled.`,
          date,
          type: "interview",
          path: "/calendar",
        });
      } else if (job.status === "Offer") {
        compiled.push({
          id: `job-offer-${job._id}`,
          title: "Offer Received",
          message: `Congratulations! You received an offer from ${job.company} for ${job.position}.`,
          date,
          type: "offer",
          path: "/jobs",
        });
      } else if (job.status === "Rejected") {
        compiled.push({
          id: `job-rejected-${job._id}`,
          title: "Application Updated",
          message: `Your application at ${job.company} for ${job.position} status changed to Rejected.`,
          date,
          type: "rejection",
          path: "/jobs",
        });
      }
    });

    emails.forEach((email) => {
      const date = new Date(
        email.date || Date.now()
      );

      compiled.push({
        id: `email-${email.id || email._id}`,
        title: "New Job Email",
        message: `Invite from ${email.from?.split("<")[0]?.trim() ||
          "Recruiter"
          } - "${email.subject}"`,
        date,
        type: "email",
        path: "/gmail",
      });
    });

    compiled.sort((a, b) => b.date - a.date);

    setNotifications(compiled);
  }, [jobs, emails]);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const lowerQuery =
      query.toLowerCase().trim();

    const matchedJobs = jobs
      .filter(
        (job) =>
          job.company
            ?.toLowerCase()
            .includes(lowerQuery) ||
          job.position
            ?.toLowerCase()
            .includes(lowerQuery) ||
          job.location
            ?.toLowerCase()
            .includes(lowerQuery)
      )
      .map((job) => ({
        id: `job-${job._id}`,
        title: `${job.company} - ${job.position}`,
        subtitle:
          job.location ||
          "No location listed",
        type: "job",
        path: "/jobs",
        icon: (
          <Briefcase
            size={17}
            className="text-blue-600"
          />
        ),
      }));

    const uniqueCompanies = Array.from(
      new Set(
        jobs.map((job) => job.company)
      )
    ).filter(Boolean);

    const matchedCompanies =
      uniqueCompanies
        .filter((company) =>
          company
            .toLowerCase()
            .includes(lowerQuery)
        )
        .map((company) => ({
          id: `company-${company}`,
          title: company,
          subtitle: "Company Insights",
          type: "company",
          path: `/company/${encodeURIComponent(
            company
          )}`,
          icon: (
            <Building2
              size={17}
              className="text-indigo-600"
            />
          ),
        }));

    const pages = [
      {
        name: "Dashboard",
        path: "/dashboard",
        tags: [
          "home",
          "stats",
          "main",
        ],
      },
      {
        name: "Jobs",
        path: "/jobs",
        tags: [
          "applications",
          "apply",
          "list",
        ],
      },
      {
        name: "Resume",
        path: "/resume",
        tags: [
          "cv",
          "upload",
          "feedback",
        ],
      },
      {
        name: "AI Interview",
        path: "/ai-interview",
        tags: [
          "practice",
          "questions",
          "evaluate",
          "voice",
        ],
      },
      {
        name: "Calendar",
        path: "/calendar",
        tags: [
          "schedule",
          "interviews",
          "events",
        ],
      },
      {
        name: "Gmail",
        path: "/gmail",
        tags: [
          "emails",
          "inbox",
        ],
      },
      {
        name: "Analytics",
        path: "/analytics",
        tags: [
          "charts",
          "stats",
          "progress",
        ],
      },
      {
        name: "Settings",
        path: "/settings",
        tags: [
          "profile",
          "password",
          "theme",
        ],
      },
    ];

    const matchedPages = pages
      .filter(
        (page) =>
          page.name
            .toLowerCase()
            .includes(lowerQuery) ||
          page.tags.some((tag) =>
            tag.includes(lowerQuery)
          )
      )
      .map((page) => ({
        id: `page-${page.path}`,
        title: page.name,
        subtitle:
          "CareerPilot feature",
        type: "page",
        path: page.path,
        icon: (
          <FileText
            size={17}
            className="text-emerald-600"
          />
        ),
      }));

    const groups = [];

    if (matchedJobs.length > 0) {
      groups.push({
        group: "Jobs",
        items: matchedJobs,
      });
    }

    if (matchedCompanies.length > 0) {
      groups.push({
        group: "Company Insights",
        items: matchedCompanies,
      });
    }

    if (matchedPages.length > 0) {
      groups.push({
        group: "Pages & Features",
        items: matchedPages,
      });
    }

    setSearchResults(groups);
  }, [query, jobs]);

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(
          event.target
        )
      ) {
        setSearchOpen(false);
      }

      if (
        bellRef.current &&
        !bellRef.current.contains(
          event.target
        )
      ) {
        setBellOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Escape") {
      setSearchOpen(false);
      setQuery("");
    }

    if (e.key === "Enter") {
      if (
        searchResults.length > 0 &&
        searchResults[0].items.length >
        0
      ) {
        const first =
          searchResults[0].items[0];

        navigate(first.path);

        setSearchOpen(false);
        setQuery("");
      }
    }
  };

  const unreadNotifications =
    notifications.filter(
      (notification) =>
        !readIds.includes(
          notification.id
        )
    );

  const badgeCount =
    unreadNotifications.length;

  const markAsRead = (id) => {
    const updated = [
      ...readIds,
      id,
    ];

    setReadIds(updated);

    localStorage.setItem(
      "read_notification_ids",
      JSON.stringify(updated)
    );
  };

  const markAllAsRead = () => {
    const allIds =
      notifications.map(
        (notification) =>
          notification.id
      );

    const updated =
      Array.from(
        new Set([
          ...readIds,
          ...allIds,
        ])
      );

    setReadIds(updated);

    localStorage.setItem(
      "read_notification_ids",
      JSON.stringify(updated)
    );
  };

  const handleToggleBell = () => {
    setBellOpen((prev) => !prev);
    setSearchOpen(false);
    setProfileOpen(false);
  };

  const handleToggleProfile = () => {
    setProfileOpen(
      (prev) => !prev
    );

    setSearchOpen(false);
    setBellOpen(false);
  };

  const handleClearSearch = () => {
    setQuery("");
    setSearchResults([]);
    setSearchOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "/login";
  };

  const displayName =
    userData?.fullName ||
    userData?.name ||
    "Hemanth";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-2xl">
      <div className="relative flex h-24 items-center gap-4 px-4 sm:px-6 md:px-8 xl:px-10">

        {/* subtle light effect */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/80 to-transparent" />

        {/* Welcome */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="relative hidden h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 text-blue-600 shadow-sm sm:flex">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-transparent" />

            <Sparkles
              size={19}
              className="relative"
            />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 sm:text-[11px]">
              Welcome back
            </p>

            <h1 className="mt-0.5 truncate text-lg font-bold tracking-[-0.035em] text-slate-950 sm:text-xl xl:text-[22px]">
              CareerPilot Dashboard
            </h1>
          </div>
        </div>

        {/* Global Search */}
        {!collapsed && (
          <div
            ref={
              searchContainerRef
            }
            className="relative hidden flex-[1.3] items-center justify-center lg:flex"
          >
            <div className="group flex w-full max-w-xl items-center gap-3 rounded-[18px] border border-slate-200/90 bg-slate-50/80 px-4 py-3 shadow-[0_2px_10px_rgba(15,23,42,0.025)] transition-all duration-300 focus-within:-translate-y-0.5 focus-within:border-blue-300 focus-within:bg-white focus-within:shadow-[0_10px_30px_rgba(37,99,235,0.09)] focus-within:ring-4 focus-within:ring-blue-500/5">

              <Search
                size={18}
                className="shrink-0 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-600"
              />

              <input
                type="search"
                placeholder="Search jobs, companies, features..."
                value={query}
                onChange={(e) => {
                  setQuery(
                    e.target.value
                  );

                  if (
                    e.target.value.trim()
                  ) {
                    setSearchOpen(
                      true
                    );

                    setBellOpen(false);
                    setProfileOpen(
                      false
                    );
                  } else {
                    setSearchOpen(
                      false
                    );
                  }
                }}
                onKeyDown={
                  handleSearchKeyDown
                }
                onFocus={() => {
                  if (query.trim()) {
                    setSearchOpen(
                      true
                    );

                    setBellOpen(false);
                    setProfileOpen(
                      false
                    );
                  }
                }}
                className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:font-normal placeholder:text-slate-400"
              />

              {query ? (
                <button
                  type="button"
                  onClick={
                    handleClearSearch
                  }
                  aria-label="Clear search"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200/80 hover:text-slate-700"
                >
                  <X size={14} />
                </button>
              ) : (
                <div className="hidden shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-400 shadow-sm xl:flex">
                  <Command size={10} />
                  Search
                </div>
              )}
            </div>

            {/* Search results */}
            {searchOpen && (
              <div className="animate-dropdown-enter absolute top-[62px] z-50 w-full max-w-xl overflow-hidden rounded-[22px] border border-slate-200/80 bg-white/95 shadow-[0_28px_80px_rgba(15,23,42,0.14)] backdrop-blur-2xl">

                <div className="border-b border-slate-100 px-5 py-3">
                  <p className="text-xs font-semibold text-slate-500">
                    Search CareerPilot
                  </p>
                </div>

                <div className="max-h-[400px] overflow-y-auto p-3">
                  {searchResults.length ===
                    0 ? (
                    <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Search
                          size={20}
                        />
                      </div>

                      <p className="text-sm font-semibold text-slate-700">
                        No results found
                      </p>

                      <p className="mt-1 max-w-[250px] text-xs leading-5 text-slate-400">
                        Try another company,
                        role, location, or
                        CareerPilot feature.
                      </p>
                    </div>
                  ) : (
                    searchResults.map(
                      (group) => (
                        <div
                          key={
                            group.group
                          }
                          className="mb-4 last:mb-0"
                        >
                          <h4 className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            {group.group}
                          </h4>

                          <div className="space-y-1">
                            {group.items.map(
                              (item) => (
                                <button
                                  type="button"
                                  key={
                                    item.id
                                  }
                                  onClick={() => {
                                    navigate(
                                      item.path
                                    );

                                    setSearchOpen(
                                      false
                                    );

                                    setQuery(
                                      ""
                                    );
                                  }}
                                  className="group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50/60"
                                >
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200/70 transition group-hover:bg-white group-hover:shadow-sm">
                                    {
                                      item.icon
                                    }
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-slate-800">
                                      {
                                        item.title
                                      }
                                    </p>

                                    <p className="mt-0.5 truncate text-xs text-slate-400">
                                      {
                                        item.subtitle
                                      }
                                    </p>
                                  </div>

                                  <ChevronRight
                                    size={
                                      15
                                    }
                                    className="shrink-0 -translate-x-1 text-slate-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-blue-500 group-hover:opacity-100"
                                  />
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Notification */}
          <div
            ref={bellRef}
            className="relative"
          >
            <button
              type="button"
              onClick={
                handleToggleBell
              }
              aria-label="Notifications"
              aria-haspopup="true"
              aria-expanded={
                bellOpen
              }
              className={`group relative flex h-11 w-11 items-center justify-center rounded-2xl border bg-white shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md ${bellOpen
                  ? "border-blue-200 text-blue-600 ring-4 ring-blue-500/5"
                  : "border-slate-200/90 text-slate-500 hover:border-blue-200 hover:text-blue-600"
                }`}
            >
              <Bell
                size={18}
                className="transition-transform duration-200 group-hover:scale-105"
              />

              {badgeCount > 0 && (
                <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-rose-500 px-1 text-[9px] font-bold text-white shadow-md">
                  {badgeCount >
                    99
                    ? "99+"
                    : badgeCount}
                </span>
              )}
            </button>

            {bellOpen && (
              <div className="animate-dropdown-enter absolute right-0 top-[58px] z-50 flex w-[340px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[22px] border border-slate-200/80 bg-white/95 shadow-[0_28px_80px_rgba(15,23,42,0.15)] backdrop-blur-2xl sm:w-[380px]">

                <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/80 px-5 py-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">
                        Notifications
                      </h3>

                      {badgeCount >
                        0 && (
                          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 ring-1 ring-blue-100">
                            {
                              badgeCount
                            }{" "}
                            unread
                          </span>
                        )}
                    </div>

                    <p className="mt-1 text-[11px] text-slate-400">
                      Career and
                      application updates
                    </p>
                  </div>

                  {badgeCount >
                    0 && (
                      <button
                        type="button"
                        onClick={
                          markAllAsRead
                        }
                        className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-semibold text-blue-600 transition hover:bg-blue-50"
                      >
                        <CheckCheck
                          size={14}
                        />

                        Mark all read
                      </button>
                    )}
                </div>

                <div className="max-h-[390px] overflow-y-auto">
                  {notifications.length ===
                    0 ? (
                    <div className="flex flex-col items-center px-6 py-12 text-center">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-500 ring-1 ring-blue-100">
                        <Bell
                          size={22}
                        />
                      </div>

                      <p className="text-sm font-bold text-slate-700">
                        You're all caught
                        up
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        No new
                        notifications.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {notifications.map(
                        (notification) => {
                          const isRead =
                            readIds.includes(
                              notification.id
                            );

                          return (
                            <button
                              type="button"
                              key={
                                notification.id
                              }
                              onClick={() => {
                                markAsRead(
                                  notification.id
                                );

                                navigate(
                                  notification.path
                                );

                                setBellOpen(
                                  false
                                );
                              }}
                              className={`group flex w-full gap-3 px-5 py-4 text-left transition-colors duration-200 hover:bg-slate-50 ${!isRead
                                  ? "bg-blue-50/30"
                                  : "bg-white"
                                }`}
                            >
                              <div
                                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ${!isRead
                                    ? "bg-blue-50 text-blue-600 ring-blue-100"
                                    : "bg-slate-50 text-slate-400 ring-slate-200/70"
                                  }`}
                              >
                                {notification.type ===
                                  "email" ? (
                                  <Mail
                                    size={
                                      15
                                    }
                                  />
                                ) : notification.type ===
                                  "interview" ? (
                                  <Calendar
                                    size={
                                      15
                                    }
                                  />
                                ) : (
                                  <Briefcase
                                    size={
                                      15
                                    }
                                  />
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <p
                                    className={`truncate text-xs font-bold ${!isRead
                                        ? "text-slate-900"
                                        : "text-slate-600"
                                      }`}
                                  >
                                    {
                                      notification.title
                                    }
                                  </p>

                                  {!isRead && (
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                  )}
                                </div>

                                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                                  {
                                    notification.message
                                  }
                                </p>

                                <p className="mt-2 text-[10px] font-medium text-slate-400">
                                  {new Date(
                                    notification.date
                                  ).toLocaleDateString()}
                                </p>
                              </div>

                              <ChevronRight
                                size={14}
                                className="mt-2 shrink-0 text-slate-300 opacity-0 transition group-hover:opacity-100"
                              />
                            </button>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div
            ref={profileRef}
            className="relative"
          >
            <button
              type="button"
              onClick={
                handleToggleProfile
              }
              aria-label="User profile menu"
              aria-haspopup="true"
              aria-expanded={
                profileOpen
              }
              className={`group flex items-center gap-3 rounded-[18px] border bg-white p-1.5 pr-2 shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md ${profileOpen
                  ? "border-blue-200 ring-4 ring-blue-500/5"
                  : "border-slate-200/90 hover:border-blue-200"
                }`}
            >
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 ring-1 ring-blue-100">
                <UserCircle
                  size={23}
                />
              </div>

              {!collapsed && (
                <div className="hidden min-w-0 text-left xl:block">
                  <p className="max-w-[120px] truncate text-xs font-bold text-slate-900">
                    {displayName}
                  </p>

                  <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                    CareerPilot AI
                  </p>
                </div>
              )}
            </button>

            {profileOpen && (
              <div className="animate-dropdown-enter absolute right-0 top-[58px] z-50 w-72 overflow-hidden rounded-[22px] border border-slate-200/80 bg-white/95 shadow-[0_28px_80px_rgba(15,23,42,0.15)] backdrop-blur-2xl">

                <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 px-5 py-5">
                  <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-blue-200/30 blur-2xl" />

                  <div className="relative flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm ring-1 ring-blue-100">
                      <UserCircle
                        size={28}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-950">
                        {displayName}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">
                        <Sparkles
                          size={11}
                          className="text-indigo-500"
                        />

                        <p className="text-[11px] font-medium text-slate-500">
                          CareerPilot AI
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigate(
                        "/settings"
                      );

                      setProfileOpen(
                        false
                      );
                    }}
                    className="group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <User
                        size={16}
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700">
                        My Profile
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        View account
                        information
                      </p>
                    </div>

                    <ChevronRight
                      size={14}
                      className="text-slate-300 transition-transform group-hover:translate-x-0.5"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigate(
                        "/settings"
                      );

                      setProfileOpen(
                        false
                      );
                    }}
                    className="group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <Settings
                        size={16}
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700">
                        Settings
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Preferences and
                        integrations
                      </p>
                    </div>

                    <ChevronRight
                      size={14}
                      className="text-slate-300 transition-transform group-hover:translate-x-0.5"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigate(
                        "/settings"
                      );

                      setProfileOpen(
                        false
                      );
                    }}
                    className="group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Settings
                        size={16}
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700">
                        Account &
                        Security
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Password and
                        account controls
                      </p>
                    </div>

                    <ChevronRight
                      size={14}
                      className="text-slate-300 transition-transform group-hover:translate-x-0.5"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigate(
                        "/analytics"
                      );

                      setProfileOpen(
                        false
                      );
                    }}
                    className="group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <ChartBar
                        size={16}
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700">
                        My Activity
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Application
                        analytics
                      </p>
                    </div>

                    <ChevronRight
                      size={14}
                      className="text-slate-300 transition-transform group-hover:translate-x-0.5"
                    />
                  </button>
                </div>

                <div className="border-t border-slate-100 p-2">
                  <button
                    type="button"
                    onClick={
                      handleLogout
                    }
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-rose-50"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                      <LogOut
                        size={16}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-rose-600">
                        Logout
                      </p>

                      <p className="mt-0.5 text-[10px] text-rose-400">
                        Sign out of
                        CareerPilot AI
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* bottom premium shadow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-20px] h-5 bg-gradient-to-b from-slate-900/[0.025] to-transparent" />
    </header>
  );
}

export default Navbar;