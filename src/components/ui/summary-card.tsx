import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning" | "destructive";
  delay?: number;
}

const variantStyles = {
  default: "bg-card border border-border",
  primary: "bg-primary text-primary-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  destructive: "bg-destructive text-destructive-foreground",
};

const iconVariantStyles = {
  default: "bg-accent text-accent-foreground",
  primary: "bg-primary-foreground/20 text-primary-foreground",
  success: "bg-success-foreground/20 text-success-foreground",
  warning: "bg-warning-foreground/20 text-warning-foreground",
  destructive: "bg-destructive-foreground/20 text-destructive-foreground",
};

export function SummaryCard({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
  delay = 0,
}: SummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={cn(
        "rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 shadow-sm transition-shadow hover:shadow-md",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 sm:space-y-2 min-w-0">
          <p
            className={cn(
              "text-xs sm:text-sm font-medium truncate",
              variant === "default" ? "text-muted-foreground" : "opacity-80"
            )}
          >
            {title}
          </p>
          <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p
              className={cn(
                "text-xs font-medium",
                trend.isPositive
                  ? variant === "default"
                    ? "text-success"
                    : "opacity-90"
                  : variant === "default"
                  ? "text-destructive"
                  : "opacity-90"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div
          className={cn(
            "rounded-lg p-2 md:p-3 shrink-0",
            iconVariantStyles[variant]
          )}
        >
          <Icon className="h-4 w-4 md:h-5 md:w-5" />
        </div>
      </div>
    </motion.div>
  );
}
