import { findAllSleepTracker } from "../repositories/sleepTrackerRepository.js";
import { findAllEatTracker } from "../repositories/eatTrackerRepository.js";
import { findAllScreenTime } from "../repositories/screenTimeRepository.js";
import { generateReminder, updateReminder } from "../services/reminderService.js";
import { findUserReminder } from "../repositories/reminderRepository.js";

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

  if (!(hasSleep && hasEat && hasScreen)) return;

  // Cek apakah reminder sudah ada
  const getUserReminder = await findUserReminder(userId);
  const existedReminder = getUserReminder.find(
    (r) => r.createdAt.toISOString().split("T")[0] === dateFromUser
  );
  // Cek kalau semua tracker udah diisi
  if (existedReminder) {
    await updateReminder(userId, dateFromUser);
  } else {
    await generateReminder(userId, dateFromUser);
  }
};
