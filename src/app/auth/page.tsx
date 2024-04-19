import { FaUserAlt } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { getProviders, signIn, ClientSafeProvider } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import  Head  from "next/head";

interface HomeProps {
  providers: Record<string, ClientSafeProvider> | null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default function AuthPage({ providers }: HomeProps) {
  const { data: session, status } = useSession()

  const handleSignIn = async (providerId: string) => {
    const result = await signIn(providerId);
    if (result?.error) {
      console.error('Sign in error:', result.error);
    } else {
      console.log('Signed in successfully:', session);
      console.log(status);
    }
  };

  return (
    
    <main className="flex flex-col min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
              <Head>
        <title>Authentication Page</title>
        <meta name="description" content="Sign in or sign up to access your account" />
      </Head>
      <div className="flex min-h-full flex-col justify-center px-16 py-12 rounded-lg shadow min-w-custom bg-custom-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-custom-blue">
            Sign in
          </h2>
        </div>

        <div className="mt-20 mx-0 w-full">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="invisible">
                Email address
              </label>
              <div className="mt-2 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full placeholder:text-2xl py-1.5 pl-10 text-black placeholder:custom-gray focus:outline-none sm:text-sm sm:leading-6 border-custom-gray border-b-2 placeholder:italic"
                  placeholder="username"
                />
                <span className="text-gray-400 absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaUserAlt />
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="invisible">
                  Password
                </label>
              </div>
              <div className="mt-2 relative mb-12">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="password"
                  className="appearance-none placeholder:text-2xl block w-full py-1.5 pl-10 text-black placeholder:custom-gray focus:outline-none sm:text-sm sm:leading-6 border-custom-gray border-b-2 placeholder:italic"
                />
                <span className="text-gray-400 absolute inset-y-0 left-0 flex items-center pl-3">
                  <MdLock />
                </span>
              </div>
            </div>

            <div className="flex items-center mt-4 mb-12">
              <input
                id="keep-signed-in"
                name="keep-signed-in"
                type="checkbox"
                className="w-4 h-4 border-2 accent-custom-blue rounded border-custom-blue focus:ring-0"
              />
              <label
                htmlFor="keep-signed-in"
                className="ml-2 block text-xl leading-5 text-gray-400"
              >
                Keep me signed in
              </label>
            </div>

            <div>

            {providers ? (
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.id}
                    type="submit"
                    className="uppercase flex w-full justify-center rounded-2xl bg-custom-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSignIn(provider.id);
                    }}
                  >
                    Sign in with {provider.name}
                  </button>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Forgot password?
          </p>

        </div>

      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
            Not a member? {" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
    </main>
  );
}

