import { AxiosResponse } from "axios";
export declare class ResponseSuccessHookValue {
    private readonly value?;
    constructor(value?: any);
    hasActionDefined(): boolean;
    run(axiosResponse: AxiosResponse): any;
}
