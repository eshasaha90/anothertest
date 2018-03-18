var $, window, jQuery, document;
$(function () {


    /*-------------------------------------SCROLL TO TOP-------------------------------------*/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 300);
        return false;
    });


    /*-------------------------------------STICKY NAV-------------------------------------*/
    jQuery(document).ready(function ($) {
        var mainHeader = $('.header_main'),
            secondaryNavigation = $('.nav_wrapper'),
            //this applies only if secondary nav is below intro section
            belowNavHeroContent = $('.nav_wrapper1'),
            headerHeight = mainHeader.height();

        //set scrolling variables
        var scrolling = false,
            previousTop = 0,
            currentTop = 0,
            scrollDelta = 10,
            scrollOffset = 150;

        mainHeader.on('click', '.nav-trigger', function (event) {
            // open primary navigation on mobile
            event.preventDefault();
            mainHeader.toggleClass('nav-open');
        });

        $(window).on('scroll', function () {
            if (!scrolling) {
                scrolling = true;
                (!window.requestAnimationFrame) ?
                setTimeout(autoHideHeader, 250): requestAnimationFrame(autoHideHeader);
            }
        });

        $(window).on('resize', function () {
            headerHeight = mainHeader.height();
        });

        function autoHideHeader() {
            var currentTop = $(window).scrollTop();

            (belowNavHeroContent.length > 0) ?
            checkStickyNavigation(currentTop) // secondary navigation below intro
                : checkSimpleNavigation(currentTop);

            previousTop = currentTop;
            scrolling = false;
        }

        function checkSimpleNavigation(currentTop) {
            //there's no secondary nav or secondary nav is below primary nav
            if (previousTop - currentTop > scrollDelta) {
                //if scrolling up...
                mainHeader.removeClass('is-hidden');
            } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
                //if scrolling down...
                mainHeader.addClass('is-hidden');
            }
        }

        function checkStickyNavigation(currentTop) {
            //secondary nav below intro section - sticky secondary nav
            var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();

            if (previousTop >= currentTop) {
                //if scrolling up... 
                if (currentTop < secondaryNavOffsetTop) {
                    //secondary nav is not fixed
                    mainHeader.removeClass('is-hidden');
                    secondaryNavigation.removeClass('fixed slide-up');
                    belowNavHeroContent.removeClass('secondary-nav-fixed');
                } else if (previousTop - currentTop > scrollDelta) {
                    //secondary nav is fixed
                    mainHeader.removeClass('is-hidden');
                    secondaryNavigation.removeClass('slide-up').addClass('fixed');
                    belowNavHeroContent.addClass('secondary-nav-fixed');
                }

            } else {
                //if scrolling down...	
                if (currentTop > secondaryNavOffsetTop + scrollOffset) {
                    //hide primary nav
                    mainHeader.addClass('is-hidden');
                    secondaryNavigation.addClass('fixed slide-up');
                    belowNavHeroContent.addClass('secondary-nav-fixed');
                } else if (currentTop > secondaryNavOffsetTop) {
                    //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset 
                    mainHeader.removeClass('is-hidden');
                    secondaryNavigation.addClass('fixed').removeClass('slide-up');
                    belowNavHeroContent.addClass('secondary-nav-fixed');
                }
            }
        }
    });


    /*-------------------------------------ONE_PAGE_SCROLL-------------------------------------*/
    $('.nav_menu, .jumpto_wrap, .custom_menu').onePageNav({
        currentClass: 'active',
    });


    /*-------------------------------------HASH_ANCHOR-------------------------------------*/
    $('[href="#"]').click(function (e) {
        e.preventDefault();
    });


    /*-------------------------------------NAV_HOVER-------------------------------------*/
    $(document).on('mouseover mouseout mouseenter', '.ecomm_links > ul > li, .nav_menu > ul > li .submenu.submenu_dark li', function (event) {
        if ($(this).find(".submenu").length) {
            if (event.type == 'mouseover' || event.type == 'mouseenter') {
                if (($(this).find(".submenu").offset().left + $(this).children(".submenu").width()) >= $(window).width() - 15) {
                    $(this).addClass('touch_right');
                }
            } else if (event.type == 'mouseout') {
                //$(this).removeClass('touch_right');
            }
        }
    });

    if ($('.submenu ul li').length) {
        $('.submenu ul li').hover(function () {
            $(this).parents('.menu_block').addClass('hovered');
        }, function () {
            $(this).parents('.menu_block').removeClass('hovered');
        });


        $('.submenu ul li').each(function () {
            var x = $(this).parent().find('.active');
            x.parents('.menu_block').addClass('hovered');
        });
    }


    /*-------------------------------------FLAG-------------------------------------*/
    $('.subtab_nav').click(function (e) {
        $(this).parent('.subtab_block').toggleClass('open');
        e.stopPropagation();
    });
    /*$('html').click(function () {
		$('.lang_nav').parent('.subtab_block').removeClass('open');
	});*/

    $('.currency_block ul').each(function () {
        var activeLi = $(this).find('.active').html();
        $(this).siblings('.select_country').html(activeLi);
        $('.currency_block ul li').click(function (e) {
            $(this).parent().children().removeClass('active');
            $(this).addClass('active');

            $(this).parent().siblings('.select_country').html($(this).html());

            $(this).parent('ul').slideUp();
            e.stopPropagation();
        });
        $('html').click(function () {
            $('.currency_block ul li').parent('ul').slideUp();
        });
    });


    /*-------------------------------------HOME_SLIDER-------------------------------------*/
    $("#banner").owlCarousel({
        items: 1,
        loop: true,
        autoPlay: false,
        pagination: true,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 1],
            [600, 1],
            [768, 1],
            [1024, 1],
        ]
    });


    /*-------------------------------------OWNER_SLIDER-------------------------------------*/
    $("#owner_slider").owlCarousel({
        items: 1,
        loop: true,
        autoPlay: false,
        pagination: true,
        navigation: false,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 1],
            [600, 1],
            [768, 1],
            [1024, 1],
        ]
    });


    /*-------------------------------------STORE_SLIDER-------------------------------------*/
    $("#store_slider").owlCarousel({
        items: 3,
        autoPlay: false,
        pagination: true,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 2],
            [600, 2],
            [768, 3],
            [1024, 3],
        ]
    });


    /*-------------------------------------CULTURE_SLIDER-------------------------------------*/
    /*$("#culture_slider").owlCarousel({
        items: 4,
        autoPlay: false,
        pagination: true,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 2],
            [600, 3],
            [768, 4],
            [1024, 4],
        ]
    });*/


    /*-------------------------------------GENRE_THUMB_IMAGES-------------------------------------*/
    $('.genre_img_thumb').each(function () {
        var largeImagePath = $(this).parents('.genre_img').children('.genre_img_large').find('img'),
            largeImage = largeImagePath.attr('src');
        $(this).hover(function () {
            var thumbImage = $(this).find('img').attr('src');
            largeImagePath.attr('src', thumbImage);
        }, function () {
            largeImagePath.attr('src', largeImage);
        });
    });
    
    $(".genre_home_banner").owlCarousel({
        items: 3,
        loop: true,
        autoPlay: false,
        pagination: false,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 2],
            [600, 2],
            [768, 3],
            [1024, 3],
        ]
    });


    /*-------------------------------------BLOG_SLIDER-------------------------------------*/
    $("#blog_slider").owlCarousel({
        items: 3,
        autoPlay: false,
        pagination: false,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 2],
            [600, 3],
            [768, 3],
            [1024, 3],
        ]
    });


    /*-------------------------------------STORY_SLIDER-------------------------------------*/
    $("#story_slider").owlCarousel({
        items: 2,
        autoPlay: false,
        pagination: false,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 1],
            [600, 2],
            [768, 2],
            [1024, 2],
        ]
    });


    /*-------------------------------------TAB-------------------------------------*/
    $(".tab_menu > ul > li").click(function () {
        $('.tab_menu > ul > li').removeClass();
        $(this).addClass('select');
        var index = jQuery('.tab_menu ul li').index(jQuery(this));
        $('.tab_details > .tab_info').hide();
        $('.tab_details > .tab_info').filter(':eq(' + index + ')').show();
    });

    if ($('.register_type').length) {
        $('.register_type label').click(function () {
            $(this).parent().children().removeClass('checked');
            $(this).addClass('checked');
            var index = $('.register_type label').index($(this));
            $(this).parents('.register_type').next().children().hide();
            $(this).parents('.register_type').next().children().filter(':eq(' + index + ')').show();
        });
    }


    /*-------------------------------------COUNTRY_STD_CODE-------------------------------------*/
    $('.select_country').click(function (e) {
        $(this).siblings('ul').animate({
            height: 'toggle'
        }, 300);
        e.stopPropagation();
    });
    $('html').click(function () {
        $('.select_country').siblings('ul').slideUp();
    });

    $('.std_block ul').each(function () {
        var activeLi = $('.std_block ul').find('.active'),
            countryFlag = activeLi.find('img').attr('src'),
            countryName = activeLi.data('country'),
            countryCode = activeLi.data('std');
        $(this).siblings('.select_country').append('<img src="' + countryFlag + '" alt="' + countryName + '" />');
        $(this).siblings('.country_code').html(countryCode);
    });
    $('.std_block ul li').click(function () {
        $(this).parent().children().removeClass('active');
        $(this).addClass('active');
        var countryFlag = $(this).find('img').attr('src'),
            countryName = $(this).data('country'),
            countryCode = $(this).data('std');
        $(this).parent().siblings('.select_country').find('img').attr({
            src: countryFlag,
            alt: countryName
        });
        $(this).parent().siblings('.country_code').html(countryCode);
        $(this).parent('ul').slideUp();
    });


    /*-------------------------------------CAPTCHA_LABEL-------------------------------------*/
    if ($(".captcha_request input[type='text']").length) {
        $(".captcha_request input[type='text']").each(function () {
            var captchaLabel = $(this).parent().data('label');
            $(this).siblings('label').html(captchaLabel);
            $(".captcha_request input[type='text']").on("change paste keyup", function () {
                if ($(this).val() != "") {
                    $(this).siblings('label').hide();
                } else {
                    $(this).siblings('label').show();
                }
            });
        })
    }


    /*-------------------------------------FAQ-------------------------------------*/
    $(".toggle_block > .ques").bind("click", function () {
        if ($(this).hasClass('closed')) {
            $(".toggle_block").children(".ques").removeClass('closed');
            $(".toggle_block").children(".ans_toggle").slideUp(300);
            $(this).removeClass('closed');
            $(this).next('.ans_toggle').slideUp(300);
            return false;
        } else {
            $(".toggle_block").children(".ques").removeClass('closed');
            $(".toggle_block").children(".ans_toggle").slideUp(300);
            $(this).addClass('closed');
            $(this).next('.ans_toggle').slideDown(300);
            return false;
        }
    });


    /*-------------------------------------DEAL_BANNER_SLIDER-------------------------------------*/
    $("#deal_banner").bxSlider({
        tickerHover: true,
        pager: true,
        controls: true,
        nextText: '<i class="fa fa-angle-right"></i>',
        prevText: '<i class="fa fa-angle-left"></i>',
        pagerCustom: '#bx-pager',
        mode: 'fade'
    });

    if ($('#bx-pager').length) {
        var noOfChild = $('#bx-pager').children('a').length,
            childWidth = $('#bx-pager').children('a').outerWidth(),
            totalWidth = childWidth * noOfChild;
        $('#bx-pager').outerWidth(totalWidth)
        console.log(noOfChild + " " + childWidth + " " + totalWidth);
    }


    /*-------------------------------------SELLER_SLIDER-------------------------------------*/
    $("#seller_slider").owlCarousel({
        items: 2,
        autoPlay: false,
        pagination: true,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 1],
            [600, 2],
            [768, 2],
            [1024, 2],
        ]
    });


    /*-------------------------------------CUSTOM_NAV_OWL_SLIDER-------------------------------------*/
    $(".custom_nav_slider").owlCarousel({
        items: 5,
        autoPlay: false,
        pagination: true,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 2],
            [600, 3],
            [768, 5],
            [1024, 5],
        ]
    });


    function carousels() {
        var carousel = $('.carousel'),
            options = {
                navigation: true
            };

        carousel.each(function () {
            var $this = $(this);
            if ($this.data('options')) {
                options = $this.data('options');
            }
            $this.owlCarousel(options).addClass('loaded');

            $(window).on('resize', function () {
                //delay(function () {
                bottomNavigation();
                //}, 200);
            });

            function bottomNavigation() {
                if (($this.hasClass('bottom-navigation')) && (!$this.find('.owl-pagination .owl-prev').length)) {
                    $this.find('.owl-pagination').prepend('<a href="#" class="owl-prev"><i class="fa fa-angle-left"></i></a>');
                    $this.find('.owl-pagination').append('<a href="#" class="owl-next"><i class="fa fa-angle-right"></i></a>');

                    $this.find('.owl-next').on('click', function (e) {
                        e.preventDefault();
                        $this.trigger('owl.next');
                    });
                    $this.find('.owl-prev').on('click', function (e) {
                        e.preventDefault();
                        $this.trigger('owl.prev');
                    });
                }
            }
            bottomNavigation();
        });
    }
    $(window).load(function () {
        carousels();
    });


    /*-------------------------------------FILTER-------------------------------------*/
    $('.filter_nav').click(function () {
        $(this).siblings('ul').animate({
            height: 'toggle'
        }, 300);
        $(this).toggleClass('close');
    });

    $('.filter_block ul li label').click(function () {
        $(this).parents('.filter_block').find('.active').removeClass('active');
        $(this).parent().addClass('active');
    });

    $('.sidebar, .content, .sidenav').theiaStickySidebar({
        additionalMarginTop: 50
    });


    /*-------------------------------------GENRE_SLIDER-------------------------------------*/
    $("#jumpto_genre").owlCarousel({
        items: 14,
        loop: true,
        autoPlay: false,
        pagination: false,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 4],
            [320, 4],
            [480, 6],
            [600, 8],
            [768, 10],
            [1024, 14],
        ]
    });
    $(".genre_banner").owlCarousel({
        items: 1,
        loop: true,
        autoPlay: false,
        pagination: true,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 1],
            [600, 1],
            [768, 1],
            [1024, 1],
        ]
    });


    /*-------------------------------------LIKE-------------------------------------*/
    $('.like_icon').click(function(e){
        e.preventDefault();
        $(this).toggleClass('liked');
    });
    
    $('.isotop_wrap').isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false,
        }
    });


    /*-------------------------------------CULTURE_FOLLOWED-------------------------------------*/
    $("#culture_followed").owlCarousel({
        items: 3,
        loop: false,
        autoPlay: false,
        pagination: false,
        navigation: true,
        rewindNav : false,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 2],
            [600, 3],
            [768, 3],
            [1024, 3],
        ]
    });


    /*-------------------------------------EVENT-------------------------------------*/
    $("#up_event").owlCarousel({
        items: 3,
        loop: false,
        autoPlay: false,
        pagination: false,
        navigation: true,
        rewindNav : false,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 2],
            [600, 3],
            [768, 3],
            [1024, 3],
        ]
    });


    /*-------------------------------------SHIPPING_OPTION-------------------------------------*/
    $(".shipoption").click(function (event) {
        $(this).parent().toggleClass('opened');
        event.stopPropagation();
    });
    /*$("html").click(function () {
        $(".shipoption").parent().removeClass('opened');
    });*/
    
    if ($('.shipoption_list').length) {
        $('.shipoption_list label').click(function () {
            $(this).parents('.shipoption_list').find('label').removeClass('checked');
            $(this).addClass('checked');
        });
    }


    /*-------------------------------------DROPDOWN-------------------------------------*/
    $('.dropNav').click(function (e) {
        $(this).toggleClass('opened');
        $(this).siblings('ul').animate({
            height: 'toggle'
        }, 300);
        e.stopPropagation();
    });
    $('html').click(function () {
        $('.dropNav').removeClass('opened');
        $('.dropNav').siblings('ul').slideUp();
    });
    $('.dropList li').click(function () {
        $(this).parent().children().removeClass('active');
        $(this).addClass('active');
        var dropVal = $(this).html(),
            shipPrice = $(this).data('price');
        $(this).parent().siblings('.dropNav').html(dropVal);
        $(this).parents('.dropdown').siblings('.shipprice').html(shipPrice);
        $(this).parent('ul').slideUp();
    });


    /*-------------------------------------ACCOUNT_PROGRESS-------------------------------------*/
    $('#account_status').LineProgressbar({
        percentage: 80
    });


    /*-------------------------------------SELLER_PLAN-------------------------------------*/
    $(".plan_block input[type=radio]").on('change', function () {
        $(this).parents('.plan_list').children().removeClass('active');
        $(this).parents('.plan_block').addClass('active');
    });


    /*-------------------------------------BUSINESS_CULTURE-------------------------------------*/
    $('.business_culture').click(function (e) {
        $(this).children("ul").slideToggle();
        e.stopPropagation();
    });
    $('html').click(function () {
        $('.business_culture').children('ul').slideUp();
    });
    
    $('.business_culture ul li').bind("click", function () {
        var cultureIcon = $('img', this).attr('src'),
            cultureCountry = $(this).text();
        $('.business_culture span img').attr('src', cultureIcon).attr("alt", cultureCountry);
        $('.business_culture em').text(cultureCountry);
        //$('.business_culture ul').hide();
    });


    /*-------------------------------------FILE_UPLOAD-------------------------------------*/
    $(':file').on('fileselect', function(event, numFiles, label) {
        var input = $(this).parents('.upload_photo').find(':text'),
        log = numFiles > 1 ? numFiles + ' files selected' : label;

        if( input.length ) {
            input.val(log);
            $(this).parents('.upload_photo').addClass('selected');
        } else {
            if( log ) alert(log);
            $(this).parents('.upload_photo').removeClass('selected');
        }
    });
    $(document).on('change', ':file', function() {
        var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });


    /*-------------------------------------DATEPICKER-------------------------------------*/
    $( ".datepicker" ).datepicker({
        changeMonth: true,
		changeYear: true,
        yearRange: "c-10:c+10",
        altField: "",
		altFormat: "dd-mm-yy",
    });


    /*-------------------------------------SLIDER_5_item-------------------------------------*/
    $(".deal5").owlCarousel({
        items: 5,
        autoPlay: false,
        pagination: false,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 3],
            [600, 4],
            [768, 5],
            [1024, 5],
        ]
    });


    /*-------------------------------------THUMB_SLIDER-------------------------------------*/
    $(".thumb_slider").owlCarousel({
        items: 5,
        autoPlay: false,
        pagination: false,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 3],
            [600, 4],
            [768, 5],
            [1024, 5],
        ]
    });
    $('.img_item').each(function () {
        $(this).click(function () {
            $('.img_item').removeClass('selected');
            $(this).addClass('selected');
            
            var largeImg = $(this).data('large');
            $(this).parents('.img_slider').children('.img_large').find('img').attr('src', largeImg);
        });
    });
    
    
    /*-------------------------------------PROGRESSBAR-------------------------------------*/
	$(".skillBarWrap").skill();
    
    
    /*-------------------------------------PRODUCT_GRID_LIST-------------------------------------*/
    $('.display_view li').click(function () {
        $(this).parent().children().removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('list')) {
            $('.product_list').addClass('list_view');
        } else {
            $('.product_list').removeClass('list_view');
        }
    });
    if ($('.display_view li.list').hasClass('active')) {
        $('.product_list').addClass('list_view');
    }


    /*-------------------------------------ISTORE_SLIDER-------------------------------------*/
    $("#istore_banner").owlCarousel({
        items: 1,
        loop: true,
        autoPlay: false,
        pagination: true,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 1],
            [480, 1],
            [600, 1],
            [768, 1],
            [1024, 1],
        ]
    });


    /*-------------------------------------VIDEO_CLIP-------------------------------------*/
    $('.video_clip_wrap .mCustomScrollbar').mCustomScrollbar({
        scrollbarPosition: "outside"
    });


    /*-------------------------------------COLLECTION_BOX-------------------------------------*/
    $('.collection_list').each(function(){
        $(this).children(':nth-child(2)').children().addClass('col_middle');
        $(this).find('.collection_box').hover(function(){
            $(this).parents('.collection_list').find('.collection_box').removeClass('col_middle');
        }, function(){
            $(this).parents('.collection_list').children(':nth-child(2)').children().addClass('col_middle');
        });
    });


    /*-------------------------------------CONTACT_MAP-------------------------------------*/
    /*$('.map iframe').addClass('scrolloff');
    $('.map').on('click', function () {
    	$('.map iframe').removeClass('scrolloff');
    	$('.contact_details').addClass('l');
    });

    $(".map iframe").mouseleave(function () {
    	$('.map iframe').addClass('scrolloff');
    	$('.contact_details').removeClass('l');
    });*/


    /*-------------------------------------RESPONSIVE MENU-------------------------------------*/
    /*$(window).load(function () {
        var ht = $(".nav_menu").html();
        $(".responsive_nav").append(ht);
    });
    $('.responsive_btn').click(function () {
        $('body').addClass('responsive');
    });
    $('.res_overlay_bg').click(function () {
        $('body').removeClass('responsive');
    });
    var $window = $(window),
        $bdy = $('body');

    function resize() {
        if ($window.width() > 767) {
            $bdy.removeClass('responsive');
        }
    }
    $window.resize(resize).trigger('resize');
	
	$(document).on('click','.subarrow',function() {
		$(this).siblings('ul').slideToggle();
		$(this).parent().toggleClass('active');
	});*/

});

$(window).load(function () {
    var $window = $(window);

    function resize() {
        var banHeight = $('.banner_wrap').height(),
            reviewBlockHeight = (banHeight - 20) / 2;
        $('.owner_review .owner_review_block img').height(reviewBlockHeight);
        $('.owner_slider_block img').height(banHeight);
        $('.ex_add_block img').height(reviewBlockHeight);
        $('.store_ban_right').height(banHeight);


        var imgHeight = $('.culture_img').height(),
            sliderNavHeight = $('.culture_img').parents('.owl-carousel').find('.owl-nav .owl-prev, .owl-nav .owl-next').height(),
            sliderNavTop = (imgHeight - sliderNavHeight) / 2;
        $('.culture_img').parents('.owl-carousel').find('.owl-nav .owl-prev, .owl-nav .owl-next').css('top', sliderNavTop);


        var imgHeight1 = $('.b_img').height(),
            sliderNavHeight1 = $('.b_img').parents('.owl-carousel').find('.owl-nav .owl-prev, .owl-nav .owl-next').height(),
            sliderNavTop1 = (imgHeight1 - sliderNavHeight1) / 2;
        $('.b_img').parents('.owl-carousel').find('.owl-nav .owl-prev, .owl-nav .owl-next').css('top', sliderNavTop1);


        var givingBackHeight = $('.giving_back_block').outerHeight(),
            collectionSmallHeight = (givingBackHeight - 20) / 2;
        $('.collection_block.large').height(givingBackHeight);
        $('.collection_block.small').height(collectionSmallHeight);


        var sellonLeftHeight = $('.sellon_left').outerHeight();
        $('.sellon_right').outerHeight(sellonLeftHeight);

        $('.h_full').each(function(){
            var heightFull = $(this).find('img').outerHeight(),
                heightHalf = (heightFull- 20 ) / 2;
            $(this).parents('.height_div').find('.h_half').find('img').outerHeight(heightHalf);
            $(this).parents('.height_div').find('.h_full').find('img').outerHeight(heightFull);
            $(this).parents('.height_div').find('.h_full').find('.quote_ban_right').outerHeight(heightFull);
            $(this).parents('.height_div').find('.seller_capital_block').outerHeight(heightFull);
        });

        $('.home_genre .genre_body').each(function(){
            var gImgHeight = $(this).find('.genre_img_wrap').outerHeight();
            $(this).find('.genre_text_wrap').outerHeight(gImgHeight);
            var gTextHeight = $(this).find('.genre_text').outerHeight();
            $(this).find('.genre_links').outerHeight(gTextHeight - 60);
        });

        $('.video_clip_wrap').each(function(){
            var gImgHeight = $(this).find('.vclip').outerHeight();
            $(this).find('.vclip_text').outerHeight(gImgHeight);
            $(this).find('.vclip_list').outerHeight(gImgHeight);
        });
    }
    $window.resize(resize).trigger('resize');
});