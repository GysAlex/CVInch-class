let userCount = 0
let res
function store()
{
    document.getElementById('cvForm').addEventListener('submit', function(event){
        event.preventDefault()
        let cv = {
            "id": userCount,
            "img": res,
            "personalInfo": getPersonnalInfo(),
            "contact": getContacts(),
            "skills": getSkills(),
            "languages": getLanguages(),
            "hobbies": getLoisirs(),
            "references": getReferences(),
            "experiences": getExperience(),
            "education": getEducation() 
        }

        localStorage.setItem(`${getPersonnalInfo()[1]}`, JSON.stringify(cv))
        
        console.log(getPersonnalInfo())

        document.getElementById('cvForm').reset()

        document.querySelector('.navigation button:last-child span').innerText = "Suivant"
        document.querySelector('.navigation button:last-child').classList.add('bg-blue-900')
        document.getElementById('cvForm').style.height = `${425}px`
        document.querySelector('.navigation button:first-child').classList.add('hidden')

        let elements = Array.from(document.querySelectorAll('#cvForm > div'))
        elements.forEach((el, index) =>{

            if (index != elements.length - 1) 
            {
                el.classList.add('hide')   
            }

            setTimeout(() => {
            if(index == 0)
                {
                    el.classList.remove('hide')
                }   
            }, 3000);

        })
    })

}


function getPersonnalInfo() 
{
    let res = []
    Array.from(document.querySelectorAll('#personnalInfo .content label')).forEach((el, index) => {
        if (el.nextElementSibling.type != 'file') 
        {
            res.push(el.nextElementSibling.value.trim())   
        }
    })    

    return res
}

function getContacts() 
{
    return Array.from(document.querySelectorAll('#formContact .content .el input')).map((el) => el.value.trim())     
}


function getSkills()
{
    return Array.from(document.querySelectorAll('#skills .content .el input')).map((el) => el.value.trim())
}

function getLanguages()
{
    return [Array.from(document.querySelectorAll('#language .content .el input')).map((el) => el.value.trim()), 
        Array.from(document.querySelectorAll('#language .content .el select')).map((el) => el.value)]

}

function getLoisirs()
{
    return Array.from(document.querySelectorAll('#hobby .content .el input')).map((el) => el.value.trim())

}


function getReferences()
{
    return Array.from(document.querySelectorAll('#references .content .el ')).map((el) => {
        return Array.from(el.querySelectorAll('input')).map((el) => el.value.trim())
    })
}


function getExperience()
{
    return Array.from(document.querySelectorAll('#profExperience .content .exp-item ')).map((el) => {
        return Array.from(el.querySelectorAll('label')).map((el) => el.nextElementSibling.value.trim())
    })
}

function getEducation()
{
    return Array.from(document.querySelectorAll('#education .content .exp-item ')).map((el) => {
        return Array.from(el.querySelectorAll('label')).map((el) => el.nextElementSibling.value.trim())
    })
}


function getImage()
{
    const reader = new FileReader()

    document.getElementById('image').addEventListener('change', function(e){
        
    const f = e.currentTarget.files[0]
    reader.readAsDataURL(f)

    })

        reader.onload = e => {
            res = e.target.result;
        }




}


function recover(e)
{
    let key = e.currentTarget.parentElement.previousElementSibling.innerText
    let user = JSON.parse(localStorage.getItem(key))

    const eve = new CustomEvent('loadCV', {
        detail:{
            'user': user
        }
    })
    
    document.getElementById('cvForm').dispatchEvent(eve)

    document.getElementById('searchModal').classList.remove('showF')  

    setTimeout(() => {
        document.getElementById('welcomeScreen').classList.remove('n-here')
        document.getElementById('form-container').classList.add('n-here')

        setTimeout(() => {
            document.getElementById('cv-container').style.opacity = 1   
        }, 1000);
    }, 1500);

}

store()
getImage()