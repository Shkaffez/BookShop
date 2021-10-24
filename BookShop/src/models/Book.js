const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    username: String,     
    text: String
});

const bookSchema = new Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        default: ""
    },
    authors: {
        type: String,
        default: ""
    },
    favorite: {
        type: String,
        default: ""
    },
    fileCover: {
        type: String,
        default: ""
    },
    fileName: {
        type: String,
        default: ""
    },
    comments: [commentSchema]
});



module.exports = model('Book', bookSchema);