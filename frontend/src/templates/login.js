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

  if (isAuthenticated) {
    return (
      <Breadcrumbs>
        <Link to="/">Home</Link>
        Login
      </Breadcrumbs>
    );
  }

  return null;
}
