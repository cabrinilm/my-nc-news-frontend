import { useEffect, useState } from "react";
import { useUser } from "../../context/UserAccountProvider";
import { getUsers } from "../../api";
import Loading from "../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { CreateNewUser } from "../CreateNewUser";
export const Users = () => {
  const { user, setUser } = useUser();
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        setUsers(userList);
      } catch (error) {
        console.log("Erro fetching users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <Loading />;

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleLogin = () => {
    if (selectedUser) {
      setUser({ username: selectedUser });
    }
  };

  return (
     
    <div className="user-container">
       <CreateNewUser/> 
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
            <FontAwesomeIcon icon={faUserCheck} />
            <p>User logged in: {user.username}</p>
          </div>
        )}
      </div>
    </div>
  );
};
