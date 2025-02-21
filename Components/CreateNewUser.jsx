import Loading from "./Loading";
import { createUser } from "../api";
import { useState } from "react";

export const CreateNewUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    avatar_url: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const createdUser = await createUser(userData);
      setSuccessMessage("User created successfully!");
      window.location.reload();
      console.log("Created User:", createdUser);
    } catch (error) {
      setErrorMessage("Error creating user.");
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="createuser-box">
      <h3 className="createuser-title">Create New User</h3>
      <form onSubmit={handleSubmit} className="createuser-form">
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Username"
          className="createuser-input"
          required
        />
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Name"
          className="createuser-input"
          required
        />
        <input
          type="text"
          name="avatar_url"
          value={userData.avatar_url}
          onChange={handleChange}
          placeholder="Avatar URL"
          className="createuser-input"
        />
        <button type="submit" className="createuser-button">
          Create User
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};
