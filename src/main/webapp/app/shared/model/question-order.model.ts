import { ISurvey } from 'app/shared/model/survey.model';
import { IQuestion } from 'app/shared/model/question.model';

export interface IQuestionOrder {
    id?: number;
    order?: number;
    survey?: ISurvey;
    questionOrder?: IQuestion;
}

export class QuestionOrder implements IQuestionOrder {
    constructor(public id?: number, public order?: number, public survey?: ISurvey, public questionOrder?: IQuestion) {}
}
