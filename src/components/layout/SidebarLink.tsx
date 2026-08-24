import { memo } from 'react';
import { Link } from 'react-router-dom';

interface SidebarLinkProps {
  to: string;
  isActive: boolean;
  label: string;
  icon?: string;
  iconOnly?: boolean;
}

export const SidebarLink = memo(function SidebarLink({ to, isActive, label, icon, iconOnly }: SidebarLinkProps) {
  return (
    <Link
      to={to}
      aria-current={isActive ? 'page' : undefined}
      title={iconOnly ? label : undefined}
      className={`flex items-center ${iconOnly ? 'justify-center' : 'gap-2 text-left'} p-3 rounded-lg border-l-4 border-white ${isActive ? 'bg-primary-light text-primary !border-[var(--color-primary)]' : 'hover:bg-primary-light'}`}
    >
      {icon ? (
        <img src={icon} alt={iconOnly ? undefined : label} className="w-5 h-5 object-contain" />
      ) : (
        <span className="w-5 h-5 inline-block" aria-hidden="true" />
      )}
      {!iconOnly && <span>{label}</span>}
    </Link>
  );
});
