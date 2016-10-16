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
            } }
    };

    var items = document.querySelector("#items");

    var btn_leftInsert = document.querySelector("#leftInsert");
    var btn_rightInsert = document.querySelector("#rightInsert");

    var btn_leftOut = document.querySelector("#leftOut");
    var btn_rightOut = document.querySelector("#rightOut");

     EventUtil.addHandler(btn_leftInsert, "click", leftInsert);
     EventUtil.addHandler(btn_rightInsert, "click", rightInsert);
     EventUtil.addHandler(btn_leftOut, "click", leftOut);
     EventUtil.addHandler(btn_rightOut, "click", rightOut);

    // 事件代理
    items.addEventListener("click", function (e) {
       if(e.target && e.target.nodeName.toLowerCase() == "span") {
           items.removeChild(e.target);
       }
    });


    function getData() {
        var text = document.querySelector("#textIpt").value;
        if(text < 10 || text > 100) {
            alert("你输入的不符合要求");
            return false;
        }
        return text;
    }

    function leftInsert() {
        var data;
        if(!(data = getData())) {
            return false;
        }
        var firstEle = items.querySelectorAll("span")[0];
        var el = document.createElement('span');
        var node = document.createTextNode(data);
        if(items.querySelectorAll("span").length < 60) {
            el.appendChild(node);
            items.insertBefore(el, firstEle);
        } else {
            alert("已满");
        }

    }

    function rightInsert() {
        var data;
        if(!(data = getData())) {
            return false;
        }
        var el = document.createElement('span');
        var node = document.createTextNode(data);
        if(items.querySelectorAll("span").length < 60) {
            el.appendChild(node);
            items.appendChild(el);
        } else {
            alert("已满");
        }
    }

    function leftOut() {
        if(items.lastElementChild != null) {
            var txt = items.firstElementChild.innerHTML;
            items.removeChild(items.firstElementChild);
            alert(txt);
        } else {
            alert("没有元素了");
        }

    }

    function rightOut() {
        if(items.lastElementChild != null) {
            var txt = items.lastElementChild.innerHTML;
            items.removeChild(items.lastElementChild);
            alert(txt);
        } else {
            alert("没有元素了");
        }
    }


})();