(function () {
    // 跨浏览器事件处理
    var EventUtil = {
        addHandler: function(element, type, handler){
            if (element.addEventListener){
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent){
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        removeHandler: function(element, type, handler){
            if (element.removeEventListener){
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent){
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        }
    };

    var items = document.querySelector("#items");
    var btnAdd = document.querySelector("#btnAdd");
    var queryBtn = document.querySelector("#queryBtn");

    // 事件代理
    EventUtil.addHandler(items, "click", function (e) {
        if(e.target && e.target.nodeName.toLowerCase() == "span") {
            items.removeChild(e.target);
        }
    });
    EventUtil.addHandler(btnAdd, "click", function () {
        addTags();
    });
    EventUtil.addHandler(queryBtn, "click", function () {
       var queryTxt = document.querySelector("#queryTxt").value.trim();
       queryValue(queryTxt);
    });

    var temp = "";
    EventUtil.addHandler(items, "mouseover", function (e) {
        if(e.target && e.target.nodeName.toLowerCase() == "span") {
            temp =  e.target.innerHTML;
            e.target.innerHTML = "点击删除" + temp;
        }
    });
    EventUtil.addHandler(items, "mouseout", function (e) {
        if(e.target && e.target.nodeName.toLowerCase() == "span") {
            e.target.innerHTML = temp;
        }
    });


    // 按 回车 后添加标签（适用于input元素）
    /*document.body.onkeydown = function (event) {
        alert(event.keyCode);
    };*/
    document.body.onkeydown = function (event) {
        // 防止textarea内回车 就添加元素
        if(event.target.nodeName.toLocaleLowerCase() == "body" && event.keyCode == 13) {
            addTags();
        }
    };

    function getData() {
        //var text = document.querySelector("#textIpt").value;
        var text = document.querySelector("#textContent").value;
        console.log(text);
        return text;
    }

    function addTags() {
        var str = getData();
        var tags = str.split(/、|:|,|，|\s|\u3000/); // 分割字符串
        console.log(tags);
        if(tags.length > 0 ) {
            addData(tags);
        }

    }

    function addData(data) {
        for(var index = 0, len = data.length; index < len; index++) {
            if(data[index] != "") {
                var el = document.createElement('span');
                var node = document.createTextNode(data[index]);
                el.appendChild(node);
                items.appendChild(el);
            }
        }
    }

    function queryValue(data) {
        var spans = items.querySelectorAll("span");
        console.log(spans);
        for(var i= 0, len=spans.length;i<len ;i++) {
            var cur_txt = spans[i].innerHTML;
            var re_text = cur_txt.replace(new RegExp(data, "g"), "<i class='red'>"+data+"</i>");
            spans[i].innerHTML = re_text;
            console.log(re_text);
        }
    }

})();