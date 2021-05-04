import axios from 'axios';
import Task from "../models/task";
import Employee from "../models/employee";
import {getDbUserCompanyId} from "../utils/userUtil";

export async function getAllTasks(): Promise<Task[] | null> {
  const companyId = await getDbUserCompanyId();
  if (!companyId) {
    return null;
  }

  try {
    const response = await axios.get<Task[]>(`task/getAll/${companyId}`);
    const tasks = response.data;
    tasks.map(task => Object.setPrototypeOf(task, Task.prototype));
    tasks.map(task => Object.setPrototypeOf(task.driver, Employee.prototype))
    return tasks;
  } catch (e) {
    // console.log("Error:getAllVehicles ", e.response);
    return null;
  }
}

export async function deleteTask(taskId: number|undefined) {
  if (!taskId) {
    return null;
  }

  try {
    const response = await axios.delete(`task/${taskId}`);
    return response.data;
  } catch (e) {
    // console.log("Error:deleteVehicle ", e.response);
    return null;
  }
}

export async function createTask(task: Task) {
  try {
    // console.log(`createTask: ${JSON.stringify(task)}`);
    const response = await axios.post(`task`, task);
    // console.log(`createVehicle: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:deleteVehicle ", e.response);
    return null;
  }
}

export async function editTask(task: Task) {
  try {
    const response = await axios.put(`task`, task);
    // console.log(`editVehicle: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (e) {
    // console.log("Error:deleteVehicle ", e.response);
    return null;
  }
}
