export const getTimeOfDay = (date: Date = new Date()) => {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "manhã";
  if (hour >= 12 && hour < 18) return "tarde";
  return "noite";
};
