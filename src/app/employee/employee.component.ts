import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Employee, createEmployeeObj } from './state/employee.model'; // Updated import
import { EmployeeService } from './state/employee.service';
import { EmployeeQuery } from './state/employee.query';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeComponent implements OnInit {
  employees$ = this.employeeQuery.selectEmployees(); // Observable of employees
  employeeForm!: FormGroup;
  searchControl!: FormControl; // Control for search input
  filteredEmployees: Employee[] = []; // To hold filtered employees based on search

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private employeeQuery: EmployeeQuery
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setupSearchControl(); // Initialize the search control
  }

  // Initialize the form
  initForm(): void {
    this.employeeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      department: ['', Validators.required],
      salary: [0, Validators.required],
    });
  }

  // Initialize the search control and set up valueChanges to filter employees
  setupSearchControl(): void {
    this.searchControl = new FormControl(''); // Create the search control
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Add a small delay to prevent excessive filtering
        distinctUntilChanged() // Only proceed if the value has changed
      )
      .subscribe((searchTerm) => {
        if (searchTerm) {
          this.filterEmployees(searchTerm); // Call filter function when search term is entered
        } else {
          this.filteredEmployees = []; // Clear the filtered list if search term is empty
        }
      });
  }

  // Filter employees based on the search term
  filterEmployees(searchTerm: string): void {
    this.employeeQuery.selectEmployees().subscribe((employees) => {
      this.filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  // Handle employee selection from the search results
  onEmployeeSelect(employee: Employee): void {
    this.employeeForm.patchValue(employee); // Populate the form with the selected employee
  }

  // Submit form (Create or Update Employee)
  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee: Employee = createEmployeeObj(this.employeeForm.value); // Create employee object using the factory function
      if (employee.id) {
        this.employeeService.updateEmployee(employee).subscribe(() => {
          this.employeeForm.reset();
        });
      } else {
        this.employeeService.createEmployee(employee).subscribe(() => {
          this.employeeForm.reset();
        });
      }
    }
  }

  // Edit an employee by patching the form with the employee's details
  editEmployee(employee: Employee): void {
    this.employeeForm.patchValue(employee);
  }

  // Delete an employee
  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe();
  }
}
