import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import useFetch from "./hooks/useFetch";
import useLocalStorage from "./hooks/useLocalStorage";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div style={{ marginBottom: "32px" }}>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: "8px" }}>
        Decrement
      </button>
      <button onClick={() => setCount(0)} style={{ marginLeft: "8px" }}>
        Reset
      </button>
    </div>
  );
};

interface UserForm {
  name: string;
  email: string;
  age: number;
}

const UserFormComponent = () => {
  const [form, setForm] = useState<UserForm>({ name: "", email: "", age: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div style={{ marginBottom: "32px" }}>
      <h2>User Form</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />
      <br />
      <br />
      <p>
        Preview: {form.name} | {form.email} | {form.age}{" "}
      </p>
    </div>
  );
};

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ marginBottom: "32px" }}>
      <h2>Todo List</h2>
      <input
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        placeholder="Add a task..."
      />
      <button onClick={addTodo} style={{ marginLeft: "8px" }}>
        Add
      </button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
            <button
              onClick={() => toggleTodo(todo.id)}
              style={{ marginLeft: "8px" }}
            >
              ✅
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: "8px" }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err) {
        setError("Something went wrong, Please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Posts from API</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #eee",
            padding: "12px",
            marginBottom: "8px",
          }}
        >
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    //Debounce pattern - wait 500ms before searching
    const timer = setTimeout(async () => {
      setLoading(true);

      const mockProducts: Product[] = [
        { id: 1, name: "React Book", price: 499 },
        { id: 2, name: "TypeScript Guide", price: 699 },
        { id: 3, name: "Java Handbook", price: 599 },
      ].filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

      setResults(mockProducts);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <h2>Product Search</h2>
      <input
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        placeholder="Search products..."
      />
      {loading && <p>Searcing...</p>}
      <ul>
        {results.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AutoFocusInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <div style={{ marginBottom: "32px" }}>
      <h2>useRef - DOM Access</h2>
      <input ref={inputRef} placeholder="I can be focused programatically" />
      <button onClick={handleFocus} style={{ marginLeft: "8px" }}>
        Focus
      </button>
      <button onClick={handleClear} style={{ marginLeft: "8px" }}>
        Clear
      </button>
    </div>
  );
};

const ReaderCounter = () => {
  const [count, setCount] = useState<number>(0);

  const renderCount = useRef<number>(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div style={{ marginBottom: "32px" }}>
      <h2>useRef - Persist Without Re-render</h2>
      <p>Count: {count}</p>
      <p>This component has rendered {renderCount.current} times</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
};

const PreviousValue = () => {
  const [name, setName] = useState<string>("");
  const previousName = useRef<string>("");

  useEffect(() => {
    previousName.current = name;
  }, [name]);

  return (
    <div style={{ marginBottom: "32px" }}>
      <h2>useRef - Previous Value</h2>
      <input
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
        placeholder="start typing..."
      />
      <p>Current: {name}</p>
      <p>Previous: {previousName.current}</p>
    </div>
  );
};

const UserAvatar = () => {
  const { user, isLoggedIn } = useAuth();
  if (!isLoggedIn) return <p>No user logged in</p>;

  return (
    <div style={{ padding: "8px", background: "#f0f0f0", borderRadius: "8px" }}>
      <p>👤 {user?.name}</p>
      <p>✉️ {user?.email}</p>
      <p>🔑 Role: {user?.role}</p>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <h3>Sidebar</h3>
      <UserAvatar />
    </div>
  );
};

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Sidebar />
    </div>
  );
};

const LoginLogout = () => {
  const { isLoggedIn, login, logout } = useAuth();

  const handleLogin = () => {
    login({
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      role: "admin",
    });
  };

  return (
    <div style={{ marginBottom: "32px" }}>
      <h2>Auth via Context</h2>
      {isLoggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login as Rahul</button>
      )}
    </div>
  );
};

interface Post {
  id: number;
  title: string;
}

const PostWithCustomHook = () => {
  const {
    data: posts,
    loading,
    error,
  } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts?_limit=5");

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Posts - via useFetch hook</h2>
      {posts?.map((post) => (
        <p key={post.id}>• {post.title}</p>
      ))}
    </div>
  );
};

const ThemeToggle = () => {
  const [theme, setTheme, removeTheme] = useLocalStorage<string>(
    "theme",
    "light",
  );

  return (
    <div
      style={{
        marginBottom: "32px",
        background: theme === "dark" ? "#333" : "#fff",
        padding: "16px",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <h2>Theme - via useLocalStrorage hook</h2>
      <p>Current Theme: {theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
      <button onClick={() => removeTheme()}>Reset</button>
      <p style={{ fontSize: "12px" }}>Refresh the page — theme persists! 🎉</p>
    </div>
  );
};

const App = () => {
  return (
    <div style={{ padding: "24px" }}>
      {/* <h1>Day 3 - Hooks in TypeScript</h1> */}
      {/* <Counter />
      <UserFormComponent />
      <TodoList />
      <PostList />
      <ProductSearch /> */}
      {/* <AutoFocusInput />
      <ReaderCounter />
      <PreviousValue /> */}

      <h1>Day 4 - useRef, useContext, Custom Hooks</h1>
      {/* <LoginLogout />
      <Dashboard /> */}
      <PostWithCustomHook />
      <ThemeToggle />
    </div>
  );
};

export default App;
