import {changeRound} from "../actions/";
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {StoreState} from '../types/index';

import Choice from '../components/Choice';


const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    roundChoice: (round: number) => {
        dispatch(changeRound(round))
    }
});

const mapStateToProps = (state: StoreState) => ({
    state: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Choice)
