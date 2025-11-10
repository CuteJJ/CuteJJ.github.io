$(document).ready(function() {

    // ============================================
    // THEME TOGGLE
    // ============================================
    
    const themeToggle = $('#themeToggle');
    const themeIcon = $('#themeToggle i');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme on page load
    if (currentTheme === 'dark') {
        $('body').attr('data-theme', 'dark');
        themeIcon.removeClass('fa-moon').addClass('fa-sun');
    } else {
        themeIcon.removeClass('fa-sun').addClass('fa-moon');
    }

    // Toggle theme on button click
    themeToggle.on('click', function() {
        const currentTheme = $('body').attr('data-theme');
        
        if (currentTheme === 'dark') {
            $('body').removeAttr('data-theme');
            themeIcon.removeClass('fa-sun').addClass('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            $('body').attr('data-theme', 'dark');
            themeIcon.removeClass('fa-moon').addClass('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    
    $('.nav-link').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const targetId = $(this).attr('href');
    const target = $(targetId);
    
    if (target.length) {
        console.log('Scrolling to:', targetId, target.offset());
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 80
        }, 800, 'swing', function() {
            console.log('Scroll completed to:', targetId);
        });
    }
    
    return false;
});


    // ============================================
    // FADE-IN ON SCROLL ANIMATION
    // ============================================
    
    function checkVisibility() {
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    // Check sections, project cards, AND section titles
    $('section, .project-card, .section-title, .skill-tag, .achievement-card').each(function() {
        const $element = $(this);
        
        // Skip if already visible
        if ($element.hasClass('visible')) {
            return;
        }
        
        const elementTop = $element.offset().top;
        const elementBottom = elementTop + $element.outerHeight();
        const elementMiddle = elementTop + ($element.outerHeight() / 3);

        // Check if element is in viewport (trigger earlier)
        if (elementMiddle < viewportBottom && elementBottom > viewportTop) {
            if ($element.hasClass('skill-tag')) {
                const delay = $element.index() * 50;
                setTimeout(() => $element.addClass('visible'), delay);
            } else {
                $element.addClass('visible');
            }
        }
    });
}

    // Initial check
    setTimeout(checkVisibility, 100);

    // Check on scroll with throttle
    let scrollTimeout;
    $(window).on('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(checkVisibility, 10);
    });

    // Check on resize
    $(window).on('resize', checkVisibility);

    // ============================================
    // ACTIVE NAVIGATION LINK HIGHLIGHTING
    // ============================================
    
    function updateActiveNav() {
        const scrollPos = $(window).scrollTop() + 150;

        $('.nav-link').each(function() {
            const currLink = $(this);
            const href = currLink.attr('href');
            
            if (href && href.startsWith('#')) {
                const refElement = $(href);
                
                if (refElement.length) {
                    const elementTop = refElement.offset().top;
                    const elementBottom = elementTop + refElement.outerHeight();
                    
                    if (elementTop <= scrollPos && elementBottom > scrollPos) {
                        $('.nav-link').removeClass('active');
                        currLink.addClass('active');
                    }
                }
            }
        });
    }

    let navTimeout;
    $(window).on('scroll', function() {
        if (navTimeout) {
            clearTimeout(navTimeout);
        }
        navTimeout = setTimeout(updateActiveNav, 50);
    });

    // ============================================
    // FORM SUBMISSION WITH FORMSPREE
    // ============================================
    
    $('#contactForm').on('submit', function(e) {
        const form = $(this);
        const submitBtn = $('.btn-submit');
        const successMsg = $('#formSuccess');
        
        // Get form values
        const name = $('input[name="name"]').val().trim();
        const email = $('input[name="email"]').val().trim();
        const message = $('textarea[name="message"]').val().trim();

        // Basic validation
        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill in all fields before submitting.');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return false;
        }

        // Disable button during submission
        submitBtn.prop('disabled', true).text('Sending...');

        e.preventDefault();
        
        $.ajax({
            url: form.attr('action'),
            method: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function() {
                form.hide();
                successMsg.addClass('show');
                
                // Reset form after 3 seconds
                setTimeout(function() {
                    form[0].reset();
                    form.show();
                    successMsg.removeClass('show');
                    submitBtn.prop('disabled', false).text('Send Message');
                }, 3000);
            },
            error: function() {
                form.hide();
                successMsg.addClass('show');
                
                setTimeout(function() {
                    form[0].reset();
                    form.show();
                    successMsg.removeClass('show');
                    submitBtn.prop('disabled', false).text('Send Message');
                }, 3000);
            }
        });
    });

    // ============================================
    // PROJECT CARD INTERACTIONS
    // ============================================
    
    $('.project-card').each(function() {
        const card = $(this);
        
        card.on('mouseenter', function() {
            $(this).css({
                'transform': 'translateY(-10px)',
                'transition': 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
        });
        
        card.on('mouseleave', function() {
            $(this).css({
                'transform': 'translateY(0)',
                'transition': 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
        });
    });

    // ============================================
    // HEADER SHADOW ON SCROLL
    // ============================================
    
    let headerTimeout;
    $(window).on('scroll', function() {
        if (headerTimeout) {
            clearTimeout(headerTimeout);
        }
        
        headerTimeout = setTimeout(function() {
            if ($(window).scrollTop() > 50) {
                $('header').css('box-shadow', '0 4px 30px var(--shadow)');
            } else {
                $('header').css('box-shadow', '0 2px 20px var(--shadow)');
            }
        }, 10);
    });

    // ============================================
    // RIPPLE EFFECT ON BUTTONS
    // ============================================
    
    $('.btn').on('click', function(e) {
        const button = $(this);
        const ripple = $('<span class="ripple"></span>');
        
        button.append(ripple);
        
        const x = e.pageX - button.offset().left;
        const y = e.pageY - button.offset().top;
        
        ripple.css({
            left: x + 'px',
            top: y + 'px'
        });
        
        setTimeout(() => ripple.remove(), 600);
    });

    // ============================================
    // SMOOTH IMAGE LOAD
    // ============================================
    
    $('img').each(function() {
        $(this).css('opacity', '0');
        
        $(this).on('load', function() {
            $(this).css({
                'opacity': '1',
                'transition': 'opacity 0.6s ease'
            });
        });
        
        // Trigger for cached images
        if (this.complete) {
            $(this).trigger('load');
        }
    });

});