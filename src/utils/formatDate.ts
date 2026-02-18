export default function formatDate(timestamp: number): string {
    const date = new Date(timestamp);

    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
}
