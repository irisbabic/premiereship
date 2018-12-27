import {ChangeRound} from '../actions';
import {StoreState} from '../types';
import {CHANGE_ROUND} from '../constants';

const round = (state: StoreState, action: ChangeRound) => {
    switch (action.type) {
        case CHANGE_ROUND:
            return {...state, round: action.round};
        default:
            return state;
    }
};

export default round;

