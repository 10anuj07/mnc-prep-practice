import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>📊 Dashboard</h1>
      <p>
        Welcome back, <strong>{user?.name}</strong>!
      </p>
      <p>Role: {user?.role}</p>
      <p>Email: {user?.email}</p>
      <button onClick={logout} style={{ marginTop: "16px", color: "red" }}>
        Logout
      </button>
    </div>
  );
};
export default DashboardPage;
