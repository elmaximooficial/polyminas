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
			autoplay: 4500,
			hoverpause: true
		}).mount()

		this.glide.on('move.after', () => {
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
	},
	sendWhatsapp(product_name) {
		const number = '5535997327537';
		const mensagem = `Olá, gostaria de mais informações sobre o ${product_name}`;
		let urlWhatsapp = `https://wa.me/${number}`

		console.log(mensagem);

		if (mensagem) {
			urlWhatsapp += `?text=${encodeURIComponent(mensagem)}`;
			console.log(urlWhatsapp)
		}

		window.open(urlWhatsapp, '_blank');
	}
});

state.load().then(() => {
	createApp({ state }).mount();

	setTimeout(() => {
		state.initGlide();
	}, 100);
});


function openContact() {
	modal.classList.remove("hidden")
	void modal.offsetWidth
	modal.classList.add("opacity-100")
	modalContent.classList.remove("opacity-0", "translate-y-5")
	document.addEventListener('keydown', escapeKey);
}

function closeContact() {
	modal.classList.remove('opacity-100')
	modalContent.classList.add("opacity-0", "translate-y-5")
	setTimeout(() => {
		modal.classList.add('hidden')
		document.removeEventListener('keydown', escapeKey);
	}, 300)
}

function escapeKey(event) {
	if (event.key === 'Escape' || event.keyCode === 27) {
		closeContact()
	}
}

const contact_btn = document.getElementById("openContact")
const contact_btn_mobile = document.getElementById("openContactMobile")
const modal = document.getElementById("contact-alert")
const modalContent = modal.querySelector('div')
const closeModal = document.getElementById("closeModalBtn")

contact_btn.addEventListener("click", openContact);
contact_btn_mobile.addEventListener("click", openContact);

closeModal.addEventListener("click", closeContact)

modal.addEventListener('click', (event) => {
	if (event.target === modal) {
		closeContact();
	}
});