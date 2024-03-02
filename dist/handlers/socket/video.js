"use strict";
// server.js
Object.defineProperty(exports, "__esModule", { value: true });
// Data structure to store connected users and their information
const users = new Map();
// Data structure to store active peer connections
const peerConnections = new Map();
// Handler for user connection
function VideoHandler(io) {
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);
        // Handler for user disconnection
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            // Remove user from users map
            if (users.has(socket.id)) {
                const { name } = users.get(socket.id);
                users.delete(socket.id);
                console.log(`User ${name} disconnected`);
            }
            // Close peer connection and remove from peerConnections map
            if (peerConnections.has(socket.id)) {
                const partnerId = peerConnections.get(socket.id);
                peerConnections.delete(socket.id);
                peerConnections.delete(partnerId);
                io.to(partnerId).emit("end chat");
                console.log(`Closed peer connection between ${socket.id} and ${partnerId}`);
            }
        });
        // Handler for requesting chat
        socket.on("request chat", ({ name }) => {
            console.log(`User ${name} requested chat`);
            // Add user to users map
            users.set(socket.id, { name, available: true });
            // Find available user to match
            for (const [userId, userInfo] of users.entries()) {
                if (userId !== socket.id && userInfo.available) {
                    // Match users
                    const partnerId = userId;
                    const partnerInfo = userInfo;
                    // Mark both users as unavailable
                    userInfo.available = false;
                    users.get(partnerId).available = false;
                    // Send user information to both users
                    socket.emit("start chat", {
                        partnerId,
                        partnerName: partnerInfo.name,
                    });
                    io.to(partnerId).emit("start chat", {
                        partnerId: socket.id,
                        partnerName: name,
                    });
                    console.log(`Matched ${name} with ${partnerInfo.name}`);
                    // Create peer connection
                    peerConnections.set(socket.id, partnerId);
                    peerConnections.set(partnerId, socket.id);
                    console.log(`Established peer connection between ${socket.id} and ${partnerId}`);
                    break;
                }
            }
        });
        // Handler for ICE candidates
        socket.on("ice candidate", ({ candidate, partnerId }) => {
            console.log(`Received ICE candidate from ${socket.id} for ${partnerId}`);
            // Send ICE candidate to the partner
            io.to(partnerId).emit("ice candidate", { candidate, userId: socket.id });
        });
        // Handler for SDP offers/answers
        socket.on("sdp", ({ description, partnerId }) => {
            console.log(`Received SDP from ${socket.id} for ${partnerId}`);
            // Send SDP offer/answer to the partner
            io.to(partnerId).emit("sdp", { description, userId: socket.id });
        });
    });
}
exports.default = VideoHandler;
//# sourceMappingURL=video.js.map