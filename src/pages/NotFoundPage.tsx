import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <h1 style={{ fontSize: "72px" }}>404</h1>
      <p>Page not found</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};

export default NotFoundPage;
