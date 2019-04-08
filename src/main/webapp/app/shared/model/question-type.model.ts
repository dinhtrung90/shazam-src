export interface IQuestionType {
    id?: number;
    name?: string;
}

export class QuestionType implements IQuestionType {
    constructor(public id?: number, public name?: string) {}
}
