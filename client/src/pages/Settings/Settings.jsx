import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Settings as SettingsIcon,
  UserRound,
  ShieldCheck,
  Bell,
  Mail,
  CalendarDays,
  Sparkles,
  Smartphone,
  BriefcaseBusiness,
  FileText,
  Palette,
  Save,
  LockKeyhole,
  KeyRound,
  Trash2,
  Unplug,
  CheckCircle2,
  CircleAlert,
  Cloud,
  SlidersHorizontal,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getSettingsData,
  updateProfile,
  changePassword,
  disconnectGoogle,
  deleteAccount,
} from "../../services/settingsService";

function Settings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    currentRole: "",
    bio: "",
    themePreference: "system",
    notifications: {
      emailNotifications: true,
      interviewReminders: true,
      calendarNotifications: true,
      aiSuggestions: true,
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);

        const response = await getSettingsData();

        setUser(response.user);

        setFormData({
          fullName: response.user.fullName || "",
          phone: response.user.phone || "",
          currentRole: response.user.currentRole || "",
          bio: response.user.bio || "",
          themePreference:
            response.user.themePreference || "system",
          notifications:
            response.user.notifications || {
              emailNotifications: true,
              interviewReminders: true,
              calendarNotifications: true,
              aiSuggestions: true,
            },
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load settings.");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggle = (name) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [name]:
          !formData.notifications[name],
      },
    });
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      const response =
        await updateProfile(formData);

      setUser(response.user);

      alert(response.message);
    } catch (err) {
      console.error(err);

      alert(
        "Failed to save profile settings."
      );
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      alert(
        "New passwords do not match."
      );

      return;
    }

    try {
      setPasswordLoading(true);

      const response =
        await changePassword(
          passwordData
        );

      alert(response.message);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Failed to change password."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDisconnectGoogle =
    async () => {
      try {
        const response =
          await disconnectGoogle();

        alert(response.message);

        setUser((prev) => ({
          ...prev,
          google: {
            email: "",
          },
        }));
      } catch (err) {
        console.error(err);

        alert(
          "Failed to disconnect Google."
        );
      }
    };

  const handleDeleteAccount =
    async () => {
      if (
        !window.confirm(
          "Delete account permanently? This cannot be undone."
        )
      )
        return;

      try {
        const response =
          await deleteAccount();

        alert(response.message);

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        window.location.href =
          "/login";
      } catch (err) {
        console.error(err);

        alert(
          "Failed to delete account."
        );
      }
    };

  const inputClass =
    "w-full rounded-[18px] border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/5";

  const notificationItems = [
    {
      label: "Email Notifications",
      description:
        "Receive important career updates by email.",
      key: "emailNotifications",
      icon: Mail,
    },
    {
      label: "Interview Reminders",
      description:
        "Get reminders before upcoming interviews.",
      key: "interviewReminders",
      icon: BriefcaseBusiness,
    },
    {
      label: "Calendar Notifications",
      description:
        "Stay informed about scheduled calendar events.",
      key: "calendarNotifications",
      icon: CalendarDays,
    },
    {
      label: "AI Suggestions",
      description:
        "Receive intelligent CareerPilot recommendations.",
      key: "aiSuggestions",
      icon: Sparkles,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* HERO */}
        <motion.section
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative overflow-hidden rounded-[32px] border border-blue-100/80 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-blue-100/45 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 left-[30%] h-72 w-72 rounded-full bg-indigo-100/35 blur-3xl" />

          <div className="relative grid items-center gap-10 xl:grid-cols-[1.15fr_0.85fr]">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                <SettingsIcon
                  size={14}
                />

                Account Settings
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                Your CareerPilot,
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  configured your way.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500">
                Manage your profile,
                security, Google
                integration and
                notification preferences
                from one place.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <UserRound
                    size={17}
                    className="text-blue-600"
                  />

                  Profile
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <ShieldCheck
                    size={17}
                    className="text-indigo-600"
                  />

                  Security
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <Bell
                    size={17}
                    className="text-emerald-600"
                  />

                  Notifications
                </div>

              </div>
            </div>

            {/* SETTINGS VISUAL */}
            <motion.div
              initial={{
                opacity: 0,
                x: 18,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.15,
                duration: 0.65,
              }}
              className="relative mx-auto w-full max-w-[420px]"
            >
              <div className="relative overflow-hidden rounded-[30px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-7">

                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="rounded-[26px] border border-white bg-white p-6 shadow-[0_25px_65px_rgba(37,99,235,0.12)]"
                >
                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                      <UserRound
                        size={25}
                      />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        CareerPilot Account
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        {formData.fullName ||
                          "Your Profile"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">

                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <ShieldCheck
                          size={16}
                          className="text-emerald-600"
                        />
                        Security
                      </div>

                      <CheckCircle2
                        size={17}
                        className="text-emerald-500"
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Cloud
                          size={16}
                          className="text-blue-600"
                        />
                        Google
                      </div>

                      <span
                        className={`text-xs font-bold ${user?.google
                            ?.email
                            ? "text-emerald-600"
                            : "text-slate-400"
                          }`}
                      >
                        {user?.google
                          ?.email
                          ? "Connected"
                          : "Not Connected"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Bell
                          size={16}
                          className="text-indigo-600"
                        />
                        Notifications
                      </div>

                      <SlidersHorizontal
                        size={16}
                        className="text-slate-400"
                      />
                    </div>

                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* LOADING */}
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map(
              (_, idx) => (
                <div
                  key={idx}
                  className="h-44 animate-pulse rounded-[28px] border border-slate-100 bg-slate-100/80"
                />
              )
            )}
          </div>
        ) : error ? (

          /* ERROR */
          <div className="flex items-start gap-4 rounded-[26px] border border-rose-200 bg-rose-50 p-6 text-rose-700">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white ring-1 ring-rose-100">
              <CircleAlert size={20} />
            </div>

            <div>
              <h3 className="font-bold">
                Unable to load settings
              </h3>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>

          </div>
        ) : (
          <div className="space-y-8">

            {/* PROFILE + GOOGLE */}
            <div className="grid gap-6 xl:grid-cols-3">

              {/* PROFILE */}
              <motion.section
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8 xl:col-span-2"
              >
                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                    <UserRound
                      size={21}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                      Personal Information
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-950">
                      Profile Information
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Keep your
                      CareerPilot profile
                      details up to date.
                    </p>
                  </div>

                </div>

                <form
                  className="mt-7 space-y-6"
                  onSubmit={
                    handleSaveProfile
                  }
                >
                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Full Name
                      </label>

                      <div className="relative">
                        <UserRound
                          size={16}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          name="fullName"
                          value={
                            formData.fullName
                          }
                          onChange={
                            handleInput
                          }
                          placeholder="Full Name"
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Phone
                      </label>

                      <div className="relative">
                        <Smartphone
                          size={16}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          name="phone"
                          value={
                            formData.phone
                          }
                          onChange={
                            handleInput
                          }
                          placeholder="Phone"
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>

                  </div>

                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Current Role
                      </label>

                      <div className="relative">
                        <BriefcaseBusiness
                          size={16}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          name="currentRole"
                          value={
                            formData.currentRole
                          }
                          onChange={
                            handleInput
                          }
                          placeholder="Current Role"
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Theme Preference
                      </label>

                      <div className="relative">
                        <Palette
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <select
                          name="themePreference"
                          value={
                            formData.themePreference
                          }
                          onChange={
                            handleInput
                          }
                          className={`${inputClass} pl-11`}
                        >
                          <option value="system">
                            System
                          </option>

                          <option value="light">
                            Light
                          </option>

                          <option value="dark">
                            Dark
                          </option>
                        </select>
                      </div>
                    </div>

                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Bio
                    </label>

                    <div className="relative">
                      <FileText
                        size={16}
                        className="absolute left-4 top-4 text-slate-400"
                      />

                      <textarea
                        name="bio"
                        value={
                          formData.bio
                        }
                        onChange={
                          handleInput
                        }
                        placeholder="Tell CareerPilot a little about your professional background..."
                        rows="5"
                        className={`${inputClass} resize-none pl-11`}
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={saving}
                    whileHover={
                      saving
                        ? undefined
                        : { y: -2 }
                    }
                    whileTap={
                      saving
                        ? undefined
                        : {
                          scale:
                            0.985,
                        }
                    }
                    className="cp-btn cp-btn-primary px-6 py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save size={17} />

                    {saving
                      ? "Saving..."
                      : "Save Profile"}
                  </motion.button>

                </form>
              </motion.section>

              {/* GOOGLE */}
              <motion.section
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.05,
                }}
                className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  <Cloud size={21} />
                </div>

                <h2 className="mt-5 text-2xl font-bold text-slate-950">
                  Google Integration
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Manage your connected
                  Google account and sync
                  status.
                </p>

                <div
                  className={`mt-7 rounded-[22px] border p-5 ${user.google?.email
                      ? "border-emerald-100 bg-emerald-50/60"
                      : "border-slate-200 bg-slate-50"
                    }`}
                >
                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ${user.google?.email
                          ? "text-emerald-600 ring-emerald-100"
                          : "text-slate-400 ring-slate-200"
                        }`}
                    >
                      <Mail size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Gmail Status
                      </p>

                      <p
                        className={`mt-1 font-bold ${user.google?.email
                            ? "text-emerald-700"
                            : "text-slate-700"
                          }`}
                      >
                        {user.google?.email
                          ? "Connected"
                          : "Not Connected"}
                      </p>
                    </div>

                  </div>

                  {user.google?.email && (
                    <p className="mt-4 break-all rounded-xl bg-white px-3 py-2 text-xs text-slate-500 ring-1 ring-emerald-100">
                      {user.google.email}
                    </p>
                  )}
                </div>

                <motion.button
                  type="button"
                  onClick={
                    handleDisconnectGoogle
                  }
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-[16px] bg-rose-600 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-rose-700"
                >
                  <Unplug size={16} />

                  Disconnect Google
                </motion.button>

              </motion.section>
            </div>

            {/* SECURITY + NOTIFICATIONS */}
            <div className="grid gap-6 xl:grid-cols-2">

              {/* SECURITY */}
              <motion.section
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.08,
                }}
                className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8"
              >
                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                    <ShieldCheck
                      size={21}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                      Account Protection
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-950">
                      Security
                    </h2>
                  </div>

                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Change your account
                  password securely.
                </p>

                <form
                  className="mt-6 space-y-4"
                  onSubmit={
                    handlePasswordSubmit
                  }
                >
                  <div className="relative">
                    <LockKeyhole
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="password"
                      value={
                        passwordData.currentPassword
                      }
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword:
                            e.target.value,
                        })
                      }
                      placeholder="Current Password"
                      className={`${inputClass} pl-11`}
                      required
                    />
                  </div>

                  <div className="relative">
                    <KeyRound
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="password"
                      value={
                        passwordData.newPassword
                      }
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword:
                            e.target.value,
                        })
                      }
                      placeholder="New Password"
                      className={`${inputClass} pl-11`}
                      required
                    />
                  </div>

                  <div className="relative">
                    <ShieldCheck
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="password"
                      value={
                        passwordData.confirmPassword
                      }
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword:
                            e.target.value,
                        })
                      }
                      placeholder="Confirm Password"
                      className={`${inputClass} pl-11`}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={
                      passwordLoading
                    }
                    whileHover={
                      passwordLoading
                        ? undefined
                        : { y: -2 }
                    }
                    whileTap={
                      passwordLoading
                        ? undefined
                        : {
                          scale:
                            0.985,
                        }
                    }
                    className="mt-2 flex items-center justify-center gap-2 rounded-[16px] bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <ShieldCheck
                      size={17}
                    />

                    {passwordLoading
                      ? "Updating..."
                      : "Update Password"}
                  </motion.button>

                </form>
              </motion.section>

              {/* NOTIFICATIONS */}
              <motion.section
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.12,
                }}
                className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8"
              >
                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                    <Bell size={21} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                      Preferences
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-950">
                      Notifications
                    </h2>
                  </div>

                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Choose which CareerPilot
                  updates you want to
                  receive.
                </p>

                <div className="mt-6 space-y-3">

                  {notificationItems.map(
                    (item) => {
                      const Icon =
                        item.icon;

                      const enabled =
                        formData
                          .notifications[
                        item.key
                        ];

                      return (
                        <motion.button
                          key={
                            item.key
                          }
                          type="button"
                          onClick={() =>
                            handleToggle(
                              item.key
                            )
                          }
                          whileHover={{
                            x: 2,
                          }}
                          className="flex w-full items-center gap-4 rounded-[20px] border border-slate-200 bg-slate-50/60 p-4 text-left transition-colors hover:bg-white"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">
                            <Icon
                              size={17}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-slate-800">
                              {
                                item.label
                              }
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {
                                item.description
                              }
                            </p>
                          </div>

                          {/* SWITCH */}
                          <div
                            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${enabled
                                ? "bg-blue-600"
                                : "bg-slate-300"
                              }`}
                          >
                            <motion.span
                              animate={{
                                x: enabled
                                  ? 22
                                  : 3,
                              }}
                              transition={{
                                type: "spring",
                                stiffness:
                                  500,
                                damping:
                                  30,
                              }}
                              className="absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-sm"
                            />
                          </div>

                        </motion.button>
                      );
                    }
                  )}

                </div>
              </motion.section>

            </div>

            {/* DANGER ZONE */}
            <motion.section
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
              }}
              className="relative overflow-hidden rounded-[28px] border border-rose-100 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-rose-100/50 blur-3xl" />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
                    <Trash2 size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600">
                      Danger Zone
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-950">
                      Delete Account
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                      Permanently delete
                      your CareerPilot
                      account. This action
                      cannot be undone.
                    </p>
                  </div>

                </div>

                <motion.button
                  type="button"
                  onClick={
                    handleDeleteAccount
                  }
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  className="flex shrink-0 items-center justify-center gap-2 rounded-[16px] bg-rose-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-rose-700"
                >
                  <Trash2 size={16} />

                  Delete Account
                </motion.button>

              </div>
            </motion.section>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default Settings;