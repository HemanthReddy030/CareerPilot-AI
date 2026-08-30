import { Link } from "react-router-dom";

function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 px-4 py-12">
            <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

                <h1 className="text-3xl font-bold text-slate-900">
                    Privacy Policy
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Last updated: August 30, 2026
                </p>

                <div className="mt-8 space-y-6 text-slate-700 leading-7">

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            1. Introduction
                        </h2>

                        <p className="mt-2">
                            CareerPilot AI respects your privacy. This Privacy Policy explains
                            how we collect, use, store, and protect information when you use
                            CareerPilot AI.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            2. Information We Collect
                        </h2>

                        <p className="mt-2">
                            We may collect information such as your name, email address,
                            account information, job application details, resume-related
                            information, interview preparation data, and other information
                            you choose to provide while using CareerPilot AI.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            3. Google Account Data
                        </h2>

                        <p className="mt-2">
                            If you connect your Google account, CareerPilot AI may request
                            permission to access certain Google services such as Gmail and
                            Google Calendar. Access is used only for features that you
                            explicitly authorize.
                        </p>

                        <p className="mt-2">
                            CareerPilot AI does not sell your Google account data to third
                            parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            4. How We Use Information
                        </h2>

                        <p className="mt-2">
                            Information may be used to provide account functionality, manage
                            job applications, support interview preparation, generate
                            AI-assisted content, send relevant notifications, and improve the
                            CareerPilot AI experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            5. Data Storage and Security
                        </h2>

                        <p className="mt-2">
                            We use reasonable technical and organizational measures to protect
                            user information. However, no internet-based service can guarantee
                            complete security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            6. Third-Party Services
                        </h2>

                        <p className="mt-2">
                            CareerPilot AI may use third-party services such as Google,
                            database providers, hosting providers, artificial intelligence
                            providers, and email delivery services. These providers may
                            process information according to their own privacy policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            7. Your Choices
                        </h2>

                        <p className="mt-2">
                            You may stop using CareerPilot AI at any time. You may also revoke
                            Google account access through your Google Account security
                            settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            8. Changes to This Policy
                        </h2>

                        <p className="mt-2">
                            This Privacy Policy may be updated when features or legal
                            requirements change. Updates will be reflected on this page.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            9. Contact
                        </h2>

                        <p className="mt-2">
                            For privacy-related questions, contact:
                        </p>

                        <p className="mt-2 font-medium">
                            rhemanth066@gmail.com
                        </p>
                    </section>

                </div>

                <div className="mt-10 border-t border-slate-200 pt-6">
                    <Link
                        to="/"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Back to CareerPilot AI
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default PrivacyPolicy;