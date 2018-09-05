export default class StorageManager {
    static get (key) {
        return localStorage.getItem(key);
    }
    static set (key, value) {
        localStorage.setItem(key, value);
    }
}