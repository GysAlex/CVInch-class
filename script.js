// Universal ShowLimitError function
function ShowLimitError(message, elementId) {
    let element = document.getElementById(elementId);
    if (element) {
        element.innerText = message;
        setTimeout(() => {
            element.innerText = "";
        }, 3000);
    }
}


function switcher() 
{    
    let currentIndex = 0

    let elements = Array.from(document.querySelectorAll('#cvForm > div'))

    function displayHandler (currentIndex)
    {
        elements.forEach((el, index) =>{

            if (index != elements.length - 1) 
            {
                el.style.display = 'none'    
            }

            if(index == currentIndex)
            {
                el.style.display = 'unset'
            }
    
        })
    
    }

    document.querySelectorAll('.navigation button').forEach((el, index)=>{
        el.addEventListener('click', function (){
            if (index == 0 && currentIndex >= 1) 
            {
                currentIndex--   
            }
            
            else if(index != 0 && currentIndex < elements.length - 2 )
            {
                currentIndex++
            }

            displayHandler(currentIndex)

        })
    })
}

// Remove Skill function
function removeSkill(e) {
    let skillItems = document.querySelectorAll('#skills .content > div');
    
    // Ensure there is more than one skill to delete
    if (skillItems.length > 1) {
        e.target.closest('div').remove();
        reOrderSkills();  // Reorder after deletion
    } else {
        ShowLimitError("Trop peu de compétences !");
    }
}

// Reorder Skills after adding/removing items
function reOrderSkills() {
    document.querySelectorAll('#skills .content > div').forEach((el, i) => {
        // Update the skill index (comId)
        el.querySelector('.comId').innerText = (i + 1);
    });
}


// Add Skill Function 
function addSkill() {
    let skillItems = document.querySelectorAll('#skills .content > div');

    if (skillItems.length < 7) {
        let newElement = skillItems[0].cloneNode(true);
        newElement.querySelectorAll('input').forEach(input => input.value = "");
        newElement.querySelector('.delete-btn').addEventListener('click', removeSkill);
        document.querySelector('#skills .content').appendChild(newElement);
        reOrderSkills();
    } else {
        ShowLimitError("Maximum de compétences atteint !", );
    }
}
// Initialize Skills Form Handler
function skillsFormHandler() {
    // Attach event listener to Add Skill button
    document.getElementById("addSkills").addEventListener('click', addSkill);

    // Attach event listener to existing delete buttons (if any)
    document.querySelectorAll('#skills .content > div button').forEach(button => {
        button.addEventListener('click', removeSkill);
    });
}


// Language Section Functions

function ShowLimitError(message) 
{
    document.getElementById('limitLanguage').innerText = message

    setTimeout(() => {
        document.getElementById('limitLanguage').innerText = ""
    }, 4000);
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
skillsFormHandler();
languageFormHandler();
hobbyFormHandler();
referenceFormHandler();
switcher();