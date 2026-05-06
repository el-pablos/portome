import { forwardRef, useImperativeHandle, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

export type NotificationType = "help" | "success" | "warning" | "error";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  createdAt: number;
}

const TYPE_COLORS: Record<NotificationType, { bg: string; accent: string }> = {
  help: { bg: "#e8f4fd", accent: "#0070e0" },
  success: { bg: "#e6f9f0", accent: "#03a65a" },
  warning: { bg: "#fff4e6", accent: "#fc8621" },
  error: { bg: "#fde8ec", accent: "#db3056" },
};

export interface SplashedPushNotificationsRef {
  createNotification: (type: NotificationType, title: string, content: string) => void;
  createRtlNotification: (type: NotificationType, title: string, content: string) => void;
}

interface NotificationItemProps {
  notification: Notification;
  onDismiss: (id: string) => void;
  direction: "ltr" | "rtl";
}

function NotificationItem({ notification, onDismiss, direction }: NotificationItemProps) {
  const { type, title, content, id } = notification;
  const colors = TYPE_COLORS[type];
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const uniqueId = useRef(`timer-${id}`).current;

  const startDismissTimer = useCallback(() => {
    timerRef.current = setTimeout(() => {
      onDismiss(id);
    }, 4000);
  }, [id, onDismiss]);

  useState(() => {
    startDismissTimer();
  });

  const handleMouseEnter = () => {
    setPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    setPaused(false);
    startDismissTimer();
  };

  // Inject keyframes for timer
  const keyframesStyle = `
    @keyframes timerShrink-${uniqueId} {
      from { width: 100%; }
      to { width: 0%; }
    }
  `;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: direction === "ltr" ? 100 : -100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: direction === "ltr" ? 100 : -100, scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative w-80 rounded-xl shadow-lg overflow-hidden"
      style={{ background: colors.bg }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>{keyframesStyle}</style>
      <div className="p-4 flex gap-3">
        {/* Icon */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-sm font-bold"
          style={{ background: colors.accent }}>
          {type === "success" && "✓"}
          {type === "error" && "✕"}
          {type === "warning" && "!"}
          {type === "help" && "?"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm" style={{ color: colors.accent }}>{title}</p>
          <p className="text-xs mt-1 opacity-70 leading-relaxed">{content}</p>
        </div>
        <button
          onClick={() => onDismiss(id)}
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-50 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>
      {/* Timer bar */}
      <div className="h-1 w-full" style={{ background: `${colors.accent}20` }}>
        <div
          className="h-full"
          style={{
            background: colors.accent,
            animation: `timerShrink-${uniqueId} 4s linear forwards`,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      </div>
    </motion.div>
  );
}

export const SplashedPushNotifications = forwardRef<SplashedPushNotificationsRef>(
  function SplashedPushNotifications(_, ref) {
    const [ltrNotifications, setLtrNotifications] = useState<Notification[]>([]);
    const [rtlNotifications, setRtlNotifications] = useState<Notification[]>([]);

    const dismiss = useCallback((id: string) => {
      setLtrNotifications((prev) => prev.filter((n) => n.id !== id));
      setRtlNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    useImperativeHandle(ref, () => ({
      createNotification(type, title, content) {
        const notification: Notification = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          type,
          title,
          content,
          createdAt: Date.now(),
        };
        setLtrNotifications((prev) => [...prev, notification]);
      },
      createRtlNotification(type, title, content) {
        const notification: Notification = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          type,
          title,
          content,
          createdAt: Date.now(),
        };
        setRtlNotifications((prev) => [...prev, notification]);
      },
    }));

    return createPortal(
      <>
        {/* LTR — bottom right */}
        <div className="fixed bottom-6 right-6 z-[99998] flex flex-col gap-3 items-end">
          <AnimatePresence mode="popLayout">
            {ltrNotifications.map((n) => (
              <NotificationItem key={n.id} notification={n} onDismiss={dismiss} direction="ltr" />
            ))}
          </AnimatePresence>
        </div>
        {/* RTL — bottom left */}
        <div className="fixed bottom-6 left-6 z-[99998] flex flex-col gap-3 items-start">
          <AnimatePresence mode="popLayout">
            {rtlNotifications.map((n) => (
              <NotificationItem key={n.id} notification={n} onDismiss={dismiss} direction="rtl" />
            ))}
          </AnimatePresence>
        </div>
      </>,
      document.body
    );
  }
);
