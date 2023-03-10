import React from "react";
import { useHistory, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Home = () => {
  const history = useHistory();

  return (
    <>
      <div className="home-container">
        <h1 className="tracking-wider font-bold text-4xl md:text-5xl">
          Yoga Options
        </h1>
        <div className="icon">
          <img alt="icon" src="image/logo_transparent.png" />
        </div>
        <div className="home-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
          at sed omnis corporis doloremque possimus velit! Repudiandae nisi
          odit, aperiam odio ducimus, obcaecati libero et quia tempora
          excepturi quis alias?
        </div>
        <Button
          variant="light"
          className="btn text-center"
          onClick={() => history.push("/login")}
        >
          Get Started
        </Button>
      </div>
    </>
  );
};

export default Home;
