import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Post } from "../types";

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: post,
    loading,
    error,
  } = useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;
  if (error) return <p style={{ padding: "40px", color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "40px" }}>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1 style={{ marginTop: "16px" }}>{post?.title}</h1>
      <p style={{ lineHeight: "1.8", color: "#444" }}>{post?.body}</p>
    </div>
  );
};

export default PostDetailPage;
