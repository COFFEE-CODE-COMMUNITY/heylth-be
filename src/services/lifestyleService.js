import { countEatTracker } from "./eatTrackerService.js";
import { averageScreenTime } from "./screenTimeService.js";
import { averageSleepTracker } from "./sleepTrackerService.js";

export const lifestyleStatus = async (userId, username) => {
    const averageSleepWeekly = await averageSleepTracker(userId, username);
    const countMealWeekly = await countEatTracker(userId, username);
    const averageScreenTimeWeekly = await averageScreenTime(userId, username);

    if (averageSleepWeekly >= 8 && countMealWeekly.count_all >= 17 && averageScreenTimeWeekly <= 8) {
        return { status: 'Good', color: 'bg-green-500' };
    }
      
    if (
        (averageSleepWeekly >= 5 && averageSleepWeekly < 8) &&
        (countMealWeekly.count_all >= 8 && countMealWeekly.count_all < 17) &&
        (averageScreenTimeWeekly > 8 && averageScreenTimeWeekly <= 10)
    ) {
        return { status: 'Average', color: 'bg-yellow-500' };
    }
    return { status: 'Bad', color: 'bg-red-500' };
};