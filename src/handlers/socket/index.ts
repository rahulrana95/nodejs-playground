const { v4: uuidv4 } = require("uuid");

const messages = [
  "Hello!",
  "How are you?",
  "What's up?",
  "Nice to meet you.",
  "Have a great day!",
  "Welcome!",
  // Add more messages as needed
];

const users = new Map(); // Map to store connected users and their availability
const conversations = new Map(); // Map to store active conversations

setInterval(() => {
  console.log(`Total active users are ${users.size}`);
}, 1000);

const SocketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Mark user as free when they connect
    users.set(socket.id, { free: true, partnerId: null });

    // Handle chat start request
    socket.on("start chat", () => {
      const freeUser = Array.from(users).find(
        ([userId, userData]) => userId !== socket.id && userData.free
      );

      if (freeUser) {
        const [partnerId] = freeUser;

        // Mark both users as busy
        users.set(socket.id, { free: false, partnerId });
        users.set(partnerId, { free: false, partnerId: socket.id });

        // Generate a conversation ID
        const conversationId = generateConversationId(socket.id, partnerId);
        // Create a new conversation and store it
        conversations.set(conversationId, {
          users: [socket.id, partnerId],
          messages: [],
        });
        // Emit event to notify both users about the chat
        io.to(socket.id).emit("chat started", { partnerId });
        io.to(partnerId).emit("chat started", { partnerId: socket.id });
        console.log(partnerId);
        console.log(socket.id);
      } else {
        // If no free user is found, notify the client
        io.to(socket.id).emit("no free users");
      }
    });

    // Handle chat message
    socket.on("chat message", (data) => {
      const { username = "N/A", message } = data;
      console.log(data);
      console.log(socket.id);
      console.log("----end");
      const conversationId = findConversationId(socket.id);
      if (conversationId) {
        const [partnerId] = conversations
          .get(conversationId)
          .users.filter((id) => id !== socket.id);
        io.to(partnerId).emit("chat message", {
          username,
          senderId: socket.id,
          message,
        });
        // Store message in the conversation object
        conversations.get(conversationId).messages.push({
          senderName: username,
          senderId: socket.id,
          message,
        });
      }
    });

    // Handle chat end request
    socket.on("end chat", () => {
      const conversationId = findConversationId(socket.id);
      if (conversationId) {
        const [partnerId] = conversations
          .get(conversationId)
          .users.filter((id) => id !== socket.id);
        users.set(socket.id, { free: true, partnerId: null });
        users.set(partnerId, { free: true, partnerId: null });
        io.to(partnerId).emit("end chat");

        conversations.delete(conversationId);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.id);

      const conversationId = findConversationId(socket.id);
      if (conversationId) {
        const [partnerId] = conversations
          .get(conversationId)
          .users.filter((id) => id !== socket.id);
        users.set(partnerId, { free: true, partnerId: null });
        io.to(partnerId).emit("end chat");
        conversations.delete(conversationId);
      }
      users.delete(socket.id);
    });
  });
};

function generateConversationId(userId1, userId2) {
  return `${userId1}-${userId2}`;
}

function findConversationId(userId) {
  for (let [conversationId, conversation] of conversations) {
    if (conversation.users.includes(userId)) {
      return conversationId;
    }
  }
  return null;
}

export default SocketHandler;
