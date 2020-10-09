$(document).ready(function(){
    $('.slider').slick({
        centerMode:true,
        centerPadding: '0px',
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        prevArrow:"<span class='slider-arrow prev'><img src='images/arrow.png'></span>",
        nextArrow:"<span class='slider-arrow next'><img src='images/arrow.png'></span>"
    }); 

    $('.brands-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        centerPadding: '10px',
        dots: false,
        cssEase: 'linear',
        arrows:false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1119,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 543,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    }); 
  }); 