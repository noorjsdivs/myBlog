import React from "react";
import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../../sanity";
import Header from "../../components/Header";
import { Post } from "../../typings";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Footer from "../../components/Footer";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <main className="font-body">
      <Header />

      <img
        className="w-full h-80 object-cover"
        src={urlFor(post.mainImage).url()!}
        alt="banner image"
      />
      <article className="max-w-3xl mx-auto p-5 bg-yellow-50">
        <h1 className="text-3xl mt-10 mb-1  text-center underline font-bold">
          {post.title}
        </h1>
        <h2 className="text-xl font-semibold text-gray-500 text-center font-body">
          {post.description}
        </h2>
        <div className="flex justify-center items-center space-x-2 mt-1">
          <img
            className="h-14 w-14 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt="Image"
          />
          <p className="font-extralight text-sm">
            Blog post by{" "}
            <span className="text-yellow-700 font-bold underline">
              {post.author.name}
            </span>{" "}
            - Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div>
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "8mjsbi9f"}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-4xl font-title font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-3xl font-title font-bold my-5" {...props} />
              ),
              h3: (props: any) => (
                <h3 className="text-2xl font-title font-bold my-5" {...props} />
              ),
              h4: (props: any) => (
                <h4 className="text-xl font-title font-bold my-5" {...props} />
              ),
            }}
          />
        </div>
      </article>

      <hr className="max-w-lg my-5 border border-yellow-500 mx-auto" />
      {submitted ? (
        <div className="flex flex-col py-10 my-10 bg-yellow-600 text-white max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-title font-bold">
            Thank you for submitting your Comment!
          </h1>
          <p>Once it has been approved by Admin, it will appear below!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-2xl mx-auto"
        >
          <h3 className="text-sm text-yellow-500 font-bold">
            Enjoyed this article?
          </h3>
          <h4 className="text-3xl font-body font-bold">
            Leave a Comment below!
          </h4>
          <hr className="py-3 mt-2" />

          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <label className="block mb-5">
            <span className="text-gray-700">Name </span>
            <input
              {...register("name", { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none"
              placeholder="Enter your Name"
              type="text"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Email </span>
            <input
              {...register("email", { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none"
              placeholder="Give a valid Email"
              type="email"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Comment </span>
            <textarea
              {...register("comment", { required: true })}
              className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 focus:ring outline-none"
              placeholder="type your comments here"
              rows={5}
            />
          </label>
          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-yellow-700">
                - The Name Field is Required
              </span>
            )}
            {errors.email && (
              <span className="text-yellow-700">
                - The Email Field is Required
              </span>
            )}
            {errors.comment && (
              <span className="text-yellow-700">
                - The Comment Field is Required
              </span>
            )}
          </div>
          <input
            className="shadow bg-yellow-500 hover:bg-yellow-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
            type="submit"
          />
        </form>
      )}
      {/* Comments are going here */}
      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-600 shadow space-y-2">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />
        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-yellow-600"> {comment.name}</span> :{" "}
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
  _id,
 slug{
  current
}
}`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  _createdAt,
  title,
  author ->{
  name,
  image
},
'comments': *[
  _type == "comment" &&
  post._ref == ^._id &&
  approved == true],
description,
mainImage,
slug,
body
}`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60, // After 60 seconds it will update old cache.
  };
};
