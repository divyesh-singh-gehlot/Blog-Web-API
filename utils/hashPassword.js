const bcrypt = require("bcryptjs")

const hashPassword = async (password) => {
    const saltRounds = 12;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

module.exports = hashPassword;