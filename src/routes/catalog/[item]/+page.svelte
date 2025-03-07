<script lang="ts">
	import type { Item } from '$lib/types';

	export let data: { item: Item };

	$: item = data.item;
</script>

<div class="grow">
	<h1>{item.name}</h1>
</div>
