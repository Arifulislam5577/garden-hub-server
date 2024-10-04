export const verifyTokenTime = (targetTime: number): boolean => {
  const currentTime = new Date(Date.now())
  const tokenTime = new Date(+targetTime)
  return currentTime > tokenTime
}
