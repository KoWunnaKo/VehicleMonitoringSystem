import axios from 'axios';
import Employee from "../models/Employee";

// export async function signIn(email: string, password: string): Promise<Employee | null> {
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

export async function signUp(employee: Employee): Promise<Employee | null> {
  try {
    console.log(`signUp, employee: ${employee}`);
    const response = await axios.post(`auth/signUp`, { employee });
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

// export async function signOut() {
//   try {
//     const logoutResponse = await axios.post(`auth/logout`);
//   } catch (error) {
//     // console.log("Error:signOut ", error.response);
//   }
// }

// export async function getCurrentUser(): Promise<Employee | null> {
//   try {
//     const response = await axios.get('auth/current');
//     return response.data;
//   } catch (e) {
//     // console.log("Error:getCurrentUser ", e.response);
//     return null;
//   }
// }
