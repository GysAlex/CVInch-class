let hajust




// Language Section Functions

function ShowLimitError(message) 
{
    document.getElementById('limitLanguage').innerText = message

    setTimeout(() => {
        document.getElementById('limitLanguage').innerText = ""
    }, 3000);
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

    else if (currentIndex >= 3 ) {
        document.querySelector('form').style.height = "540px"   
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


function skillsFormHandler()
{
    let indexer = 0
    let el = document.querySelector('#skills .content > div') 

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
