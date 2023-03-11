import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useHistory } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Login() {
  const { isAuthenticated } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) history.push("/");
  }, [isAuthenticated, history]);

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="logo-container"></div>
        <form>
            <label>Username:</label>
            <input name="username" type="input" className="px-2 py-1"/>
        </form>
      </div>
    );
  }

  return null;
}
