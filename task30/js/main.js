
var nameIpt = document.querySelector("#nameIpt"),
    inputs = document.querySelectorAll("input");

var inputTips = ["必填,长度为4-16个字符"];

for(var i=0,len=inputs.length;i<len;i++) {
    inputs[i].addEventListener("focus", function (e) {
        showTips(e);
    });
    inputs[i].addEventListener("blur", function (e) {

    });
}

// document.querySelector("#nameIpt").onfocus = function (e) {
//     showTips(e,"必填,长度为4-16个字符");
// };
// document.querySelector("#nameIpt").onblur = function (e) {
//     console.log(e);
//     validate_name(nameIpt.value);
// };




function showTips(e) {
    var str = "";
    switch (e.target.name) {
        case "name":
            str = "必填,长度为4-16个字符";
            break;
        case "pwd":
            str = "密码";
            break;
        case "confirm_pwd":
            str = "密码";
            break;
        case "email":
            str = "邮箱";
            break;
        case "telephone":
            str = "手机号";
            break;
        default:
            break;
}
    console.log(e.target.name);

    e.target.nextElementSibling.innerHTML = str;
}


function validate_name(str) {
    if(!str){
        tips.innerHTML = "姓名不能为空";
        nameIpt.style.borderColor = "red";
        tips.style.color = "red";
        return false;
    }
    if(getByteLen(str) > 16 || getByteLen(str) < 4) {
        tips.innerHTML = "长度为4-16个字符";
        nameIpt.style.borderColor = "red";
        tips.style.color = "red";
        return false;
    }
    tips.innerHTML = "名称格式正确";
    nameIpt.style.borderColor = "green";
    tips.style.color = "green";
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