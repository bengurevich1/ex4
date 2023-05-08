

function populateAgeDropdown() {
    var select = document.getElementById("age");
    var defaultOption = document.createElement("option");
    defaultOption.text = "Choose age";
    defaultOption.value = "";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    select.appendChild(defaultOption);
    for (var i = 23; i <= 38; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        select.appendChild(option);
    }
}

function validForm() {
    var fullName = document.getElementsByName('fullName')[0];
    var interests = document.getElementsByName('interests[]');

    var validNameTest = /^[a-zA-Z]+\s+[a-zA-Z]+$/;
    if (!validNameTest.test(fullName.value)) {
        alert('enter full name with at least one spce. for example Ben Gureivch')
        return false;
    }
    var interestsChecked = 0;
    for (var i = 0; i < interests.length; i++) {
        if (interests[i].checked) {
            interestsChecked++;
        }
    }
    if (interestsChecked < 3) {
        alert('Please select at least 3 interests.');
        return false;
    }
    return true;

}
document.addEventListener("DOMContentLoaded", function () {
    populateAgeDropdown();
    validForm();

});
