export const parseDate = (date: string | undefined) => {
  if (date === undefined) return;
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();

  return `${year}년 ${month}월 ${day}일`;
};
