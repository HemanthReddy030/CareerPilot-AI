import { Link } from "react-router-dom";

function TermsOfService() {
    return (
        <div className="min-h-screen bg-slate-50 px-4 py-12">
            <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

                <h1 className="text-3xl font-bold text-slate-900">
                    Terms of Service
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Last updated: August 30, 2026
                </p>

                <div className="mt-8 space-y-6 text-slate-700 leading-7">

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            1. Acceptance of Terms
                        </h2>

                        <p className="mt-2">
                            By using CareerPilot AI, you agree to these Terms of Service.
                            If you do not agree with these terms, please do not use the
                            application.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            2. About CareerPilot AI
                        </h2>

                        <p className="mt-2">
                            CareerPilot AI is a job application and career assistance
                            platform that may provide job tracking, resume-related tools,
                            interview preparation, AI-assisted features, notifications,
                            and account integrations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            3. User Accounts
                        </h2>

                        <p className="mt-2">
                            You are responsible for providing accurate information when
                            creating an account and for maintaining the security of your
                            login credentials.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            4. Google Account Integration
                        </h2>

                        <p className="mt-2">
                            CareerPilot AI may allow you to connect your Google account.
                            By connecting your account, you authorize CareerPilot AI to
                            access only the Google services and permissions shown on the
                            Google consent screen.
                        </p>

                        <p className="mt-2">
                            You may revoke this access at any time through your Google
                            Account security settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            5. AI-Generated Content
                        </h2>

                        <p className="mt-2">
                            CareerPilot AI may use artificial intelligence to generate
                            suggestions, interview preparation material, resume guidance,
                            company information, and other career-related content.
                        </p>

                        <p className="mt-2">
                            AI-generated information may not always be complete or accurate.
                            Users should review important information before relying on it
                            for professional decisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            6. Acceptable Use
                        </h2>

                        <p className="mt-2">
                            You agree not to misuse CareerPilot AI, attempt unauthorized
                            access, interfere with the service, upload malicious content,
                            or use the platform for unlawful activities.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            7. Third-Party Services
                        </h2>

                        <p className="mt-2">
                            CareerPilot AI may depend on third-party platforms such as
                            Google, hosting providers, database providers, AI providers,
                            and email services. Availability of these features may depend
                            on those third-party services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            8. Service Availability
                        </h2>

                        <p className="mt-2">
                            We may update, modify, temporarily suspend, or discontinue parts
                            of CareerPilot AI when necessary for maintenance, security, or
                            feature improvements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            9. Limitation of Liability
                        </h2>

                        <p className="mt-2">
                            CareerPilot AI is provided for career assistance and educational
                            purposes. We do not guarantee employment, interview selection,
                            job offers, salary outcomes, or the accuracy of all generated
                            content.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            10. Changes to These Terms
                        </h2>

                        <p className="mt-2">
                            These Terms of Service may be updated as the application evolves.
                            Updated terms will be published on this page.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900">
                            11. Contact
                        </h2>

                        <p className="mt-2">
                            For questions about these Terms of Service, contact:
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

export default TermsOfService;