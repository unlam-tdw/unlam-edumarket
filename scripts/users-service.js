import { StorageService } from "./storage-service.js";

export class UsersService {
    static usersStorageKey = 'users';

    constructor() {
        this.storageService = StorageService.getOrCreateInstance();
        this.users = this.storageService.getItem(UsersService.usersStorageKey) || [];
    }

    static syncUsers() {
        const storageService = StorageService.getOrCreateInstance();
        const users = storageService.getItem(UsersService.usersStorageKey) || [];
        storageService.setItem(UsersService.usersStorageKey, users);
    }

    addUser(user) {
        const users = this.storageService.getItem(UsersService.usersStorageKey) || [];
        users.push(user);
        this.storageService.setItem(UsersService.usersStorageKey, users);
        this.users = users;
    }

    existsUser(email) {
        return this.users.find(user => user.email === email) !== undefined;
    }

    getUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }

    getLastUserId() {
        return this.users.length + 1;
    }
}