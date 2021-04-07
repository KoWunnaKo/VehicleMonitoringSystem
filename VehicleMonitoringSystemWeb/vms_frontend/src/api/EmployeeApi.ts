import axios from 'axios';
import Employee from "../models/Employee";
import {getDbUserCompanyId} from "../utils/UserUtil";

export async function getAllDrivers(): Promise<Employee[] | null> {
  const companyId = getDbUserCompanyId();
  if (!companyId) {
    return null;
  }

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
