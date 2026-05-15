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
