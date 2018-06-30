window.addEventListener("load",function(){
    // 获取DOM
    var goback = document.querySelector("#goback");
    var end = document.querySelectorAll(".btn")[0];
    var judgeLog = document.querySelectorAll(".btn")[1];
    var main = document.querySelector(".script-section");
    var days = [];
    var events = [];
    var order = null;
    var reborn = "";

    //数据处理
    // 获取角色数据
    var roleJSONs = dataManage("roleJSONs");
    var judgeData = dataManage("judgeData");
    var method = dataManage("method");
    var curDay = judgeData["curDay"];

    if(curDay == 1){
        mainScript();
    }
    else{
        // 开启下一天
        nextDay();
    }

    // 主要执行函数
    function mainScript() {
        days = document.querySelectorAll(".day");
        events = document.querySelectorAll(".event");
        days[curDay - 1].innerText = "第" + curDay + "天";
        //获取当前事件
        order = judgeData["curEvent"] == 0 ? 0 : judgeData["curEvent"] - 1;
        // 记录第一天的原始内容
        if (order == 0&&curDay ==1) {
            var iniContent = main.innerHTML;
            dataManage("iniContent", iniContent);
        }
        // 添加事件记录,之后同步 order 与 curEvent
        printLog();
        // 给第一天注册事件流程
        log(order);
        // 给天数注册点击事件
        dayEvent();
        // 判断是否走完全部流程
        if (order == method.length) {
            // 确认本局死亡对象
            isDead();
            // 记录当前台本内容
            var curContent = main.innerHTML;
            dataManage("curContent", curContent);
            // 更新天数，和事件流程
            curDay = ++judgeData["curDay"];
            order = judgeData["curEvent"] = 0;
            dataManage("judgeData",judgeData);
            //清空活着的人身上的标记
            clearTip();
            // 开启下一天
            nextDay();
        }
    }

    //打印事件日志
    function printLog() {
        if(order<judgeData["curEvent"]){
            for(var i = 0;i<=order;i++){
                recode(i);
            }
            order = judgeData["curEvent"];
            if(order == 4){
                // 判断是否有角色死亡，用reborn标记，传递给执行事件case4
                reborn = isDead();
            }
        }
    }

    //注册流程事件
    function log(order){
        var eventList = days[curDay-1].nextElementSibling.querySelectorAll("[class*=Time] > li");
        for(var i = 0;i<eventList.length;i++){
            eventList[i].index = i;
            eventList[i].addEventListener("click",function(){
                if(this.index!= order){
                    mask("请按顺序执行");
                }
                else{
                    // 执行事件
                    play(order);
                }
            });
            dark();
        }
        // 游戏事件
        function play(index){
            switch(index){
                case 0:case 1:case 2:case 3:(function(){
                    var flag = isAllDead(index,"curAlive");
                    if(flag){
                        window.location.href = "demo2.html";
                        return
                    }
                    judgeData["curEvent"] = ++order;
                    dataManage("judgeData",judgeData);
                    dark();
                    mask("该角色已经全部死亡","judgeScript.html");
                })();
                    break;
                case 4:(function(){
                    if(reborn === "none"){
                        mask("没有人死亡，平安夜");
                    }
                    else{
                        mask("请亡灵发表评论");
                    }
                    judgeData["curEvent"] = ++order;
                    dark();
                })();
                    break;
                case 5:(function(){
                    mask("玩家按顺序发言");
                    judgeData["curEvent"] = ++order;
                    dark();
                })();
                    break;
                case 6:(function(){
                    judgeData["curEvent"] = order;
                    dataManage("judgeData",judgeData);
                    window.location.href = "demo2.html";
                    dark();
                })();
                    break;
            }
        }
        // 事件变暗
        function dark(){
            for(var i=0;i<order;i++){
                eventList[i].style.background = "#888";
            }
        }
    }

    // 给天数注册点击事件
    function dayEvent(){
            for(var i =0 ;i<days.length;i++){
                days[i].index = i;
                days[i].addEventListener("click",function(){
                    if(events[this.index].style.display == "none"){
                        events[this.index].style.display = "block";
                    }
                    else{
                        events[this.index].style.display = "none";
                    }
                });
            }
    }

    //显示事件记录
    function recode(times){
        var nightSummary = events[judgeData["curDay"]-1].querySelectorAll(".summary")[0];
        var daySummary = events[judgeData["curDay"]-1].querySelectorAll(".summary")[1];
        var oLi = document.createElement("li");
        switch (times) {
            case 0:fiilText("狼人","杀死了");break;
            case 1:fiilText("猎人","检查了");break;
            case 2:fiilText("狙击手","狙死了");break;
            case 3:fiilText("女巫","复活了");break;
            case 6:fiilText("全民","投票");break;
        }
        function fiilText(iden,skill){
            if(times==6||isAllDead(times,"curAlive")) {
                if (preRecode(method[times]) == "none") {
                    oLi.innerText = iden + "没有执行任何操作";
                }
                else {
                    oLi.innerText = preRecode(method[times], 'order') + "号被" + iden + skill + ",身份是" + preRecode(method[times], 'name');
                }
            }
            else{
                oLi.innerText = iden + "全部死亡";
            }
            if (times == 6) {
                daySummary.appendChild(oLi);
            }
            else {
                nightSummary.appendChild(oLi);
            }
        }
        function preRecode(method,val){
            for(var k in roleJSONs){
                if(roleJSONs[k]["curAlive"] == true){
                    if(roleJSONs[k][method] == true){
                        return roleJSONs[k][val]
                    }
                }
            }
            return "none"
        }
    }

    // 打印下一天并赋予功能
    function nextDay(){
        var iniContent = dataManage("iniContent");
        var curContent = dataManage("curContent");
        main.innerHTML = curContent;
        // 打印新的内容
        main.innerHTML += iniContent;
        //赋予功能
        mainScript();
        // 关闭前一天
        for (var i = 0; i < days.length-1; i++) {
            events[i].style.display = "none";
        }
    }

    //清空活着的人身上的标记
    function clearTip(){
        for(var k =0;k<roleJSONs.length;k++){
            if(roleJSONs[k]["alive"]){
                roleJSONs[k]["kill"] = false;
                roleJSONs[k]["check"] = false;
                roleJSONs[k]["target"] = false;
                roleJSONs[k]["add"] = false;
            }
            else{
                roleJSONs[k]["curAlive"] = false;
            }
        }
        dataManage("roleJSONs",roleJSONs);
    }

    // 结束游戏
    end.addEventListener("click",function(){
        close.click();
    })

    // 判定死亡
    function isDead(){
        var flag = true;
        for(var k =0;k<roleJSONs.length;k++){
            if(roleJSONs[k]["curAlive"]){
                if(roleJSONs[k]["add"]===false&&(roleJSONs[k]["kill"] === true||roleJSONs[k]["target"]===true)){
                    roleJSONs[k]["alive"] = false;
                    flag = false;
                }
                if(roleJSONs[k]["vote"] === true){
                    roleJSONs[k]["alive"] = false;
                    flag = false;
                }
            }
        }
        dataManage("roleJSONs",roleJSONs);
        if(flag){return "none"}
        isEnd();
    }

    function isAllDead(index,str){
        var flag = false;
        if(index == 6)return
        for(var i=0;i<roleJSONs.length;i++){
                if(roleJSONs[i]["skill"] == method[index]&&roleJSONs[i][str] == true){
                    flag = true;
                    break;
            }
        }
        return flag
    }

    // 打开法官日志
    judgeLog.onclick = goback.onclick = function(){
        judgeData["checkLog"] = true;
        dataManage("judgeData",judgeData);
        window.location.href = "demo2.html";
    };

    // 游戏结束条件
    function isEnd() {
        if(!isAllDead(0,"alive")){
            dataManage("curContent",main.innerHTML);
            dataManage("result","村民胜利");
            window.location.href = "demo3.html"
        }
        else if(!isAllDead(4,"alive")){
            dataManage("curContent",main.innerHTML);
            dataManage("result","狼人胜利");
            window.location.href = "demo3.html"
        }
    }
});