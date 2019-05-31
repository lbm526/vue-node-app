const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/helloWorld');
if(process.env.NODE_ENV == "production"){
    mongoose.connect('mongodb+srv://lbm_vue:lbm123456@cluster0-eipdm.mongodb.net/test');
}else{
    mongoose.connect('mongodb://localhost/helloWorld');
}

const Schema = mongoose.Schema;
const SchemaModel = new Schema({
    title: {
        type:String,
        required: true
    },
    details: {
        type:String,
        required:true
    },
    userId: {
        type:String,
    },
    date: {
        type:Date,
        default: Date.now
    }
});

//用户
const userModel = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: String
    },
    userName: {
        type: String,
        required: true
    }
});

const Models = {
    Idea: mongoose.model('Idea',SchemaModel),
    User: mongoose.model('User',userModel)
};

module.exports = Models;
