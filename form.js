var person = {};
function hideAllFieldsets () {
    var all = document.getElementsByTagName("fieldset");
    for (let i = 0; i < all.length; i++) {
        all[i].style.display="none";
    }
}


function showElement(id) {
    hideAllFieldsets();
    document.getElementById(id).style.display="block";
}

document.getElementById("b1").addEventListener("click", function() {
    let elements = document.querySelectorAll("#section1 .required");
    let arr = [];
    for (let i = 0; i < elements.length; i++)
        arr.push(elements.item(i));
    let ans = check(arr);
    let finalCheck = checkFirstName() && checkLastName() && checkGender() && checkDate() && checkCNP();
    if (ans && finalCheck) {
        document.getElementById("w1").style.display = "none";

        person.lastName = document.getElementById("nume").value;
        person.firstName = document.getElementById("prenume").value;
        
        let gender = document.getElementsByName("gender")[0];
        let radioname = gender.getAttribute("name");
        let radios = document.getElementsByName(radioname);
        for (let j = 0; j < radios.length; j++) {
            if (radios[j].checked == true)
                person.gender = radios[j].value;
        }
        person.birthdate = new Date(document.getElementById("data-n").value).toLocaleDateString('en-GB');
        person.CNP = document.getElementById("cnp").value;

        showElement("section2");
    }
    else {
        document.getElementById("w1").innerText = "Completeaza campurile obligatorii!";
        document.getElementById("w1").style.color = "red";
        document.getElementById("w1").style.display = "block";
    }
})

document.getElementById("b2").addEventListener("click", function() {
    let elements = document.querySelectorAll("#section2 .required");
    let arr = [];
    for (let i = 0; i < elements.length; i++)
        arr.push(elements.item(i));
    let ans = check(arr);
    let finalCheck = checkPhone() && checkMail() && checkCounty() && checkCity();
    if (ans && finalCheck) {
        document.getElementById("w2").style.display = "none";

        person.phone = document.getElementById("tel").value;
        person.mail = document.getElementById("email").value;
        let option = document.getElementsByName("judet")[0].options.selectedIndex;
        person.county = document.getElementsByName("judet")[0].options[option].value;

        option = document.getElementsByName("oras")[0].options.selectedIndex;
        person.city = document.getElementsByName("oras")[0].options[option].value;

        person.address = document.getElementById("adresa").value;
        person.postalCode = document.getElementById("cod-postal").value;
        showElement("section3");
    
        //style
        let par = document.getElementById("parent-container");
        par.style.boxSizing = "border-box";
        par.style.height = "100vh";
        par.style.justifyContent = "flex-end";
    }
    else {
        document.getElementById("w2").innerText = "Completeaza campurile obligatorii!";
        document.getElementById("w2").style.display = "block";
    }
})

document.getElementById("b3").addEventListener("click", function() {
    let elements = document.querySelectorAll("#section3 .required");
    let arr = [];
    for (let i = 0; i < elements.length; i++)
        arr.push(elements.item(i));
    let ans = check(arr);
    let finalCheck = checkPassword() && checkPassword2();
    if (ans && finalCheck) {
        if (checkMatchingPasswords() == false) {
            document.getElementById("w3").innerText = "Confirmarea parolei este gresita!";
            document.getElementById("w3").style.display = "block";
        }
        else {
            person.password = document.getElementById("parola").value;
            person.newsletter = document.getElementById("newsletter").checked;
            person.terms = document.getElementById("terms").checked;

            console.log(person);
            
            var message = "Formularul a fost completat cu succes! Va multumim pentru timpul acordat, " + person.lastName + " " + person.firstName + ".";
            createAppendElement("div", message, "form");
            hideAllFieldsets();

            //style
            let par = document.getElementById("parent-container");
            par.style.boxSizing = "border-box";
            par.style.height = "100vh";
            par.style.justifyContent = "space-between";
        }
    }
    else {
        document.getElementById("w3").innerText = "Completeaza campurile obligatorii!";
        document.getElementById("w3").style.display = "block";
    }
})

document.getElementById("back2").addEventListener("click", function(){
    showElement("section1");
})


document.getElementById("back3").addEventListener("click", function(){
    showElement("section2");

    //style
    let par = document.getElementById("parent-container");
    par.style.boxSizing = "content-box";
    par.style.height = "100%";
    par.style.justifyContent = "center";

})

function check (elements) {
    let ok_radio = false;
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].type == "radio") {
            let radioname = elements[i].getAttribute("name");
            let radios = document.getElementsByName(radioname);
            for (let j = 0; j < radios.length; j++) {
                if (radios[j].checked == true)
                    ok_radio = true;
            }
            if (ok_radio == false)
                return false;
        }
        else if (elements[i].type == "text" || elements[i].type == "password") {
            if (elements[i].value == "") {
                return false;
            }
        }
        else if (elements[i].tagName == "SELECT") {
            if (elements[i].options.selectedIndex == 0)
                return false;
        }
        else if (elements[i].type == "checkbox") {
            if (elements[i].checked == false)
                return false;
        }
        else if (elements[i].type == "date") {
            if (elements[i].value == false)
                return false;
        }

    }
    return true;
}

function checkMatchingPasswords() {
    let pass1 = document.getElementById("parola").value;
    let pass2 = document.getElementById("confirm-parola").value;
    if (pass1 == pass2)
        return true;
    else
        return false;
}
//creates an element of elementType, with the message elementMessage and appends it to the parentToAppendAt
function createAppendElement(elementType, elementMessage, parentToAppendAt) {
    var node = document.createElement(elementType);
    var messageNode = document.createTextNode(elementMessage);
    node.appendChild(messageNode);
    document.querySelector(parentToAppendAt).appendChild(node);
}


function generatePassword() {
    let length = Math.round(Math.random() * 20 % 6 + 8);
    let smallLetters = "abcdefghijklmnopqrstuvwxyz";
    let bigLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let specialCharacters = "!@#$%^&*()-+<>";
    let numberOfBigLetters = Math.round(Math.random() * 5 + 1);
    let numberOfSpecialCharacters = Math.round(Math.random() * 5 + 1);
    let pass = [];
    for (let i = 0; i < length; i++) {
        let charId = Math.round( Math.random() * smallLetters.length);
        pass.splice(i, 0, smallLetters[charId]);
    }
    for (let i = 0; i < numberOfBigLetters; i++) {
        let randomPos = Math.round(Math.random() * length);
        let charId = Math.round( Math.random() * bigLetters.length);
        pass.splice(randomPos, 0, bigLetters[charId]);
    }
    for (let i = 0; i < numberOfSpecialCharacters; i++) {
        let randomPos = Math.round(Math.random() * length);
        let charId = Math.round( Math.random() * specialCharacters.length);
        pass.splice(randomPos, 0, specialCharacters[charId]);
    }
    return pass.join("");

}
//assigns an Id to an element, given the selector and the id
function giveId(element, id) {
    document.querySelector(element).id = id;
}
//deletes an element with a certain id, if it exists
function deleteElementWithId(id) {
    if (document.getElementById(id)) 
        document.getElementById(id).remove();
}

//suggested password
document.getElementById("parola").addEventListener("click", function(){
    let pass = generatePassword();
    let message = "Parola sugerata: " + pass;
    createAppendElement("p", message, "#section3 .pair");
    deleteElementWithId("suggested-pass");
    giveId("#section3 .pair p", "suggested-pass");
    
})

function checkLastName(){
    let name = document.getElementById("nume");
    name.parentElement.id =  "pair-last-name";
    if (name.value.length < 3) {
        deleteElementWithId("error-last-name");
        createAppendElement("div", "Numele este prea scurt!", "#pair-last-name");
        giveId("#pair-last-name :last-child", "error-last-name");
        return false;
    }
    else if (!/^[a-zA-Z]+$/.test(name.value)) {
        deleteElementWithId("error-last-name");
        createAppendElement("div", "Numele contine caractere invalide!", "#pair-last-name");
        giveId("#pair-last-name :last-child", "error-last-name");
        return false;
    }
    else {
        deleteElementWithId("error-last-name");
        return true;
    }
}
function checkFirstName(){
    let name = document.getElementById("prenume");
    name.parentElement.id =  "pair-first-name";
    if (name.value.length < 3) {
        deleteElementWithId("error-first-name");
        createAppendElement("div", "Numele este prea scurt!", "#pair-first-name");
        giveId("#pair-first-name :last-child", "error-first-name");
        return false;
    }
    else if (!/^[a-zA-Z]+$/.test(name.value)) {
        deleteElementWithId("error-first-name");
        createAppendElement("div", "Numele contine caractere invalide!", "#pair-first-name");
        giveId("#pair-first-name :last-child", "error-first-name");
        return false;
    }
    else {
        deleteElementWithId("error-first-name");
        return true;
    }
}

function checkGender(){
    let ok_radio = false;
    let gender = document.getElementById("male");
    gender.parentElement.parentElement.id = "pair-gender";
    let radioname = gender.getAttribute("name");
    let radios = document.getElementsByName(radioname);
        for (let j = 0; j < radios.length; j++) {
            if (radios[j].checked == true)
                ok_radio = true;
        }   
        if (ok_radio == false) {
            deleteElementWithId("error-gender");
            createAppendElement("div", "Nu ati introdus sexul!", "#pair-gender");
            giveId("#pair-gender > :last-child", "error-gender");
            return false;
        }
    deleteElementWithId("error-gender");
    return true;
}

function checkDate() {
    let date = document.getElementById("data-n");
    date.parentElement.id =  "pair-birth-date";
    if (date.value == "") {
        deleteElementWithId("error-birth-date");
        createAppendElement("div", "Nu ati introdus data nasterii!", "#pair-birth-date");
        giveId("#pair-birth-date :last-child", "error-birth-date");
        return false;
    }
    else {
        deleteElementWithId("error-birth-date");
        return true;
    }
}

function checkCNP() {
    let cnp = document.getElementById("cnp");
    cnp.parentElement.id =  "pair-cnp";
    let val = validCNP(cnp.value);
    if (!val) {
        deleteElementWithId("error-cnp");
        createAppendElement("div", "Nu ati introdus CNP-ul corect!", "#pair-cnp");
        giveId("#pair-cnp :last-child", "error-cnp");
        return false;
    }
    else {
        deleteElementWithId("error-cnp");
        return true;
    }
}

function checkPhone() {
    let phone = document.getElementById("tel");
    phone.parentElement.id =  "pair-phone";
    if (phone.value.length != 10 || phone.value[0] != '0' || phone.value[1] != '7' || !/^\d+$/.test(phone.value)) {
        deleteElementWithId("error-phone");
        createAppendElement("div", "Telefonul dat este invalid!", "#pair-phone");
        giveId("#pair-phone :last-child", "error-phone");
        return false;
    }
    else {
        deleteElementWithId("error-phone");
        return true;
    }
}

function checkMail() {
    let mail = document.getElementById("email");
    mail.parentElement.id =  "pair-mail";
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
        deleteElementWithId("error-mail");
        createAppendElement("div", "Adresa de e-mail este invalida!", "#pair-mail");
        giveId("#pair-mail :last-child", "error-mail");
        return false;
    }
    else {
        deleteElementWithId("error-mail");
        return true;
    }
}

function checkCounty() {
    let county = document.getElementById("judet");
    county.parentElement.id =  "pair-county";
    if (county.options.selectedIndex == 0) {
        deleteElementWithId("error-county");
        createAppendElement("div", "Nu ati ales judetul!", "#pair-county");
        giveId("#pair-county > :last-child", "error-county");
        return false;
    }
    else {
        deleteElementWithId("error-county");
        return true;
    }
}

function checkCity() {
    let city = document.getElementById("oras");
    city.parentElement.id =  "pair-city";
    if (city.options.selectedIndex == 0) {
        deleteElementWithId("error-city");
        createAppendElement("div", "Nu ati ales orasul!", "#pair-city");
        giveId("#pair-city > :last-child", "error-city");
        return false;
    }
    else {
        deleteElementWithId("error-city");
        return true;
    }
}
//only simple validation done, add RegEx
function checkPassword() {
    let pass = document.getElementById("parola");
    pass.parentElement.id =  "pair-pass";
    if (pass.value == "") {
        deleteElementWithId("error-pass");
        createAppendElement("div", "Nu ati introdus parola!", "#pair-pass");
        giveId("#pair-pass :last-child", "error-pass");
        return false;
    }
    // else if (/*regex*/) {
        //parola nu contine:...
    // }
    else {
        deleteElementWithId("error-pass");
        return true;
    }
}
function checkPassword2() {
    let pass = document.getElementById("parola");
    let pass2 = document.getElementById("confirm-parola");
    pass2.parentElement.id =  "pair-pass2";
    if (pass2.value != pass.value) {
        deleteElementWithId("error-pass2");
        createAppendElement("div", "Parola nu coincide cu cea introdusa anterior!", "#pair-pass2");
        giveId("#pair-pass2 :last-child", "error-pass2");
        return false;
    }
    else {
        deleteElementWithId("error-pass2");
        return true;
    }
}

document.getElementById("nume").addEventListener("focusout", checkLastName);
document.getElementById("prenume").addEventListener("focusout", checkFirstName);
document.getElementById("cnp").addEventListener("focusout", checkCNP);
document.getElementById("tel").addEventListener("focusout", checkPhone);
document.getElementById("email").addEventListener("focusout", checkMail);
document.getElementById("judet").addEventListener("focusout", checkCounty);
document.getElementById("oras").addEventListener("focusout", checkCity);
document.getElementById("parola").addEventListener("focusout", checkPassword);
document.getElementById("confirm-parola").addEventListener("focusout", checkPassword2);



function validCNP( p_cnp ) {
    var i=0 , year=0 , hashResult=0 , cnp=[] , hashTable=[2,7,9,1,4,6,3,5,8,2,7,9];
    if( p_cnp.length !== 13 ) { return false; }
    for( i=0 ; i<13 ; i++ ) {
        cnp[i] = parseInt( p_cnp.charAt(i) , 10 );
        if( isNaN( cnp[i] ) ) { return false; }
        if( i < 12 ) { hashResult = hashResult + ( cnp[i] * hashTable[i] ); }
    }
    hashResult = hashResult % 11;
    if( hashResult === 10 ) { hashResult = 1; }
    year = (cnp[1]*10)+cnp[2];
    switch( cnp[0] ) {
        case 1  : case 2 : { year += 1900; } break;
        case 3  : case 4 : { year += 1800; } break;
        case 5  : case 6 : { year += 2000; } break;
        case 7  : case 8 : case 9 : { year += 2000; if( year > ( parseInt( new Date().getYear() , 10 ) - 14 ) ) { year -= 100; } } break;
        default : { return false; }
    }
    if( year < 1800 || year > 2099 ) { return false; }
    return ( cnp[12] === hashResult );
}