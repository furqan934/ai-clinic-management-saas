import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-[250px] bg-teal-700 text-white p-5">
        <h1 className="text-2xl font-bold">AI Clinic</h1>

        <ul className="mt-10 space-y-4">
          <li>
            <a href="/admin">Dashboard</a>
          </li>

          <li>
            <a href="/patients">Patients</a>
          </li>

          <li>Appointments</li>

          <li>Prescriptions</li>
        </ul>
      </aside>

      <main className="flex-1 p-6 bg-slate-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
