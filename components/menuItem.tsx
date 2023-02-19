export interface MenuItemProps {
  href: string;
  text: string;
}

export function MenuItem(props: MenuItemProps) {
  function goTo(location: string) {
    window.location.href = location;
  }

  return (
    <a
      href={props.href}
      onKeyPress={() => goTo(props.href)}
      class={"flex items-end pl-3 p-1 border(r-8 [#d43900] opacity-0 hover:opacity-100) text(dark:[#ddd] hover:[#d43900] hover:dark:white) duration-200 cursor-pointer active hover:bg-[#e6e6e6] hover:dark:bg-[#626262]"}
    >
      <div class="text-sm">{props.text}</div>
    </a>
  );
}
