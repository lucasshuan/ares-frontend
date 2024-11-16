"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogInIcon, LogOutIcon } from "lucide-react";

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
              <LogOutIcon />
            </Button>
            <Avatar>
              <AvatarImage
                src={session.user.image!}
                alt="user avatar"
              ></AvatarImage>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <>
            <Button
              onClick={() => signIn("google")}
              variant="ghost"
              className="text-md"
            >
              Sign In
              <LogInIcon size={22} />
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
