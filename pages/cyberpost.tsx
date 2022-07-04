import React from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Cyberpost } from "../typings";
import { signIn, signOut, useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

interface Props {
  posts: [Cyberpost];
}

function Cyberpost({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      {/* ==========================================================
                    Body Description part start here
      ============================================================*/}
      <div className="flex justify-between items-center bg-yellow-500 border-y border-black py-10 lg:py-0">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="px-10 space-y-5">
          <h1 className="text-5xl max-w-xl font-title">
            <span className="font-semibold leading-tight">
              Cyber Security Portal
            </span>
            .
          </h1>
          <h2>
            This is a personal blog designed to sort out some common knowledge
            about Programming.
            <br />
            Fell free to leave a comments about the article. <br />
            If you want to add your own article please procced to <br />
            Do not miss to see some of my finished{" "}
            <span className="font-bold underline cursor-pointer">
              Projects.
            </span>
          </h2>
        </div>
        <div>
          <img
            className="hidden md:inline-flex h-32 lg:h-full"
            src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
            alt="Image"
          />
        </div>
      </div>
      {/* ==========================================================
                    Body Description part start here
      ============================================================*/}
      {/* ==========================================================
                    Posts part start here
      ============================================================*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6 cursor-pointer ">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="bg-white w-full group overflow-hidden">
              <img
                className="w-full grayscale object-cover h-60 mx-auto transition-transform duration-500 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
                src={urlFor(post.mainImage).url()!}
                alt="Image"
              />

              <div className="flex justify-between p-5 bg-yellow-100">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by{" "}
                    <span className="font-body font-bold">
                      {post.author.name}
                    </span>
                  </p>
                </div>
                <img
                  className="h-14 w-14 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt="Image"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* ==========================================================
                    Posts part end here
      ============================================================*/}
      <Footer />
    </div>
  );
}

export default Cyberpost;

export const getServerSideProps = async () => {
  const query = `*[_type == "cyberpost"]{
  _id,
  title,
 author ->{
  name,
  image
},
description,
mainImage,
slug
}`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
