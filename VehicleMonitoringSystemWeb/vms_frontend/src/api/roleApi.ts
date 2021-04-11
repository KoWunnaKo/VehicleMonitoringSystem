import axios from 'axios';
import Role from "../models/role";

export async function getRoles(): Promise<Role[] | null> {
  try {
    const response = await axios.get('role/getAll');
    return response.data;
  } catch (e) {
    // console.log("Error:getRoles ", e.response);
    return null;
  }
}
