const mongoose = require("mongoose");
const uri = "mongodb+srv://dbAIMMO:dbAIMMO@cluster0.app8n.mongodb.net/dbREDBRICK?retryWrites=true&w=majority";

const connect = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on('error', (err) => console.log(err));
    db.once('open', () => console.log("데이터베이스 연결 성공"));
};

module.exports = connect;