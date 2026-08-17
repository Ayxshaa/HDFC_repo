/** Thin navy/red brand rule pinned to the bottom of every screen. */
export default function BrandFooter() {
  return (
    <footer className="h-1 w-full shrink-0">
      <div className="flex h-full">
        <span className="w-3/4 bg-hdfc-navy" />
        <span className="w-1/4 bg-hdfc-red" />
      </div>
    </footer>
  );
}
