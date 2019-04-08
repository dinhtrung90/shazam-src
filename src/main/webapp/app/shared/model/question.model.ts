import { Moment } from 'moment';
import { IResponseChoice } from 'app/shared/model/response-choice.model';
import { IVeeResponse } from 'app/shared/model/vee-response.model';

export interface IQuestion {
    id?: number;
    text?: string;
    updated?: Moment;
    questionTypeId?: number;
    responseChoices?: IResponseChoice[];
    res?: IVeeResponse[];
}

export class Question implements IQuestion {
    constructor(
        public id?: number,
        public text?: string,
        public updated?: Moment,
        public questionTypeId?: number,
        public responseChoices?: IResponseChoice[],
        public res?: IVeeResponse[]
    ) {}
}
