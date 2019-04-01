export interface IResponseChoice {
    id?: number;
    text?: string;
    questionId?: number;
}

export class ResponseChoice implements IResponseChoice {
    constructor(public id?: number, public text?: string, public questionId?: number) {}
}
