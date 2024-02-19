import { HTTPResponse } from "../types/HTTPResponse";
export declare class ResponseSuccessHookValue {
    private readonly value?;
    constructor(value?: any);
    hasActionDefined(): boolean;
    run(response: HTTPResponse): any;
}
