import {SUCCESS_STATUSES} from "../constants";
import {callHTTPResource} from "../functions/http-functions";

export class LktResource {
    constructor(name, url, method) {
        this.name = name;
        this.url = url;
        this.method = method;
        this.currentPage = undefined;
        this.isFetching = false;
        this.inLastPage = false;

        this.environment = undefined;
        this.unsafeParams = false;
        this.params = {};
        this.renameParams = {};
        this.fillLeftSeparator = '{';
        this.fillRightSeparator = '}';
        this.success = undefined;
        this.validStatuses = SUCCESS_STATUSES;
        this.searchParam = undefined;
        this.processResults = undefined;
        this.escapeMarkup = undefined;
        this.templateResult = undefined;
        this.templateSelection = undefined;
        this.paginationVariable = 'paged';
        this.enableMultipleCalling = false;
        this.isFileUpload = false;
        this.lastPageChecker = () => {
            return false;
        };
        this.dataType = 'json';
        this.cache = {};
        this.cacheTime = 0;

        this.escapeMarkup = undefined;
        this.templateResult = undefined;
        this.templateSelection = undefined;
        this.isFileUpload = false;
        this.cache = {};
        this.cacheTime = undefined;
        this.forceRefreshFlag = false;
    }

    setParam(property) {
        this.params[property] = {type: undefined};
        return this;
    }

    setSuccessStatuses(statuses = SUCCESS_STATUSES) {
        this.validStatuses = statuses;
        return this;
    }

    setForceRefresh(status = true) {
        this.forceRefreshFlag = status;
        return this;
    }

    call(params = {}) {
        return callHTTPResource(this, params);
    }
}