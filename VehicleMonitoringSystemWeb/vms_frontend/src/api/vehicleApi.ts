import axios from 'axios';
import Vehicle from "../models/vehicle";
import {getDbUserCompanyId} from "../utils/userUtil";

export async function getAllCompanyVehicles(): Promise<Vehicle[] | null> {
  const companyId = await getDbUserCompanyId();
  if (!companyId) {
    return null;
  }

  try {
    const response = await axios.get<Vehicle[]>(`vehicle/getAll/${companyId}`);
    const vehicles = response.data;
    vehicles.map(vehicle => Object.setPrototypeOf(vehicle, Vehicle.prototype))
    // console.log(`vehicles: ${JSON.stringify(response.data)}`);
    return vehicles;
  } catch (e) {
    // console.log("Error:getAllVehicles ", e.response);
    return null;
  }
}

export async function deleteVehicle(vehicleId: number|undefined) {
  if (!vehicleId) {
    return null;
  }

  try {
    const response = await axios.delete(`vehicle/${vehicleId}`);
    return response.data;
  } catch (e) {
    // console.log("Error:deleteVehicle ", e.response);
    return null;
  }
}

export async function createVehicle(vehicle: Vehicle) {
  try {
    const response = await axios.post(`vehicle`, vehicle);
    // console.log(`createVehicle: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:deleteVehicle ", e.response);
    return null;
  }
}

export async function editVehicle(vehicle: Vehicle) {
  try {
    const response = await axios.put(`vehicle`, vehicle);
    // console.log(`editVehicle: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:deleteVehicle ", e.response);
    return null;
  }
}
