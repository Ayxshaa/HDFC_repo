import BrandFooter from './BrandFooter.jsx';
import BrandHeader from './BrandHeader.jsx';

/**
 * Full-viewport screen layout: masthead, main area, brand rule.
 * @param {{ mainClassName?: string, scroll?: boolean, children: React.ReactNode }} props
 */
export default function PageShell({ mainClassName = '', scroll = true, children }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-hdfc-bg">
      <BrandHeader />
      <main
        className={`flex flex-1 flex-col items-center justify-center ${scroll ? 'overflow-y-auto' : 'overflow-hidden'} ${mainClassName}`}
      >
        {children}
      </main>
      <BrandFooter />
    </div>
  );
}
