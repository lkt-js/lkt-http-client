import { LktObject } from 'lkt-ts-interfaces';

export interface Notification {
    category: 'toast' | 'message',
    payload: LktObject
}