import { Settings } from "../settings/Settings";
export const debug = (...args) => {
    if (Settings.debugEnabled)
        console.info('[LktHttpClient] ', ...args);
};
export const debugLktHttpClient = (state = true) => {
    Settings.debugEnabled = state;
};
