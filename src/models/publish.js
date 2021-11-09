const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const publishSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    develop_id: {
        type: Schema.Types.ObjectId,
        // ref: '',
    },
    name: {type: String, required: true},
    game: {type: String, required: true},
    view: {type: Number, required: true},
    createDate: { type: Date, default: Date.now() },
    updateDate: { type: Date, default: Date.now() },
});

const Publish = mongoose.model('Publish', publishSchema);

module.exports = Publish;