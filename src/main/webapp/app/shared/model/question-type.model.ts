export interface IQuestionType {
    id?: number;
    name?: string;
    questionId?: number;
}

export class QuestionType implements IQuestionType {
    constructor(public id?: number, public name?: string, public questionId?: number) {}
}
