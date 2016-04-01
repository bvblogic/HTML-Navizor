window.odometerOptions = {
  format: '(dddddddd)',
  duration: 3000
}
$(document).ready(function(){
  detectOutdatedBrowser();
  mediaCarousel();
  donutChart();
  areaSplineChart();
  showSearch();

  $(window).load(function(){
    $('.stats__section--odometr').html(203962)
  })
});

$(window).scroll(function(){
  animateOdometr($('.stats__section--odometr'), 999999, 203962);
});

function detectOutdatedBrowser(){
  outdatedBrowser({
      bgColor: '#f25648',
      color: '#ffffff',
      lowerThan: 'transform',
      languagePath: ''
  })
}

function mediaCarousel(){
  
  var mediaCarouselOptions = {
    slidesToShow : 5,
    slidesToScroll : 2,
    infinite : true,
    arrows : true,
    dots : true,
    swipe : false,
    prevArrow : '<a class=\"slick-arrow-l\"><i class=\"icon icon_arr_left\"></i></a>',
    nextArrow : '<a class=\"slick-arrow-r\"><i class=\"icon icon_arr_right\"></i></a>',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          swipe : true,
          slidesToShow : 4,
          slidesToScroll : 2
        }
      },
      {
        breakpoint: 991,
        settings: {
          swipe : true,
          slidesToShow : 3,
          slidesToScroll : 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          swipe : true,
          slidesToShow : 1,
          slidesToScroll : 1
        }
      },
    ]
  }

  if( $('#js__media__carousel')[0] ){
    $('#js__media__carousel').slick( mediaCarouselOptions );
  }
}

function donutChart(){
  var donutData = [
    {
      name: 'Ідеальна',
      y: 25,
      color: '#13A833',
      totalRates: '121 176',
      totalKm: '58 701'
    },
    {
      name: 'Хороша',
      y: 19,
      color: '#95D737',
      totalRates: '69 807',
      totalKm: '44 191'
    },
    {
      name: 'Терпимо',
      y: 19,
      color: '#E8E24D',
      totalRates: '53 291',
      totalKm: '44 859'
    },
    {
      name: 'Гірше середнього',
      y: 16,
      color: '#F5AE3D',
      totalRates: '38949',
      totalKm: '36 929'
    },
    {
      name: 'Погана',
      y: 21,
      color: '#B23030',
      totalRates: '58 605',
      totalKm: '49 975'
    }
  ];

  if( $('#js_navizor__donut')[0] ){
    $('#js_navizor__donut').highcharts({
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        style: {
          fontFamily: 'Open Sans'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      tooltip: {
        useHTML: true,
        formatter: function() {
          return '<div class=\"__head\">'+ this.point.name +': <b>'+ this.y +' %</b></div>Всього оцінок: '+this.point.totalRates+'<br>Відстань: '+this.point.totalKm+'км';
        }
      },
      series: [{
        data: donutData,
        states: {
          hover: {
            brightness: 0,
          }
        },
        animation: false,
        size: '95%',
        innerSize: '65%',
        showInLegend:false,
        dataLabels: {
            enabled: false
        },
      }]
    });
  }
}

function areaSplineChart(){

  if( $('#js_navizor__area')[0] ){
    $('#js_navizor__area').highcharts({
        chart: {
          type: 'areaspline',
          backgroundColor: 'transparent',
          style: {
            fontFamily: 'Open Sans'
          }
        },
        title: {
            text: ''
        },
        xAxis: {
            min: 0.4,
            max: 4.6,
            categories: [
                '01.2015',
                '03.2015',
                '06.2015',
                '09.2015',
                '01.2016',
                '03.2016'
            ]
        },
        yAxis: {
          title: ''
        },
        tooltip: {
            enabled: false,
            shared: true
        },
        credits: {
            enabled: false
        },
        plotOptions: {
          series: {
            marker: {
              fillColor: '#95D737',
              lineWidth: 2,
              lineColor: null,
              symbol: 'circle',
              states: {
                  hover: {
                      enabled: false
                  }
              }
            },
            states: {
              hover: {
                enabled: false
              }
            }
          }
        },
        showInLegend:false,
        series: [{
            name: 'Оцінки доріг',
            data: [22000, 42000, 61500, 62000, 79000, 100000],
            showInLegend:false,
            color: '#13A833',
            fillColor: 'rgba(149,215,55,0.25)'
        }, {
            name: 'Користувачі сервісу Navizor',
            data: [8000, 19000, 36000, 39500, 48000, 50000],
            showInLegend:false,
            color: '#4C4B4D',
            fillColor: 'rgba(76,75,77,0.25)',
            marker: {
              fillColor: '#ffffff'
            }
        }]
    });
  }
}


function isScrolledIntoView(elem){
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function animateOdometr(el, odStart, odEnd){
  if(isScrolledIntoView(el)){
    el.text(odEnd);
  }else{
    el.text(odStart);
  }
}

function showSearch(){
  $('body').on('click', '.header__search > button', function(){
    if( $(window).width() >= 992 ){
      if( !$('.header__search').hasClass('opened') ){
        $('.header__search').addClass('opened');
        $(this).siblings('.form-group').children().focus();
      }
      return false;
    }
  });

  $(document).click(function(e) {
    if (!$(e.target).is('.header__search, .header__search .form-control')) {
      $('.header__search').removeClass('opened');
    }
  });
}