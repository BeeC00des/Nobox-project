"use client";
// import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { UserModel } from "../../nobox-baas/record-structures/user";


type Data = {
  name: string
}

export default function Home() {

  const [users, setUsers] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userPassword, setUserPassword] = useState<string | null>(null);

  const addSampleUser = async () => {
    setIsLoading(true);

    const user = await UserModel.insertOne({
      firstName: 'bee',
      email: 'bee@gmail.com',
      age: 24,
      password: "34val"
    });

    // console.log(user);
    setUsers(user.firstName);

    setUserPassword(user.password);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between f lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <p onClick={() => addSampleUser()} 
           className='boder-2 border-gray-500'> Add User <code style={{ fontSize: "10px" }}>{isLoading && `loading...`}</code></p>
          {userPassword && (
        <><p>User Password: {userPassword}</p>
        <p>user name: {users}</p></>
        )}
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
    </main>
  );
}
