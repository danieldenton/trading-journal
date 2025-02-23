export function calculateWinRate(
  successCount: number,
  failureCount: number
): number {
  const total = successCount + failureCount;
  const winRate = total > 0 ? (successCount / total) * 100 : 0;
  return winRate;
}
