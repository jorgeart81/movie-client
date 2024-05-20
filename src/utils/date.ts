export const formattedDate = (value: Date) => {
  const date = new Date(value);
  const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  return formatted;
};
