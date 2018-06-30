window.addEventListener("load",function(){

    var main = document.getElementById("demo2Main");
    var speak = document.getElementById("speak");
    var logTitle = document.getElementById("logTitle");
    var footerBtn = document.querySelector(".demo2-footer").children[0];
    var json = {0:["狼人杀人","狼人请睁眼，杀手请选择要杀的对象","点击下方玩家头像，对被杀的玩家进行标记","确定"],
        1:["猎人验人","猎人请睁眼，请选择要验的对象","点击下方玩家头像，对查的玩家进行标记","确定"],
        2:["狙击手狙人","狙击手请睁眼，请选择要狙击的对象","点击下方玩家头像，对被狙杀的玩家进行标记","确定"],
        3:["医生救人","医生请睁眼，请选择要医治的对象","点击下方玩家头像，对被医治的玩家进行标记","确定"],
        6:["投票","发言讨论结束，请大家投票","点击得票数最多的玩家","确定"]};
    var beVote = false;

    // 数据处理
    // 获取角色数据
    var rolesArr = dataManage("rolesStr");
    var roleJSONs = dataManage("roleJSONs");
    var method = dataManage("method");

    // 获取法官数据
    var judgeData = dataManage("judgeData");

    // 提交数据
    footerBtn.addEventListener("click",function(event){
        if(judgeData["checkLog"]){
            judgeData["checkLog"] = false;
            dataManage("judgeData",judgeData);
            return
        }
        if(method[judgeData["curEvent"]]=="vote"&&beVote == false){
            mask("请选择投票数最多的对象");
            event.preventDefault();
            return
        }
        judgeData["curEvent"]++;
        dataManage("roleJSONs",roleJSONs);
        dataManage("judgeData",judgeData);
    });

    // 填充页面内容
    fill();

    // 事件执行
    if(judgeData){
        if(!judgeData["checkLog"]){
            doJob(judgeData["curEvent"]);
        }
    }

    // 事件执行函数
    function doJob(curEvent){
        fillContent(json[curEvent][0],json[curEvent][1],json[curEvent][2],json[curEvent][3]);
        fillMethod(curEvent);
        clickEvent(method[curEvent]);
    }

    // 填充页面内容函数
    function fill(){
        for(var i =0;i<rolesArr.length;i++){
            main.innerHTML += '<div class="demo2-box">\n' +
                '        <div class="demo2-sm-box">\n' +
                '            <div class="ident">'+ roleJSONs[i]["name"]+'</div>\n' +
                '            <div class="num">'+ i +'号</div>\n' +
                '        </div>\n' +
                '        <ul class="icon">\n' +
                '            <li class="kill hidden"><img src="../img/kill.png" alt="xxx"></li>\n' +
                '            <li class="check hidden"><img src="../img/check.png" alt="xxx"></li>\n' +
                '            <li class="target hidden"><img src="../img/target.png" alt="xxx"></li>\n' +
                '            <li class="add hidden"><img src="../img/add.png" alt="xxx"></li>\n' +
                '            <li class="vote hidden"><img src="../img/vote.png" alt="xxx"></li>\n' +
                '        </ul>\n' +
                '    </div>';
            if(roleJSONs[i]["alive"] === false){
                main.querySelectorAll(".ident")[i].style.background = "#888";
            }
        }
    }

    // 给法官日志添加话术
    function fillContent(text1,text2,text3,btnText){
        logTitle.innerText = text1;
        speak.innerHTML = "<p>"+ text2 +"</p>\n" +
            "        <i class=\"play\"></i>\n" +
            "        <i class=\"demo2-sj\"></i>\n" +
            "        <p>"+ text3 +"</p>";
        footerBtn.innerText = btnText;
    }

    // 提供角色方法
    function fillMethod(index){
        var ele = main.getElementsByClassName(method[index]);
        for(var i = 0 ;i<ele.length;i++){
            ele[i].className = method[index];
        }
    }

    // 给角色注册点击事件
    function clickEvent(skill){
        var roles = main.children
        for(var i=0;i<roles.length;i++){
            roles[i].index = i;
            roles[i].addEventListener("click",function(){
                beVote = false;
                for(var j=0;j<roleJSONs.length;j++){
                    roleJSONs[j][skill] = false ;
                }
                if(roleJSONs[this.index]["alive"] === false){
                    mask("该角色已死亡")
                }
                else if(roleJSONs[this.index]["skill"] === skill){
                    mask("该技能不能对自己释放");
                }
                else{
                    if(skill == "vote"){
                        beVote = true;
                    }
                    roleJSONs[this.index][skill] = true ;
                }
            });
        }
    }
});