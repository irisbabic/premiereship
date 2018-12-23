import * as constants from '../constants';

export interface ChangeRound {
    value: string;
    type: constants.CHANGE_ROUND;
}

export function ChangeRound(): ChangeRound {
    return {
        value: constants.CHANGE_ROUND,
        type: constants.CHANGE_ROUND
    }
}