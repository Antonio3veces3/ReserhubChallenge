export const convertDatestampToHumanDate = (dt: number) => {
  const date = new Date(dt * 1000);

  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
    date
  );
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const year = date.getFullYear();

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const time = new Intl.DateTimeFormat("en-US", timeOptions).format(date);

  const fullDate = `${weekday} ${day}, ${month} ${year}`;
  const timeFormatted = `${time}`;
  return {
    fullDate,
    time: timeFormatted,
  };
};
