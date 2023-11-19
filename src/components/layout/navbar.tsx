import Image from "next/image";
import { ModeToggle } from "~/components/layout/modeToggle";
import { TypographyH1 } from "~/components/typography/h1";
import { SessionButton } from "./session-button";

export const NavBar = () => {
  return (
    <div className="flex h-16 w-full items-center justify-between px-4">
      <div className="flex gap-2">
        <Image src="/favicon.ico" alt="a croissant" width={48} height={48} />
        <TypographyH1 className="underline underline-offset-4">
          Fasturas
        </TypographyH1>
      </div>
      <div className="flex justify-center gap-4">
        <ModeToggle />
        <SessionButton />
      </div>
    </div>
  );
};
