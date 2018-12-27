import * as constants from '../constants';

export interface ChangeRound {
    type: constants.CHANGE_ROUND;
    round: number;
}

export const changeRound = (round: number) => {
    return {
        type: constants.CHANGE_ROUND,
        round: round,
    }
};
