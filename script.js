// Propuesta de San Valentín interactiva con animaciones suaves
(function(){
	// Configurar música de fondo
	const bgMusic = document.getElementById('bgMusic');
	if(bgMusic) {
		bgMusic.volume = 0.3;
		bgMusic.play().catch(err => console.log('Error al reproducir música:', err));
	}

	const intro = document.getElementById('intro');
	const cardScreen = document.getElementById('cardScreen');
	const proposalScreen = document.getElementById('proposalScreen');
	const finalScreen = document.getElementById('finalScreen');

	const readLetterBtn = document.getElementById('readLetterBtn');
	const yesBtn = document.getElementById('yesBtn');
	const noBtn = document.getElementById('noBtn');

	// Función para transiciones suaves
	function fadeOut(element) {
		return new Promise((resolve) => {
			element.style.animation = 'fadeOut 0.5s ease-out forwards';
			setTimeout(() => {
				element.classList.add('hidden');
				element.style.animation = '';
				resolve();
			}, 500);
		});
	}

	function fadeIn(element) {
		element.classList.remove('hidden');
		element.style.animation = 'fadeIn 0.5s ease-out forwards';
	}

	// Evento: Leer la carta
	readLetterBtn.addEventListener('click', async () => {
		await fadeOut(intro);
		fadeIn(cardScreen);
	});

	// Evento: Botón Siguiente (pasar a propuesta)
	const nextBtn = document.getElementById('nextBtn');
	if(nextBtn) {
		nextBtn.addEventListener('click', async () => {
			await fadeOut(cardScreen);
			fadeIn(proposalScreen);
			animateProposal();
		});
	}

	// Animación especial para la propuesta
	function animateProposal() {
		const animation = document.querySelector('.proposal-animation');
		if (animation) {
			animation.style.animation = 'float 3s ease-in-out infinite';
		}
	}

	// Evento: Botón Sí
	yesBtn.addEventListener('click', async () => {
		// Animación de celebración
		yesBtn.style.animation = 'pulse 0.6s ease-out';
		
		setTimeout(async () => {
			await fadeOut(proposalScreen);
			fadeIn(finalScreen);
			celebrateSuccess();
		}, 600);
	});

	// Celebración con confeti animado
	function celebrateSuccess() {
		const confetti = document.querySelectorAll('.confetti');
		confetti.forEach((item, index) => {
			item.style.animation = `pop 0.6s ease-out ${index * 0.1}s`;
		});
	}

	// Evento: Botón No - impedir funcionamiento
	noBtn.addEventListener('mouseenter', (e) => {
		e.preventDefault();
	});

	noBtn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
	});

})();
