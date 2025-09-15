<script lang="ts">
  // Placeholder admin dashboard layout
  const cards = [
    { label: 'Total Tokens', value: '0' },
    { label: 'Transactions', value: '0' },
    { label: 'Queued Jobs', value: '0' },
  ];
</script>

<div class="mx-auto max-w-5xl p-6 space-y-8">
  <h1 class="text-2xl font-semibold">Admin Dashboard</h1>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {#each cards as c}
      <div class="rounded border p-4">
        <div class="text-sm text-gray-500">{c.label}</div>
        <div class="text-2xl font-semibold">{c.value}</div>
      </div>
    {/each}
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="rounded border p-4 space-y-2">
      <div class="font-medium">Network Settings</div>
      <div class="grid grid-cols-2 gap-2">
        <button class="btn">Solana: Devnet</button>
        <button class="btn">Ethereum: Sepolia</button>
      </div>
    </div>
    <div class="rounded border p-4 space-y-2">
      <div class="font-medium">API Keys</div>
      <div class="grid gap-2">
        <input class="input" placeholder="Pinata JWT" />
        <input class="input" placeholder="Infura Project ID" />
        <input class="input" placeholder="Helius API Key" />
        <button class="btn">Save</button>
      </div>
    </div>
  </div>
</div>

<style>
  .input { @apply w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500; }
  .btn { @apply inline-flex items-center justify-center rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700; }
</style>

