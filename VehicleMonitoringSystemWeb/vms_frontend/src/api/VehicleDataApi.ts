import axios from 'axios';
import VehicleData from "../models/VehicleData";

export async function getVehiclesLastData(): Promise<VehicleData[] | null> {
  try {
    const response = await axios.get(`vehicleData/getVehiclesLastData`);
    // console.log(`vehicleData: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:getVehiclesLastData ", e.response);
    return null;
  }
}
