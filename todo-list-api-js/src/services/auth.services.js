import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';

const findUserByEmail = async (email)=>{
    return await User.findOne({email})
}

const registerUserService = async (userData) => {
        const {name, email, password} = userData;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        return await newUser.save();

}

const verifyUserCredentialsService  = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        return {
            isAuthenticated: false,
            message: "User doesn't exist",
            statusCode: 400
        };
    }

    const isPwdMatch = await bcrypt.compare(password, user.password);

    if (!isPwdMatch) {
        return {
            isAuthenticated: false,
            message: "Invalid Password",
            statusCode: 400
        };
    }

    // Successfully authenticated
    return {
        isAuthenticated: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
            // Don't include password in returned data
        }
    };

}

export {findUserByEmail, registerUserService, verifyUserCredentialsService}