import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session === null) {
    return <main>Not logged in</main>;
  }

  return <main>Home</main>;
}
