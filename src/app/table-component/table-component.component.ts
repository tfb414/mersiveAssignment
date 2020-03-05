import {Component, Input, OnInit} from '@angular/core';

interface Automobile {
  id: number;
  manufacturer: string;
  model: string;
}

enum sortStateDefaults {
  none = 'NONE',
  ascending = 'ASCENDING',
  descending = 'DESCENDING'
}

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements OnInit {
  @Input() automobiles: Automobile[];
  displayColumns: string[] = ['id', 'manufacturer', 'model'];
  mutableAutomobiles: Automobile[] | [];

  sortState: string[] = ['NONE', 'ASCENDING', 'DESCENDING'];

  columnSortStates: any = {
    model: 'NONE',
    manufacturer: 'NONE',
    id: 'NONE'
  };


  constructor() {
  }

  ngOnInit(): void {
    this.mutableAutomobiles = [...this.automobiles];
  }

  filterSearch(term): void {
    this.mutableAutomobiles = this.automobiles.filter(automobile => {
      return Object.values(automobile).some(value =>
        value.toString().toLowerCase().includes(
          term.target.value.toString().toLowerCase()
        )
      );
    });
  }

  sortData(columnName, rowSortState) {
    const sortOrder = rowSortState === sortStateDefaults.ascending ? [-1, 1] : [1, -1];
    this.mutableAutomobiles = [...this.mutableAutomobiles
      .sort((a, b) => {
        if (a[columnName] < b[columnName]) {
          return sortOrder[0];
        }
        if (a[columnName] > b[columnName]) {
          return sortOrder[1];
        }
        return 0;
      })];
  }

  sortColumn(columnName) {
    this.columnSortStates[columnName] = this.getNextSortState(columnName);
    this.columnSortStates[columnName] === sortStateDefaults.none
      ? this.mutableAutomobiles = [...this.automobiles]
      : this.sortData(columnName, this.columnSortStates[columnName]);
  }

  getNextSortState(columnName) {
    const currentIndex = this.sortState.indexOf(this.columnSortStates[columnName]);
    const updatedSortStateIndex  = currentIndex > 1 ? 0 : currentIndex + 1;
    return this.sortState[updatedSortStateIndex];
  }

}
