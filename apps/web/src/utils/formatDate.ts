export const getLocaleDate = (inputDate: string) => {
  return new Date(inputDate).toLocaleDateString();
};

export const getInputDate = (inputDate: string) => {
  const date = new Date(inputDate);
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};
