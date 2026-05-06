import "dotenv/config";

export function env(key, defaultValue) {
    const value = process.env[key];
    if (value === undefined || value === "") {
        if (defaultValue !== undefined) return defaultValue;
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}