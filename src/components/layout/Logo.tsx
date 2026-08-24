import { memo } from 'react';
import { APP_LABELS } from '@/constants/app';

interface LogoProps {
  className?: string;
}

export const Logo = memo(function Logo({ className }: LogoProps) {
  return (
    <img src={APP_LABELS.images.logo} alt={APP_LABELS.appTitle} className={`w-40 h-auto object-contain ${className || ''}`} />
  );
});
