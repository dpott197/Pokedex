export function setLocalStorageItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorageItem(key: string) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
}