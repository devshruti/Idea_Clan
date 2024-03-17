const mongoose = require("mongoose");

class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Getter methods
    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    // Other methods for user-related operations can be added here
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please enter the Email"],
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
    }
});

userSchema.loadClass(User);
const UserModel = mongoose.model("user", userSchema);

module.exports = {
    UserModel,
};
