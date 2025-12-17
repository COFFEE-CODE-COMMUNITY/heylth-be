import { screenTimeData } from "../services/dashboardService.js";

export const lineChartController = async (req, res) => {
  const result = await screenTimeData(req.user.id);
  return res.status(200).json({
    success: true,
    message: "Success to get screen time tracker!",
    data: result.map((r) => ({
      duration: r.duration,
      date: r.createdAt.toLocaleDateString(),
    })),
  });
};
