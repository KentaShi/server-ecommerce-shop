const router = require("express").Router()
const Message = require("../models/message.model")

// creete a message
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save()
        return res.status(200).json(savedMessage)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

//get a message
router.get("/:conversationID", async (req, res) => {
    try {
        const message = await Message.find({
            conversationID: req.params.conversationID,
        })
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router
