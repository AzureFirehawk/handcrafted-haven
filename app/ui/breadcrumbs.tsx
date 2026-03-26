import Link from 'next/link';
 
type BreadcrumbItem = {
  label: string;
  href?: string;
};
 
type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};
 
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
<nav aria-label="Breadcrumb" className="mb-6 text-sm text-stone-500">
<ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
<li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
<Link href={item.href} className="transition hover:text-amber-700">
                {item.label}
</Link>
            ) : (
<span className="font-medium text-stone-700">{item.label}</span>
            )}
 
            {index < items.length - 1 && <span className="text-stone-400">/</span>}
</li>
        ))}
</ol>
</nav>
  );
}