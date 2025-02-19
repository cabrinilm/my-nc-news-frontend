import { useState } from "react";
import { useUser } from "../context/UserAccountProvider";

export const UserSelector = () => {
  const { user, setUser } = useUser(); 
  const [selectedUser, setSelectedUser] = useState("");

  console.log("User in context:", user); 

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleLogin = () => {
    if (selectedUser) {
      setUser({ username: selectedUser }); 
    }
  };

  return (
    <div className="user-selector">
      <label htmlFor="user">Choose a user:</label>
      <select id="user" value={selectedUser} onChange={handleUserSelect}>
        <option value="">Select user</option>
        <option value="grumpy19">grumpy19</option>
      </select>
      <button onClick={handleLogin} disabled={!selectedUser}>
        Login
      </button>
      <p>Logged in as: {user?.username || "None"}</p> 
    </div>
  );
};
