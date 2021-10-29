const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // the user who sent the request
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to_user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String
    }
})

const Friendship = mongoose.model('Friendship',friendshipSchema);
module.exports = Friendship;