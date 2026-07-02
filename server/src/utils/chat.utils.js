

export const generateChatTitle = (message) => {
  if (!message) return "New Chat";

  
  const cleanedMessage = message.trim();

  
  const words = cleanedMessage.split(" ");
  const title = words.slice(0, 5).join(" ");

  return title.length > 50 ? title.substring(0, 50) + "..." : title;
};