import { useContext } from "react";
import AuthContext from "./auth/AuthContext";

const LogoutButton = () => {
  const { logoutUser } = useContext(AuthContext);

  return <button onClick={logoutUser}>Logout</button>;
};

export default LogoutButton;
