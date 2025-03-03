let hajust
let lanAjust
let refAjust
let hobby

let skillHeight = 220
let langHeight = 220
let hoHeight = 220
let refHeight = 220

let currentIndex = 0

function ShowLimitError(message) 
{
    document.getElementById('limitSkill').innerText = message

    setTimeout(() => {
        document.getElementById('limitSkill').innerText = ""
    }, 4000);
}


function formAjust(currentIndex) 
{
    let skIndice = 0
    let lgIndice = 0
    if (currentIndex == 2) 
    {
        document.getElementById('cvForm').style.height = `${skillHeight}px`
        document.getElementById('cvForm').addEventListener('sk-created', function () {

            if(document.querySelectorAll('#skills .content input').length < 5)
                {
                    skillHeight += 50         
                    document.getElementById('cvForm').style.height = `${skillHeight}px`
                }
            
        })

        document.getElementById('cvForm').addEventListener('sk-deleted', function () {

            if(document.querySelectorAll('#skills .content input').length < 4)
            {
                skillHeight-=50          
                document.getElementById('cvForm').style.height = `${skillHeight}px`
            }

        })
        
    }

    if (currentIndex == 3) 
    {
        document.getElementById('cvForm').style.height = `${langHeight}px`
        document.getElementById('cvForm').addEventListener('lg-created', function () {

            if(document.querySelectorAll('#language .content input').length < 5)
            {
                langHeight += 50         
                document.getElementById('cvForm').style.height = `${langHeight}px`
            }
            
        })

        document.getElementById('cvForm').addEventListener('lg-deleted', function () {

            if(document.querySelectorAll('#language .content input').length < 4)
            {
                langHeight-=50          
                document.getElementById('cvForm').style.height = `${langHeight}px`
            }

        })
        
    }

    if(currentIndex == 4)
    {

        document.getElementById('cvForm').style.height = `${hoHeight}px`
        document.getElementById('cvForm').addEventListener('h-created', function () {

            if(document.querySelectorAll('#hobby .content input').length < 5)
            {
                hoHeight += 50         
                document.getElementById('cvForm').style.height = `${hoHeight}px`
            }
            
        })

        document.getElementById('cvForm').addEventListener('h-deleted', function () {

            if(document.querySelectorAll('#hobby .content input').length < 4)
            {
                hoHeight-=50          
                document.getElementById('cvForm').style.height = `${hoHeight}px`
            }

        })
        

    }

    if(currentIndex == 5)
    {
        document.getElementById('cvForm').style.height = `${475}px`
    }

    if(currentIndex == 0)
    {
        document.getElementById('cvForm').style.height = `${375}px`

    }

    if(currentIndex == 1)
    {
        document.getElementById('cvForm').style.height = `${325}px`

    }

    
}

/* This function handles page navigation */
function switcher() 
{    


    let end = false
    let start = false

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
                if(end)
                {
                    document.querySelector('.navigation button:last-child span').innerText = "Suivant"
                    document.querySelector('.navigation button:last-child').classList.add('bg-blue-900')
                    document.querySelector('.navigation button:last-child').classList.remove('bg-green-600')
                    document.querySelector('.navigation button:last-child').lastElementChild.classList.remove('hidden')
                    document.querySelector('.navigation button:last-child').setAttribute('type', 'button')
                    end = !end
                }

                if (currentIndex == 0) 
                {
                    document.querySelector('.navigation button:first-child').classList.add('hidden')
                }
            }
            
            else if(index != 0 && currentIndex < elements.length - 2 )
            {
                currentIndex++

                document.querySelector('.navigation button:first-child').classList.remove('hidden')
                

                if(currentIndex == (elements.length - 2))
                {
                    end = true
                    document.querySelector('.navigation button:last-child').classList.remove('bg-blue-900')
                    document.querySelector('.navigation button:last-child').classList.add('bg-green-600')
                    document.querySelector('.navigation button:last-child').lastElementChild.classList.add('hidden')
                    document.querySelector('.navigation button:last-child span').innerText = "Terminer"

                    setTimeout(()=>{
                        document.querySelector('.navigation button:last-child').setAttribute('type', 'submit')

                    }, 300)
                }

            
            }


            displayHandler(currentIndex)
            formAjust(currentIndex)

        })
    })
}

switcher()

function hideExp(e)
{
    e.currentTarget.parentElement.nextElementSibling.classList.toggle('hidden')
    e.currentTarget.parentElement.nextElementSibling.classList.toggle('flex') 
    
    e.currentTarget.parentElement.nextElementSibling.nextElementSibling.classList.toggle('hidden')
    e.currentTarget.parentElement.nextElementSibling.nextElementSibling.classList.toggle('flex')   
}

function hideEdu(e)
{
    e.currentTarget.parentElement.nextElementSibling.classList.toggle('hidden')
    e.currentTarget.parentElement.nextElementSibling.classList.toggle('flex') 
    
    e.currentTarget.parentElement.nextElementSibling.nextElementSibling.classList.toggle('hidden')
    e.currentTarget.parentElement.nextElementSibling.nextElementSibling.classList.toggle('flex')   
}

function syncEdu(e) 
{
    e.currentTarget.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling.innerText = e.currentTarget.value.trim() || "Aucun Diplôme !"
}

function syncJob(e) 
{
    e.currentTarget.parentElement.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling.innerText = e.currentTarget.value.trim() || "Aucun poste !"
}


//formAjust()