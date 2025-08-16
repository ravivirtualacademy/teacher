
import React from 'react';

// Define a more specific type for the props to help with type checking
interface LucideProps extends React.SVGProps<SVGSVGElement> {
  // You can add any other props that lucide-react icons accept
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
}

interface IconProps extends LucideProps {
  name: string;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  // Check if LucideReact is available on the window object
  if (typeof window === 'undefined' || !window.LucideReact || !(name in window.LucideReact)) {
    // Return a fallback or null if the library or icon isn't available
    return <svg {...props}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /></svg>;
  }

  // Dynamically create the icon component
  const LucideIcon = React.createElement(window.LucideReact[name], props);

  return LucideIcon;
};
