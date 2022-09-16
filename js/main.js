// import {maskInput} from './lib/native-mask/mask';
// import {Fancybox, Carousel} from './lib/fancybox4/fancybox.umd';
// import {headerMenu} from './lib/customMenu/index';

document.addEventListener('DOMContentLoaded', function() {

	maskInput('input[type=tel]');

	var menu = new headerMenu({
		classes: {
			li: '.menu__item',
		},
		showPoint: {
			// 1439: 6,
			1320: 3,
			1160: 2,
		},
		humburger: {
			point: 990,
			elem: '.header__offers',
			position: 'after',
		},
		wrapper: {
			position: {
				// Обозначает какие элементы в обертке будут стоять до меню и после меню String | Array
				before: '.logo',
				after: ['.header__offers','.social'],
			},
			dopWrap: 'after',
		},
		swipeDirection: 'left',
	});

// 	// if(!!document.querySelector('.custom-select')) {
// 	// 	customSelect('.custom-select');
// 	// }
	Fancybox.bind('[data-fancybox="popup"]',{
		dragToClose: false,
		groupAttr: false,
	});

	document.querySelectorAll('.custom-file input[type=file]').forEach(function(item) {
		item.addEventListener('change', function() {
			if(this.files[0]) {
				this.closest('.custom-file').querySelector('.custom-file__input').innerHTML = this.files[0].name;
			}
		});
	});

	document.querySelectorAll('.custom-radio').forEach(function(item) {
		item.addEventListener('pointerdown', function(e) {
			if(this.querySelector('input').checked) return;

			this.querySelector('input').checked = true;
		});
	});

	if(trust = document.querySelector('.trust__list')) {
		const trustSlider = new Carousel(trust, {
			center: false,
			infinite: false,
			classNames: {
				slide: 'trust__item'
			},
			  Navigation: {
			    prevTpl:
			      `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M18 8H2" stroke="#B9B9B9" stroke-width="2"/>
						<path d="M8.54546 1.45459L2 8.00004L8.54546 14.5455" stroke="#B9B9B9" stroke-width="2"/>
					</svg>
					`,
			    nextTpl:
			      `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 8H16" stroke="#B9B9B9" stroke-width="2"/>
						<path d="M9.45459 1.45459L16 8.00004L9.45459 14.5455" stroke="#B9B9B9" stroke-width="2"/>
					</svg>
					`,
			  },
		})
	}
	
	function initTabs(elem) {
		var d = elem || document;
		d.querySelectorAll('.tabs').forEach(function (item) {
			var btns = Array.from(item.querySelectorAll('.tabs__item')),
				contents = Array.from(item.querySelectorAll('.tabs__content')),
				index = 0;

			var setting = {
				disabled: item.classList.contains('tabs--disabled'),
			};
			tabsClear(btns, contents);

			if(btns[0]) btns[0].classList.add('active');
			if(contents[0]) contents[0].classList.add('active');

			btns.forEach(function (item) {
				item.addEventListener('click', function (e) {
					// e.preventDefault();
					var $this = e.target;
					tabsClear(btns, contents);
					index = btns.findIndex(e => e == this, $this)
					
					if (index !== -1) {
						// $this.classList.add('active');
						btns[index].classList.add('active');
						contents[index].classList.add('active');
					}
				});
			});
			

			function tabsClear() {
				btns.map(function (i) {
					i.classList.remove('active');
					return i;
				});
				contents.map(function (i) {
					i.classList.remove('active');
					if (setting.disabled) {
						i.querySelectorAll('input').forEach(function (input) {
							input.disabled = !input.disabled;
						});
					}
					return i;
				});
			}

		});
	}

	initTabs();

// 	if(cert = document.querySelector('.js-serteficat-slider')) {
// 		const certSlider = new Carousel(cert, {
// 			Dots: false,
// 			center: false,
// 			on: {
// 				refresh: (carousel) => {
// 					var $navs = carousel.$container.querySelector('.carousel__nav');
// 					if($navs && !$navs.classList.contains('carousel__nav--position')) $navs.classList.add('carousel__nav--position');
// 				},
// 			}
// 		})
// 	}

// 	document.querySelectorAll('.js-send').forEach(function(item) {
// 		var input = document.createElement('input');
// 		input.name = 'nobot';
// 		input.value = 'nobot';
// 		input.type = 'hidden';

// 		item.append(input.cloneNode(true));

// 		item.addEventListener('submit', send)
// 	});


	document.querySelectorAll('.js-anchor').forEach(function(item) {
		item.addEventListener('pointerdown', function() {

			menu.closeMenu();

			setTimeout(() => {
				var elem = document.querySelector(this.dataset.element);
				window.scrollTo({
				    top: elem.offsetTop - 20,
				    behavior: "smooth"
				});
				// elem.scrollIntoView(true);	
			}, 400);
		});
	});

	document.querySelectorAll('.strategy__item').forEach(function(item){
		var list = item.querySelector('.strategy__item-list');
		list.dataset.height = list.scrollHeight;
		item.addEventListener('click', function(e) {
			if(window.matchMedia("(max-width: 790px)").matches) {
				if(list.classList.contains('active')) {
					list.style.height = 0;
				} else {
					list.style.height = list.dataset.height+'px';
				}
				list.classList.toggle('active');
			}
		}, false);
	});

});

// async function send(e) {
// 	e.preventDefault();
// 	const answer = await fetch('/ajax/customSendMail.php', {
// 		method: 'POST',
// 		body: new FormData(this),
// 	});
// 	var mess = null;
// 	if(answer.ok) {
// 		var data = await answer.json();
// 		mess = data.mess;
// 	} else {
// 		mess = 'Ошибка ответа сервера';
// 	}

// 	if(mess) {
// 		Fancybox.show([{
// 			src: mess,
// 			type: 'html',
// 		}]);
// 		this.reset();

		// if(field = this.querySelector('.custom-file__input')) {
		// 	field.innerHTML = 'Прикрепить файл';
		// }
// 	}

// 	setTimeout(function() {
	// menu.closeMenu();
// 		Fancybox.close();
// 	}, 1500);
// }