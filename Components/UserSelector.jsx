import { useEffect, useState } from "react";
import { useUser } from "../context/UserAccountProvider";
import { getUsers } from "../api";

export const UserSelector = () => {
  const { user, setUser } = useUser();
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getUsers();
      setUsers(userList);
    };
    fetchUsers();
  }, []);

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
        {users.map((user) => (
          <option key={user.username} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <button onClick={handleLogin} disabled={!selectedUser}>
        Login
      </button>
      {user && (
        <div className="user-logged-in">
          <p>User logged in: {user.username}</p>
        </div>
      )}
    </div>
  );
};
