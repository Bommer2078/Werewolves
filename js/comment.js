    // 模态框组件
    var close = document.getElementById("close");
    if(close){
        close.addEventListener("click",function(){
            mask("结束本轮游戏？","../index.html");
        });
    }
    function mask(str,url){
        var vMask = document.getElementById("flopMask");
        vMask.children[0].children[0].innerText = str;
        vMask.className = "mask show";
        vMask.children[0].children[2].onclick = function(){
            if(url){
                window.location.href = url;
            }
            else{
                vMask.className = "mask hidden";
            }
        };
        vMask.children[0].children[1].onclick = function(){
            vMask.className = "mask hidden";
        };
    }

    // 数据处理
    function dataManage(dataName,json){
        if(json){
            // 设置数据
            window.localStorage.setItem(dataName,JSON.stringify(json));
        }
        else{
            // 获取数据
            return JSON.parse(window.localStorage.getItem(dataName));
        }
    }
