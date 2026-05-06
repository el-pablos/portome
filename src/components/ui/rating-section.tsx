import { useRef } from "react";
import { motion } from "motion/react";
import { EmojiRating } from "./emoji-rating";
import { SplashedPushNotifications, type SplashedPushNotificationsRef, type NotificationType } from "./splashed-push-notifications";

const RATING_TOASTS: Record<number, { type: NotificationType; title: string; content: string }> = {
  1: { type: "error", title: "That bad, huh?", content: "Sorry to hear that. Your honest feedback helps me improve." },
  2: { type: "warning", title: "Room to improve", content: "Thanks for letting me know. I'll work on making it better!" },
  3: { type: "help", title: "Pretty okay!", content: "Good to know. Tell me what could make it even better." },
  4: { type: "success", title: "Glad you liked it!", content: "Thanks for the kind rating. Much appreciated!" },
  5: { type: "success", title: "You made my day! 🎉", content: "Amazing! Thank you so much for the love." },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function RatingSection() {
  const notifRef = useRef<SplashedPushNotificationsRef>(null);

  const handleRate = (rating: number) => {
    const toast = RATING_TOASTS[rating];
    if (toast && notifRef.current) {
      notifRef.current.createNotification(toast.type, toast.title, toast.content);
    }
  };

  return (
    <section className="py-24 px-6 border-t" style={{ borderColor: "var(--clr-border)" }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="max-w-2xl mx-auto flex flex-col items-center gap-8 text-center"
      >
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black">
          How's the vibe?
        </motion.h2>
        <motion.p variants={itemVariants} className="text-base" style={{ color: "var(--clr-text-muted)" }}>
          Rate your experience exploring this portfolio. Your feedback means a lot!
        </motion.p>
        <motion.div variants={itemVariants}>
          <EmojiRating onRate={handleRate} />
        </motion.div>
      </motion.div>
      <SplashedPushNotifications ref={notifRef} />
    </section>
  );
}
