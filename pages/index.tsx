import React from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Noor-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {/* ==========================================================
                    Body Description part start here
      ============================================================*/}
      <div className="flex justify-between items-center bg-yellow-500 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-5xl max-w-xl font-title">
            <Link href="https://noorjsdivs.github.io/portfolio/">
              <a target="_blank">
                <span className="underline decoration-Zinc-900 decoration-4">
                  Noor Mohammad
                </span>
              </a>
            </Link>{" "}
            A{" "}
            <span className="font-semibold leading-tight">
              FULL STACK WEB DEVELOPER
            </span>
            .
          </h1>
          <h2>
            This is a personal blog designed to sort out some common knowledge
            about Programming.
            <br />
            Fell free to leave a comments about the article. <br />
            If you want to add your own article please procced to{" "}
            <Link href="/post/article">
              <span className="underline decoration-black font-semibold decoration-2 cursor-pointer">
                Contribute page
              </span>
            </Link>
            .
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
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
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
