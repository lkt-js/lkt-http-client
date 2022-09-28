import { ResourceParamStack } from "../interfaces/ResourceParamStack";
export declare class ResourceAliasValue {
    private readonly value;
    constructor(value?: string);
    exists(): boolean;
    call(params: ResourceParamStack): Promise<any>;
}
