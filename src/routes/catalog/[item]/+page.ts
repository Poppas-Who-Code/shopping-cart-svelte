import type { Item } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const catalog: Item[] = [
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

	const item = catalog.find((catalogItem) => new RegExp(params.item, 'iu').test(catalogItem.name));

	return { item };
};
