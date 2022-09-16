!(function(t,e) {
  if( "object" == typeof exports && "undefined" != typeof module) {
    e(exports);
  } else {
    if("function" == typeof define && define.amd) {
      define(["exports"], e);
    } else {
      e(((t = "undefined" != typeof globalThis ? globalThis : t || self).window = t.window || {}));
    }
  }
})(this, function(t) {

  const defaultSetings = {
    classes: {
      li: '.menu__li',
    },
    humburger: {
      position: 'before',
    },
    swipe: true,
    swipeDirection: 'right',
    swipeBorder: 18,
  };

  Object.prototype.merge = function() {
    var obj = Object.assign({}, this);

    for (key in arguments) {
      if(typeof arguments[key] !== 'function') {
        var item = arguments[key];
        for (itemKey in item) {
          if(typeof item[itemKey] !== 'function') {
            if(typeof item[itemKey] !== 'object') {
              obj[itemKey] = item[itemKey];
            } else {
              if(!obj.hasOwnProperty(itemKey)) {
                obj[itemKey] = {};
              }

              obj[itemKey] = obj[itemKey].merge(item[itemKey]);
            }
          }
        }        
      }
    }
    return obj;
  }

  function HeaderMenu(settings) {
    this.settings = defaultSetings.merge(settings);
    // this.settings = Object.assign({}, defaultSetings, settings);
    this.init();
  }

  HeaderMenu.prototype.init = function () {
    var _this$settings$humbur, _this$settings$humbur2;

    this.menu = document.querySelector('.header .menu');

    this.updateChildrens();
    this.count = 0;
    this.humburgerPoin = (_this$settings$humbur = this.settings.humburger) !== null && _this$settings$humbur !== void 0 && _this$settings$humbur.point ? this.settings.humburger.point : this.settings.humburger;
    this.humburgerParent = (_this$settings$humbur2 = this.settings.humburger) !== null && _this$settings$humbur2 !== void 0 && _this$settings$humbur2.elem ? document.querySelector(this.settings.humburger.elem) : this.menu;

    if(!!this.settings.classes) {
      this.classes = this.settings.classes;
    }
    this.initEvents();
  };

  HeaderMenu.prototype.resize = function () {
    var humburger = window.matchMedia("(max-width: " + this.humburgerPoin + "px)").matches;

    if (!humburger) {
      if (this.settings.showPoint) {
        var media = Object.keys(this.settings.showPoint).find(function (mediaQuery) {
          return window.matchMedia("(max-width: " + mediaQuery + "px)").matches;
        });
        this.showHide(this.settings.showPoint[media]);
      }
    } else {
      this.humburgerAdd();
    }
  };

  HeaderMenu.prototype.humburgerAdd = function () {
    this.resetHiden();

    if (!this.humburger) {
      var humburger = document.createElement('div');
      humburger.className = 'humburger';
      humburger.insertAdjacentHTML('afterbegin', '<div class="humburger__item" />');
      this.humburger = humburger;
      this.humburgerParent[this.settings.humburger.position](this.humburger);

      this.menu.insertAdjacentHTML('beforeend','<div class="close" />');

      if(this.settings.swipe) {
        this.siwipeEventDown = document.addEventListener('pointerdown', this.touchDown.bind(this));
        // this.siwipeEventMove = document.addEventListener('pointermove', this.touchMove.bind(this));
        this.siwipeEventUp = document.addEventListener('pointerup', this.touchUp.bind(this));
      }

      humburger.addEventListener('click', this.toggleHumburger.bind(this));
      if(close = this.menu.querySelector('.close')) close.addEventListener('click', this.toggleHumburger.bind(this));
    }

    if(this.settings.humburger.dropdown) {
      this.menu.querySelectorAll('.sub-menu').forEach(function(i) {
        if(i.closest(this.classes.li).querySelectorAll('.plus-minus').length == 0) {
          i.insertAdjacentHTML('beforebegin', '<div class="plus-minus" />');

          i.querySelector('.plus-minus',).addEventListener('click', this.toogleDropDown);
        }
      });
    }

    this.settings.hasOwnProperty('wrapper') && !this.wrapper && this.addWrapper();
  };

  HeaderMenu.prototype.touchDown = function(e) {
    if(e.pointerType !== 'touch') return;

    if(!!!this.startTouch) {
      this.startTouch = e.clientX;
    } 
    this.wrapper ? this.wrapper.setPointerCapture(e.pointerId) : this.menu.setPointerCapture(e.pointerId);

  }
  // HeaderMenu.prototype.touchMove = function(e) {
  //   // console.log(e, 'move');
  // }
  HeaderMenu.prototype.touchUp = function(e) {
    if(e.pointerType !== 'touch') return;

    this.endTouch = e.clientX;
    var click = new CustomEvent('click');

    if(this.settings.swipeDirection == 'right' && this.startTouch < this.endTouch && this.startTouch <= this.settings.swipeBorder) {
      this.humburger.dispatchEvent(click);
    }

    if(this.settings.swipeDirection == 'left' && this.startTouch > this.endTouch && this.startTouch >= window.innerWidth-this.settings.swipeBorder) {
      this.humburger.dispatchEvent(click);
    }

    this.startTouch = null;
  }

  HeaderMenu.prototype.humburgerDel = function () {
    if (this.humburger) {
      this.humburger.remove();
      if(close = this.menu.querySelector('.close')) close.remove();
      this.menu.querySelectorAll('.plus-minus').forEach(function(i) {i.remove()});
      this.humburger = null;

      this.settings.hasOwnProperty('wrapper') && this.removeWrapper();
    }
  };

  HeaderMenu.prototype.addWrapper = function() {
    if(this.wrapper) return false;
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'menu-wrapper';

    this.menuParent = this.menu.parentNode || document.body;

    this.wrapper.append(this.menu);

    for (keys in this.settings.wrapper.position) {
      var val = this.settings.wrapper.position[keys];
      if(typeof val == 'function') continue;

      if(typeof val == 'object') {
        val = Object.keys(val).map(function(key) {
          return document.querySelector(val[key]).cloneNode(true);
        });
      }

      if(typeof val == 'string') {
        val = document.querySelector(val).cloneNode(true);
      }

      if(this.settings.wrapper.dopWrap == true || this.settings.wrapper.dopWrap == keys) {
        var dop = document.querySelector('.wrapper-'+keys);

        if(!dop) {
          dop = document.createElement('div');
          dop.className = 'wrapper-'+keys;
        }

        if(val.length) dop.append(...val);
        else dop.append(val);
        val = dop;
      }

      if(val.length) this.menu[keys](...val);
      else this.menu[keys](val);
    }
    this.menuParent.append(this.wrapper);
  }

  HeaderMenu.prototype.removeWrapper = function() {
    if(!this.wrapper) return false;

    this.menuParent.append(this.menu);
    this.wrapper.remove();
    this.wrapper = null;
  }

  HeaderMenu.prototype.showHide = function (count) {
    this.humburgerDel();

    if (count > 0) {
      if (!!this.hideItem && this.count == count) return false;
      if (this.count != count) this.resetHiden();
      this.count = count;
      this.addHide();
      document.querySelector('.menu .hide').addEventListener('click', function () {
        this.classList.toggle('active');
      });
    } else {
      if (!!!this.hideItem) return false;
      this.resetHiden();
    }
  };

  HeaderMenu.prototype.resetHiden = function () {
    if (!!this.hideItem) this.menu.append(...this.hideItem);
    this.hideItem = null;
    if(hide = this.menu.querySelector('.hide')) hide.remove();
    this.updateChildrens();
  };

  HeaderMenu.prototype.updateChildrens = function () {
    this.children = this.menu.children;
  };

  HeaderMenu.prototype.toggleHumburger = function () {
    this.humburger.classList.toggle('active');
    this.wrapper && this.wrapper.classList.toggle('active');
    this.menu.classList.toggle('active');
    document.body.classList.toggle('fixed');
  };

  HeaderMenu.prototype.closeMenu = function() {
    this.humburger && this.humburger.classList.remove('active');
    this.wrapper && this.wrapper.classList.remove('active');
    this.menu.classList.remove('active');
    document.body.classList.remove('fixed');    
  }

  HeaderMenu.prototype.toogleDropDown = function() {
    this.closest(this.classes.li).classList.toggle('active');
  };

  HeaderMenu.prototype.initEvents = function () {
    window.addEventListener('resize', this.resize.bind(this));

    var resizeEvent = new CustomEvent('resize');
    window.dispatchEvent(resizeEvent);
  };

  HeaderMenu.prototype.addHide = function () {
    this.hideItem = Array.from(this.children).splice(this.count);

    if (this.hideItem.length > 0) {
      var hide = document.createElement('div');
      hide.className = 'hide';
      this.menu.append(hide);

      var hideList = document.createElement('div');
      hideList.className = 'hide__list';
      hide.append(hideList);
      hideList.append(...this.hideItem);
    }
  };

  HeaderMenu.prototype.debug = function () {
    console.log(this);
  };
  /* Конец верхнего меню */




  t.headerMenu = HeaderMenu;
})
