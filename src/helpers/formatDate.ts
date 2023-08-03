import dayjs from "dayjs";

export function formatDate(date: string) {
  const dayjsDate = dayjs(date);
  return dayjsDate.format("DD-MM-YYYY hh:mm");
}
