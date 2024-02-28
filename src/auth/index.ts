import bcrypt from 'bcrypt';

// Function to hash a password
async function hashPassword(password: string) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

async function comparePasswords(plainPassword: string, hashedPassword: string) {
    try {
        // Compare the plain password with the hashed password
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
}



function getJWTToken() {
    
}

export {
    hashPassword,
    comparePasswords
}
