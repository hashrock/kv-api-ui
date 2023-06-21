import { Head } from "$fresh/runtime.ts";
import Admin from "../islands/Admin.tsx";

import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "preact";

interface Data {
  results: string[];
  query: string;
}
export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    return ctx.render();
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const value = form.get("value");
    const key = form.get("key");

    fetch("http://localhost:8000/kv?key=" + key, {
      method: "POST",
      body: JSON.stringify({
        key: key,
        value: value,
      }),
    });
    return ctx.render();
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-5xl">
        <Admin />
      </div>
    </>
  );
}
