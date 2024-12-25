import dotenv from "dotenv";

// Determine the environment and load the appropriate .env file
const envFile =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "PRODUCTION"
    ? ".env"
    : ".env.dev";
dotenv.config({ path: envFile });

export default function Config() {
  dotenv.config({ path: envFile });
}

// export const BOT_TOKEN = process.env.BOT_TOKEN;
// export const DATABASE_URL = process.env.DATABASE_URL;
// The Config function is used to load the environment variables from the .env file. It determines the environment based on the NODE_ENV variable and loads the appropriate .env file.
