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
  const result3 = await client.users.getUser.query();
  console.log(result3);
}

main();
