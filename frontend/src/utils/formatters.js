export const clampScore = (score = 0) => Math.min(100, Math.max(0, Number(score) || 0));

export const formatDate = (date) =>
  date
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).format(new Date(date))
    : "N/A";
