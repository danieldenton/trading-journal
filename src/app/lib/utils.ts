
export function calculateWinRate(
    successCount: number,
    failureCount: number
  ): number {
    const total = successCount + failureCount;
    return total > 0 ? Math.round((successCount / total) * 100) : 0;
  }