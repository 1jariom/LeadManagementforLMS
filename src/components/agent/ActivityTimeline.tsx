import { motion } from "framer-motion";
import { Phone, Mail, Calendar, MessageSquare, Clock } from "lucide-react";

interface Activity {
  id: string;
  type: "call" | "email" | "meeting" | "note";
  message: string;
  time: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
  title?: string;
  maxItems?: number;
}

const activityIcons: Record<string, React.ElementType> = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  note: MessageSquare,
};

const activityColors: Record<string, Record<string, string>> = {
  call: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
  email: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800",
  },
  meeting: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
  },
  note: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800",
  },
};

export const ActivityTimeline = ({
  activities,
  title = "Activity Timeline",
  maxItems = 6,
}: ActivityTimelineProps) => {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <div className="rounded-lg md:rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="p-3 sm:p-4 md:p-6 border-b border-border">
        <h2 className="text-base sm:text-lg font-semibold text-foreground truncate">{title}</h2>
      </div>
      <div className="p-3 sm:p-4 md:p-6">
        <div className="space-y-4 sm:space-y-6">
          {displayedActivities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-xs sm:text-sm">
                No activities recorded yet
              </p>
            </div>
          ) : (
            displayedActivities.map((activity, index) => {
              const Icon = activityIcons[activity.type] || MessageSquare;
              const colors = activityColors[activity.type];

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="flex gap-2 sm:gap-3 md:gap-4"
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className={`h-8 sm:h-10 w-8 sm:w-10 rounded-full ${colors.bg} flex items-center justify-center border ${colors.border}`}
                    >
                      <Icon className={`h-3.5 sm:h-4 w-3.5 sm:w-4 ${colors.text}`} />
                    </div>
                    {index < displayedActivities.length - 1 && (
                      <div className="absolute top-10 sm:top-12 left-1/2 -translate-x-1/2 w-0.5 h-6 sm:h-8 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pt-0.5 sm:pt-1 min-w-0">
                    <p className="text-xs sm:text-sm text-foreground leading-relaxed break-words">
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{activity.time}</span>
                    </p>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
