$(document).ready(function() {
    setTimeout(function(){$('.home .warp').addClass('active');},80);
    
    $('#fullpage').fullpage({
        //Navigation
        menu: '#menu',
        anchors:['home','wireless','feature','service','practice','contact'],
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['firstSlide', 'secondSlide'],
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        resize : false,
        sectionsColor : ['#161616', '#f5f5f5', 'white', '#222324', '#f5f5f5','#222'],
        fixedElements: '.mainnav',
        responsive: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        afterRender: function(){},
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction){},
        
        afterLoad: function(anchorLink, index){
            var loadedSection = $(this);

            if(index == 2){
              //$('.wireless .battery').addClass('active');
              showOff();
            }
            if(index == 3){
              //$('.feature div div').addClass('active');
            }
        },
        onLeave: function(index, nextIndex, direction){
            var leavingSection = $(this);
            if(index == 2){
              clearInterval(charging);
            }
        },
    });
    $('.learn-more').click(function(){
      $.fn.fullpage.moveSectionDown();
    })
});

var charge = 8, charging;
function batUpdate(){
  //console.log("Charge: ",charge);
  if(charge<20){
    // Red - Danger!
    col = ["#750900","#c6462b", "#b74424", "#df0a00", "#590700"];
  }else if(charge<40){
    // Yellow - Might wanna charge soon...
    col = ["#754f00","#f2bb00", "#dbb300", "#df8f00", "#593c00"];
  }else{
    // Green - All good!
    col = ["#316d08","#60b939", "#51aa31", "#64ce11", "#255405"];
  }
  $("#battery").css("background-image","linear-gradient(to right, transparent 5%, "+col[0]+" 5%, "+col[0]+" 7%, "+col[1]+" 8%, "+col[1]+" 10%, "+col[2]+" 11%, "+col[2]+" "+ (charge-3) +"%, "+col[3]+" "+ (charge-2) +"%, "+col[3]+" "+ charge +"%, "+col[4]+" "+ charge +"%, black "+ (charge+5) +"%, black 95%, transparent 95%), linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.4) 4%, rgba(255,255,255,0.2) 7%, rgba(255,255,255,0.2) 14%, rgba(255,255,255,0.8) 14%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0) 41%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.4) 86%, rgba(255,255,255,0.6) 90%, rgba(255,255,255,0.1) 92%, rgba(255,255,255,0.1) 95%, rgba(255,255,255,0.5) 98%)");
  $('.battery p').html(Math.floor((charge - 8) / 0.83 ) + "%");
}
function showOff(){
  charging = setInterval(function(){
    if(charge >= 91){
      clearTimeout(charging);
    }else{
      charge++;
      batUpdate();
    }
  },100);
}
