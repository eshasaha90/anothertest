$(function () {



    //banner-slider
    "use strict";
    $('#cultra_banner').owlCarousel({
        items: 1,
        loop: true,
        autoPlay: false,
        pagination: true,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });

    $('#catagory_slider').owlCarousel({
        items: 10,
        loop: false,
        pagination: false,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 3],
            [480, 3],
            [600, 5],
            [768, 5],
            [1024, 10],
        ]
    });
    
    $('#topic-sliders').owlCarousel({
        items: 3,
        loop: true,
        autoPlay: false,
        pagination: true,
        navigation: false,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });


    $('.local_culture_slider').owlCarousel({
        //items: 4,
        loop: false,
        autoPlay: true,
        pagination: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsCustom: [
            [0, 1],
            [320, 3],
            [480, 3],
            [600, 5],
            [768, 5],
            [1024, 4]
        ]

    });

    $('#whyus-slider').owlCarousel({
        items: 4,
        loop: false,
        autoPlay: true,
        pagination: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]

    });


    $('#testimonial_sliders').owlCarousel({
        items: 1,
        pagination: false,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });




    function carouselsLocal() {
        var carousel = $('.local_culture_slider'),
            options = {
                navigation: true
            };



        carousel.each(function () {
            var $this = $(this);
            $this.addClass('bottom-navigation');

            if ($this.data('options')) {
                options = $this.data('options');
            }
            $this.owlCarousel(options).addClass('loaded');

            $(window).on('resize', function () {
                //delay(function () {
                bottomNavigation();
                //}, 200);
            });
            $('.cultuertab-ul ul.ul li').bind('click', function () {
                bottomNavigation();
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
        carouselsLocal();
    });

    $("#culture_slider_indy").owlCarousel({
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
            [1024, 5],
        ]
    });

});
