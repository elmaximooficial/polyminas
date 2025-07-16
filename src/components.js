import { createApp, reactive } from 'https://unpkg.com/petite-vue?module';
import './glide.min.js';

const state = reactive({
	products: [],
	currentIndex: 1,
	glide: null,

	async load() {
		const res = await fetch('products.json');
		const raw = await res.json();
		this.products = raw.map(p => reactive({
			$template: '#product',
			hovered: false,
			...p
		}));
	},

	initGlide() {
		this.glide = new Glide('.glide', {
			type: 'carousel',
			startAt: 1,
			perView: 3,
			focusAt: 'center',
			autoplay: 3000,
			hoverpause: true
		}).mount()

		this.glide.on('move', () => {
			this.currentIndex = this.glide.index
			console.log("Glide Index: ", this.glide.index, "\tCurrent Index: ", this.currentIndex)
		})

		let glideElement = document.querySelector('.glide');
		glideElement.addEventListener('click', (e) => {
			let rect = glideElement.getBoundingClientRect();
			let x = e.clientX - rect.left;
			if (x < rect.width / 4) {
				this.glide.go('<');
			} else if (x > rect.width * 3 / 4) {
				this.glide.go('>');
			}
		})
	}
});

state.load().then(() => {
	createApp({ state }).mount();

	setTimeout(() => {
		state.initGlide();
	}, 100);
});