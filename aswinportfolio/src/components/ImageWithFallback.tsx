import { ReactNode, useState } from 'react';
import { Cpu } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  icon?: ReactNode;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackTitle,
  icon,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        className={`flex flex-col items-center justify-center bg-[#0B0F17] p-8 text-center text-[#93A4BD] ${className}`}
      >
        <div className="mb-3">{icon ?? <Cpu className="h-6 w-6 text-[#E5A94C]" />}</div>
        {fallbackTitle ? (
          <span className="font-display text-sm font-semibold text-[#F4F7FB]">
            {fallbackTitle}
          </span>
        ) : null}
        {alt ? <span className="mt-1 max-w-xs text-xs text-[#93A4BD]">{alt}</span> : null}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
