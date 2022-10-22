export type DropdownMenuItemProps<T> = {
  title: string;
  value: T;
  onClick: (value: T) => void;
};

const DropdownMenuItem = <T,>({
  title,
  value,
  onClick,
}: DropdownMenuItemProps<T>) => {
  return (
    <li className="dropdown-menu_item">
      <button onClick={() => onClick(value)}>{title}</button>
    </li>
  );
};

export default DropdownMenuItem;
