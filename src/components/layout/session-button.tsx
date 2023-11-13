"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "~/components/ui/button";

export const SessionButton = () => {
  const session = useSession();

  return (
    <>
      {session !== null && session.status === "unauthenticated" ? (
        <Button onClick={() => signIn()}>Login</Button>
      ) : (
        <Button onClick={() => signOut()}>Logout</Button>
      )}
    </>
  );
};
