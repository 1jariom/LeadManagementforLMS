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
  default: "bg-white border border-gray-200 hover:shadow-lg transition-all duration-300",
  primary: "bg-teal-600 text-white hover:bg-teal-700",
  success: "bg-green-600 text-white hover:bg-green-700",
  warning: "bg-amber-500 text-white hover:bg-amber-600",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

const iconVariantStyles = {
  default: "bg-teal-100 text-teal-600",
  primary: "bg-white/20 text-white",
  success: "bg-white/20 text-white",
  warning: "bg-white/20 text-white",
  destructive: "bg-white/20 text-white",
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
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 120,
        damping: 12
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        rotateY: 3,
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative rounded-xl md:rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden",
        "h-[180px] md:h-[200px] flex flex-col justify-between",
        variantStyles[variant]
      )}
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={false}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </motion.div>
      
      {/* Animated border glow */}
      <motion.div 
        className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-transparent group-hover:border-white/30"
        animate={{
          boxShadow: [
            "0 0 0px rgba(255,255,255,0)",
            "0 0 20px rgba(255,255,255,0.3)",
            "0 0 0px rgba(255,255,255,0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="relative flex flex-col h-full justify-between">
        {/* Top section with icon */}
        <div className="flex items-start justify-between gap-3">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1 }}
            className={cn(
              "text-xs sm:text-sm font-semibold tracking-wide uppercase line-clamp-2",
              variant === "default" ? "text-muted-foreground" : "text-white/90"
            )}
          >
            {title}
          </motion.p>
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: delay + 0.15, 
              type: "spring", 
              stiffness: 200,
              damping: 10
            }}
            whileHover={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: 1.15,
              transition: { duration: 0.5 }
            }}
            className={cn(
              "relative rounded-xl p-3 transition-all duration-300 shadow-lg shrink-0",
              iconVariantStyles[variant]
            )}
          >
            <Icon className="h-5 w-5 md:h-6 md:w-6 relative z-10" />
            
            {/* Icon background pulse */}
            <motion.div 
              className="absolute inset-0 rounded-xl bg-current opacity-20 group-hover:opacity-40"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
        
        {/* Bottom section with value and trend */}
        <div className="space-y-2 mt-auto">
          <motion.p 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: delay + 0.2,
              type: "spring",
              stiffness: 200
            }}
            className={cn(
              "text-3xl md:text-4xl font-bold tracking-tight",
              variant === "default" ? "text-gray-900" : "text-white"
            )}
            whileHover={{ 
              scale: 1.08,
              transition: { type: "spring", stiffness: 400 }
            }}
          >
            {value}
          </motion.p>
          
          {trend && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.3 }}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{ 
                  rotate: trend.isPositive ? [0, 10, 0] : [0, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold shadow-md",
                  trend.isPositive 
                    ? "bg-green-500/30 text-green-700 dark:text-green-300" 
                    : "bg-red-500/30 text-red-700 dark:text-red-300"
                )}
              >
                {trend.isPositive ? "↗" : "↘"}
              </motion.div>
              <p className={cn(
                "text-xs font-semibold",
                trend.isPositive
                  ? variant === "default" 
                    ? "text-green-600" 
                    : "text-green-200"
                  : variant === "default"
                  ? "text-red-600"
                  : "text-red-200"
              )}>
                {Math.abs(trend.value)}% from last month
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
