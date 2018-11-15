var currentTab = 0;
var dpActive = true;
var DEFAULT = "default";
var xmlRowString = "<Questionario>";
document.getElementById("dpText").disabled = dpActive;
showTab(currentTab);
//showTab(3);
function showTab(x) {
    var tab = document.getElementsByClassName("tab");
    tab[x].style.display = "block";
    if (x == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementsByClassName("step")[0].className += " finish";
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (x == 4) {
        if (validateForm(currentTab - 1))
            StoreToLocalStorage();
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
    }
    if (x > 0) {
        document.getElementsByClassName("step")[x - 1].className += " finish";
    }
    if (x == 3) {
        document.getElementById("nextBtn").innerHTML = "Submeter";
    } else {
        document.getElementById("nextBtn").innerHTML = "Seguinte";
        fixStep(x);
    }

}

function change(x) {
    var tab = document.getElementsByClassName("tab");
    if (x > 0 && currentTab > 0 && !validateForm(currentTab)) {
        return false;
    } else if (x < 0 && currentTab == 0) {
        return false;
    }


    tab[currentTab].style.display = "none";
    currentTab = currentTab + x;

    if (currentTab >= tab.length) {
        document.getElementById("userForm").submit();
        return false;
    }
    showTab(currentTab);
}

function dpShowHide(value) {
    if (!value) {
        dpActive = false;
    } else {
        dpActive = true;
    }
    document.getElementById("dpText").disabled = dpActive;
}

function verifyFields(value) {
    console.log(value);
    if (this.value != DEFAULT || this.value != "")
        console.log(this.parentElement);
}

function validateForm(currentTab) {
    var text, spans, selects, inputs, tab = document.getElementsByClassName("tab");
    var errors = false;
    text = "";
    selects = tab[currentTab].getElementsByTagName("select");
    inputs = tab[currentTab].getElementsByTagName("input");
    spans = tab[currentTab].getElementsByTagName("span");
    var size = document.forms[0].length;

    if (selects.length > 0) {
        for (i = 0; i < selects.length; i++) {
            if (selects[i].value == DEFAULT) {
                errors = true;
                spans[i].className += " show";
                text = text + selects[i].name + ": \n" + " Não foi preenchido..." + "\n";
            } else {
                spans[i].className = "hiddenMsg";
                xmlRowString += '<q id="' + selects[i].name + '">' + selects[i].value + "</q>";
            }
        }
    }
    for (i = 0; i < inputs.length; i++) {
        if (!inputs[i].checkValidity()) {
            errors = true;
            text = text + inputs[i].name + ": \n" + " Não foi preenchido..." + "\n";
        } else {
            if(inputs[i].type === "radio"){
                if(inputs[i].checked){
                    xmlRowString += '<q id="' + inputs[i].name + '">' + inputs[i].value + "</q>";
                }
            }else {
                xmlRowString += '<q id="' + inputs[i].name + '">' + inputs[i].value + "</q>";
            }
        }
    }
    if (errors) {
        xmlRowString = null;
        alert(text);
        return false;
    }
    return true;
}
function StoreToLocalStorage() {
    let d = new Date();
    xmlRowString += "</Questionario>";
    window.localStorage.setItem(d.getTime(), xmlRowString);
}

function fixStep(n) {
    var x = document.getElementsByClassName("step");

    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    if (x == 3) {
        x[n].className += " active";
        console.log("CERTOOO");
    }

}