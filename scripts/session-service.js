import { StorageService } from "./storage-service.js";

export class SessionService {
    sessionStorageKey = 'session';

    constructor() {}

    static getOrCreateInstance() {
        if (!SessionService.instance) {
            SessionService.instance = new SessionService();
        }
        return SessionService.instance;
    }

    isAuthenticated() {
        return this.getSession() !== null;    
    }

    getSession() {
        const storageService = StorageService.getOrCreateInstance();
        return storageService.getItem(this.sessionStorageKey);
    }

    setSession(session) {
        const storageService = StorageService.getOrCreateInstance();
        storageService.setItem(this.sessionStorageKey, session);
    }

    removeSession() {
        const storageService = StorageService.getOrCreateInstance();
        storageService.removeItem(this.sessionStorageKey);
    }
}