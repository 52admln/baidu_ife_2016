/**
 * Created by Wyj on 16-11-21.
 */

document.querySelector("#radioCheck").addEventListener( "change", function (e) {
    if(e.target && e.target.checked) {
        var current = e.target.value;
    } else {
        return;
    }
    // 这里通过添加 class 来隐藏显示元素
    if(current === "student") {
        document.querySelector(".school").className = "school";
        document.querySelector(".company").className = "company hide";
    } else {
        document.querySelector(".school").className = "school hide";
        document.querySelector(".company").className = "company";
    }
});


var data = {
    bj: ["北京大学", "清华大学", "北京航空航天大学"],
    sh: ["复旦大学", "上海交通大学", "同济大学"],
    hz: ["浙江大学", "杭州电子科技大学", "浙江工业大学"]
};

var school_location = document.querySelector("#school_location"),
    schools =  document.querySelector("#schools");

// 通过监听 change 事件改变option内容
school_location.addEventListener("change", function (e) {
    var location = e.target.value;
    for(var item in data) {
        if(item === location) {
            renderOption(data[item]);
        }
        console.log(item);
    }
});


function renderOption (arr) {
    var str = "";
    arr.forEach(function (element,index) {
        str += '<option value="'+element+'">'+element+'</option>';
    });
    schools.innerHTML = str;
    console.log(str);
}

function init() {
   renderOption(data[school_location.value]);
}

init();
