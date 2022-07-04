import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Company} from "../../companies/model/company";
import {MatTableDataSource} from "@angular/material/table";
import {CompaniesService} from "../../companies/services/companies.service";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import * as _ from 'lodash';

@Component({
  selector: 'app-serviceshistory',
  templateUrl: './serviceshistory.component.html',
  styleUrls: ['./serviceshistory.component.css']
})
export class ServiceshistoryComponent implements OnInit, AfterViewInit {

  companyData: Company;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'address', 'actions']

  @ViewChild('companyForm', { static: false })
  companyForm!: NgForm;

  @ViewChild(MatPaginator, {static:true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private companiesService: CompaniesService) {
    this.companyData = {} as Company;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllCompanies();
  }

  ngAfterViewInit() : void{
    this.dataSource.sort = this.sort;
  }

  getAllCompanies() {
    this.companiesService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
  editItem(element: Company) {
    this.companyData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.companyForm.resetForm();
  }

  deleteItem(id: number) {
    this.companiesService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Company) => {
        return o.id !== id ? o: false;
      });
    });
    console.log(this.dataSource.data);
  }

  addCompany() {
    this.companyData.id = 0;
    this.companiesService.create(this.companyData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => {
        return o;
      });
    });
  }

  updateCompany() {
    this.companiesService.update(this.companyData.id, this.companyData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Company) => {
        if (o.id == response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit() {
    if (this.companyForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updateCompany();
      } else {
        console.log('about to create');
        this.addCompany();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }
}
