export const budgetRanges = { Low: [150, 300], Medium: [300, 500], High: [500, 900] };
export const estimateCost = (days, people, budget) => {
  const [lo, hi] = budgetRanges[budget] || budgetRanges.Medium;
  const f = (days / 3) * (people / 2);
  return `$${Math.round(lo * f)} – ${Math.round(hi * f)}`;
};
export const transportLabel = { car: "By car", bus: "By bus", train: "By train", plane: "By plane" };
