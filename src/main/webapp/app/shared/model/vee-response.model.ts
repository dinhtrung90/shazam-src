export interface IVeeResponse {
    id?: number;
    answer?: string;
    questionId?: number;
    respondentId?: number;
}

export class VeeResponse implements IVeeResponse {
    constructor(public id?: number, public answer?: string, public questionId?: number, public respondentId?: number) {}
}
