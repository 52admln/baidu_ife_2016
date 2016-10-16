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
    var btn_sortData = document.querySelector("#sortData");

    var itemArr = [10, 90, 70, 40, 20, 100, 80, 50, 44]; // 存放数字集合

    EventUtil.addHandler(btn_leftInsert, "click", leftInsert);
    EventUtil.addHandler(btn_rightInsert, "click", rightInsert);
    EventUtil.addHandler(btn_leftOut, "click", leftOut);
    EventUtil.addHandler(btn_rightOut, "click", rightOut);
    EventUtil.addHandler(btn_sortData, "click", function () {
        sortData(itemArr);
    });


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
        if(items.querySelectorAll("span").length < 60) {
            render("leftInsert", data);
            itemArr.unshift(data);
        } else {
            alert("已满");
        }

    }

    function rightInsert() {
        var data;
        if(!(data = getData())) {
            return false;
        }
        if(items.querySelectorAll("span").length < 60) {
            render("rightInsert", data);
            itemArr.push(data);
            console.log(itemArr);
        } else {
            alert("已满");
        }
    }

    function leftOut() {
        if(items.lastElementChild !== null) {
            items.removeChild(items.firstElementChild);
            alert(itemArr.shift());
            console.log(itemArr);
        } else {
            alert("没有元素了");
        }

    }

    function rightOut() {
        if(items.lastElementChild !== null) {
            items.removeChild(items.lastElementChild);
            alert(itemArr.pop());
            console.log(itemArr);
        } else {
            alert("没有元素了");
        }
    }

    function render(type, data) {
        var el = document.createElement('span');
        el.style.height = data + "px";
        el.offsetHeight = data;
        switch (type) {
            case "leftInsert" :
                var firstEle = items.querySelectorAll("span")[0];
                items.insertBefore(el, firstEle);
                break;
            case "rightInsert":
                items.appendChild(el);
                break;
        }
    }

    function sortData(data) {

        // 冒泡排序
        //var temp;
        //
        //for (var i = 0; i < data.length; i++) { //比较多少趟，从第一趟开始
        //
        //    for (var j = 0; j < data.length - i - 1; j++) { //每一趟比较多少次数
        //
        //        if (data[j] > data[j + 1]) {
        //            temp = data[j];
        //            data[j] = data[j + 1];
        //            data[j + 1] = temp;
        //        }
        //    }
        //}

        var len  = data.length,
            temp, i = 1, j = 0, timer, delay = 100, outer = true, inner = false;

        timer = setInterval(function() {
            if(outer) {
                if(i == len) {
                    clearInterval(timer);
                    return ;
                }
                if(data[i] < data[i-1]) {
                    temp = data[i];
                    j = i - 1;
                    outer = false;
                    inner = true;
                } else {
                    i++;
                }
            }
            if(inner) {
                if(j < 0 || data[j] < temp) {
                    data[j+1] = temp;
                    i++;
                    inner = false;
                    outer = true;
                } else {
                    data[j+1] = data[j];
                    j--;
                }
            }
            console.log(data);
            renderData(data);
        }, delay);

    }

    function renderData(data) {
        var ele = "";
        for (var i=0; i<data.length; i++) {
            ele += '<span style="height:'+data[i]+'px"></span>';
        }
        items.innerHTML = ele;
    }


})();
