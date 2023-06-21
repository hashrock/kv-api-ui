import type { Signal } from "@preact/signals";
import { JSX } from "preact";

interface AdminProps {
  count: Signal<number>;
}
const rowClass = "flex flex-row border";
const cellClass =
  "w-[150px] overflow-hidden whitespace-nowrap  border-b-1 border-l-1 px-2 py-1";

function TableHeader() {
  return (
    <div class={rowClass}>
      <div class={cellClass + " w-[250px]"}>Key</div>
      <div class={cellClass}>Value Type</div>
      <div class={cellClass}>Version Stamp</div>
    </div>
  );
}

function TableRow() {
  return (
    <div class={rowClass}>
      <div class={cellClass + " w-[250px]"}>["users", "admins", "Kevin"]</div>
      <div class={cellClass}>Object</div>
      <div class={cellClass}>0000001</div>
    </div>
  );
}

function Table() {
  return (
    <div>
      <TableHeader />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
    </div>
  );
}

interface AdminProps extends JSX.HTMLAttributes<HTMLDivElement> {
}

export default function Admin(props: AdminProps) {
  const buttonClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
    const inputClass =
    "border border-gray-300 bg-white rounded px-3 py-2 focus:outline-none w-full";

  return (
    <div class="flex flex-col gap-2 w-full">
      <div class="flex gap-2 items-center">
        Query [all keys] &gt; users &gt; admins &gt;{" "}
        <input class={inputClass + " w-64"} type="text" />
        <button class={buttonClass}>+</button>
        <button class={buttonClass}>reload</button>
      </div>
      <div class="flex flex-1 gap-8">
        <div>
          <Table />
        </div>
        <div class="flex-1">
          <h2 class="text-xl">Edit Value</h2>

          <div>
            <div class="text-lg">Key</div>
            <input class={inputClass} type="text" />
          </div>
          <div>
            <div class="text-lg">Version</div>
            <input class={inputClass} type="text" />
          </div>
          <div>
            <div class="text-lg">Value</div>
            <textarea class={inputClass} type="text" />
          </div>

          <div class="flex gap-4">
          <button class={buttonClass}>Save</button>
          <button class={buttonClass}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
