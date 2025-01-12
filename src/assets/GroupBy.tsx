import React from 'react';

interface GroupByIconProps {
  size?: number;
  className?: string;
}

export const GroupByIcon: React.FC<GroupByIconProps> = ({ 
  size = 24, 
  className 
}) => {
  return (
    <svg 
      height={size} 
      width={size} 
      focusable="false" 
      viewBox="0 0 16 16"
      className={className}
    >
      <path d="M8.5 0.5H0.5V4.5H8.5V0.5Z" fill="#fff" />
      <path d="M8 9.479V8.5H7.75H7H2.5V12.5H10.021L10.5 12.021V11.979L8 9.479Z" fill="#fff" />
      <path d="M15 10V9H10.711L13.711 12L10.711 15H15V14H16V16H9V15.289L12.289 12L9 8.711V8H16V10H15Z" fill="#0078d4" />
      <path d="M2.85358 4.14677L2.14648 4.85387L6.14655 8.85394L6.85365 8.14684L2.85358 4.14677Z" fill="#000" />
      <path d="M9 0H0V5H9V0ZM8 4H1V1H8V4Z" fill="#000" />
      <path d="M10.521 12L10 11.479V12H3V9H8V8H2V13H9.521L10.521 12Z" fill="#000" />
    </svg>
  );
};

export default GroupByIcon;
