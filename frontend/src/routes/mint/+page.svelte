<script lang="ts">
  import { onMount } from 'svelte';
  import QRCode from 'qrcode';
  import { z } from 'zod';

  let step = 1;
  let qrDataUrl = '';
  let walletAddress = '';
  let isPhantom = false;
  let isMetaMask = false;

  const detailsSchema = z.object({
    name: z.string().min(1),
    symbol: z.string().min(1),
    totalSupply: z.string().min(1),
    decimals: z.number().int().min(0).max(9).default(9),
    blockchain: z.enum(['SOLANA', 'ETHEREUM']),
  });

  const metadataSchema = z.object({
    description: z.string().optional(),
    attributes: z.array(z.object({ trait_type: z.string(), value: z.string() })).default([])
  });

  let details = { name: '', symbol: '', totalSupply: '', decimals: 9, blockchain: 'SOLANA' as const };
  let description = '';
  let attributes: Array<{ trait_type: string; value: string }> = [];
  let imageFile: File | null = null;

  function addAttribute() {
    attributes = [...attributes, { trait_type: '', value: '' }];
  }
  function removeAttribute(i: number) {
    attributes = attributes.filter((_, idx) => idx !== i);
  }

  async function connectPhantom() {
    const provider = (window as any).solana;
    if (provider?.isPhantom) {
      const res = await provider.connect();
      walletAddress = res.publicKey?.toString?.() ?? '';
    }
  }

  async function connectMetaMask() {
    const eth = (window as any).ethereum;
    if (eth?.isMetaMask) {
      const accounts = await eth.request({ method: 'eth_requestAccounts' });
      walletAddress = accounts?.[0] ?? '';
    }
  }

  async function makeQrPreview() {
    const preview = {
      to: walletAddress,
      network: details.blockchain,
      name: details.name,
      symbol: details.symbol,
      supply: details.totalSupply,
    };
    qrDataUrl = await QRCode.toDataURL(JSON.stringify(preview));
  }

  onMount(() => {
    isPhantom = Boolean((window as any).solana?.isPhantom);
    isMetaMask = Boolean((window as any).ethereum?.isMetaMask);
  });
</script>

<div class="mx-auto max-w-3xl p-6 space-y-8">
  <h1 class="text-2xl font-semibold">Token Mint</h1>

  {#if step === 1}
    <div class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input class="input" placeholder="Token name" bind:value={details.name} />
        <input class="input" placeholder="Symbol" bind:value={details.symbol} />
        <input class="input" placeholder="Total supply" bind:value={details.totalSupply} />
        <input class="input" type="number" placeholder="Decimals" bind:value={details.decimals} />
        <select class="input" bind:value={details.blockchain}>
          <option value="SOLANA">Solana</option>
          <option value="ETHEREUM">Ethereum</option>
        </select>
      </div>
      <div class="flex gap-3">
        {#if isPhantom}
          <button class="btn" on:click={connectPhantom}>Connect Phantom</button>
        {/if}
        {#if isMetaMask}
          <button class="btn" on:click={connectMetaMask}>Connect MetaMask</button>
        {/if}
      </div>
      <div class="flex justify-end">
        <button class="btn" on:click={() => (step = 2)}>Next</button>
      </div>
    </div>
  {/if}

  {#if step === 2}
    <div class="space-y-4">
      <textarea class="input" rows="3" placeholder="Description" bind:value={description}></textarea>
      <div>
        <label class="block text-sm font-medium mb-1">Image</label>
        <input class="input" type="file" accept="image/*" on:change={(e: any) => (imageFile = e.target.files?.[0] ?? null)} />
      </div>
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <div class="font-medium">Attributes</div>
          <button class="btn" on:click={addAttribute}>Add</button>
        </div>
        <div class="grid gap-2">
          {#each attributes as attr, i}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input class="input" placeholder="Trait" bind:value={attr.trait_type} />
              <div class="flex gap-2">
                <input class="input flex-1" placeholder="Value" bind:value={attr.value} />
                <button class="btn" on:click={() => removeAttribute(i)}>Remove</button>
              </div>
            </div>
          {/each}
        </div>
        <div class="grid grid-cols-2 gap-2">
          {#each attributes as attr}
            <div class="border rounded p-3">
              <div class="text-xs text-gray-500">{attr.trait_type}</div>
              <div class="font-medium">{attr.value}</div>
            </div>
          {/each}
        </div>
      </div>
      <div class="flex justify-between">
        <button class="btn" on:click={() => (step = 1)}>Back</button>
        <button class="btn" on:click={() => (step = 3)}>Next</button>
      </div>
    </div>
  {/if}

  {#if step === 3}
    <div class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input class="input" placeholder="Wallet address" bind:value={walletAddress} />
        <select class="input" bind:value={details.blockchain}>
          <option value="SOLANA">Solana (Devnet/Mainnet switch later)</option>
          <option value="ETHEREUM">Ethereum (Sepolia/Mainnet)</option>
        </select>
      </div>
      <div class="space-y-2">
        <button class="btn" on:click={makeQrPreview}>Generate QR Preview</button>
        {#if qrDataUrl}
          <img class="border rounded p-2 bg-white" alt="QR Preview" src={qrDataUrl} />
        {/if}
      </div>
      <div class="flex justify-between">
        <button class="btn" on:click={() => (step = 2)}>Back</button>
        <button class="btn" on:click={() => {/* TODO: call backend */}}>Confirm & Mint</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .input { @apply w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500; }
  .btn { @apply inline-flex items-center justify-center rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700; }
</style>

