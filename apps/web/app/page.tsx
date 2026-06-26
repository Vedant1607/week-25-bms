import { client } from "@repo/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await client.user.findFirst();

  return (
    <div>
      {user?.email}
      {user?.password}
    </div>
  );
}