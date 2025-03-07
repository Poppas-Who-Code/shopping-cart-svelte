export type Item = {
	name: string;
	price: number;
	img: string;
	category: string;
};

export type CartItem = {
	count: number;
	item: Item;
};
