$(document).ready(function() {
    
    // --- INICIALIZAÇÃO DE BIBLIOTECAS ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    // --- VARIÁVEIS GLOBAIS ---
    const header = $('.header');
    const navbar = $('.header .navbar');
    const menuBtn = $('#menu-btn');
    const scrollTopBtn = $('#scroll-top');
    let countersAnimated = false;

    // --- FUNÇÕES ---
    function animateCounters() {
        if ($('.numeros-grid').length > 0 && !countersAnimated) {
            const sectionTop = $('.numeros-grid').offset().top;
            const windowHeight = $(window).height();
            const windowScrollTop = $(window).scrollTop();
            
            if (sectionTop < (windowScrollTop + windowHeight - 100)) {
                $('.counter').each(function() {
                    const el = $(this);
                    const target = +el.attr('data-target');
                    $({ Counter: 0 }).animate({ Counter: target }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function(now) {
                            el.text(Math.ceil(now).toLocaleString('pt-BR'));
                        }
                    });
                });
                countersAnimated = true;
            }
        }
    }

    // --- EVENTOS ---
    menuBtn.on('click', function() {
        menuBtn.toggleClass('fa-times');
        navbar.toggleClass('active');
    });

    $(window).on('scroll', function() {
        menuBtn.removeClass('fa-times');
        navbar.removeClass('active');

        header.toggleClass('sticky', $(window).scrollTop() > 10);
        scrollTopBtn.toggleClass('active', $(window).scrollTop() > 300);

        if ($('body').hasClass('home-page')) {
            let currentSection = 'inicio';
            $('section').each(function() {
                const sectionTop = $(this).offset().top - 150;
                if ($(window).scrollTop() >= sectionTop) {
                    currentSection = $(this).attr('id');
                }
            });
            $('.nav-link').removeClass('active');
            $('.navbar a[href="index.html#' + currentSection + '"]').addClass('active');
        }
        
        animateCounters();
    });

    // --- INICIALIZAÇÃO DOS CARROSSÉIS ---
    if ($('.segmentos-slider').length) {
        new Swiper('.segmentos-slider', {
            loop: true,
            grabCursor: true,
            centeredSlides: true,
            spaceBetween: 20,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: {
                0: { slidesPerView: 1.2 },
                768: { slidesPerView: 2.5 },
                1200: { slidesPerView: 3.5 },
            },
        });
    }

    if ($('.clientes-slider').length) {
        new Swiper('.clientes-slider', {
            loop: true,
            grabCursor: true,
            spaceBetween: 30,
            autoplay: { delay: 2500, disableOnInteraction: false },
            breakpoints: {
                0: { slidesPerView: 2 },
                576: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                991: { slidesPerView: 5 },
            },
        });
    }
    
    // Roda a função no carregamento inicial
    animateCounters();
});