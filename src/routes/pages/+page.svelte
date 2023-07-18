<script>
// @ts-nocheck

    import { invalidateAll } from '$app/navigation';
    // @ts-ignore
    import { navigate } from 'svelte-routing';

    export let data;
    export let searchQuery = '';

    let selectedProduct = {
        id: null,
        name: null,
        price: null,
        description: null,
        imageUrl: null,
    };

    async function handleSubmit() {
        // create or update the product
        await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(selectedProduct),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // reset values and reload page.
        resetForm();
        await invalidateAll();
    }

    // @ts-ignore
    function selectProduct(product) {
        selectedProduct = product;
    }

    function resetForm() {
        selectedProduct = {
            id: null,
            name: null,
            price: null,
            description: null,
            imageUrl: null,
        };
    }

    // @ts-ignore
    function handleBuyNow(product) {
        // Redirect the user to the Stripe payment page or any other payment gateway
        // You can replace the URL below with the actual Stripe payment page URL
        navigate(`https://stripe.com/pay?product=${product.id}`);
    }
</script>

<main class="p-2">
    <form class="border py-6 px-2" on:submit|preventDefault={handleSubmit}>
        <div class="flex flex-col">
            <label for="name">Name</label>
            <input id="name" type="text" class="py-1 px-2 border" bind:value={selectedProduct.name} />
        </div>
        <div class="flex flex-col">
            <label for="description">Description</label>
            <textarea id="description" class="py-1 px-2 border" placeholder="optional" bind:value={selectedProduct.description}></textarea>
        </div>
        <div class="flex flex-col">
            <label for="price">Price</label>
            <input id="price" type="text" class="py-1 px-2 border" bind:value={selectedProduct.price} />
        </div>
        <div class="flex flex-col">
            <label for="imageUrl">Image URL</label>
            <input id="imageUrl" type="text" class="py-1 px-2 border" bind:value={selectedProduct.imageUrl} />
        </div>
        <div class="mt-6">
            <button class="px-4 py-2 rounded text-white bg-teal-700 hover:bg-teal-800">
                Save
            </button>
            {#if selectedProduct.id !== null}
            <button type="button" class="px-4 py-2 rounded border text-slate-800 hover:bg-red-500 hover:text-white">
                Delete
            </button>
            {/if}
            <button type="button" on:click={resetForm} class="px-4 py-2 rounded border text-slate-800 hover:bg-slate-100">
                Cancel
            </button>
        </div>
    </form>

    <div class="mt-6">
        <label for="search">Search</label>
        <input id="search" type="text" class="py-1 px-2 border" bind:value={searchQuery} />
    </div>

    <table class="mt-6">
        <thead>
            <tr>
                <th class="p-2 border">ID</th>
                <th class="p-2 border">Name</th>
                <th class="p-2 border">Price</th>
                <th class="p-2 border">Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each filteredProducts as product}
            <tr>
                <td class="p-2 border">{product.id}</td>
                <td class="p-2 border">{product.name}</td>
                <td class="p-2 border">{product.price}</td>
                <td class="p-2 border text-center">
                    <button type="button" on:click={() => selectProduct(product)} class="text-teal-700">
                        Select
                    </button>
                    <button type="button" on:click={() => handleBuyNow(product)} class="text-teal-700 ml-2">
                        Buy Now
                    </button>
                </td>
            </tr>
            {/each}
        </tbody>
    </table>

    {#if paymentConfirmation}
    <div class="mt-6 text-green-500">
        Payment successful! Thank you for your purchase.
    </div>
    {/if}
</main>

