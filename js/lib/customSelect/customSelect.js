!(function(t){
	const startCustomSelect = function(selector) {
		document.querySelectorAll(selector).forEach(function(item) {
			return new CustomSelect(item);
		});
	}

	const CustomSelect = function(select) {
		this.select = select;

		this.init();
	}

	CustomSelect.prototype = {
		init() {
			this.createElement();

			var childrens = this.select.children;

			var items = [];

			Array.from(childrens).forEach(function(item) {
				copyItem = document.createElement('div');
				copyItem.className = 'customSelect__item';
				copyItem.innerHTML = item.innerHTML;

				this.addEvent(copyItem);

				items.push(copyItem);
			}, this);


			this.selecteble.innerHTML = childrens[0].innerHTML;
			this.list.append(...items);

			this.cloneSlect = this.select.cloneNode(true);
			this.wrap.append(this.selecteble, this.list, this.cloneSlect);

			this.select.replaceWith(this.wrap);

			this.select = this.cloneSlect;
		},

		createElement() {
			this.wrap = document.createElement('div');
			this.wrap.className = 'customSelect__wrapper';

			this.selecteble = document.createElement('div');
			this.selecteble.className = 'customSelect__selectable';
			this.selecteble.addEventListener('click', this.selectToggle.bind(this), false);

			this.list = document.createElement('div');
			this.list.className = 'customSelect__List';

			this.close = this.close.bind(this);

		},

		addEvent(item) {
			item.addEventListener('click', this.selecting.bind(this), false);
		},

		selecting(event) {
			var value = event.target.innerHTML;
			this.selecteble.innerHTML = value;
			this.select.value = value;

			this.selectToggle();
		},

		close(event) {
			var wrapperTarget = event.target.closest('.customSelect__wrapper');
			if(!event.target.className.match('customSelect__') || (!!wrapperTarget && !wrapperTarget.isEqualNode(this.wrap))) {
				this.list.classList.remove('open');
				document.removeEventListener('click', this.close, false);
			}
		},

		selectToggle() {
			this.list.classList.toggle('open');
			document.addEventListener('click', this.close, false);
		}
	}

	t.customSelect = startCustomSelect;

})(window);