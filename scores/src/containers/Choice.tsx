import Choice from '../components/Choice';

import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {changeRound} from "../actions/";

const mapDispatchToProps = (dispatch: Dispatch<any>) => ( {
    roundChoice: (round: number) => {dispatch(changeRound(round))}
} );

const mapStateToProps = ( state : StoreState ) => ( {
    state: state,
} );

export default connect( mapStateToProps, mapDispatchToProps )( Choice )
