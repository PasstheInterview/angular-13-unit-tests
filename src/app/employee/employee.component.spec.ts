import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { EmployeeComponent } from './employee.component';
import { EmployeeService } from './state/employee.service';
import { EmployeeQuery } from './state/employee.query';
import { Employee } from './state/employee.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('EmployeeComponent', () => {
  let spectator: Spectator<EmployeeComponent>;
  let employeeService: EmployeeService;
  let employeeQuery: EmployeeQuery;

  const createComponent = createComponentFactory({
    component: EmployeeComponent,
    imports: [ReactiveFormsModule],
    mocks: [EmployeeService, EmployeeQuery], // Mocks for services
    providers: [FormBuilder],
  });

  beforeEach(() => {
    spectator = createComponent();
    employeeService = spectator.inject(EmployeeService);
    employeeQuery = spectator.inject(EmployeeQuery);
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy(); // Check if the component is created
  });

  it('should initialize the form on component init', () => {
    spectator.component.ngOnInit(); // Trigger ngOnInit
    expect(spectator.component.employeeForm).toBeTruthy(); // Verify form initialization
    expect(spectator.component.employeeForm.controls['name']).toBeTruthy(); // Form control for name should exist
  });

  it('should fetch employees on component init', () => {
    const employees: Employee[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        position: 'Manager',
        department: 'Sales',
        salary: 1000,
      },
    ];
    spyOn(employeeQuery, 'selectEmployees').and.returnValue(of(employees)); // Mock employee query
    spectator.component.ngOnInit();
    spectator.detectChanges();
    expect(spectator.component.employees$).toBeDefined(); // Verify employees$ observable
  });

  it('should update the form when editing an employee', () => {
    const employee: Employee = {
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
      position: 'Developer',
      department: 'IT',
      salary: 1200,
    };
    spectator.component.editEmployee(employee);
    const formValues = spectator.component.employeeForm.value;
    expect(formValues.name).toBe('Jane Doe'); // Ensure form updates with the correct employee data
  });

  it('should submit the form to create a new employee', () => {
    spyOn(employeeService, 'createEmployee').and.returnValue(
      of({} as Employee)
    ); // Mock service

    spectator.component.employeeForm.setValue({
      id: null,
      name: 'John Doe',
      email: 'john@example.com',
      position: 'Developer',
      department: 'IT',
      salary: 1500,
    });

    spectator.component.onSubmit();
    expect(employeeService.createEmployee).toHaveBeenCalled(); // Verify service method call
    expect(spectator.component.employeeForm.reset).toHaveBeenCalled(); // Ensure form reset after submit
  });

  it('should update an existing employee on form submit', () => {
    spyOn(employeeService, 'updateEmployee').and.returnValue(
      of({} as Employee)
    ); // Mock service

    spectator.component.employeeForm.setValue({
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
      position: 'Manager',
      department: 'HR',
      salary: 2000,
    });

    spectator.component.onSubmit();
    expect(employeeService.updateEmployee).toHaveBeenCalled(); // Ensure service call for updating employee
  });

  it('should delete an employee', () => {
    spyOn(employeeService, 'deleteEmployee').and.returnValue(of(1)); // Mock delete function

    spectator.component.deleteEmployee(1); // Call delete with employee ID 1
    expect(employeeService.deleteEmployee).toHaveBeenCalledWith(1); // Ensure the correct ID is passed
  });

  it('should filter employees based on search term', () => {
    const employees: Employee[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        position: 'Manager',
        department: 'Sales',
        salary: 1000,
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        position: 'Developer',
        department: 'IT',
        salary: 1200,
      },
    ];

    spyOn(employeeQuery, 'selectEmployees').and.returnValue(of(employees)); // Mock employees

    spectator.component.setupSearchControl();
    spectator.component.searchControl.setValue('Jane');
    expect(spectator.component.filteredEmployees.length).toBe(1); // Only 'Jane' should match
    expect(spectator.component.filteredEmployees[0].name).toBe('Jane Smith');
  });
});
