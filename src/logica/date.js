export const getWeekday = (dateString) => {
  const [day, month] = dateString.split("/");
  const dateObj = new Date(new Date().getFullYear(), month - 1, day);
  const weekday = Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(
    dateObj,
  );

  return weekday.charAt(0).toUpperCase() + weekday.split("-")[0].slice(1);
};
