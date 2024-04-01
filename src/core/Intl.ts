export class Intl {
    private static data = new Map<string, string>();

    static set(key: string, val: string) {
        this.data.set(key, val);
    }

    static get(key: string): string {
        if (this.data.has(key)) {
            // @ts-ignore
            return this.data.get(key);
        }
        return key;
    }

}