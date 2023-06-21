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

interface TableRowProps extends JSX.HTMLAttributes<HTMLDivElement> {
  item: KvRow;
  onSelectRow : (key:string[]) => void;
}

function TableRow({ item, onSelectRow }: TableRowProps) {
  return (
    <div class={rowClass} onClick={()=>{
      onSelectRow(item.key);
    }}>
      <div class={cellClass + " w-[250px]"}>{item.key.join(",")}</div>
      <div class={cellClass}>Object</div>
      <div class={cellClass}>0000001</div>
    </div>
  );
}

interface KvRow {
  key: string[];
  value: any;
}

interface TableProps extends JSX.HTMLAttributes<HTMLDivElement> {
  onSelectRow: (key: string[]) => void;
  items: KvRow[];
}

function Table(props: TableProps) {
  return (
    <div>
      <TableHeader />
      {props.items.map((item) => {
        return (
          <TableRow
            item={item}
            onSelectRow={ props.onSelectRow}
          />
        );
      })}
    </div>
  );
}

interface AdminProps extends JSX.HTMLAttributes<HTMLDivElement> {
}

export default function Admin(props: AdminProps) {
  const buttonClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const inputClass = "border border-gray-300 bg-white rounded px-3 py-2 w-full";

  const items: KvRow[] = [
    {
      key: ["users", "admins", "Kevin"],
      value: {
        username: "Kevin",
      },
    },
    {
      key: ["users", "admins", "Andy"],
      value: {
        username: "Andy",
      },
    },
  ];

  const editingKey = ["users", "admins", "Kevin"];
  const editingValue = items.find((item) => {
    return item.key.join(",") === editingKey.join(",");
  })?.value;

  return (
    <div class="flex flex-col gap-8 w-full">
      <div class="flex gap-2 items-center">
        Query [all keys] &gt; users &gt; admins &gt;{" "}
        <input class={inputClass + " w-64"} type="text" />
        <button class={buttonClass}>+</button>
        <button class={buttonClass}>reload</button>
      </div>
      <div class="flex flex-1 gap-8">
        <div>
          <Table
            items={items}
            onSelectRow={(e) => {
              console.log(e);
            }}
          />
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
            <textarea class={inputClass} type="text" value={JSON.stringify(editingValue, null, 2)} />
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
