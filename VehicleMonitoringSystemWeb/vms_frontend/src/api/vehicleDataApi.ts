import axios from 'axios';
import VehicleData from "../models/vehicleData";
import {getDbUserCompanyId} from "../utils/userUtil";

export async function getVehiclesLastData(vehicleId: number|null, startDateTime: string, endDateTime: string): Promise<VehicleData[] | null> {
  const companyId = await getDbUserCompanyId();
  if (!companyId) {
    return null;
  }

  try {
    const response = await axios.get(`vehicleData/getVehiclesLastData/${companyId}/${startDateTime}/${endDateTime}`, {params: {vehicleId}});
    // console.log(`vehicleData: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:getVehiclesLastData ", e.response);
    return null;
  }
}

export async function getVehiclesRangeData(vehicleId: number|null, startDateTime: string, endDateTime: string): Promise<VehicleData[] | null> {
  const companyId = await getDbUserCompanyId();
  if (!companyId) {
    return null;
  }

  try {
    const response = await axios.get(`vehicleData/getVehiclesRangeData/${companyId}/${startDateTime}/${endDateTime}`, {params: {vehicleId}});
    // console.log(`vehicleData: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:getVehiclesLastData ", e.response);
    return null;
  }
}
