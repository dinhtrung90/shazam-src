import { Moment } from 'moment';

export interface ISurveyResponse {
    id?: number;
    updated?: Moment;
    startedat?: Moment;
    completedat?: Moment;
    surveyId?: number;
    respondentId?: number;
}

export class SurveyResponse implements ISurveyResponse {
    constructor(
        public id?: number,
        public updated?: Moment,
        public startedat?: Moment,
        public completedat?: Moment,
        public surveyId?: number,
        public respondentId?: number
    ) {}
}
