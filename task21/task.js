(function () {
    // 跨浏览器事件处理
    var EventUtil = {
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        removeHandler: function (element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        }
    };

    // 获取元素 $(selector)
    function $(ele) {
        return document.querySelector(ele);
    }

    var itemTags = $("#itemTags"),
        itemHobbys = $("#itemHobbys"),
        btnAdd = $("#btnAdd"),
        queryBtn = $("#queryBtn"),
        textIpt = $("#textIpt"),
        textArea = $("#textContent");

    var arrTags = [], //存放 input 加入的数据
        arrHobby = [];  //存放 textArea 加入的数据

    // 删除元素
    EventUtil.addHandler(itemTags, "click", function (e) {
        if (e.target && e.target.nodeName.toLowerCase() == "span") {
            deleteEle(itemTags, arrTags, e);
        }
    });
    EventUtil.addHandler(itemHobbys, "click", function (e) {
        if (e.target && e.target.nodeName.toLowerCase() == "span") {
            deleteEle(itemHobbys, arrHobby, e);
        }
    });

    // 添加兴趣爱好
    EventUtil.addHandler(btnAdd, "click", function () {
        addTags("hobbys");
    });

    // 鼠标移入移出样式
    var temp = "";
    EventUtil.addHandler(itemTags, "mouseover", function (e) {
        if (e.target && e.target.nodeName.toLowerCase() == "span") {
            temp = e.target.innerHTML;
            e.target.innerHTML = "点击删除:" + temp;
        }
    });
    EventUtil.addHandler(itemTags, "mouseout", function (e) {
        if (e.target && e.target.nodeName.toLowerCase() == "span") {
            e.target.innerHTML = temp;
        }
    });
    EventUtil.addHandler(itemHobbys, "mouseover", function (e) {
        if (e.target && e.target.nodeName.toLowerCase() == "span") {
            temp = e.target.innerHTML;
            e.target.innerHTML = "点击删除:" + temp;
        }
    });
    EventUtil.addHandler(itemHobbys, "mouseout", function (e) {
        if (e.target && e.target.nodeName.toLowerCase() == "span") {
            e.target.innerHTML = temp;
        }
    });


    EventUtil.addHandler(document, 'keyup', function (e) {
        if (/(,| |\，)$/.test(textIpt.value) || event.keyCode == 13) {
            addTags("tags");
            $("#textIpt").value = "";
        }
    });

    /*
     获取数据
     */
    function getData(target) {
        var text = "";
        if (target === "input") {
            text = textIpt.value.trim();
        }
        if (target === "textarea") {
            text = textArea.value.trim();
        }
        return text;
    }

    /*
     添加 input 标签
     */
    function addTags(target) {

        var str = "";
        if(target == "tags") {
            str = getData("input");
            var re_str = str.match(/(^[^,\， ]*)/)[0];
            addToArray(re_str, arrTags, "tags");
            render(arrTags, itemTags);
        }
        if(target == "hobbys") {
            str = getData("textarea");
            var tempArr = str.split(/,|，|、|\s|\n|\r|\t/);
            addToArray(tempArr, arrHobby, "hobbys");
            render(arrHobby, itemHobbys);
        }

    }

    /**
     * 添加元素到数组中
     * @param data 源数组
     * @param arr 目标数组
     */
    function addToArray(data, arr, target) {
        if(target == "hobbys") {
            for(var i = 0, len=data.length; i<len; i++) {
                if (arr.indexOf(data[i]) == -1 && data[i] !== "") { //去重 防止空白也被加入到
                    if(arr.length >= 10) {
                        arr.shift();
                    }
                    arr.push(data[i]);
                }
            }
            console.log(arrHobby);
        }
        if(target == "tags") {
            if (arr.indexOf(data) == -1 && data !== "") { //去重 防止空白也被加入到
                if(arr.length >= 10) {
                    arr.shift();
                }
                arr.push(data);
            }
        }
    }

    /**
     * 鼠标点击删除元素
     * @param ele 移除元素的父元素
     * @param target 目标数组
     * @param e 事件
     */
    function deleteEle(ele, target, e) {
        var tempTxt = e.target.nodeValue;
        var tempIndex = arrTags.indexOf(tempTxt);
        target.splice(tempIndex, 1);
        ele.removeChild(e.target);
    }

    /**
     * 渲染
     * @param data 源数组
     * @param target 渲染内容的目标位置
     */
    function render(data, target) {
        var renderHTML = "";
        for (var index = 0, len = data.length; index < len; index++) {
            renderHTML += "<span>" + data[index] + "</span>";
        }
        target.innerHTML = renderHTML;
    }

})();