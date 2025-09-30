'use client';
import { useState } from 'react';
import { createPublicClient, http, formatEther, Address, isAddress } from 'viem';

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL!;
const chainIdEnv = process.env.NEXT_PUBLIC_CHAIN_ID || '1';

export default function Home() {
  const [input, setInput] = useState('');
  const [balance, setBalance] = useState<string>('');

  const checkBalance = async () => {
    if (!isAddress(input)) { alert('Invalid address'); return; }
    const client = createPublicClient({
      transport: http(rpcUrl),
      chain: { id: Number(chainIdEnv), name: 'ZenChain',
        nativeCurrency: { name: 'ZEN', symbol: 'ZEN', decimals: 18 },
        rpcUrls: { default: { http: [rpcUrl] } } }
    });
    const bal = await client.getBalance({ address: input as Address });
    setBalance(formatEther(bal));
  };

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>ZenChain Wallet Checker</h1>
      <input value={input} onChange={e=>setInput(e.target.value)} placeholder="0x... address"
        style={{ padding: 8, width: '70%', marginRight: 8 }} />
      <button onClick={checkBalance}>Check</button>
      {balance && <p>Balance: {balance} ZEN</p>}
    </main>
  );
}
