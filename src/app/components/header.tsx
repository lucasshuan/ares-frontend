"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="flex items-center justify-between border-b border-muted px-4 h-16 gap-4">
      <Link href="/" className="font-bold text-2xl">
        ares
      </Link>
      <div className="flex gap-4 justify-center items-center">
        <Button variant="ghost" className="text-md">
          Games
        </Button>
        {session && session.user ? (
          <>
            <Button
              onClick={() => signOut()}
              variant="ghost"
              className="text-md"
            >
              Sign Out
            </Button>
            <Image
              src={session.user.image!}
              alt="user avatar"
              className="rounded-3xl"
              width={32}
              height={32}
            />
          </>
        ) : (
          <Button
            onClick={() => signIn("google")}
            variant="ghost"
            className="text-md"
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
