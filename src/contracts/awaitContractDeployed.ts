/*
 * Copyright 2025 d0rich (Nikolai Dorofeev, dorich2000@gmail.com, https://d0rich.me)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
