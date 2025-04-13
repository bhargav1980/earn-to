
import { Coins } from "lucide-react";

type TokenDisplayProps = {
  amount: number;
  size?: "sm" | "md" | "lg";
  showAnimation?: boolean;
  className?: string;
};

const TokenDisplay = ({ 
  amount, 
  size = "md", 
  showAnimation = false,
  className = "" 
}: TokenDisplayProps) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg font-bold"
  };
  
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <div className={`flex items-center gap-1 ${className} ${showAnimation ? 'animate-reward-pulse' : ''}`}>
      <div className={`text-brand-amber ${showAnimation ? 'token-glow' : ''}`}>
        <Coins size={iconSizes[size]} />
      </div>
      <span className={`${sizeClasses[size]}`}>{amount.toFixed(2)} APT</span>
    </div>
  );
};

export default TokenDisplay;
