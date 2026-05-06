import { env } from "../helpers/env.js";

export const APP = {
    PORT: env("APP_PORT", 3000),
};