window.addEventListener("load",function() {
    var curContent = dataManage("curContent");
    var rolesArr = dataManage("rolesArr");
    var result = document.getElementById("result");
    var oLi = document.getElementsByClassName("demo3-info")[0].getElementsByTagName("li");
    var section = document.getElementsByClassName("demo3-section")[0];
    var dataRoom = document.getElementById("data");
    var arr = [];
    console.log(curContent)

    // 添加结果
    result.innerText = dataManage("result");

    // 添加人数
    for (var k in rolesArr) {
        arr.push(rolesArr[k])
    }
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].children[0].innerText = arr[i];
    }

    // 添加信息
    data.innerHTML = curContent;
    var day = document.getElementsByClassName("day");
    var event = document.getElementsByClassName("event");
    for(var i=0;i<day.length;i++){
        var nightTime = event[i].querySelectorAll(".summary")[0];
        var dayTime  = event[i].querySelectorAll(".summary")[1];
        section.innerHTML += '<div class="demo3-box">\n' +
            '        <p class="demo3-time"><span class="demo3-day">第'+ (i+1) +'天</span><span class="demo3-hour">0小时07分</span></p>\n' +
            '        <div><span>晚上：</span></div>\n' +
            '        <div><span>白天：</span></div>\n' +
            '    </div>';
        section.children[i].querySelectorAll("div")[0].appendChild(nightTime);
        section.children[i].querySelectorAll("div")[1].appendChild(dayTime)
    }
    var arr2 = section.querySelectorAll(".summary")
    arr2[arr2.length-1].innerHTML += "<li>"+  dataManage("result") +"</li>"
});


