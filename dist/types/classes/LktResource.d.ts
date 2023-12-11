import { LktObject } from 'lkt-ts-interfaces';
import { ResourceData } from '../types/ResourceData';
import { ResourceNameValue } from '../value-objects/ResourceNameValue';
import { ResourceBuild } from './ResourceBuild';
export declare class LktResource {
    private readonly data;
    private url;
    name: ResourceNameValue;
    private method;
    private environment;
    private dataType;
    private params;
    private isFileUpload;
    private validStatuses;
    private fetchStatus;
    private onSuccess;
    private returnsFullResponse;
    private returnsResponseDig;
    private maxPageDig;
    private permDig;
    private modificationsDig;
    private latestMaxPage;
    private latestPerms;
    constructor(data: ResourceData);
    getLatestMaxPage(): number;
    getLatestPerms(): string[];
    build(params: LktObject): ResourceBuild;
    call(params: LktObject): Promise<any>;
}
