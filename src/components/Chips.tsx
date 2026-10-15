export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item} className="rounded-full bg-fg/[0.06] px-2.5 py-0.5 text-xs font-medium text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}
