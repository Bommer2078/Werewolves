window.addEventListener("load",function(){
    var playN = document.getElementById("playNumber");
    var btn=document.getElementById("roleBtn");
    var roles=document.getElementById("role").getElementsByTagName("num");
    var player = [1,2,3,4,4,5,6,5,6,7,6,7,6,7,8,9];
    var rolesArr = {"worf":1,"hunter":1,"seer":1,"witch":1,"citizen":4};
    var method = ["kill","check","target","add","beKill",,"vote"];
    // 限制用户输入的内容
    playN.addEventListener("input",function(){
        this.value = this.value.replace(/[\D]/g,"");
        // 角色分配响应人数变化
        next(playN.value,function(){
           rolesArr =  assignment(playN.value);
        },function(){
            for(var i =0;i<roles.length;i++){
                roles[i].innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;"
            }
        });
    });

    // 判断输入是否满足条件并进行下一步行动
    function next(val,fnS,fnF){
        if(val>=5 && val<=20){
            fnS();
        }
        else{
            fnF();
        }
    }

    // 匹配角色
    function assignment(val){
        // 村民人数
        var citizen = player[val-5];
        // 预言家与女巫人数唯一
        // 狼人人数
        var worf = parseInt((val - citizen-1)/2);
        // 猎人人数
        var hunter = worf==1?1:worf - 1;
        //传入数组
        var rolesArr = [worf,hunter,1,1,citizen];
        // 输出分配
        for(var i = 0 ;i<rolesArr.length;i++){
            roles[i].innerHTML = rolesArr[i];
        }
        rolesArr = {"worf":worf,"hunter":hunter,"seer":1,"witch":1,"citizen":citizen};
        return rolesArr
    }

    // 按发牌按钮添加事件
    btn.addEventListener("click",function(){
        next(playN.value,function(){
            // 实现数据跨JS文件传输
            dataManage("rolesArr",rolesArr);
            dataManage("method",method);
            window.location.href = "flop.html";
        },function(){
            mask("请输入正确的人数");
        });
    });
})
