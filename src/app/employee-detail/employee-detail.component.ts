import { Component, Input } from '@angular/core';
import { Employee } from '../employee/state/employee.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent {
  @Input() employees!: Employee[]; // Accepting employees input from parent
  @Input() onEdit!: (employee: Employee) => void; // Method to edit employee
  @Input() onDelete!: (id: number) => void; // Method to delete employee
}
