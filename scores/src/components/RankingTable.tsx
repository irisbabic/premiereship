import * as React from 'react';

export interface Props {
    club: string;
    won: number;
    lost: number;
    drawn: number;
    gf: number;
    ga: number;
}

/**
 * @class RankingTable
 * @classdesc Component for rendering ranking table
 */
class RankingTable extends React.Component <Props> {

    /**
     * @description When component updates, helper function sortData() is called
     */
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
        sortData();
    }

    /**
     * @description When component mounts, helper function sortData() is called
     */
    componentDidMount(): void {
        sortData();
    }

    /**
     * @description Renders rows in a table depending on current round
     */
    render(): React.ReactNode {

        return (<tr key={this.props.club}>
            <th></th>
            <td>
                {this.props.club}
            </td>
            <td>
                {this.props.won + this.props.lost + this.props.drawn}
            </td>
            <td>
                {this.props.won}
            </td>
            <td>
                {this.props.drawn}
            </td>
            <td>
                {this.props.lost}
            </td>
            <td>
                {this.props.gf}
            </td>
            <td>
                {this.props.ga}
            </td>
            <td>
                {this.props.gf - this.props.ga}
            </td>
            <td>
                {(this.props.won * 3) + this.props.drawn}
            </td>

        </tr>);

    }
}

export default RankingTable;

/**
 * @description Sorts given data in table
 */
function sortData(): void {

    let table = document.getElementById('myTable')!.getElementsByTagName('tbody').item(0);
    let rowData = table!.rows;

    //Looping through row nodes to access table data
    for (let i = 0; i < rowData.length - 1; i++) {
        //Sorting by total point count
        //Swapping row nodes if condition is satisfied
        if (parseInt(rowData.item(i)!.getElementsByTagName('td').item(8)!.innerHTML) <
            parseInt(rowData.item(i + 1)!.getElementsByTagName('td').item(8)!.innerHTML)) {
            table!.insertBefore(rowData.item(i + 1)!, rowData.item(i));

            //Return ranking number to to previous state
            rowData.item(i)!.getElementsByTagName('th').item(0)!.innerHTML = (rowData.item(i)!.rowIndex).toString();
            rowData.item(i + 1)!.getElementsByTagName('th').item(0)!.innerHTML = (rowData.item(i + 1)!.rowIndex).toString();
        }

        //Sorting by total points and goal difference if there are two or more teams with same total points
        if (parseInt(rowData.item(i)!.getElementsByTagName('td').item(8)!.innerHTML) ===
            parseInt(rowData.item(i + 1)!.getElementsByTagName('td').item(8)!.innerHTML)) {
            if (parseInt(rowData.item(i)!.getElementsByTagName('td').item(7)!.innerHTML) <
                parseInt(rowData.item(i + 1)!.getElementsByTagName('td').item(7)!.innerHTML)) {
                table!.insertBefore(rowData.item(i + 1)!, rowData.item(i));
                rowData.item(i)!.getElementsByTagName('th').item(0)!.innerHTML = (rowData.item(i)!.rowIndex).toString();
                rowData.item(i + 1)!.getElementsByTagName('th').item(0)!.innerHTML = (rowData.item(i + 1)!.rowIndex).toString();
            }
        }

        //Sorting by total points, goal difference and goal scored if there are two or more teams with same total points and goal difference
        if (parseInt(rowData.item(i)!.getElementsByTagName('td').item(8)!.innerHTML) ===
            parseInt(rowData.item(i + 1)!.getElementsByTagName('td').item(8)!.innerHTML) &&
            (parseInt(rowData.item(i)!.getElementsByTagName('td').item(7)!.innerHTML) ===
                parseInt(rowData.item(i + 1)!.getElementsByTagName('td').item(7)!.innerHTML))) {
            if (parseInt(rowData.item(i)!.getElementsByTagName('td').item(5)!.innerHTML) <
                parseInt(rowData.item(i + 1)!.getElementsByTagName('td').item(5)!.innerHTML)) {
                table!.insertBefore(rowData.item(i + 1)!, rowData.item(i));
                rowData.item(i)!.getElementsByTagName('th').item(0)!.innerHTML = (rowData.item(i)!.rowIndex).toString();
                rowData.item(i + 1)!.getElementsByTagName('th').item(0)!.innerHTML = (rowData.item(i + 1)!.rowIndex).toString();
            }
        }

    }

}