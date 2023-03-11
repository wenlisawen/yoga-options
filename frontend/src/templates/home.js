import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
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
              className="z-30 bg-gray-100 transform -translate-x-2/4 absolute left-0 bottom-0  w-5/12 h-40 rounded-md"
              src="assets/icon.jpg"
            />
          </div>
          <p className="mt-8 max-w-lg leading-loose ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at
            sed omnis corporis doloremque possimus velit! Repudiandae nisi odit,
            aperiam odio ducimus, obcaecati libero et quia tempora excepturi
            quis alias?
          </p>
          <Link
            to="/login"
            className="btn px-6 py-3 bg-blue-500 text-white w-full md:w-max text-center mt-8"
          >
            Get Started
          </Link>
        </article>
      </div>
    </section>
  </>
);

export default Home;
