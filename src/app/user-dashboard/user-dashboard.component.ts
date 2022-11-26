import { Router } from "@angular/router";
import { AuthService } from "./../services/auth.service";
import { RegistrationFormComponent } from "./../registration-form/registration-form.component";

import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
Router;

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.css"],
})
export class UserDashboardComponent implements OnInit {
  getemployeedata: any;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: AuthService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }
  getAllProduct(): void {
    this.api.getProduct().subscribe((res) => {
      console.log(res);
      this.getemployeedata = res;
      // this.getemployeedata.paginator=this.paginator;
      // this.getemployeedata.sort=this.sort;
    });
  }

  editProduct(row: any) {
    this.dialog
      .open(RegistrationFormComponent, {
        autoFocus: false,
        height: "1000px",
        width: "1500px",
        data: row,
      })
      .afterClosed()
      .subscribe(() => {
        sessionStorage.setItem("isedit", "istrue");
        this.getAllProduct();
      });
  }

  logout() {
    sessionStorage.clear();
    this._route.navigate(["login"]);
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        alert("Student delete Successfully");
        this.getAllProduct();
      },
      error: () => {
        alert("Error While Deleting Student Details");
      },
    });
  }
}
