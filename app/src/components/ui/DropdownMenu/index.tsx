import { useEffect, useState } from "react";
import { compare } from "../../../utils";
import DropdownMenuItem, { DropdownMenuItemProps } from "./DropdownMenuItem";

import "./style.css";

type DropdownMenuProps<T> = {
  items: {
    key: string | number;
    title: string;
    value: T;
  }[];
  value?: T;
  onChange: (value: T) => void;
};

const DropdownMenu = <T,>({ items, onChange, value }: DropdownMenuProps<T>) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={["dropdown-menu", open ? "open" : ""].join(" ")}
      onFocus={() => {
        setOpen(true);
      }}
      onBlur={() => {
        setOpen(false);
      }}
    >
      <button>
        {items.find((item) => {
          return compare(item.value, value);
        })?.title ?? "Choose an option"}
      </button>
      <ul>
        {items.map((item) => (
          <DropdownMenuItem<T>
            key={item.key}
            title={item.title}
            value={item.value}
            onClick={(value) => {
              onChange(value);
              setOpen(false);
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
