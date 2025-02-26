function ShowLimitError(message) 
{
    document.getElementById('limitSkill').innerText = message

    setTimeout(() => {
        document.getElementById('limitSkill').innerText = ""
    }, 4000);
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



skillsFormHandler()
switcher()