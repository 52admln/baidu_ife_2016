
var tips = document.querySelector(".tips");
var nameIpt = document.querySelector("#nameIpt");

document.querySelector("#nameBtn").onclick = function () {
    validate(nameIpt.value);
};

function validate(str) {
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