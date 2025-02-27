


// Language Section Functions

function ShowLimitError(message) 
{
    document.getElementById('limitLanguage').innerText = message

    setTimeout(() => {
        document.getElementById('limitLanguage').innerText = ""
    }, 3000);
}

// Remove Language Function 
function removeLanguage(e) {
    let languageItems = document.querySelectorAll('#language .content > div');

    if (languageItems.length > 1) {
        e.target.closest('div').remove();
        reOrderLanguages();
    } else {
        ShowLimitError("Trop peu de langues !");
    }
}


    let languageItems = document.querySelectorAll('#language .content > div');
    if (languageItems.length > 1) {
        e.target.closest('div').remove();
        const languageDeletedEvent = new CustomEvent('language_deleted');
        document.querySelector("#language").dispatchEvent(languageDeletedEvent);
    } else {
        ShowLimitError("Trop peu de langues !");
    }


function languageFormHandler() {
    let languageItems = document.querySelectorAll("#language .content > div");
    let indexer = languageItems.length;

    function reOrder() {
        document.querySelectorAll("#language .content > div").forEach((el, i) => {
            el.querySelector('.comId').innerText = (i + 1);
        });
    }

    function addLanguage() {
        let languageItems = document.querySelectorAll('#language .content > div');
    
        if (languageItems.length < 4) {
            let newElement = languageItems[0].cloneNode(true);
            newElement.querySelectorAll('input').forEach(input => input.value = "");
            newElement.querySelector('.delete-btn').addEventListener("click", removeLanguage);
            document.querySelector('#language .content').appendChild(newElement);
            reOrderLanguages();
        } else {
            ShowLimitError("Maximum de langues atteint !");
        }
    }

 

    document.querySelector('#language').addEventListener('language_deleted', () => {
        indexer--;
        reOrder();
    });

    document.getElementById("addlanguage").addEventListener('click', addLanguage);
}

// Hobby Section Functions

function ShowLimitError(message) 
{
    document.getElementById('limithobby').innerText = message

    setTimeout(() => {
        document.getElementById('limithobby').innerText = ""
    }, 4000);
}


// Remove Hobby Function (Fixed)
function removeHobby(e) {
    let hobbyItems = document.querySelectorAll('#hobby .content > div');

    if (hobbyItems.length > 1) {
        e.target.closest('div').remove();
        reOrderHobbies();
    } else {
        ShowLimitError("Trop peu de loisirs !", "limitHobby");
    }
}


function hobbyFormHandler() {
    let hobbyItems = document.querySelectorAll("#hobby .content > div");
    let indexer = hobbyItems.length;

    function reOrder() {
        document.querySelectorAll("#hobby .content > div").forEach((el, i) => {
            el.querySelector('.comId').innerText = (i + 1);
        });
    }

    
    // Add Hobby Function (Fixed)
function addHobby() {
    let hobbyItems = document.querySelectorAll('#hobby .content > div');

    if (hobbyItems.length < 3) {
        let newElement = hobbyItems[0].cloneNode(true);
        newElement.querySelectorAll('input').forEach(input => input.value = "");
        newElement.querySelector('.delete-btn').addEventListener("click", removeHobby);
        document.querySelector('#hobby .content').appendChild(newElement);
        reOrderHobbies();
    } else {
        ShowLimitError("Maximum de loisirs atteint !", "limitHobby");
    }
}

    document.querySelector('#hobby').addEventListener('hobby_deleted', () => {
        indexer--;
        reOrder();
    });

    document.getElementById("addhobby").addEventListener('click', addHobby);
}


// REFERENCES SECTION (NEW FEATURE)
function removeReference(e) {
    let referenceItems = document.querySelectorAll('#references .content > div');

    if (referenceItems.length > 1) {
        e.target.closest('div').remove();
        reOrderReferences();
    } else {
        ShowLimitError("Vous devez avoir au moins une référence !", "limitReference");
    }
}

// Reorder References
function reOrderReferences() {
    document.querySelectorAll("#references .content > div").forEach((el, i) => {
        el.querySelector('.comId').innerText = (i + 1);
    });
}

// Add Reference
function addReference() {
    let referenceItems = document.querySelectorAll('#references .content > div');

    if (referenceItems.length < 5) {
        let newElement = referenceItems[0].cloneNode(true);
        newElement.querySelectorAll('input').forEach(input => input.value = "");
        newElement.querySelector('.delete-btn').addEventListener("click", removeReference);
        document.querySelector('#references .content').appendChild(newElement);
        reOrderReferences();
    } else {
        ShowLimitError("Maximum de références atteint !", "limitReference");
    }
}

// Initialize References Section
function referenceFormHandler() {
    document.getElementById("addreference").addEventListener('click', addReference);
    document.querySelectorAll('#references .content > div .delete-btn').forEach(button => {
        button.addEventListener('click', removeReference);
    });
}

// Initialize All Sections
languageFormHandler();
hobbyFormHandler();
referenceFormHandler();
