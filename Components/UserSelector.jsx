import { useState } from "react";
import { useUser } from "../context/UserAccountProvider";

export const UserSelector = () => {
  const { setUser } = useUser();
  const [selectedUser, setSelectedUser] = useState("");

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleLogin = () => {
    if (selectedUser) {
      setUser(selectedUser);
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
    </div>
  );
};