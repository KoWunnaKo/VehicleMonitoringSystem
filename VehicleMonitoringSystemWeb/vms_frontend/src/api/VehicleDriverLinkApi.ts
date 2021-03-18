import axios from 'axios';
import VehicleDriverLink from "../models/VehicleDriverLink";
import Employee from "../models/Employee";

export async function createVehicleDriverLink(vehicleDriverLink: VehicleDriverLink) {
  try {
    const response = await axios.post(`vehicleDriverLink`, vehicleDriverLink);
    // console.log(`createVehicleDriverLink: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:createVehicleDriverLink ", e.response);
    return null;
  }
}

export async function getCurrentDriver(vehicleId: number|undefined): Promise<Employee|null> {
  try {
    const response = await axios.get(`vehicleDriverLink/getCurrentDriver/${vehicleId}`);
    const driver = Object.setPrototypeOf(response.data, Employee.prototype);
    // console.log(`getCurrentDriver: ${JSON.stringify(driver)}`);
    return driver;
  } catch (e) {
    // console.log("Error:getCurrentDriver ", e.response);
    return null;
  }
}
