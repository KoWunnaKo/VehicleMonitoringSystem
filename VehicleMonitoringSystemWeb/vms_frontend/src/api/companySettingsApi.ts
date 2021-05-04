import axios from 'axios';
import {getDbUserCompanyId} from "../utils/userUtil";
import CompanySettings from "../models/companySettings";

export async function getCompanySettings(): Promise<CompanySettings | null> {
  const companyId = await getDbUserCompanyId();
  if (!companyId) {
    return null;
  }

  try {
    const response = await axios.get<CompanySettings>(`companySettings/${companyId}`);
    return response.data;
  } catch (e) {
    console.log("Error:getCompanySettings ", e.response);
    return null;
  }
}

export async function deleteCompanySettings() {
  const companyId = await getDbUserCompanyId();
  if (!companyId) {
    return null;
  }

  try {
    const response = await axios.delete(`companySettings/${companyId}`);
    return response.data;
  } catch (e) {
    console.log("Error:deleteCompanySettings ", e.response);
    return null;
  }
}

// export async function createCompanySettings(companySettings: CompanySettings): Promise<CompanySettings | null> {
//   try {
//     const response = await axios.post(`companySettings`, companySettings);
//     return response.data;
//   } catch (e) {
//     console.log("Error:createCompanySettings ", e.response);
//     return null;
//   }
// }

export async function editCompanySettings(companySettings: CompanySettings): Promise<CompanySettings | null> {
  try {
    const response = await axios.put(`companySettings`, companySettings);
    return response.data;
  } catch (e) {
    console.log("Error:editCompanySettings ", e.response);
    return null;
  }
}
