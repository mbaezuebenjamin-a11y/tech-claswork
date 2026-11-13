import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
}

export function EditorialImage({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-[4/3]',
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`${aspectClass} ${className} flex flex-col items-center justify-center bg-[#EBE6DC] text-[#5C5A54] p-6 text-center border border-[#E5E0D5]`}
        role="img"
        aria-label={alt}
      >
        <BookOpen className="w-7 h-7 mb-2 text-[#1B4332]/70" strokeWidth={1.5} />
        <span className="font-serif text-sm italic text-[#141413]/80 max-w-xs line-clamp-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`${aspectClass} overflow-hidden bg-[#EBE6DC] ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}
