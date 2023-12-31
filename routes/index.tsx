import { Head } from "$fresh/runtime.ts";
import Admin from "../islands/Admin.tsx";

import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "preact";

interface Data {
  results: string[];
  query: string;
}

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
