// employee.store.ts (modification to include mock data)
import { Store, StoreConfig } from '@datorama/akita';
import { Employee } from './employee.model';

export interface EmployeeState {
  employees: Employee[];
}

export function createInitialState(): EmployeeState {
  return {
    employees: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        position: 'Software Engineer',
        department: 'Development',
        salary: 60000,
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        position: 'Project Manager',
        department: 'Management',
        salary: 80000,
      },
      {
        id: 2,
        name: 'Jane Smith 1',
        email: 'jane.smith@example.com',
        position: 'Project Manager',
        department: 'Management',
        salary: 80000,
      },
      {
        id: 2,
        name: 'Jane Smith 2',
        email: 'jane.smith@example.com',
        position: 'Project Manager',
        department: 'Management',
        salary: 80000,
      },
    ],
  };
}

@StoreConfig({ name: 'employee' })
export class EmployeeStore extends Store<EmployeeState> {
  constructor() {
    super(createInitialState());
  }
}
