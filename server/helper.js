export const createResponse = (message, success, data = null) => {
    return {
        message,
        success,
        data
    };
};

// Helper function to validate email
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Helper function to validate password strength (min 8 chars)
export const validatePassword = (password) => {
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    return null;
};

// Helper to remove sensitive data from user object
export const sanitizeUser = (user) => {
    if (!user) return null;
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};