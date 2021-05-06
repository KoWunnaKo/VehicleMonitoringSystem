import axios from 'axios';
import Employee from "../models/employee";
import {firebase} from "../firebase";

// export async function signIn(email: string, password: string): Promise<employee | null> {
//   try {
//     email = email.toLowerCase().trim();
//     password = password.trim();
//
//     const response = await axios.post(`auth/signIn`, { identifier: email, password: password });
//     if (response.status != 200) {
//       return null;
//     }
//
//     // await setAuthCookie(response);
//     return response.data;
//   } catch (error) {
//     // console.log("Error:signIn ", error.response);
//     return null;
//   }
// }

export async function signUp(employee: Employee) {
  try {
    // TODO catch error responses
    // console.log(`signUp, employee: ${JSON.stringify(employee)}`);
    const response = await axios.post(`auth/create`, employee);
    if (response.status !== 200) {
      return null;
    }

    // await setAuthCookie(response);
    return response.data;
  } catch (error) {
    // console.log("Error:signUp ", error.response);
    return null;
  }
}

export async function getCurrentUser(): Promise<Employee | null> {
  try {
    let firebaseUserId: string|null = null;
    if (firebase.auth.currentUser) {
      firebaseUserId = firebase.auth.currentUser.uid;
      const response = await axios.get(`auth/current/${firebaseUserId}`);
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    // console.log("Error:getCurrentUser ", e.response);
    return null;
  }
}
