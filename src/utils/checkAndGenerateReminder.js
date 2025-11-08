import { findAllSleepTracker } from "../repositories/sleepTrackerRepository.js";
import { findAllEatTracker } from "../repositories/eatTrackerRepository.js";
import { findAllScreenTime } from "../repositories/screenTimeRepository.js";
import { generateReminder } from "../services/reminderService.js";

export const checkAndGenerateReminder = async (userId, dateInput) => {
  const dateFromUser = new Date(dateInput).toISOString().split("T")[0];

  const sleep = await findAllSleepTracker(userId);
  const eat = await findAllEatTracker(userId);
  const screen = await findAllScreenTime(userId);

  const hasSleep = sleep.some(
    (s) => s.createdAt.toISOString().split("T")[0] === dateFromUser
  );
  const hasEat = eat.some(
    (e) => e.createdAt.toISOString().split("T")[0] === dateFromUser
  );
  const hasScreen = screen.some(
    (st) => st.createdAt.toISOString().split("T")[0] === dateFromUser
  );

  // Cek kalau semua tracker udah diisi
  if (hasSleep && hasEat && hasScreen) {
    try {
      await generateReminder(userId, dateFromUser);
      console.log(`✅ Reminder created for user ${userId}`);
    } catch (error) {
      console.log(`⚠️ Reminder skipped for user ${userId}: ${error.message}`);
    }
  }
};
