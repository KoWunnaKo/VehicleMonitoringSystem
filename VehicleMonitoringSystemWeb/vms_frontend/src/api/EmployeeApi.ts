import axios from 'axios';
import Employee from "../models/Employee";

export async function getAllDrivers(companyId: number): Promise<Employee[] | null> {
  try {
    const response = await axios.get<Employee[]>(`employee/getAllDrivers/${companyId}`);
    const drivers = response.data;
    drivers.map(driver => Object.setPrototypeOf(driver, Employee.prototype))
    return drivers;
  } catch (e) {
    // console.log("Error:getAllDrivers ", e.response);
    return null;
  }
}

export async function deleteEmployee(employeeId: string): Promise<boolean | null> {
  try {
    const response = await axios.delete(`employee/delete/${employeeId}`);
    // console.log(`drivers: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:getAllDrivers ", e.response);
    return null;
  }
}
