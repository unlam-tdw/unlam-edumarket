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
        return localStorage.getItem(this.#withPrefix(key));
    }

    setItem(key, value) {
        localStorage.setItem(this.#withPrefix(key), value);
    }

    removeItem(key) {
        localStorage.removeItem(this.#withPrefix(key));
    }

    updateItem(key, value) {
        localStorage.setItem(this.#withPrefix(key), value);
    }

    granularUpdate(key, value, options) {
        const { merge = false } = options;
        const currentValue = this.getItem(key);
        const newValue = merge ? { ...currentValue, ...value } : value;
        this.setItem(this.#withPrefix(key), newValue);
    }
}