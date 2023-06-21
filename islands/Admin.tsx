import type { Signal } from "@preact/signals";
import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

interface AdminProps {
  count: Signal<number>;
}
const rowClass = "flex flex-row border hover:bg-gray-100 cursor-pointer";
const cellClass =
  "w-[150px] overflow-hidden whitespace-nowrap  border-b-1 border-l-1 px-2 py-1";

function TableHeader() {
  const add = " text-sm uppercase font-bold text-gray-500"
  return (
    <div class={rowClass}>
      <div class={cellClass + " w-[250px]" + add}>Key</div>
      <div class={cellClass + add}>Value Type</div>
      <div class={cellClass+ add}>Version Stamp</div>
    </div>
  );
}

interface TableRowProps extends JSX.HTMLAttributes<HTMLDivElement> {
  item: KvRow;
  onSelectRow: (key: string[]) => void;
}

function TableRow(props: TableRowProps) {
  const item = props.item;
  const onSelectRow = props.onSelectRow;

  return (
    <div
      class={  props.class + " " + rowClass}
      onClick={() => {
        onSelectRow(item.key);
      }}

    >
      <div class={cellClass + " w-[250px]"}>{item.key.join(",")}</div>
      <div class={cellClass}>Object</div>
      <div class={cellClass}>{item.versionStamp}</div>
    </div>
  );
}

interface KvRow {
  key: string[];
  value: any;
  versionStamp?: string;
}

interface TableProps extends JSX.HTMLAttributes<HTMLDivElement> {
  onSelectRow: (key: string[]) => void;
  selectedKey?: string;
  items: KvRow[];
}

function Table(props: TableProps) {
  return (
    <div>
      <TableHeader />
      {props.items.map((item) => {
        const selected = props.selectedKey === item.key.join(",");
        return (
          <TableRow
            item={item}
            class={selected ? "text-blue-500" : ""}
            onSelectRow={props.onSelectRow}
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
  const [query, setQuery] = useState<string[]>(["users", "admin"]);
  const [items, setItems] = useState<KvRow[]>([]);

  useEffect(() => {
    (async () => {
      const api = "/kv";
      const items = await fetch(api + "/list?key=" + query.join(","));
      const result = await items.json();
      setItems(result);

      console.log(result);
    })();
  }, [query]);

  // const items: KvRow[] = [
  //   {
  //     key: ["users", "admins", "Kevin"],
  //     value: {
  //       username: "Kevin",
  //     },
  //     versionStamp: "0000001",
  //   },
  //   {
  //     key: ["users", "admins", "Andy"],
  //     value: {w
  //       username: "Andy",
  //     },
  //     versionStamp: "0000001",
  //   },
  // ];

  const [editingKey, setEditingKey] = useState<string[]>([]);
  const editingValue = items.find((item) => {
    return item.key.join(",") === editingKey.join(",");
  });

  return (
    <div class="flex flex-col gap-8 w-full">
      <div class="flex gap-2 items-center border-b-1 pb-4">
        <img src="/kvapi.svg" alt="" />
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
              setEditingKey(e);
            }}
            selectedKey={editingKey.join(",")}
          />
        </div>
        <div class="flex-1">
          <h2 class="text-xl">Edit Value</h2>

          <form action="/new" method="POST">
            <div>
              <div class="text-lg">Key</div>
              <input
                class={inputClass}
                type="text"
                value={editingValue?.key}
                name="key"
              />
            </div>
            <div>
              <div class="text-lg">Version</div>
              <input
                class={inputClass}
                type="text"
                value={editingValue?.versionStamp}
              />
            </div>
            <div>
              <div class="text-lg">Value</div>
              <textarea
                name="value"
                class={inputClass + " h-64"}
                type="text"
                value={JSON.stringify(editingValue?.value, null, 2)}
              />
            </div>

            <div class="flex gap-4">
              <input type="submit" class={buttonClass} value="Save" />
              <button class={buttonClass}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
