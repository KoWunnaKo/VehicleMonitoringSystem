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

export async function getVehiclesRangeData(from: string, to: string): Promise<VehicleData[] | null> {
  try {
    // console.log(`from: ${JSON.stringify(from)}`);
    // console.log(`to: ${JSON.stringify(to)}`);
    const response = await axios.get(`vehicleData/getVehiclesRangeData/${from}/${to}`);
    // console.log(`vehicleData: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:getVehiclesLastData ", e.response);
    return null;
  }
}
