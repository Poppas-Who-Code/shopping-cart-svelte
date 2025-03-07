<script lang="ts">
	// /catalog/<identifier>
	import Button from '$lib/components/button.svelte';
	import Card from '$lib/components/card.svelte';
	import type { CartItem, Item } from '$lib/types';

	let catalog: Item[] = [
		{
			name: 'Turkey',
			price: 200,
			category: 'bird flu',
			img: 'https://www.allrecipes.com/thmb/cVQL59QQ70ikOvtpcZU3TmQRPkg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-166160-juicy-thanksgiving-turkey-VAT-4958-4x3-e9fdc719770d4661b5d831f958e6eb78.jpg'
		},
		{
			name: 'Beef',
			price: 100,
			category: 'mad cow',
			img: 'https://www.eatthis.com/wp-content/uploads/sites/4/2022/06/packaged-meat.jpg?quality=82&strip=1&w=640'
		},
		{
			name: 'Chicken',
			price: 300,
			category: 'bird flu',
			img: 'https://cdn.greatlifepublishing.net/wp-content/uploads/sites/2/2020/06/01160949/chicken-video.jpg'
		}
	];

	enum SortButtonText {
		Unsorted = 'Unsorted',
		Ascending = 'Ascending',
		Descending = 'Descending'
	}

	let cart: CartItem[] = [];
	let cartTotal = 0;
	let typedSearchTerm = '';
	let appliedSearchTerm = '';
	let displayedCatalog: Item[] = [];
	let selectedFilter: keyof Item = 'name';
	let sortDirection: 1 | -1 | 0 = 0;
	let sortButtonText: SortButtonText = SortButtonText.Unsorted;

	const addToCart = (itemToAdd: Item) => {
		// whenever item is clicked, update the count of that item
		// only ever be one for every unique type of item
		const foundCartItem = cart.find((cartItem) => cartItem.item.name === itemToAdd.name);
		if (foundCartItem) {
			// we found the item in your cart already, increment the count

			// copy the original CartItem, but increment its count
			const updatedCartItem = { ...foundCartItem, count: foundCartItem.count + 1 };

			// replace the old CartItem with the updated CartItem
			cart = cart.map((cartItem) =>
				cartItem.item.name === updatedCartItem.item.name ? updatedCartItem : cartItem
			);
		} else {
			// adding an in item to the cart for the very first time

			// construct CartItem object using
			const newCartItem = {
				item: itemToAdd,
				count: 1
			};

			// add new CartItem object to cart
			cart = [...cart, newCartItem];
		}
	};

	const removeFromCart = (itemToRemove: CartItem) => {
		const updatedCartItem = { ...itemToRemove, count: itemToRemove.count - 1 };

		if (updatedCartItem.count <= 0) {
			cart = cart.filter((cartItem) => cartItem.item.name !== updatedCartItem.item.name);
		} else {
			// updates with the decremeneted
			cart = cart.map((cartItem) =>
				cartItem.item.name === updatedCartItem.item.name ? updatedCartItem : cartItem
			);
		}
	};

	$: {
		// find sum
		let newTotal = 0;

		// for (let i = 0; i < cart.length; i++) {
		// 	const cartItem = cart[i];
		// }
		for (const cartItem of cart) {
			newTotal += cartItem.count * cartItem.item.price;
		}

		// replace cartTotal with newTotal
		cartTotal = newTotal;
	}

	const handleSearch = () => {
		appliedSearchTerm = typedSearchTerm;
	};

	const handleSort = () => {
		if (sortDirection === 0) {
			sortDirection = 1;
		} else if (sortDirection === 1) {
			sortDirection = -1;
		} else {
			sortDirection = 0;
		}
	};

	const filterCriteria = Object.keys(catalog[0]);

	$: filteredCatalog = appliedSearchTerm
		? catalog.filter((item) => {
				const value = item[selectedFilter];
				if (typeof value === 'string') {
					return value.match(new RegExp(appliedSearchTerm, 'iu'));
				} else {
					return value < Number(appliedSearchTerm);
				}
			})
		: catalog;

	$: displayedCatalog =
		sortDirection === 0
			? filteredCatalog
			: filteredCatalog.sort((itemA, itemB) => {
					const valueA = itemA[selectedFilter];
					const valueB = itemB[selectedFilter];

					if (typeof valueA === 'string' && typeof valueB === 'string') {
						return valueA.localeCompare(valueB) * sortDirection;
					} else if (typeof valueA === 'number' && typeof valueB === 'number') {
						return (valueA - valueB) * sortDirection;
					} else {
						return 0;
					}
				});

	$: {
		if (sortDirection === 0) {
			sortButtonText = SortButtonText.Unsorted;
		} else if (sortDirection === 1) {
			sortButtonText = SortButtonText.Ascending;
		} else {
			sortButtonText = SortButtonText.Descending;
		}
	}
</script>

<div class="grid grid-cols-[1fr_300px] grow min-h-0 gap-3">
	<div class="flex flex-col gap-3 p-3">
		<!-- search bar -->
		<div class="h-10">
			<input class="border h-full px-2" bind:value={typedSearchTerm} />
			<select bind:value={selectedFilter}>
				{#each filterCriteria as criteria}
					<option value={criteria}>{criteria.toLocaleUpperCase()}</option>
				{/each}
			</select>
			<Button text="Search" onClick={handleSearch} />
		</div>
		<!-- catalog container -->
		<div class="flex gap-2 items-center">
			<p class="text-lg font-semibold">Catalog</p>
			<Button text={sortButtonText} onClick={handleSort} />
		</div>
		<div class="flex gap-4 flex-wrap">
			{#each displayedCatalog as item}
				<Card
					imageSrc={item.img}
					name={item.name}
					price={item.price}
					color="bg-green-600"
					onButtonClick={() => addToCart(item)}
					buttonText="Add to cart"
				/>
			{/each}
		</div>
	</div>
	{#if cart.length > 0}
		<div class="flex flex-col maxh-h-full min-h-0 w-full border-l border-gray-600 p-3">
			<h1>Cart</h1>
			<div class="flex gap-4 flex-col items-center max-h-full overflow-y-auto py-5">
				{#each cart as cartItem, index}
					<Card
						imageSrc={cartItem.item.img}
						name={cartItem.item.name}
						price={cartItem.item.price}
						count={cartItem.count}
						color="bg-red-600"
						onButtonClick={() => removeFromCart(cartItem)}
						buttonText="Remove from cart"
					/>
				{/each}
			</div>
			<div>Total: ${cartTotal}</div>
		</div>
	{/if}
</div>
