import * as React from 'react';
import RankingTable from "./RankingTable";
import * as data from "../data";
import {StoreState} from "../types";
//import './Choice.css'

let clubs: Array<any> = [];

export interface Props {
    roundChoice?: (round: number) => number;
    state: StoreState;
}

class Choice extends React.Component <Props> {

    gamesWon = (klub: string, roundMatches: Object): number => {
        let wins = 0;

        (roundMatches as (Object)[]).map((match: Object, i: number) => {
            if (klub === Object.keys(match)[0]) {

                if (match[klub] > match[Object.keys(match)[1]]) {
                    wins++;
                }
            } else if ((klub === Object.keys(match)[1])) {
                if (match[klub] > match[Object.keys(match)[0]]) {
                    wins++;
                }
            }

            return 1;
        });

        return wins;
    };

    gamesLost = (klub: string, roundMatches: Object): number => {
        let lost = 0;

        (roundMatches as (Object)[]).map((match: Object, i: number) => {
            if (klub === Object.keys(match)[0]) {
                if (match[klub] < match[Object.keys(match)[1]]) {
                    lost++;
                }
            } else if ((klub === Object.keys(match)[1])) {
                if (match[klub] < match[Object.keys(match)[0]]) {
                    lost++;
                }
            }
            return 1;

        });

        return lost;
    };

    gamesDrawn = (klub: string, roundMatches: Object): number => {
        let drawn = 0;

        (roundMatches as (Object)[]).map((match: Object, i: number) => {

            if (klub === Object.keys(match)[0]) {
                if (match[klub] === match[Object.keys(match)[1]]) {
                    drawn++;
                }
            } else if ((klub === Object.keys(match)[1])) {
                if (match[klub] === match[Object.keys(match)[0]]) {
                    drawn++;
                }
            }

            return 1;
        });

        return drawn;
    };

    ga = (klub: string, roundMatches: Object): number => {
        let ga = 0;

        (roundMatches as (Object)[]).map((match: Object, i: number) => {
            if (klub === Object.keys(match)[0]) {
                if (match[klub] < match[Object.keys(match)[1]]) {
                    ga += match[Object.keys(match)[1]];
                }
            } else if ((klub === Object.keys(match)[1])) {
                if (match[klub] < match[Object.keys(match)[0]]) {
                    ga += match[Object.keys(match)[0]];
                }
            }

            return 1;
        });

        return ga;
    };

    gf = (klub: string, roundMatches: Object): number => {
        let gf = 0;

        (roundMatches as (Object)[]).map((match: Object, i: number) => {
            Object.keys(match).map((x, i) => {
                if (klub === x) {
                    gf = match[klub];
                }
                return 1;
            });
            return 1;
        });
        return gf;
    };

    handleClubs = (roundMatches: Object): void => {
        clubs = [];

        (roundMatches as (Object)[]).forEach((match: Object) => clubs.push(Object.keys(match)));
    };
    calculateTrend = (klub: string, roundMatches: Object) => {
        if (this.gamesWon(klub, roundMatches) === 1) {
            return "W"
        } else if (this.gamesDrawn(klub, roundMatches) === 1) {
            return "D"
        } else {
            return "L"
        }
    };

    render() {
        this.handleClubs(data[this.props.state.round - 1].matches);
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
                    <div className="col-md center-block">
                    <h3 className="text-center">Round: {this.props.state.round}</h3>
                </div>
                    <div className="col-md center-block">
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
                            {clubs.map((clubs?: any, index?: number) =>
                                clubs.map((club: string, i: number) =>
                                    <RankingTable club={club}
                                                  won={this.gamesWon(club, data[this.props.state.round - 1].matches)}
                                                  lost={this.gamesLost(club, data[this.props.state.round - 1].matches)}
                                                  drawn={this.gamesDrawn(club, data[this.props.state.round - 1].matches)}
                                                  ga={this.ga(club, data[this.props.state.round - 1].matches)}
                                                  gf={this.gf(club, data[this.props.state.round - 1].matches)}
                                                  key={club}
                                    />
                                )
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
                            {clubs.sort().map((clubs?: any, index?: number) =>
                                clubs.map((club: string, i: number) =>
                                    <tr key={club}>
                                        <td>{club}</td>
                                        <td>{this.calculateTrend(club, data[data.length - 1].matches)}</td>
                                        <td>{this.calculateTrend(club, data[data.length - 2].matches)}</td>
                                        <td>{this.calculateTrend(club, data[data.length - 3].matches)}</td>
                                        <td>{this.calculateTrend(club, data[data.length - 4].matches)}</td>
                                        <td>{this.calculateTrend(club, data[data.length - 5].matches)}</td>
                                    </tr>
                                )
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
