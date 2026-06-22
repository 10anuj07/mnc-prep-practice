import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🏠 Home Page</h1>
      <p>Welcome to MNC Prep App</p>
      <button onClick={() => navigate("/dashboard")}>Go to dashboard</button>
      <button onClick={() => navigate("/posts")} style={{ margin: "8px" }}>
        View Posts
      </button>
    </div>
  );
};

export default HomePage;
