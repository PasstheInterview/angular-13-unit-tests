import { Injectable } from '@angular/core';
import { EmployeeStore } from './employee.store';
import { Employee, createEmployeeObj } from './employee.model'; // Updated import
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private employeeStore: EmployeeStore) {}

  // Create a new employee
  createEmployee(employee: Employee): Observable<Employee> {
    this.employeeStore.update((state) => ({
      employees: [...state.employees, createEmployeeObj(employee)], // Create employee object
    }));
    return of(employee); // Simulate an HTTP response with the added employee
  }

  // Get all employees
  getEmployees(): Observable<Employee[]> {
    return of(this.employeeStore.getValue().employees); // Get all employees from the store
  }

  // Get an employee by ID
  getEmployeeById(id: number): Observable<Employee | undefined> {
    const employees = this.employeeStore.getValue().employees; // Retrieve all employees
    return of(employees.find((employee) => employee.id === id)); // Find the employee by ID
  }

  // Update an employee
  updateEmployee(employee: Employee): Observable<Employee | undefined> {
    const employees = this.employeeStore.getValue().employees; // Get all employees
    const existingEmployeeIndex = employees.findIndex(
      (e) => e.id === employee.id
    ); // Find the index of the employee

    if (existingEmployeeIndex > -1) {
      this.employeeStore.update((state) => {
        const updatedEmployees = [...state.employees]; // Create a copy of the employees array
        updatedEmployees[existingEmployeeIndex] = employee; // Update the specific employee
        return { employees: updatedEmployees }; // Return the new state
      });
      return of(employee); // Return the updated employee as an observable
    }
    return of(undefined); // Return undefined if the employee does not exist
  }

  // Delete an employee
  deleteEmployee(id: number): Observable<number | undefined> {
    const employees = this.employeeStore.getValue().employees; // Get all employees
    const existingEmployeeIndex = employees.findIndex(
      (employee) => employee.id === id
    ); // Find the employee by ID

    if (existingEmployeeIndex > -1) {
      this.employeeStore.update((state) => ({
        employees: state.employees.filter((employee) => employee.id !== id), // Filter out the employee to delete
      }));
      return of(id); // Return the deleted employee's ID as an observable
    }
    return of(undefined); // Return undefined if the employee does not exist
  }
}
