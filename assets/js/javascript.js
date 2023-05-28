jQuery(window).ready( function(){

	
	var $ = jQuery.noConflict();

	
	
	__scroll_slides();


	// ======== Присвоение класса элементу при навеедении на элемент в другом блоке ===========


		// Добавление класса "active" к первому элементу при загрузке страницы
		$('.js-hover-link-pict-block .__link-item:first-child, .js-hover-link-pict-block .__hover-pict:first-child').addClass('active');

		// При наведении на ссылку выполняем следующее:
		$('.js-hover-link-pict-block').on('mouseenter', '.__link-item', function() {
			var linkBlock = $(this).closest('.js-hover-link-pict-block');
			var pictBlock = linkBlock.find('.__pict-block');
			
			// Удаляем класс "active" с активных ссылок и слайдов
			linkBlock.find('.__link-item.active').removeClass('active');
			pictBlock.find('.__hover-pict.active').removeClass('active');
			
			// Добавляем класс "active" к наведенной ссылке
			$(this).addClass('active');
			
			// Находим порядковый номер наведенной ссылки
			var index = linkBlock.find('.__link-item').index(this);
			
			// Добавляем класс "active" к соответствующему слайду
			pictBlock.find('.__hover-pict').eq(index).addClass('active');
			
			return false; // Отключаем переход по ссылке
		});
	// ============== hover в мобильной версии =================
	$('body').bind('touchstart', function () {});
	
	element_animation();
	element_animation_block();


	// // ================= owl-slider ===================

	$('.js-slider .owl-carousel').owlCarousel({
		// items: 5,
		// nav: true,
		// navText: ['<img src="/wp-content/themes/afina/assets/images/icons/arrow-left.svg">', '<img src="/wp-content/themes/afina/assets/images/icons/arrow-right.svg">'],
		dots: true,
		lazyLoad: true,
		lazyLoadEager: 0,
		autoplay: true,
		loop: true,
		responsive:{
			0:{
				items:1,
				margin: 14,
			},
			768:{
				items: 1,
				margin: 18,
			},
			1024:{
				items: 2,
				margin: 18,
			}
		}
	});
	// $('.js-slider1 .owl-carousel').trigger('next.owl.carousel');

	$('[data-owl-trigger]').on('click', function(){
		var _this = $(this);
		_this.closest('.owl-wrapper').find('.owl-carousel').trigger( _this.attr('data-owl-trigger') );
	});



	
function __scroll_slides(){

	var $ = jQuery.noConflict();
	
	var _slides	= $('.__scroll_slides');

	if(!_slides.length){
		return;
	}
	
	$(window).on('resize', function(e){
		
		_slides.each(function (i0, e0){
			var _this	= $(e0);
			var _items	= _this.find('.__items');
			var _item	= _items.find('.__item');
			var _width	= 0;
			
			var width	= 0;
			var height	= 0;
			
			_item.each(function (i1, e1){
				width = $(e1).width();
				height = $(e1).height();
				_width += width;
			});
			
			_this.addClass('launch');
			_this.height( _width - width + height );
			_items.width( _width + 1 );
			
		});
		
	}); $(window).resize();
	
	$(window).on('scroll', function(e){
	
		var top		= $(window).scrollTop();
		var height	= $(window).innerHeight();
		var bottom	= top + height;
		
		_slides.each(function (i0, e0){
			var _this			= $(e0);
			var _items			= _this.find('.__items');
			var _item			= _items.find('.__item');
			var _offset			= _this.offset();
			var _px				= top - _offset.top;
			var _items_width	= _items.width();
			var _item_width		= _item.width();
			var _to				= _this.attr('data-to') == 'right' ? 'right' : 'left';
			
			console.log( _this.attr('data-to') );
			
			_px = Math.max(_px, 0);
			_px = Math.min(_px, _items_width - _item_width);
			
			if(_to == 'right'){
				_px = -_items_width + _item_width + _px;
				_this.addClass('to_right');
			}
			else{
				_px = -_px;
				_this.addClass('to_left');
			}
			
			_items.css('transform', 'translateX('+ _px +'px)');
		});
		
	}); $(window).scroll();
}


// ======= якорные ссылки ===========

});


// =============== поочёрёдное появление элементов при скроле ==============

function element_animation(){
	function onEntry(entry) {
		entry.forEach((change, index) => {
			if (change.isIntersecting) {
				change.target.classList.add('element-show');
				change.target.style.transitionDelay = 0.15 * index + 's';
			}
		});
	}

	let options = {
		threshold: [0.5]
	};
	
	let observer = new IntersectionObserver(onEntry, options);
	jQuery('.element-animation, .wrapper-element-animation p, .wrapper-element-animation ul li, .wrapper-element-animation h1, .wrapper-element-animation h2, .wrapper-element-animation h3, .wrapper-element-animation h4, .wrapper-element-animation h5, .wrapper-element-animation h6').each(function (){
		observer.observe( this );
	});
}


function element_animation_block(){
	function onEntry(entry) {
		entry.forEach((change, index) => {
			if (change.isIntersecting) {
				change.target.classList.add('--active');
				change.target.style.transitionDelay = 0.15 * index + 's';
			}
		});
	}

	let options = {
		threshold: [0.5]
	};
	
	let observer = new IntersectionObserver(onEntry, options);
	jQuery('.animation-block').each(function (){
		observer.observe( this );
	});
}

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
}


// // =============================
