
var nameBtn = document.querySelector("#nameBtn"),
    inputs = document.querySelectorAll("input");


var result = {
    tips: "",
    checked: true
};

var inputTips = {
    name:        { tips: '必填，长度为4-16个字符', isPassed: false},
    pwd:         { tips: '必填，6到16位数字和字母', isPassed: false},
    confirm_pwd: { tips:  '必填，重复输入密码', isPassed: false},
    email:       { tips:  '必填，example@haha.com', isPassed: false},
    telephone:   { tips: '必填，请输入11位手机号码', isPassed: false}
};

for(var i=0,len=inputs.length;i<len;i++) {
    inputs[i].addEventListener("focus", function (e) {
        showTips(e.target);
    });
    inputs[i].addEventListener("blur", function (e) {
        validate(e.target)
    });
}

nameBtn.addEventListener("click", function () {
    for(var index = 0; index<inputs.length; index++) {
        validate(inputs[index]);
    }
    for(var item in inputTips) {
        if(!inputTips[item]['isPassed']) {
            alert("输入错误");
            return;
        } else {
            alert("输入正确");
            return;
        }
    }

});


function showTips(ele) {
    ele.nextElementSibling.innerHTML = inputTips[ele.name]['tips'];
}

function validate(ele) {
    var str = ele.value;
    switch (ele.name) {
        case "name":
            if(!str){
                result.tips = "姓名不能为空";
                result.checked = false;
                inputTips[ele.name]['isPassed'] = false;
                break;
            }
            if(getByteLen(str) > 16 || getByteLen(str) < 4) {
                result.tips = "长度为4-16个字符";
                result.checked = false;
                inputTips[ele.name]['isPassed'] = false;
                break;
            }
            result.checked = true;
            inputTips[ele.name]['isPassed'] = true;
            result.tips = "名称可用";
            break;
        case "pwd":
            if(!str){
                result.tips = "密码不能为空";
                result.checked = false;
                inputTips[ele.name]['isPassed'] = false;
                break;
            }
            if(!(str.match(/^[a-zA-Z0-9]{6,16}$/))) {
                result.tips = "请输入6到16位字符且只能为数字和字母";
                inputTips[ele.name]['isPassed'] = false;
                result.checked = false;
                break;
            }
            result.checked = true;
            inputTips[ele.name]['isPassed'] = true;
            result.tips = "密码可用";
            break;
        case "confirm_pwd":
            if(!str){
                result.tips = "密码不能为空";
                result.checked = false;
                inputTips[ele.name]['isPassed'] = false;
                break;
            }
            if(str !== document.querySelector("#pwd").value.trim()) {
                result.tips = "两次密码输入要相同";
                result.checked = false;
                inputTips[ele.name]['isPassed'] = false;
                break;
            }
            result.checked = true;
            inputTips[ele.name]['isPassed'] = true;
            result.tips = "密码可用";
            break;
        case "email":
            if(!str){
                result.tips = "邮箱不能为空";
                result.checked = false;
                inputTips[ele.name]['isPassed'] = false;
                break;
            }
            if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(str))) {
                result.tips = "邮箱格式错误";
                result.checked = false;
                inputTips[ele.name]['isPassed'] = false;
                break;
            }
            result.checked = true;
            inputTips[ele.name]['isPassed'] = true;
            result.tips = "邮箱可用";
            break;
        case "telephone":
            if(!str){
                result.tips = "手机不能为空";
                result.checked = false;
                inputTips[ele.name]['isPassed'] = false;
                break;
            }
            if(!(/^1[34578]\d{9}$/.test(str))) {
                result.tips = "手机号码格式错误";
                result.checked = false;
                inputTips[ele.name]['isPassed'] = false;
                break;
            }
            result.checked = true;
            inputTips[ele.name]['isPassed'] = true;
            result.tips = "手机可用";
            break;
        default:
            break;
    }
    if(result.checked) {
        ele.nextElementSibling.innerHTML = result.tips;
        ele.style.borderColor = "green";
        ele.nextElementSibling.style.color = "green";
        return true;
    } else {
        ele.nextElementSibling.innerHTML = result.tips;
        ele.style.borderColor = "red";
        ele.nextElementSibling.style.color = "red";
        return false;
    }
}



function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var ASCIICode = val.charCodeAt(i);
        if(ASCIICode >= 0 && ASCIICode <= 128) {
            len += 1;
        } else {
            len += 2;
        }
    }
    return len;
}