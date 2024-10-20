// Employee interface
export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  createdAt?: Date; // Optional
  modifiedAt?: Date; // Optional
}

// Function to generate a unique ID
let currentId = 0;

export function generateId(): number {
  currentId++;
  return currentId;
}

// Factory function for creating Employee objects
export function createEmployeeObj(params: Partial<Employee>): Employee {
  return {
    id: generateId(), // Call the ID generation function
    name: params.name || '',
    email: params.email || '',
    position: params.position || '',
    department: params.department || '',
    salary: params.salary || 0,
    createdAt: new Date(),
    modifiedAt: new Date(),
    ...params, // Spread operator to merge any additional properties
  };
}
