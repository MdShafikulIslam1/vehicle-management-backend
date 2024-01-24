import bcrypt from 'bcrypt'
import config from '../config';

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const hashedPassword = await bcrypt.hash(password, parseInt(config.salt_rounds as string));
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
};


export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};