import { ChangeRound } from '../actions';
import { StoreState } from '../types/index';
import { CHANGE_ROUND } from '../constants/index';

export function round(state: StoreState, action: ChangeRound): StoreState {
    switch (action.type) {
        case CHANGE_ROUND:
            return { ...state, round: action.value };
        default:
            return state;
    }

}