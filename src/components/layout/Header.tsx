import { UserMenu } from './UserMenu';

export function Header() {
  return (
    <header className="py-4 bg-white border-b border-[var(--color-border)] flex items-center justify-between px-6">
      <UserMenu />
    </header>
  );
}