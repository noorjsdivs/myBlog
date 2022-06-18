import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleContribute = () => {
    if (session) {
      router.push("/post/article");
      toast.success("Welcome to the Contribuation !");
    } else {
      toast.error(" Please Sign In to get ACCESS !");
    }
  };

  return (
    <header className="max-w-7xl mx-auto bg-yellow-100 flex items-center justify-between p-5 sticky top-0 z-50">
      <Toaster position="top-center" reverseOrder={false} />
      <Link href="/">
        <img
          className="w-44 object-contain cursor-pointer"
          src="https://links.papareact.com/yvf"
        />
      </Link>
      <div className="hidden md:inline-flex items-center space-x-2 font-semibold">
        <Link href="/">
          <h3 className="hover:bg-yellow-300 transform active:bg-yellow-600 duration-200 ease-in-out px-6 cursor-pointer py-2 rounded-md">
            Home
          </h3>
        </Link>

        <h3
          onClick={handleContribute}
          className="hover:bg-yellow-300 transform active:bg-yellow-600 duration-200 ease-in-out px-6 cursor-pointer py-2 rounded-md"
        >
          Contribute
        </h3>

        <Link href="https://noorjsdivs.github.io/portfolio/">
          <a target="_blank">
            <h3 className="hover:bg-yellow-300 hover:underline transform active:bg-yellow-600 duration-200 ease-in-out px-6 cursor-pointer py-2 rounded-md">
              HIRE Me
            </h3>
          </a>
        </Link>
      </div>
      <div className="flex items-center space-x-2 text-Zinc-900">
        <img
          className="w-8 h-8 rounded-full"
          src={
            session?.user?.image ||
            "https://cdn.sanity.io/images/8mjsbi9f/production/923dbacc3559b30a74ec1d2b5be43c49263962dc-500x500.png"
          }
          alt=""
        />
        <p>{session?.user?.name || "Hello Stranger !"}</p>
        {!session ? (
          <button
            onClick={() => signIn()}
            type="submit"
            className="font-semibold hover:bg-yellow-300 transform active:bg-yellow-600 duration-200 ease-in-out px-6 cursor-pointer py-1 rounded-md border border-yellow-700 "
          >
            Sign In
          </button>
        ) : (
          <button
            onClick={() => signOut()}
            type="submit"
            className="font-semibold hover:bg-yellow-300 transform active:bg-yellow-600 duration-200 ease-in-out px-6 cursor-pointer py-1 rounded-md border border-yellow-700"
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
