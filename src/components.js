import { createApp } from 'https://unpkg.com/petite-vue?module';

const state = {
	products: [],
	async load() {
		const res = await fetch('products.json')
		this.products = await res.json()
	}
}


function Product(props) {
	return {
		$template: '#product',
		name: props.name,
		image_path: props.image_path,
		image_alt: props.image_alt,
		description: props.description,
	}
}

state.load().then(() => {
	console.log("State is loaded: ", state);
	createApp({ Product, state }).mount()
});