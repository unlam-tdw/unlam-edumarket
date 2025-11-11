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

    getUserById(id) {
        return this.users.find(user => user.id === id);
    }

    updateUser(userId, updatedData) {
        const users = this.storageService.getItem(UsersService.usersStorageKey) || [];
        const userIndex = users.findIndex(user => user.id === userId);
        
        if (userIndex === -1) {
            return false;
        }

        users[userIndex] = { ...users[userIndex], ...updatedData };
        this.storageService.setItem(UsersService.usersStorageKey, users);
        this.users = users;
        return true;
    }

    deleteUser(userId) {
        const users = this.storageService.getItem(UsersService.usersStorageKey) || [];
        const userIndex = users.findIndex(user => user.id === userId);
        
        if (userIndex === -1) {
            return false;
        }

        users.splice(userIndex, 1);
        this.storageService.setItem(UsersService.usersStorageKey, users);
        this.users = users;
        return true;
    }

    getLastUserId() {
        return this.users.length + 1;
    }

    addCourseToUser(userId, courseId) {
        const users = this.storageService.getItem(UsersService.usersStorageKey) || [];
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return false;
        }
        if (!users[userIndex].courses) {
            users[userIndex].courses = [];
        }
        if (!users[userIndex].courses.includes(courseId)) {
            users[userIndex].courses.push(courseId);
        }
        this.storageService.setItem(UsersService.usersStorageKey, users);
        this.users = users;
        return true;
    }
}