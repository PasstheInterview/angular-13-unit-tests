// employee-search.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { EmployeeQuery } from '../employee/state/employee.query';
import { Employee } from '../employee/state/employee.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css'],
})
export class EmployeeSearchComponent implements OnInit {
  searchForm!: FormGroup;
  filteredEmployees$: Observable<Employee[]>;

  constructor(private fb: FormBuilder, private employeeQuery: EmployeeQuery) {
    this.filteredEmployees$ = this.employeeQuery.selectEmployees(); // Get all employees
  }

  ngOnInit(): void {
    this.initForm();
    this.trackSearchChanges(); // Subscribe to search input changes
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      search: [''], // Form control for search input
    });
  }

  trackSearchChanges(): void {
    this.searchForm
      .get('search')!
      .valueChanges.pipe(
        map((searchTerm) => {
          return this.employeeQuery
            .getAllEmployees() // Fetch all employees
            .filter((employee) =>
              employee.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        })
      )
      .subscribe((filteredEmployees) => {
        this.filteredEmployees$ = of(filteredEmployees);
      });
  }
}
