import {Component, Input, OnInit} from '@angular/core';

interface Automobile {
  id: number;
  manufacturer: string;
  model: string;
}

enum sortState {
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
  modelSortStates: string[] = [...this.sortState];
  manufacturerSortStates: string[] = [...this.sortState];
  idSortStates: string[] = ['ASCENDING', 'DESCENDING'];


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
    if (rowSortState === sortState.none) {
      this.mutableAutomobiles = [...this.automobiles];
    } else {
      const sortOrder = rowSortState === sortState.ascending ? [-1, 1] : [1, -1];
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
  }

  sortModelColumn() {
    this.modelSortStates.push(this.modelSortStates.shift());
    const rowSortState = this.modelSortStates[0];
    this.sortData('model', rowSortState);
  }

  sortManufacturerColumn() {
    this.manufacturerSortStates.push(this.manufacturerSortStates.shift());
    const rowSortState = this.manufacturerSortStates[0];
    this.sortData('manufacturer', rowSortState);
  }

  sortIdColumn() {
    this.idSortStates.push(this.idSortStates.shift());
    const rowSortState = this.idSortStates[0];
    this.sortData('id', rowSortState);
  }

}
