$(function(){
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });
    var $searchBar = $('#searchBar'),
        $searchResult = $('#searchResult'),
        $searchText = $('#searchText'),
        $searchInput = $('#searchInput'),
        $searchClear = $('#searchClear'),
        $searchCancel = $('#searchCancel');

    function hideSearchResult(){
        $searchResult.hide();
        $searchInput.val('');
    }
    function cancelSearch(){
        hideSearchResult();
        $searchBar.removeClass('weui-search-bar_focusing');
        $searchText.show();
    }

    $searchText.on('click', function(){
        $searchBar.addClass('weui-search-bar_focusing');
        $searchInput.focus();
    });
    $searchInput
        .on('blur', function () {
            if(!this.value.length) cancelSearch();
        })
        .on('input', function(){
            if(this.value.length) {
                $searchResult.show();
            } else {
                $searchResult.hide();
            }
        })
    ;
    $searchClear.on('click', function(){
        hideSearchResult();
        $searchInput.focus();
    });
    $searchCancel.on('click', function(){
        cancelSearch();
        $searchInput.blur();
    });

//文字滚动
    function scrollTxt(){
        var controls={},
            values={},
            t1=500, /*播放动画的时间*/
            t2=2000, /*播放时间间隔*/
            si;
        controls.rollWrap=$("#demo1");
        controls.rollWrapUl=controls.rollWrap.children();
        controls.rollWrapLIs=controls.rollWrapUl.children();
        values.liNums=controls.rollWrapLIs.length;
        values.liHeight=controls.rollWrapLIs.eq(0).height();
        values.ulHeight=controls.rollWrap.height();
        this.init=function(){
            autoPlay();
            pausePlay();
        }
        /*滚动*/
        function play(){
            controls.rollWrapUl.animate({"margin-top" : "-"+values.liHeight}, t1, function(){
                $(this).css("margin-top" , "0").children().eq(0).appendTo($(this));
            });
        }
        /*自动滚动*/
        function autoPlay(){
            /*如果所有li标签的高度和大于.roll-wrap的高度则滚动*/
            if(values.liHeight*values.liNums > values.ulHeight){
                si=setInterval(function(){
                    play();
                },t2);
            }
        }
        /*鼠标经过ul时暂停滚动*/
        function pausePlay(){
            controls.rollWrapUl.on({
                "mouseenter":function(){
                    clearInterval(si);
                },
                "mouseleave":function(){
                    autoPlay();
                }
            });
        }
    }
    new scrollTxt().init();



    function geoFindMe() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var point = new BMap.Point(lon, lat);  // 创建坐标点
            // 根据坐标得到地址描述
            var myGeo = new BMap.Geocoder();
            myGeo.getLocation(point, function (result) {
                console.log(result)
                var city = result.addressComponents.city;
                $('.baidu_geo').html(city);
            });


           var location=$('.location');
            location.on('click',function(){
                if(navigator.geolocation)
                {
                    navigator.geolocation.getCurrentPosition(function (p) {
                            var latitude = p.coords.latitude//纬度
                            var longitude = p.coords.longitude;
                            createmap(latitude, longitude);

                        }, function (e) {//错误信息
                            var aa = e.code + "\n" + e.message;
                            alert(aa);
                        }
                    );
                }
                function createmap(a,b)
                {
                    var map = new BMap.Map("location");
                    var point = new BMap.Point(b, a);
                    map.centerAndZoom(point, 20);//设置地图的中心点和坐标
                    Window.map = map;//将map变量存储在全局
                    console.log(Window.map )
                    //$('.container').html(Window.map).css({"width":"100%","height":"100%"});
                }

            })

        });
    }

    geoFindMe();





})