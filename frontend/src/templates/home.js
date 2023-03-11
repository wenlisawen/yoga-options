import React from "react";
import { useHistory, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Home = () => {
  const history = useHistory();

  return (
    <>
      <section id="showcase" className="py-16">
        <div className="tw-container grid lg:grid-cols-2 place-items-center gap-x-32">
          <article>
            <h1 className="tracking-wider font-bold text-4xl md:text-5xl">
              Yoga Options
            </h1>
            <div className="icon centre">
              <img
                alt="icon"
                src="../../src//icon.jpg"
              />
            </div>
            <p className="mt-8 max-w-lg leading-loose ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at
              sed omnis corporis doloremque possimus velit! Repudiandae nisi odit,
              aperiam odio ducimus, obcaecati libero et quia tempora excepturi
              quis alias?
            </p>
            <Button
              variant="light"
              className="btn text-center"
              onClick={() => history.push("/login")}
            >
              Get Started
            </Button>
          </article>
        </div>
      </section>
    </>
  );
};

export default Home;
