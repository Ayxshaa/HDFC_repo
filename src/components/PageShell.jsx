import BrandFooter from './BrandFooter.jsx';
import BrandHeader from './BrandHeader.jsx';

/**
 * Full-viewport screen layout: masthead, scrollable main area, brand rule.
 * @param {{ mainClassName?: string, children: React.ReactNode }} props
 */
export default function PageShell({ mainClassName = '', children }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-hdfc-bg">
      <BrandHeader />
      <main
        className={`flex flex-1 flex-col items-center justify-center overflow-y-auto ${mainClassName}`}
      >
        {children}
      </main>
      <BrandFooter />
    </div>
  );
}
