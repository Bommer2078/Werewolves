window.addEventListener("load",function(){
    var btn = document.getElementById("btn");
    var main = document.getElementById("flopMain");
    var order = main.children[0].children[0];
    var iden = main.children[0].children[1];
    var rolesArr = chaos(getAssign());
    var clickTimes = 1;
    var roleJSONs = [];

    // 接收角色分配数值
    function getAssign(){
        var rolesArr = dataManage("rolesArr");
        var roles = [];
        for(var k in rolesArr){
            for(var i = 0;i<rolesArr[k];i++){
                roles.push(k)
            }
        }
        return roles
    }

    // 打乱身份
    function chaos(Arr){
        for(var i = 0;i<Arr.length;i++){
            var num = parseInt(Math.random()*(Arr.length-i))+i;
            var temp = Arr[i];
            Arr[i] = Arr[num];
            Arr[num] = temp
        }
        return Arr
    }

    // 角色分配
    function deal(index){
        switch (rolesArr[index]){
            case "worf":
                setRoles(index,"狼人","kill");
                iden.innerHTML = "<img src='../img/lang.jpg'><span>狼人</span>";
                break;
            case "hunter":
                setRoles(index,"猎人","check");
                iden.innerHTML = "<img src='../img/猎人.jpg'><span>猎人</span>";
                break;
            case "seer":
                setRoles(index,"狙击手","target");
                iden.innerHTML = "<img src='../img/yuyanjia.jpg'><span>预言狙击手</span>";
                break;
            case "witch":
                setRoles(index,"女巫","add");
                iden.innerHTML = "<img src='../img/nvwu.jpg'><span>女巫</span>";
                break;
            case "citizen":
                setRoles(index,"屁民","beKill");
                iden.innerHTML = "<img src='../img/cunmin.jpg'><span>村民</span>";
                break;
        }
    }

    // 注册点击事件
    btn.addEventListener("click",function(){
        if(clickTimes==(rolesArr.length*2)+1){
            dataManage("rolesStr",rolesArr);
            dataManage("roleJSONs",roleJSONs);
            // 设置法官数据
            judgeData = {"curDay":1,"curEvent":0,"checkLog":true,"roleSkill":""}
            dataManage("judgeData",judgeData);
            window.location.href = "../html/demo2.html"
            return null;
        }
        if(clickTimes%2 == 0){
            if(clickTimes==(rolesArr.length*2)){
                change(false);
                btn.innerHTML = "法官查看";
            }
            else{
                order.innerHTML = parseInt(clickTimes/2)+1;
                btn.innerHTML = "查看" +  (parseInt(clickTimes/2)+1) + "号身份";
                change(false);
            }
        }
        else{
            deal(parseInt(clickTimes/2));
            if(clickTimes==(rolesArr.length*2-1)){
                btn.innerHTML = "隐藏并传递给法官";
            }
            else{
                btn.innerHTML = "隐藏并传递给" + (parseInt(clickTimes/2)+2)+ "号";
            }
            change(true);
        }
        clickTimes++;
    });

    // 更换牌面
    function change(bool){
        var cov = main.children[0].children[2];
        if(bool){
            iden.className = "secretInfo"
            cov.className = "cover hidden";
        }
        else{
            iden.className = "secretInfo hidden"
            cov.className = "cover show";
        }
    }

    // 设置角色数据
    function setRoles(index,name,skill){
            var roleJSON = {"order":index,"name":name,"kill":false,"check":false,"target":false,"add":false,"vote":false,"skill":skill,"alive":true,"curAlive":true};
            roleJSONs.push(roleJSON);

    }



});


