import React from "react";
import logo from "./logo.svg";
import "./App.css";

interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
  }

  interface UserCardProps {
    user: User;
  }

  const UserCard = ({user}:UserCardProps) => {
    return (
      <div style={{border: '1px solid #ccc', padding:'16px', margin: '8px', borderRadius: '8px'}}>
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Status: {user.isActive ? '🟢 Active' : '🔴 Inactive'}</p>
      </div>
    )
  }

const App = () => {
  const users: User[] = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@gmail.com', isActive: true },
    { id: 2, name: 'Priya Singh', email: 'priya@gmail.com', isActive: false },
    { id: 3, name: 'Arjun Mehta', email: 'arjun@gmail.com', isActive: true },
  ];
  return (
    <div style={{padding: '24px'}}>
      <h1>User Dashboard</h1>
      {users.map((user)=>(
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default App;
