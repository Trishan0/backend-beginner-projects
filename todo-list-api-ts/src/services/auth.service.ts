import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

// Interface for user registration data
export interface UserRegistrationData {
    name: string;
    email: string;
    password: string;
}
interface RegisterUserResult {
    success: boolean;
    message: string;
    statusCode: number;
    data?: UserRegistrationData | null;
    error?: string;
}

const registerUserService  = async (userData: UserRegistrationData): Promise<RegisterUserResult> => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            return {
                success: false,
                message: "User with this email already exists",
                statusCode: 400
            };
        }
        if (!userData.name || !userData.email || !userData.password) {
            return {
                success: false,
                message: "Name, email and password are required",
                statusCode: 400
            }
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // Create the user
        const user = new User({
            name: userData.name,
            email: userData.email,
            password: hashedPassword
        });

        // Save the user to the database
        await user.save();
        return {
            success: true,
            message: "User created successfully",
            statusCode: 201,

        };    }  catch (dbError) {
        console.error("Error in registerUserService during DB operation:", dbError);
        // This catches errors from findOne or save operations
        return {
            success: false,
            message: "An error occurred while processing your request.",
            statusCode: 500, // Internal Server Error for DB issues
            error: dbError instanceof Error ? dbError.message : "Database operation failed"
        };
    }
};

export {registerUserService}