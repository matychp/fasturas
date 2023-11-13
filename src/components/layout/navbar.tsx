import { ModeToggle } from "~/components/layout/modeToggle";
import { TypographyH1 } from "~/components/typography/h1";

export const NavBar = () => {
  return (
    <div className="flex h-16 w-full items-center justify-between px-4">
      <div className="flex gap-2">
        <TypographyH1>🥐</TypographyH1>
        <TypographyH1 className="underline underline-offset-4">
          Fasturas
        </TypographyH1>
      </div>
      <ModeToggle />
    </div>
  );
};