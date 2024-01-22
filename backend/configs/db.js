const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGOOSE_DB_URL);
        console.log("Connect database to Mongoose url " + db.connection.host.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;