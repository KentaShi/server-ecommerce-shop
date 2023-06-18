const router = require("express").Router()
const Conversation = require("../models/conversation.model")

//create a new conversation
router.post("/", async (req, res) => {
    const sender = req.body.sender
    const receiver = req.body.receiver
    if (sender || receiver) {
        const conversation = await Conversation.findOne({
            members: [sender, receiver],
        })
        if (conversation) {
            return res.status(401).json({ error: "Conversation is exist" })
        } else {
            try {
                const newConversation = new Conversation({
                    members: [sender, receiver],
                })

                const savedConversation = await newConversation.save()
                return res.status(200).json(savedConversation)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        }
    } else {
        return res
            .status(400)
            .json({ error: "Missing sender id or receiver id" })
    }
})

// get the conversation of a user
router.get("/:userID", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userID] },
        })
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// get the conversation of two users

router.get("/find/:firstUserID/:secondUserID", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: {
                $all: [req.params.firstUserID, req.params.secondUserID],
            },
        })
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router
