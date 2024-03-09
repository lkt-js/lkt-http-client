import {Settings} from "../settings/Settings";

export const debug = (...args: any[]): void => {
    if (Settings.debugEnabled) console.info('[LktHttpClient] ', ...args);
};
export const debugLktHttpClient = (state: boolean = true): void => {
    Settings.debugEnabled = state;
};