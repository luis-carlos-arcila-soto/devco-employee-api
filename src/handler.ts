import 'reflect-metadata';
import { Handler } from 'aws-lambda';
import { ProcCreateEmployees, ProcDeleteEmployee, ProcListEmployees, ProcOneEmployee, ProcUpdateEmployees } from './aws-services/employeeAws.service';

export const createEmployees: Handler = async (event: any, _Context: any) => {
  try {
    return await ProcCreateEmployees(event);
  }
  catch (error) {
    console.log(error);
  }
}

export const updateEmployees: Handler = async (event: any, _Context: any) => {
  try {
    return await ProcUpdateEmployees(event);
  }
  catch (error) {
    console.log(error);
  }
}

export const listEmployees: Handler = async (event: any, _Context: any) => {
  try {
    return await ProcListEmployees(event);
  }
  catch (error) {
    console.log(error);
  }
}

export const oneEmployee: Handler = async (event: any, _Context: any) => {
  try {
    return await ProcOneEmployee(event);
  }
  catch (error) {
    console.log(error);
  }
}

export const deleteEmployee: Handler = async (event: any, _Context: any) => {
  try {
    return await ProcDeleteEmployee(event);
  }
  catch (error) {
    console.log(error);
  }
}
