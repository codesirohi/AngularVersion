import { AppRoutingModule } from './../app-routing.module';
import { ApiService } from './shared/api.service';
import { EmployeeModel } from './employee.model';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  closeResult = ''; // Modal related
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;

  constructor(
    private modalService: NgbModal,
    private formbuilder: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      age: [''],
    });
    this.getEmployeeDetails();
  }
  
  //Function to post new Employee
  postEmployeeDetails() {
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.age = this.formValue.value.age;

    // console.log(this.employeeModelObj);

    this.api.postEmployee(this.employeeModelObj).subscribe((res) => {
      //  console.log(res);
      // alert('Employee Added Succesfully');
      this.formValue.reset();
      this.getEmployeeDetails();
    });
  }

  //Function to get all employee details
  getEmployeeDetails(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  //Function to get all Employee Details
  delEmployeeDetails(row: any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      this.getEmployeeDetails();
      alert(row.name + " deleted.")
    })

  }

  //Populate form Employee
  onEdit(row: any){
    this.employeeModelObj.id = row.id; //to be used in the update function
    this.formValue.controls['name'].setValue(row.name)
    this.formValue.controls['age'].setValue(row.age)
  }

  //Update Employee details in Database
  updateEmployeeDetails(){
    
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.age = this.formValue.value.age;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=>{
      this.formValue.reset();
      this.getEmployeeDetails();

    })
  }






  //ng-Modal opening, Closing and other functioning
  open(content: any) {
    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  //ng-Modal opening, Closing and other functioning
}
