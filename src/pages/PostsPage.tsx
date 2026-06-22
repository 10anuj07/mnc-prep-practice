import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Post } from "../types";

const PostsPage = () => {
  const {
    data: posts,
    loading,
    error,
  } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts?_limit=10");
  const navigate = useNavigate();

  if (loading) return <p style={{ padding: "40px" }}>Loading posts...</p>;
  if (error) return <p style={{ padding: "40px", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>📝 Posts</h1>
      {posts?.map((post) => (
        <div
          key={post.id}
          onClick={() => navigate(`/posts/${post.id}`)}
          style={{
            border: "1px solid #eee",
            padding: "16px",
            marginBottom: "12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          <h3>{post.title}</h3>
          <p style={{ color: "#eee" }}>{post.body.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default PostsPage;
