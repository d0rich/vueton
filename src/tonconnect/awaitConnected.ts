import { useTonConnect } from './useTonConnect'

export async function awaitConnected() {
  const { tonClient, tonNetwork, tonConnect } = useTonConnect()
  await tonConnect.connectionRestored
  return { tonClient, tonNetwork }
}
