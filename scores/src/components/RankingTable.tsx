import * as React from 'react';

export interface Props {
    club: string;
    won: number;
    lost: number;
    drawn: number;
    gf: number;
    ga: number;
}

class RankingTable extends React.Component <Props>{

componentDidMount(): void {
    sortData();
    }

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
                {(this.props.won*3) + this.props.drawn}
            </td>

        </tr>);

    }
}

export default RankingTable;

function sortData(): void {
    // Read table body node.
    let table = document.getElementById('myTable')!.getElementsByTagName('tbody').item(0);
    // Read table row nodes.
    let rowData = table!.rows;

    for (let i = 0; i < rowData.length - 1; i++) {
        for (let j = 0; j < rowData.length - (i + 1); j++) {
            //Swap row nodes if short condition matches
            if (parseInt(rowData.item(j)!.getElementsByTagName('td').item(8)!.innerHTML) < parseInt(rowData.item(j + 1)!.getElementsByTagName('td').item(8)!.innerHTML)) {
                table!.insertBefore(rowData.item(j + 1)!, rowData.item(j));
                rowData.item(j)!.getElementsByTagName('th').item(0)!.innerHTML = (rowData.item(j)!.rowIndex).toString();
                rowData.item(j + 1)!.getElementsByTagName('th').item(0)!.innerHTML = (rowData.item(j + 1)!.rowIndex).toString();
            }
        }
    }

    for(let i = 0; i < rowData.length - 1; i++) {
        for(let j = 0; j < rowData.length - (i + 1); j++) {
            //Swap row nodes if short condition matches
            if(parseInt(rowData.item(j)!.getElementsByTagName('td').item(8)!.innerHTML) === parseInt(rowData.item(j+1)!.getElementsByTagName('td').item(8)!.innerHTML)) {
                if(parseInt(rowData.item(j)!.getElementsByTagName('td').item(7)!.innerHTML) < parseInt(rowData.item(j+1)!.getElementsByTagName('td').item(7)!.innerHTML)) {
                    table!.insertBefore(rowData.item(j+1)!,rowData.item(j));
                    rowData.item(j)!.getElementsByTagName('th').item(0)!.innerHTML = (rowData.item(j)!.rowIndex).toString();
                    rowData.item(j + 1)!.getElementsByTagName('th').item(0)!.innerHTML = (rowData.item(j + 1)!.rowIndex).toString();
                }
            }
        }
    }

    for(let i = 0; i < rowData.length - 1; i++) {
        for(let j = 0; j < rowData.length - (i + 1); j++) {
            //Swap row nodes if short condition matches
            if(parseInt(rowData.item(j)!.getElementsByTagName('td').item(8)!.innerHTML) === parseInt(rowData.item(j+1)!.getElementsByTagName('td').item(8)!.innerHTML)) {
                if(parseInt(rowData.item(j)!.getElementsByTagName('td').item(7)!.innerHTML) === parseInt(rowData.item(j+1)!.getElementsByTagName('td').item(7)!.innerHTML)) {
                    if(parseInt(rowData.item(j)!.getElementsByTagName('td').item(5)!.innerHTML) < parseInt(rowData.item(j+1)!.getElementsByTagName('td').item(5)!.innerHTML)) {
                        table!.insertBefore(rowData.item(j+1)!,rowData.item(j));
                        rowData.item(j)!.getElementsByTagName('th').item(0)!.innerHTML = (rowData.item(j)!.rowIndex).toString();
                        rowData.item(j + 1)!.getElementsByTagName('th').item(0)!.innerHTML = (rowData.item(j + 1)!.rowIndex).toString();
                    }
                }
            }
        }
    }
}