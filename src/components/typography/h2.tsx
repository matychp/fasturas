import { cn } from "~/lib/utils";

interface TypographyH2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function TypographyH2({ children, ...props }: TypographyH2Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        props.className,
      )}
    >
      {children}
    </h2>
  );
}
