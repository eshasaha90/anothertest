$(function () {

    var $window = $(window),
        $bdy = $('body');

    function resize() {
        var winHeight = $window.height(),
            winHeightHalf = winHeight / 2;
        $('.cs_top, .cs_bottom').outerHeight(winHeightHalf);
        $('.logo img').css('max-height', (winHeightHalf - 30));
    }
    $window.resize(resize).trigger('resize');

});
