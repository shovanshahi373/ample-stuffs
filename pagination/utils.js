export const generateId = (size = 12) => {
  size = size > 36 ? 36 : size;
  return Array(size)
    .fill(0)
    .map((_) => ((Math.random() * 36) | 0).toString(36))
    .join("");
};
