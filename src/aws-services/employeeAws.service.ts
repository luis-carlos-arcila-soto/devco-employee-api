import { Container } from 'typedi';
import EmployeeService from '../services/employee.service';

export async function ProcCreateEmployees(event: any) {
  let body = JSON.parse(event.body);
  const employeeServiceInstance = Container.get(EmployeeService);
  let response = await employeeServiceInstance.CreateEmployee(body);
  return { body: JSON.stringify(response), statusCode: 200 };
};

export async function ProcUpdateEmployees(event: any) {
  let body = JSON.parse(event.body);
  const employeeServiceInstance = Container.get(EmployeeService);
  let response = await employeeServiceInstance.UpdateEmployee(body);
  return { body: JSON.stringify(response), statusCode: 200 };
}

export async function ProcListEmployees(event: any) {
  const employeeServiceInstance = Container.get(EmployeeService);
  let response = await employeeServiceInstance.ListEmployees();
  return { body: JSON.stringify(response), statusCode: 200 };
}

export async function ProcOneEmployee(event: any) {
  let documentId = event.pathParameters.documentId;
  const employeeServiceInstance = Container.get(EmployeeService);
  let response = await employeeServiceInstance.OneEmployee(documentId);
  return { body: JSON.stringify(response), statusCode: 200 };
}

export async function ProcDeleteEmployee(event: any) {
  let documentId = event.pathParameters.documentId;
  const employeeServiceInstance = Container.get(EmployeeService);
  let response = await employeeServiceInstance.DeleteEmployee(documentId);
  return { body: JSON.stringify(response), statusCode: 200 };
}