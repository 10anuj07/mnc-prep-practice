import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || "/dashboard";

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email == "rahul@gmail.com" && password === "123456") {
      login({ id: 1, name: "Rahul Sharma", email, role: "admin" });
      navigate(from, { replace: true });
    } else {
      setError("Invalid credentials. Use rahul@gmail.com / 123456");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "32px",
        border: "1px solid #ccc",
        borderRadius: "12px",
      }}
    >
      <h2>🔐 Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "16px" }}>
          <label>Email</label> <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rahul@gmail.com"
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label>Password</label> <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
