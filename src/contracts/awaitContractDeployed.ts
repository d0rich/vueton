/**
 * Utility function to wait for a contract to be deployed.
 * It checks the contract deployment status every `interval` milliseconds.
 *
 * @param checkDeployment A function that checks the contract deployment status.
 * @param maxAttempts Maximum number of checks. If the contract is not deployed after `maxAttempts`, an error is thrown.
 * @param interval Interval between checks in milliseconds.
 */
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
