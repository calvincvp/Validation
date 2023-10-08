const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

String.prototype.isEmail = function() {
    return !!this.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
};

String.prototype.isAlpha=function(){
    return !!this.match(/^[a-zA-Z\s]+$/
    )
}

function checkRequired(inputs) {
    inputs.forEach(input => {
        if(input.value.trim()===""){
            //Error
            errorInput(input, `${getName(input)} is Required`);
        }else{
            //success
            successInput(input);
        }
    })
}

function getName(input){
    //return input.id;
    return input.getAttribute("data-name");
}

function errorInput(input, message){
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    const p = formGroup.querySelector("p");
    p.innerHTML = message;
}

function successInput(input) {
    const formGroup=input.parentElement;
    formGroup.className="form-group success";
    const p=formGroup.querySelector("p");
    p.innerHTML = "";
}

function checkLength(input, min, max){
    const data = input.value.trim().length;
    if (data < min){
        errorInput(input, `${getName(input)} must be greaterthan ${min} value`);

    }else if (data > max) {
        errorInput(input, `${getName(input)} must be lesserthan ${max} value`);
    } else{
        successInput(input);
    }
}

function checkConfirmPassword(password, password2){
    if(password.value != password2.value){
        errorInput(password2, `${getName(password2)} Incorrect`);
    }
}

function checkEmail(input){
    if (!input.value.trim().isEmail()){
        errorInput(input, `${getName(input)} is not valid`);
    }
}

function checkAlpha(input){
    if (!input.value.trim().isAlpha()){
        errorInput(input, `${getName(input)} is not valid`);
    }
}

form.addEventListener("submit",function (e){
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 5, 10);
    checkConfirmPassword(password, password2);
    checkEmail(email);
    checkAlpha(username);
});