export async function awaitContractDeployed(
  checkDeployment: () => Promise<boolean>,
  maxAttempts = 20,
  interval = 2000
) {
  let attempts = 0
  while (attempts < maxAttempts) {
    if (await checkDeployment()) {
      return
    }
    await new Promise((resolve) => setTimeout(resolve, interval))
    attempts++
  }
  throw new Error('Contract deployment timeout')
}
