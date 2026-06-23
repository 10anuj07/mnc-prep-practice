import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Post } from "../types";
import { useEffect, useState } from "react";
import { postsService } from "../api/postsService";

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPages = async () => {
      try {
        setLoading(true);
        const data = await postsService.getAll();
        setPosts(data);
      } catch (error) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    loadPages();
  }, []);

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
