import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  loggerLink,
  splitLink,
  wsLink,
} from "@trpc/client";
import { type AppRouter } from "../backend/routers/index";

const wsClient = createWSClient({
  url: "ws://localhost:3000/trpc",
});

const client = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    splitLink({
      condition: (op) => {
        return op.type === "subscription";
      },
      true: wsLink({ client: wsClient }),
      false: httpBatchLink({
        url: "http://localhost:3000/trpc",
        headers: { Authorization: "TOKEN" },
      }),
    }),
  ],
});

async function main() {
  if (false) {
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
  } else {
    client.users.onUpdate.subscribe(undefined, {
      onData: (id) => {
        console.log(`Updated ${id}`);
      },
    });
  }
}

main();
