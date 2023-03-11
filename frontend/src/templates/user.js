import React, { useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { useHistory, Link } from "react-router-dom";
import { StoreContext } from "../context";

import CONFIG from "../config";

import Breadcrumbs from "../components/Breadcrumbs";
import Counter from "../components/Counter";
import Loader from "../components/Loader";

export default function User({ id }) {
  const { response: user, error } = useFetch(`${CONFIG.api_url}/user/${id}`);

  const history = useHistory();
  const { setCart } = useContext(StoreContext);

  if (!user) return <Loader />;
  if (error) return <div>Error.</div>;

  const { username, email, role } = user;

  return (
    <>
      <Breadcrumbs>
        <Link to="/">Home</Link>
        <Link to="/admin/users">users</Link>
        <span>{username}</span>
      </Breadcrumbs>
      <section>
        <div className="tw-container py-16">
          <Link to="/users" className="btn-sm bg-blue-500 text-white w-max">
            Back to Users
          </Link>
          <div className="grid lg:grid-cols-2 items-center gap-16 mt-6">
            <article
              id="user-info"
              className="capitalize flex flex-col gap-5 lg:gap-4 text-sm md:text-base"
            >
              <div>
                <h2 className="font-bold">{username}</h2>
              </div>
              <div>
                <h4 className="font-normal">{email}</h4>
              </div>
              <div>
                <h4 className="font-normal">{role}</h4>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
