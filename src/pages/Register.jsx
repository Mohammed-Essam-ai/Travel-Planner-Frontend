import { useState } from "react";
import { register } from "../services/userService";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await register(username, password);

      console.log(data);

      alert("Registerd successful");
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.error || "Rigster failed");
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="m-2 border p-2">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /> <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Register;
