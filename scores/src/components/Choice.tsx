import * as React from 'react';
import RankingTable from "./RankingTable";

import * as data from "../data";

let clubs: Array<any> = [];

export interface Props {
    round: number;
    onRoundChange?: (value: string) => any;
}

interface State {
   round: number;
}

class Choice extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { round: props.round };
    }

    roundChoice = (event?: any): void => {
        event.persist();
        this.setState({
            round: event.target.innerHTML,
        });
    };

    gamesWon = (klub: string, roundMatches: Object): number =>{
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

    gamesLost = (klub: string, roundMatches: Object): number =>{
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

        (roundMatches as (Object)[]).forEach((match: Object) => clubs.push(Object.keys(match)))
    };

    render() {
        this.handleClubs(data[this.state.round-1].matches);
        return (
            <div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Pick a round
                    </button>
                    <div className="dropdown-menu pre-scrollable">
                        {
                            data.map(x =>
                                <button className="dropdown-item" key={x.round}
                                        onClick={this.roundChoice.bind(this)} value={x.round}>{x.round}</button>
                                //this.props!.onRoundChange!(x.round.toString())
                            )}
                    </div>
                </div>
                <h1 className="text-left">Round: {this.state.round}</h1>
                <table className="table table-striped table-dark" id='myTable'>
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
                    {clubs.map((clubs? : any, index?: number) =>
                        clubs.map((club: string, i: number) =>
                            <RankingTable club={club}
                                          won={this.gamesWon(club, data[this.state.round-1].matches)}
                                          lost={this.gamesLost(club, data[this.state.round-1].matches)}
                                          drawn={this.gamesDrawn(club, data[this.state.round-1].matches)}
                                          ga={this.ga(club, data[this.state.round-1].matches)}
                                          gf={this.gf(club, data[this.state.round-1].matches)}
                                          key={club}
                            />
                        )
                    )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Choice;


