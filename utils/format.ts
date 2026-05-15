export function formatPrice(value: number, currency = '$'): string {
    const formatted = value.toFixed(2).replace('.', ',');
    return `${currency}${formatted}`;
}


export function formatCount(value: number): string {
    if (value >= 1000) {
        const k = (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1);
        return `${k}k`;
    }
    return String(value);
}


export function pad2(n: number): string {
    return n.toString().padStart(2, '0');
}


export function msToHMS(ms: number): { hours: number; minutes: number; seconds: number } {
    const total = Math.max(0, Math.floor(ms / 1000));
    return {
        hours: Math.floor(total / 3600),
        minutes: Math.floor((total % 3600) / 60),
        seconds: total % 60,
    };
}