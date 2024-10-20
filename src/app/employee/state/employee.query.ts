import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { EmployeeStore, EmployeeState } from './employee.store';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeQuery extends Query<EmployeeState> {
  constructor(protected store: EmployeeStore) {
    super(store); // Call the parent class with the store
  }

  // Create a query that selects the list of employees as an observable
  selectEmployees(): Observable<Employee[]> {
    return this.select((state) => state.employees);
  }
  // Find employee by name
  getEmployeeByName(name: string): Employee | undefined {
    return this.getValue().employees.find((emp) => emp.name === name);
  }
  // Optionally, create a method to get an employee by ID
  getEmployeeById(id: number): Employee | undefined {
    return this.getValue().employees.find((employee) => employee.id === id);
  }
  // Method to get all employees
  getAllEmployees(): Employee[] {
    return this.getValue().employees; // Return the current list of employees from the store
  }
}
