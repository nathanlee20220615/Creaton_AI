import React from 'react';

interface CreatonLogoProps {
  className?: string;
  height?: number;
  width?: number | string;
  invert?: boolean;
}

export const CreatonLogo: React.FC<CreatonLogoProps> = ({
  className = '',
  height = 19.1875,
  width,
  invert = false
}) => {
  const calculatedWidth = width
    ? (typeof width === 'number' ? `${width}px` : width)
    : `${(height * 1518) / 234}px`;

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={invert ? '/assets/aistudio/creaton_bi_bright_9c9b30bb.png' : '/assets/aistudio/creaton_bi_dark_de96c17b.png'}
        alt="CREATON"
        style={{
          width: calculatedWidth,
          height: `${height}px`
        }}
        className="object-contain transition-opacity duration-200 hover:opacity-85"
      />
    </div>
  );
};

// Aliases for compatibility with existing imports
export const StagoraLogo = CreatonLogo;
export const SundayLogo = CreatonLogo;

export const SundayClover: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 28,
  className = '',
  color = 'currentColor'
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      aria-label="Brand symbol"
    >
      <path
        d="M32 12C20.9543 12 12 20.9543 12 32C12 43.0457 20.9543 52 32 52H48V32C48 20.9543 39.0457 12 32 12Z"
        fill={color}
      />
      <path
        d="M68 12C79.0457 12 88 20.9543 88 32C88 43.0457 79.0457 52 68 52H52V32C52 20.9543 60.9543 12 68 12Z"
        fill={color}
      />
      <path
        d="M32 88C20.9543 88 12 79.0457 12 68C12 56.9543 20.9543 48 32 48H48V68C48 79.0457 39.0457 88 32 88Z"
        fill={color}
      />
      <path
        d="M68 88C79.0457 88 88 79.0457 88 68C88 56.9543 79.0457 48 68 48H52V68C52 79.0457 60.9543 88 68 88Z"
        fill={color}
      />
    </svg>
  );
};

export default CreatonLogo;
