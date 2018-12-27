import * as React from 'react';

import '../Matches.css';

export interface Props {
    data: any;
}

let scores: any;

/**
 * @class Matches
 * @classdesc Component for rendering games played
 */
class Matches extends React.Component <Props> {

    /**
     * @description Handles names of teams and scored goals in a game
     */
    handleScores = () => {
        scores = [];
        (this.props.data as (Object)[]).map((matches: Object) => {
            Object.keys(matches).map((match: any) => (
                scores.push(match + ':' + matches[match])
            ))
        });
    };

    /**
     * @description Renders rows in a table depending on current round
     */
    render(): React.ReactNode {
        this.handleScores();
        return (
            <table className="table table-responsive" id="matchesTable">
                <thead>
                <tr>
                    <th colSpan={2}>MATCHES</th>
                </tr>
                </thead>
                <tbody>
                {
                    scores.map((matches: string, index: number) => (
                            <tr key={index}>
                                <td>{matches.split(':')[0]}</td>
                                <td>{matches.split(':')[1]}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        )
    }
}

export default Matches;