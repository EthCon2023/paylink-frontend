import { useListen } from '@/hooks/useListen'
import { useMetaMask } from '@/hooks/useMetaMask'
import { Button } from 'antd'

export function ConnectButton() {
  const {
    dispatch,
    state: { status, isMetaMaskInstalled, wallet },
  } = useMetaMask()
  const listen = useListen()

  console.log('hello')
  // we can use this to conditionally render the UI
  const showInstallMetaMask = status !== 'pageNotLoaded' && !isMetaMaskInstalled

  // we can use this to conditionally render the UI
  const showConnectButton =
    status !== 'pageNotLoaded' && isMetaMaskInstalled && !wallet

  // we can use this to conditionally render the UI
  const isConnected = status !== 'pageNotLoaded' && typeof wallet === 'string'

  // can be passed to an onclick handler
  const handleConnect = async () => {
    console.log("called")
    dispatch({ type: 'loading' })
    const accounts = (await window.ethereum.request({
      method: 'eth_requestAccounts',
    })) as string[]

    if (accounts.length > 0) {
      const balance = (await window.ethereum!.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      })) as string
      dispatch({ type: 'connect', wallet: accounts[0], balance })

      // we can register an event listener for changes to the users wallet
      listen()
    }
  }

  // can be passed to an onclick handler
  const handleDisconnect = () => {
    dispatch({ type: 'disconnect' })
  }

  return (
    <>
      {showInstallMetaMask && 'You need to have MetaMask installed'}
      {showConnectButton && 
          <Button type="primary" size="large" onClick={() => handleConnect()}>
            Connect Wallet
          </Button>
}
      {isConnected ? 'You are connected' : 'Please connect your MetaMask wallet'}
    </>
  )
}
