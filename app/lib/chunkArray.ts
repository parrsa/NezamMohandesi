export default function chunkArray<T>(arr: T[], sizes: number[]): T[][] {
    const result: T[][] = [];
    let start = 0;
    for (const size of sizes) {
        result.push(arr.slice(start, start + size));
        start += size;
    }
    return result;
}
