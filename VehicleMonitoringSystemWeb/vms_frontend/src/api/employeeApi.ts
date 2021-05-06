import axios from 'axios';
import Employee from "../models/employee";
import {getDbUserCompanyId} from "../utils/userUtil";
import Vehicle from "../models/vehicle";

export async function getAllDrivers(): Promise<Employee[] | null> {
  const companyId = await getDbUserCompanyId();
  if (!companyId) {
    return null;
  }

  try {
    const response = await axios.get<Employee[]>(`employee/getAllDrivers/${companyId}`);
    const drivers = response.data;
    drivers.map(driver => Object.setPrototypeOf(driver, Employee.prototype))
    return drivers;
  } catch (e) {
    console.log("Error:getAllDrivers ", e.response);
    return null;
  }
}

export async function getAllEmployees(): Promise<Employee[] | null> {
  const companyId = await getDbUserCompanyId();
  if (!companyId) {
    return null;
  }

  try {
    const response = await axios.get<Employee[]>(`employee/getAllEmployees/${companyId}`);
    const employees = response.data;
    employees.map(driver => Object.setPrototypeOf(driver, Employee.prototype))
    return employees;
  } catch (e) {
    console.log("Error:getAllEmployees ", e.response);
    return null;
  }
}

export async function deleteEmployee(employeeId: string): Promise<boolean | null> {
  try {
    // TODO delete user from firebase?
    const response = await axios.delete(`employee/${employeeId}`);
    // console.log(`drivers: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    console.log("Error:deleteEmployee ", e.response);
    return null;
  }
}

export async function editEmployee(employee: Employee) {
  try {
    const response = await axios.put(`employee`, employee);
    // console.log(`editEmployee: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    console.log("Error:editEmployee ", e.response);
    return null;
  }
}
