import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSortModule} from "@angular/material/sort";
import {MatTableDataSource} from '@angular/material/table';
import {Case} from "../model/case";
import {CasesService} from "../services/cases.service";

@Component({
  selector: 'cases-about',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements AfterViewInit {

  caseData: Case;
  displayedColumns: string[] = ['date', 'technician', 'description', 'review'];
  dataSource: MatTableDataSource<Case>;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private casesService: CasesService) {
    this.caseData = {} as Case;
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllCases();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllCases() {
    this.casesService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
}
