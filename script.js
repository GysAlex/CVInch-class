let hajust
let lanAjust
let refAjust
let hobby

function ShowLimitError(message) 
{
    document.getElementById('limitSkill').innerText = message

    setTimeout(() => {
        document.getElementById('limitSkill').innerText = ""
    }, 4000);
}


function formAjust(currentIndex) 
{
    if(currentIndex == 2)
    {
        if(hajust)
        {
            document.querySelector('form').style.height = `${hajust}px`
        }
        else
        {
            document.querySelector('form').style.height = "250px"
        }
    }

    else if (currentIndex >= 3 && currentIndex  < 5 ) 
    {
        document.querySelector('form').style.height = "400px"   
    }

    else if (currentIndex >= 6 ) {
        document.querySelector('form').style.height = "500px"   
    }

    else if(currentIndex == 0)
    {
        document.querySelector('form').style.height = "380px"
    }

    else if(currentIndex == 1)
    {
        document.querySelector('form').style.height = "340px"

    }

}

/* This function handles page navigation */
function switcher() 
{    
    let currentIndex = 0

    let elements = Array.from(document.querySelectorAll('#cvForm > div'))

    function displayHandler (currentIndex)
    {
        elements.forEach((el, index) =>{

            if (index != elements.length - 1) 
            {
                el.classList.add('hide')   
            }

            if(index == currentIndex)
            {
                el.classList.remove('hide')
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
            formAjust(currentIndex)

        })
    })
}

/* End of the navigation function */


function formHandler(id, addId)
{
    let indexer = 0
    let selection = `#${id} .content > div`
    let el = document.querySelector(selection) 

    function reOrder() 
    {
        let skillsItems = document.querySelectorAll(selection)
        skillsItems.forEach((el, i)=>{
            if(id == "skills")
                el.firstElementChild.firstElementChild.innerText = (i + 1)
            else if(id == "profExperience" || id == "education")
            {
                el.lastElementChild.firstElementChild.lastElementChild.innerText = (i + 1)
            }
        })
    }

    function hideExpOnCreation()
    {
        let expItems = document.querySelectorAll(selection)

        expItems.forEach((el)=>{
            el.firstElementChild.nextElementSibling.classList.remove('flex')
            el.firstElementChild.nextElementSibling.classList.add('hidden')

            el.lastElementChild.classList.remove("hidden")
            el.lastElementChild.classList.add('flex')

        })
    }


    function addSkill() 
    {

        if(indexer <= 5 )
        {
            let el = document.querySelector(selection)   
        
            let newElement = el.cloneNode(true)

            if (id == "profExperience" || id == "education") 
            {
                hideExpOnCreation()
                newElement.firstElementChild.nextElementSibling.classList.remove('hidden')
                newElement.firstElementChild.nextElementSibling.classList.add('flex')   

                newElement.lastElementChild.classList.remove("flex")
                newElement.lastElementChild.classList.add('hidden')

                newElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.lastElementChild.value = ""
                newElement.lastElementChild.firstElementChild.nextElementSibling.innerText = ""

            }
    
            document.querySelector(`#${id} .content`).appendChild(newElement)  

            document.querySelector(`#${id} .content`).lastElementChild.scrollIntoView({block: "end", inline: "nearest", behavior: "smooth"})                


            indexer++

            reOrder()
            if(id == "skills")
            {
                hajust = 250 + 40*(indexer + 1)
                document.querySelector('form').style.height = `${hajust}px`

            }


            console.log(indexer)
        }

        else
        {
            ShowLimitError("Maximun de compétences atteint !")
        }

    }

    document.querySelector(`#${id}`).addEventListener('deleted', (e)=>{
        indexer--
        console.log(indexer)
        reOrder()
        if (id == "skills") 
        {
            hajust = 250 + 40*(indexer + 1)
            document.querySelector('form').style.height = `${250 + 40*(indexer + 1)}px`            

        }


    })

    document.getElementById(addId).addEventListener('click', ()=>{
        addSkill()
    })
}




/*
function removeSkill(e)
{
    if(Array.from(document.querySelectorAll('#skills .content > div')).length > 1 )
    {
        e.target.parentElement.parentElement.remove()
        const sk = new CustomEvent('skill_deleted', {
            detail: {
                "index" : e
            }
        })
        document.querySelector("#skills").dispatchEvent(sk) //This is very intersting...
    }

    else
        ShowLimitError("Trop peu de compétences !")

}
*/

/*
function skillsFormHandler()
{
    let indexer = 0
    let el = document.querySelector('#skills .content > div') 

    function reOrder() 
    {
        let skillsItems = document.querySelectorAll("#skills .content > div")
        skillsItems.forEach((el, i)=>{
            el.firstElementChild.firstElementChild.innerText = (i + 1)
        })
    }

    function addSkill() 
    {
        if(indexer <= 5 )
        {
            let el = document.querySelector('#skills .content > div')   
        
            let newElement = el.cloneNode(true)
    
            document.querySelector('#skills .content').appendChild(newElement)  

            indexer++
            reOrder()
        }

        else
        {
            ShowLimitError("Maximun de compétences atteint !")
        }

    }

    document.querySelector('#skills').addEventListener('skill_deleted', (e)=>{
        indexer--
        reOrder()
    })

    document.getElementById("addSkills").addEventListener('click', ()=>{
        addSkill()
    })

}
*/

/*To handle experience*/

formHandler("profExperience", "addExp")

function removeExp(e, id)
{
    let selection = `#${id} .content > div`

    if(Array.from(document.querySelectorAll(selection)).length > 1 )
    {
        e.currentTarget.parentElement.parentElement.remove()
        const sk = new CustomEvent('deleted', {
            detail: {
                "index" : e
            }
        })
        document.querySelector(`#${id}`).dispatchEvent(sk) //This is very intersting...
    }

    else
        ShowLimitError("Trop peu de compétences !")

}


function hideExp(e)
{
    e.currentTarget.parentElement.nextElementSibling.classList.toggle('hidden')
    e.currentTarget.parentElement.nextElementSibling.classList.toggle('flex') 
    
    e.currentTarget.parentElement.nextElementSibling.nextElementSibling.classList.toggle('hidden')
    e.currentTarget.parentElement.nextElementSibling.nextElementSibling.classList.toggle('flex')   
}

function syncJob(e) 
{
    e.currentTarget.parentElement.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling.innerText = e.currentTarget.value.trim() || "Aucun poste !"
}

/*End*/


/*function experienceFormHandler()
{
    let indexer = 0
    let el = document.querySelector('#skills .content > div') 

    function reOrder() 
    {
        let skillsItems = document.querySelectorAll("#skills .content > div")
        skillsItems.forEach((el, i)=>{
            el.firstElementChild.firstElementChild.innerText = (i + 1)
        })
    }

    function addSkill() 
    {
        if(indexer <= 5 )
        {
            let el = document.querySelector('#skills .content > div')   
        
            let newElement = el.cloneNode(true)
    
            document.querySelector('#skills .content').appendChild(newElement)  

            indexer++
            reOrder()
        }

        else
        {
            ShowLimitError("Maximun de compétences atteint !")
        }

    }   
}
*/


/*To handle skills*/

formHandler("skills", "addSkills")

function removeSkill(e, id)
{
    let selection = `#${id} .content > div`

    if(Array.from(document.querySelectorAll(selection)).length > 1 )
    {
        e.target.parentElement.parentElement.remove()
        const sk = new CustomEvent('deleted', {
            detail: {
                "index" : e
            }
        })
        document.querySelector(`#${id}`).dispatchEvent(sk) //This is very intersting...
    }

    else
        ShowLimitError("Trop peu de compétences !")

}

/*End*/

/*To handle education*/
formHandler("education", "addEdu")

function hideEdu(e)
{
    e.currentTarget.parentElement.nextElementSibling.classList.toggle('hidden')
    e.currentTarget.parentElement.nextElementSibling.classList.toggle('flex') 
    
    e.currentTarget.parentElement.nextElementSibling.nextElementSibling.classList.toggle('hidden')
    e.currentTarget.parentElement.nextElementSibling.nextElementSibling.classList.toggle('flex')   
}

function removeEdu(e, id)
{
    let selection = `#${id} .content > div`

    if(Array.from(document.querySelectorAll(selection)).length > 1 )
    {
        e.currentTarget.parentElement.parentElement.remove()
        const sk = new CustomEvent('deleted', {
            detail: {
                "index" : e
            }
        })
        document.querySelector(`#${id}`).dispatchEvent(sk) //This is very intersting...
    }

    else
        ShowLimitError("Trop peu de compétences !")

}

function syncEdu(e) 
{
    e.currentTarget.parentElement.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling.innerText = e.currentTarget.value.trim() || "Aucun Diplôme !"
}
/*To handle education*/

switcher()


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

languageFormHandler()
hobbyFormHandler()
referenceFormHandler() 
switcher()