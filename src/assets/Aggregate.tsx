import React from 'react';

interface AggregateIconProps {
  color?: string;
  size?: number;
}

export const AggregateIcon: React.FC<AggregateIconProps> = ({ 
  color = "#0078d4",
  size = 24 
}) => {
  return (
    <svg 
      height={size} 
      width={size} 
      focusable="false" 
      viewBox="0,0,2048,2048" 
      style={{ color }}
    >
      <path 
        className="OfficeIconColors_HighContrast" 
        d="M 1664 384 v -128 h -1189 l 768 768 l -768 768 h 1189 v -128 h 128 v 256 h -1536 v -91 l 805 -805 l -805 -805 v -91 h 1536 v 256 z"
      />
      <path 
        className="OfficeIconColors_m22" 
        d="M 1664 384 v -128 h -1189 l 768 768 l -768 768 h 1189 v -128 h 128 v 256 h -1536 v -91 l 805 -805 l -805 -805 v -91 h 1536 v 256 z"
      />
    </svg>
  );
};

export default AggregateIcon;
