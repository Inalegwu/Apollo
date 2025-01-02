import Constants from "expo-constants";

/**
 *  @type {typeof import('../env.js').ClientEnv}
 */
//@ts-ignore // Don't worry about TypeScript here; we know we're passing the correct environment variables to `extra` in `app.config.ts`.
export const Env = Constants.expoConfig?.extra ?? {};
