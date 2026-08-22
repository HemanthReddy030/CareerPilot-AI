function RecentApplications() {
  const applications = [
    {
      company: "Google",
      role: "Software Engineer Intern",
      status: "Applied",
      date: "29 Jul 2026",
    },
    {
      company: "Amazon",
      role: "Frontend Developer",
      status: "Interview",
      date: "30 Jul 2026",
    },
    {
      company: "Microsoft",
      role: "Backend Developer",
      status: "Assessment",
      date: "31 Jul 2026",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Recent Applications
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Company</th>
            <th className="text-left py-3">Role</th>
            <th className="text-left py-3">Status</th>
            <th className="text-left py-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-4">{app.company}</td>
              <td>{app.role}</td>
              <td>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                  {app.status}
                </span>
              </td>
              <td>{app.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentApplications;