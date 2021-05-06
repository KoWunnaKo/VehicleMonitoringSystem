import Employee from "../models/employee";
import {STORAGE_KEY_FIREBASE_USER, STORAGE_KEY_DB_USER} from "../constants/asyncStorageKeys";
import firebase from "firebase";
import User = firebase.User;
import Role from "../models/role";

export async function setFirebaseUser(dbUser: User) {
    await localStorage.setItem(STORAGE_KEY_FIREBASE_USER, JSON.stringify(dbUser));
}

export async function setDbUser(dbUser: Employee | null) {
    await localStorage.setItem(STORAGE_KEY_DB_USER, JSON.stringify(dbUser));
}

export async function getDbUser(): Promise<Employee | null> {
    const jsonDbUser = await localStorage.getItem(STORAGE_KEY_DB_USER);
    if (!!jsonDbUser) {
        return JSON.parse(jsonDbUser);
    }
    return null;
}

export async function getDbUserId(): Promise<string | null> {
    const dbUser = await getDbUser();
    if (!!dbUser) {
        return dbUser.id;
    }
    return null;
}

export async function getDbUserCompanyId(): Promise<number | null> {
    const dbUser = await getDbUser();
    if (!!dbUser) {
        return dbUser.companyId;
    }
    return null;
}

export async function clearUsers() {
    await localStorage.removeItem(STORAGE_KEY_FIREBASE_USER);
    await localStorage.removeItem(STORAGE_KEY_DB_USER);
}

export function isUserAdministrator(dbUser: Employee|null|undefined): boolean {
    if (!dbUser) {
        return false;
    }

    return Role.isAdministrator(dbUser.roleId);
}

export function isUserOperator(dbUser: Employee|null|undefined): boolean {
    if (!dbUser) {
        return false;
    }

    return Role.isOperator(dbUser.roleId);
}

export function isUserDriver(dbUser: Employee|null|undefined): boolean {
    if (!dbUser) {
        return false;
    }

    return Role.isDriver(dbUser.roleId);
}

export function getRoleRestrictionTooltip(dbUser: Employee|null|undefined): string {
    return isUserOperator(dbUser) ? 'Access only for the Administrators' : '';
}
