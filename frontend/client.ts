import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { type AppRouter } from "../backend/routers/index";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

async function main() {
  const result1 = await client.sayHi.query();
  console.log(result1);
  const result2 = await client.log.mutate("Hi from client");
  console.log(result2);
  const result3 = await client.users.get.query({ userId: "foobar" });
  console.log(result3);
  const result4 = await client.users.update.mutate({
    userId: "foobar",
    name: "New_Name",
  });
  console.log(result4);
  const result5 = await client.secretData.query();
  console.log(result5);
}

main();
