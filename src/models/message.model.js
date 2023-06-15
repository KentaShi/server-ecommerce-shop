const mongoose = require("mongoose")

const message = new mongoose.Schema(
    {
        conversationID: {
            type: mongoose.Types.ObjectId,
            ref: "conversation",
        },
        content: {
            type: String,
        },
        sender: {
            type: String,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("message", message)
