import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        background: "#1a1a2e",
        color: "white",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/posts" style={{ color: "white", textDecoration: "none" }}>
          Posts
        </Link>
        {isLoggedIn && (
          <Link
            to="/dashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            Dashboard
          </Link>
        )}
      </div>
      <div>
        {isLoggedIn ? (
          <span>
            👤 {user?.name} &nbsp;
            <button
              onClick={handleLogout}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </span>
        ) : (
          <Link to="/login" style={{ color: "white" }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
