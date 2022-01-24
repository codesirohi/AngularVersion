import { EmployeeModel } from './../employee.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url: string =  "http://localhost:3000/Employee/";

  postEmployee(data: any){
    return this.http.post<EmployeeModel>("http://localhost:3000/Employee/", data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }
  getEmployee(){
    return this.http.get<any>("http://localhost:3000/Employee/")
    .pipe(map((res: any)=>{
      return res;
    }))
  }
  updateEmployee(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/Employee/" + id, data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }
  deleteEmployee(id: number){
    return this.http.delete<any>("http://localhost:3000/Employee/" + id)
    .pipe(map((res: any)=>{
      return res;
    }))
  }
}
   