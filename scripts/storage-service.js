export class StorageService {
    #prefix

    constructor(prefix) {
        this.#prefix = prefix || "unlam-edu-market";
    }

    static getOrCreateInstance() {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    #withPrefix(key) {
        return `${this.#prefix}:${key}`;
    }

    getItem(key) {
        const value = localStorage.getItem(this.#withPrefix(key));
        if (value === null) return null;
        return JSON.parse(value);
    }

    setItem(key, value) {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(this.#withPrefix(key), stringValue);
    }

    removeItem(key) {
        localStorage.removeItem(this.#withPrefix(key));
    }
}