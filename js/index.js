//初始化事件加载
window.onload = function () {
    if(localStorage.moyu_data){
        evenData = JSON.parse(localStorage.moyu_data)
    }
    $('#xiaoMei').on('click',function(){
        $(location).attr('href', './lib/xiaoMei.html');
    })
    $('#openSet').on('click', function () {
        $('.setting').show()
    })
    $('#closeSet').on('click', function () {
        $('.setting').hide()
        SetEvent()
        Eventload()
    })
    $('.setting').hide()
    Eventload()
    //搜索设置
    $('#searchBtn').click(function () {
        console.log(1);
        window.location.replace("https://www.baidu.com/s?wd=" + $('#searchBox').val());
    })
    //页面左上角接下来事件
    timer = onloadEventSet()
    $('.event li').eq(timer).addClass('action')
    $('#nextEvent').text('接下来是:' + evenData[timer]['evenName'])
    //鼠标移动事件效果
    $('.event li').on('mouseenter', function () {
        $('.event li').each(function () {
            $(this).removeClass()
        })
        $(this).addClass('action')
    })

}
//获取当前时间
var getTime = function () {
    var nowDate = new Date()
    Hours = nowDate.getHours()
    Minutes = nowDate.getMinutes()
    Seconds = nowDate.getSeconds()
    Hours >= 10 ? Hours : Hours = '0' + Hours
    Minutes >= 10 ? Minutes : Minutes = '0' + Minutes
    Seconds >= 10 ? Seconds : Seconds = '0' + Seconds
    return Hours + ':' + Minutes + ':' + Seconds
}
//搜索栏

//页面时间加载
var time = setInterval(function () {
    $('#setTime').html('<p>现在是：</p>' + getTime())
}, 1000)
//事件参数
var evenData = [
    {
        hour: '08',
        min: '00',
        evenName: '上班',
        evenText: '今日开工大吉，保护好自己，出门戴口罩，回家勤洗，新的一年，愿大家都能健康平安!'
    },
    {
        hour: '10',
        min: '00',
        evenName: '休息',
        evenText: '一个人无论做什么，如果累了可以适当休息，休息好了千万别忘记继续前进!努力过程中千万别忘记给自己放松以及开心的理由!'
    },
    {
        hour: '12',
        min: '00',
        evenName: '吃饭',
        evenText: '人世间，唯有美食与爱不可辜负，爱已辜负太多了，美食就不要辜负了'
    },
    {
        hour: '15',
        min: '00',
        evenName: '休息',
        evenText: '今天一天都丧丧的，不想运动的，逼着自己动一动出出汗兴许能好一点运动完了还是不行，算了，累了，明天安排一天休息日吧。身心都放松放松'
    },
    {
        hour: '17',
        min: '45',
        evenName: '下班',
        evenText: '多一点欢笑来解除生活的烦恼；多一点宽容来谅解自己的不足；多一点乐观来面对做人的难处；多一点快乐来淡化人生的痛苦；多一点开心来洗去工作的疲劳！'
    }]

//事件/设置加载函数
var Eventload = function () {
    $('.event li').each(function (index, ele) {
        $(ele).children().children('.name').html(evenData[index]['evenName'])
        $(ele).children().children('.time').html(evenData[index]['hour'] + ':' + evenData[index]['min'])
        $(ele).children('.text').html(evenData[index]['evenText'])
    })
    var rows = []
    for (k in evenData) {
        var str = '<li>时间：<input type="time" class="eventTime">名称：<input type="text" class="eventName"><button class="delevent">删除</button></li>'
        rows.push(str)
    }
    $('.setting ul').empty().append(rows.join(''))
    $('.event li').each(function (index, ele) {
        $(ele).children().children('.name').html(evenData[index]['evenName'])
        $(ele).children().children('.time').html(evenData[index]['hour'] + ':' + evenData[index]['min'])
        $(ele).children('.text').html(evenData[index]['evenText'])
    })
    $('.setting ul li').each(function (index, ele) {
        $(ele).children('.eventTime').val(evenData[index]['hour'] + ':' + evenData[index]['min'])
        $(ele).children('.eventName').val(evenData[index]['evenName'])
    })

}
// 判断下个事件
var onloadEventSet = function () {
    getTime()
    if (Hours < 8) {
        return 0
    } else if (Hours < 10) {
        return 1
    } else if (Hours < 12) {
        return 2
    } else if (Hours < 15) {
        return 3
    } else if (Hours < 17 || Minutes < 45) {
        return 4
    } 

}
//设置保存
var SetEvent = function(){
    $('.setting ul li').each(function (index, ele) {
        var time = $(ele).children('.eventTime').val().split(':')
        evenData[index]['hour'] = time[0]
        evenData[index]['min'] = time[1]
        evenData[index]['evenName'] = $(ele).children('.eventName').val()

    })
    if(!window.localStorage) return
    localStorage.setItem('moyu_data',JSON.stringify(evenData))
}







