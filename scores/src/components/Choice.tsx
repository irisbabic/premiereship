import * as data from "../data";
import * as React from 'react';

import {StoreState} from "../types";

import RankingTable from "./RankingTable";

let clubs: Array<any> = [];
let trendClubs: Array<any>;

export interface Props {
    roundChoice?: (round: number) => number;
    state: StoreState;
}

/**
 * @class Choice
 * @classdesc Component for renderinf choice button and table components
 */
class Choice extends React.Component <Props> {

    /**
     * @description Counts the number of games a team has won and returns that number
     * @param club - club name
     * @param roundMatches - all matches in the chosen round
     * @returns {number} wins
     */
    gamesWon = (club: string, roundMatches: Object): number => {
        let wins = 0;

        (roundMatches as (Object)[]).map((match: Object, i: number) => {
            if (club === Object.keys(match)[0]) {

                if (match[club] > match[Object.keys(match)[1]]) {
                    wins++;
                }
            } else if ((club === Object.keys(match)[1])) {
                if (match[club] > match[Object.keys(match)[0]]) {
                    wins++;
                }
            }

            return 1;
        });

        return wins;
    };

    /**
     * @description Counts the number of games a team has lost and returns that number
     * @param club - club name
     * @param roundMatches - all matches in the chosen round
     * @returns {number} lost
     */
    gamesLost = (club: string, roundMatches: Object): number => {
        let lost = 0;

        (roundMatches as (Object)[]).map((match: Object, i: number) => {
            if (club === Object.keys(match)[0]) {
                if (match[club] < match[Object.keys(match)[1]]) {
                    lost++;
                }
            } else if ((club === Object.keys(match)[1])) {
                if (match[club] < match[Object.keys(match)[0]]) {
                    lost++;
                }
            }
            return 1;

        });

        return lost;
    };

    /**
     * @description Counts the number of draws for a team and returns that number
     * @param club - club name
     * @param roundMatches - all matches in the chosen round
     * @returns {number} drawn
     */
    gamesDrawn = (club: string, roundMatches: Object): number => {
        let drawn = 0;

        (roundMatches as (Object)[]).map((match: Object, i: number) => {

            if (club === Object.keys(match)[0]) {
                if (match[club] === match[Object.keys(match)[1]]) {
                    drawn++;
                }
            } else if ((club === Object.keys(match)[1])) {
                if (match[club] === match[Object.keys(match)[0]]) {
                    drawn++;
                }
            }

            return 1;
        });

        return drawn;
    };

    /**
     * @description Counts the number of goals scored against the team and returns that number
     * @param club - club name
     * @param roundMatches - all matches in the chosen round
     * @returns {number} ga
     */
    ga = (club: string, roundMatches: Object): number => {
        let ga = 0;

        (roundMatches as (Object)[]).map((match: Object, i: number) => {
            if (club === Object.keys(match)[0]) {
                if (match[club] < match[Object.keys(match)[1]]) {
                    ga += match[Object.keys(match)[1]];
                }
            } else if ((club === Object.keys(match)[1])) {
                if (match[club] < match[Object.keys(match)[0]]) {
                    ga += match[Object.keys(match)[0]];
                }
            }

            return 1;
        });

        return ga;
    };

    /**
     * @description Counts the number of goals scored by the team and returns that number
     * @param club - club name
     * @param roundMatches - all matches in the chosen round
     * @returns {number} gf
     */
    gf = (club: string, roundMatches: Object): number => {
        let gf = 0;

        (roundMatches as (Object)[]).map((match: Object, i: number) => {
            Object.keys(match).map((x, i) => {
                if (club === x) {
                    gf = match[club];
                }
                return 1;
            });
            return 1;
        });
        return gf;
    };

    /**
     * @description Initializes the club array for each chosen round and makes a new one
     * @param roundMatches - all matches in the chosen round
     */
    handleClubs = (roundMatches: Object): void => {
        clubs = [];

        (roundMatches as (Object)[]).forEach((match: Object) => {
            Object.keys(match).map((club: string) => clubs.push(club))
        })
    };

    /**
     * @description Checks the outcome for a given game
     * @param club - club name
     * @param roundMatches - all matches in the chosen round
     * @returns {string} W || D || L
     */
    calculateTrend = (club: string, roundMatches: Object) => {
        if (this.gamesWon(club, roundMatches) === 1) {
            return "W"
        } else if (this.gamesDrawn(club, roundMatches) === 1) {
            return "D"
        } else {
            return "L"
        }
    };

    /**
     * @description Renders choice button and other components
     */
    render(): React.ReactNode {
        this.handleClubs(data[this.props.state.round - 1].matches);
        sortTrend(data[0].matches);
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="dropdown float-left">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Pick a round
                            </button>
                            <div className="dropdown-menu pre-scrollable">
                                {
                                    data.map(x =>
                                        <button className="dropdown-item" key={x.round}
                                                onClick={(e) => {
                                                    e.persist();
                                                    this.props.roundChoice!(parseInt((e.target as HTMLButtonElement).innerHTML))
                                                }}>{x.round}</button>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg">
                        <h3 className="text-center">Round: {this.props.state.round}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <table className="table table-striped table-bright" id='myTable'>
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Played</th>
                                <th scope="col">Won</th>
                                <th scope="col">Drawn</th>
                                <th scope="col">Lost</th>
                                <th scope="col">GF</th>
                                <th scope="col">GA</th>
                                <th scope="col">GD</th>
                                <th scope="col">Points</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clubs.map((club: string) =>
                                <RankingTable club={club}
                                              won={this.gamesWon(club, data[this.props.state.round - 1].matches)}
                                              lost={this.gamesLost(club, data[this.props.state.round - 1].matches)}
                                              drawn={this.gamesDrawn(club, data[this.props.state.round - 1].matches)}
                                              ga={this.ga(club, data[this.props.state.round - 1].matches)}
                                              gf={this.gf(club, data[this.props.state.round - 1].matches)}
                                              key={club}
                                />
                            )
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md">
                        <table className="table table-striped table-bright" id="trendTable">
                            <thead>
                            <tr>
                                <th>Team</th>
                                <th colSpan={5} className="text-center">LAST 5 GAMES</th>
                            </tr>
                            </thead>
                            <tbody>
                            {trendClubs.map((club?: any) =>
                                <tr key={club}>
                                    <td>{club}</td>
                                    <td>{this.calculateTrend(club, data[data.length - 1].matches)}</td>
                                    <td>{this.calculateTrend(club, data[data.length - 2].matches)}</td>
                                    <td>{this.calculateTrend(club, data[data.length - 3].matches)}</td>
                                    <td>{this.calculateTrend(club, data[data.length - 4].matches)}</td>
                                    <td>{this.calculateTrend(club, data[data.length - 5].matches)}</td>
                                </tr>
                            )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Choice;

/**
 * @description Sorts an array of team names
 * @param roundMatches - all matches in the chosen round
 */
function sortTrend(roundMatches: Object) {
    trendClubs = [];

    (roundMatches as (Object)[]).forEach((match?: any) => {
        (Object.keys(match)).map((club: string) => trendClubs.push(club))
    });
    trendClubs = trendClubs.sort();
}
