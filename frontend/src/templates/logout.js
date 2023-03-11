import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

export default function Login() {
  const { isAuthenticated, logout } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }

    logout({ returnTo: window.location.origin });
  }, [isAuthenticated, history]);

  return null;
}
