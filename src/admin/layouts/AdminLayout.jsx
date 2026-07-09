import Sidebar from "../components/Sidebar/Sidebar";

import "../styles/admin.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">

      <Sidebar />

      <main className="admin-main">
        {children}
      </main>

    </div>
  );
}