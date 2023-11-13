"use client";
import { signOut } from "next-auth/react";

import { Button } from "~/components/ui/button";

export const SessionButton = () => {
  return <Button onClick={() => signOut()}>Logout</Button>;
};
