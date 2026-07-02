export const generateChatTitle = (
  message
) => {
  return message
    .split(" ")
    .slice(0, 5)
    .join(" ");
};