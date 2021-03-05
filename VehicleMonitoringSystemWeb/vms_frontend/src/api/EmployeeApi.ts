import axios from 'axios';
import Role from "../models/Role";
import Employee from "../models/Employee";

export async function getAllDrivers(companyId: number): Promise<Employee[] | null> {
  try {
    const response = await axios.get(`employee/getAllDrivers/${companyId}`);
    console.log(`drivers: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:getAllDrivers ", e.response);
    return null;
  }
}
