import Employee from "../models/Employee";
import {STORAGE_KEY_FIREBASE_USER, STORAGE_KEY_DB_USER} from "../constants/AsyncStorageKeys";
import firebase from "firebase";
import User = firebase.User;

export function setFirebaseUser(dbUser: User) {
    localStorage.setItem(STORAGE_KEY_FIREBASE_USER, JSON.stringify(dbUser));
}

export function setDbUser(dbUser: Employee|null) {
    localStorage.setItem(STORAGE_KEY_DB_USER, JSON.stringify(dbUser));
}

export function getDbUser(): Employee|null {
    const jsonDbUser = localStorage.getItem(STORAGE_KEY_DB_USER);
    if (!!jsonDbUser) {
        return JSON.parse(jsonDbUser);
    }
    return null;
}

export function getDbUserId(): string|null {
    const dbUser = getDbUser();
    if (!!dbUser) {
        return dbUser.id;
    }
    return null;
}

export function getDbUserCompanyId(): number|null {
    const dbUser = getDbUser();
    if (!!dbUser) {
        return dbUser.companyId;
    }
    return null;
}

export function clearUsers() {
    localStorage.removeItem(STORAGE_KEY_FIREBASE_USER);
    localStorage.removeItem(STORAGE_KEY_DB_USER);
}
