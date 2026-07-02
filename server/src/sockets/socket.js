const onlineUsers = new Map();

const registerSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("user_online", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("online_users", Array.from(onlineUsers.keys()));
    });

    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
      console.log(`Joined Room ${chatId}`);
    });

    socket.on("leave_chat", (chatId) => {
      socket.leave(chatId);
    });

    socket.on("typing", ({ chatId, user }) => {
      socket.to(chatId).emit("user_typing", { user });
    });

    socket.on("stop_typing", (chatId) => {
      socket.to(chatId).emit("user_stopped_typing");
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected ${socket.id}`);

      for (const [userId, socketId] of onlineUsers) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
        }
      }

      io.emit("online_users", Array.from(onlineUsers.keys()));
    });
  });
};

export default registerSocketEvents;