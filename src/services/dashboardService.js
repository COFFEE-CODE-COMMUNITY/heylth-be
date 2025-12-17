import { findScreenTimeData } from "../repositories/dashboardRepository.js";

export const screenTimeData = async (userId) => {
  const date = new Date();
  const dateNow = new Date(date.toISOString());
  const dateWeekAgo = new Date(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 7}`
  );
  const resultTemp = await findScreenTimeData(userId);
  if (!resultTemp.length) return 0;
  const filterWeeklyScreenTime = resultTemp.filter(
    (st) =>
      st.createdAt >= dateWeekAgo &&
      st.createdAt <= dateNow 
  );
  if(!filterWeeklyScreenTime.length) return 0;

  return filterWeeklyScreenTime;
};
