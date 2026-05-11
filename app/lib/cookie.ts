

export function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
        const [key, ...rest] = cookie.split("=");
        if (key === name) {
            return rest.join("=");
        }
    }

    return null;
}



export function setCookie(name: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export function setCookieMinutes(name: string, value: string, minutes: number): void {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure`;
}

export function removeCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
