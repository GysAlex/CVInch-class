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
    
            newElement.firstElementChild.nextElementSibling.value = ""

            document.querySelector(`#${id} .content`).appendChild(newElement)  

            document.querySelector(`#${id} .content`).lastElementChild.scrollIntoView({block: "end", inline: "nearest", behavior: "smooth"})                


            indexer++

            reOrder()
            if(id == "skills")
            {
                hajust = 250 + 40*(indexer + 1)
                document.querySelector('form').style.height = `${hajust}px`

            }

        }

        else
        {
            ShowLimitError("Maximun de compétences atteint !")
        }

    }

    document.querySelector(`#${id}`).addEventListener('deleted', (e)=>{
        if(indexer >= 0 )
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
        console.log(indexer)

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

        //console.log(Array.from(document.querySelectorAll('#profExperience .content .exp-item')).indexOf(e.currentTarget.parentElement.parentElement))
    
        console.log(Array.from(document.querySelectorAll('#profExperience .content .exp-item')).indexOf(e.currentTarget.parentElement.parentElement))
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
    let index

    if(Array.from(document.querySelectorAll(selection)).length > 1 )
    {
        Array.from(document.querySelectorAll(selection)).forEach((el, indice)=>{
            if (e.currentTarget.parentElement === el) 
            {
                index = indice    
            }
        })
        e.currentTarget.parentElement.remove()
        const sk = new CustomEvent('deleted', {
            detail: {
                "index" : e,
                "indice": index
            }
        })
        document.querySelector(`#${id}`).dispatchEvent(sk) //This is very intersting...
        if(id== "skills")
            document.querySelector('.left-side .l-item .info-cont').dispatchEvent(sk)
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
        const languageDeletedEvent = new CustomEvent('language_deleted');

        document.querySelector("#language").dispatchEvent(languageDeletedEvent);

        Array.from(languageItems).forEach((el, indice)=>{
            if (e.target.closest('div') === el) 
            {
                index = indice    
            }
        })

        console.log(e.target.closest('div'), e.currentTarget.closest('div'))

        const sk = new CustomEvent('deleted', {
            detail: {
                "indice": index
            }
        })

        document.querySelector('.left-side .l-item .info-l').dispatchEvent(sk)

    } else {
        ShowLimitError("Trop peu de langues !");
    }
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
            reOrder();
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

        Array.from(hobbyItems).forEach((el, indice)=>{
            if (e.target.closest('div') === el) 
            {
                index = indice    
            }
        })

        const sk = new CustomEvent('deleted', {
            detail: {
                "indice": index
            }
        })

        document.querySelector('.left-side .l-item .info-h').dispatchEvent(sk)

        document.querySelectorAll("#hobby .content > div").forEach((el, i) => {
            el.querySelector('.comId').innerText = (i + 1);
        });

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
        reOrder();
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



function liveUpdatePersonnalInfo() 
{
    document.querySelector("#personnalInfo input:first-child").addEventListener('input', function(){
        document.getElementById('')
    })
}

function inputController(path1, path2)
{
    //console.log(document.querySelectorAll('.right-side .person-info > div'))

    Array.from(document.querySelectorAll(path1)).map((el) => el.nextElementSibling)
    .forEach((el, index)=>{
        el.addEventListener('input', function (){
            document.querySelectorAll(path2).forEach((ele, i)=>{
                if (index == i) 
                {
                    ele.innerText = el.value.trim()
                }
            })
        })
    })
}

function variableInputController()
{
    let inputNumber
    document.getElementById('addSkills').addEventListener('click', function(){
        inputNumber = document.querySelectorAll('#skills .content .el input').length
        
        let ev = new CustomEvent('addInput', {
            detail:{
                "size": inputNumber
            }
        })

        document.querySelector('.left-side .info .info-cont').dispatchEvent(ev)
    })

}


function updateVarList() 
{
    let el = document.querySelector('.left-side .info .info-cont').firstElementChild

    document.querySelector('.left-side .info .info-cont').addEventListener('addInput', function (event) {        
        let newOne = el.cloneNode(true)
        newOne.lastElementChild.innerText = ""
        el.parentElement.appendChild(newOne)
        inputController('#skills .el label', '.left-side .info-cont .i-element span')


    })

    document.querySelector('.left-side .info .info-cont').addEventListener('deleted', function (event) {
        
        document.querySelectorAll('.left-side .info .info-cont > div').forEach(function(el, i){
            if(i == event.detail.indice)
            {
                el.remove()

            }
        })
        inputController('#skills .el label', '.left-side .info-cont .i-element span')

    })

}

/*function updateVarList(contPath, path1, path2) 
{
    let el = document.querySelector(contPath).firstElementChild

    document.querySelector(contPath).addEventListener('addInput', function (event) {        
        let newOne = el.cloneNode(true)
        newOne.lastElementChild.innerText = ""
        el.parentElement.appendChild(newOne)
        inputController(path1, path2)

    })

    document.querySelector(contPath).addEventListener('deleted', function (event) {
        
        document.querySelectorAll(contPath + '> div').forEach(function(el, i){
            if(i == event.detail.indice)
            {
                el.remove()
            }
        })
        inputController(path2, path2)

    })
}*/


function variableInputController2()
{
    let inputNumber
    document.getElementById('addlanguage').addEventListener('click', function(){
        inputNumber = document.querySelectorAll('#language .content .el').length
        
        console.log('Bonjour')

        let ev = new CustomEvent('addInput', {
            detail:{
                "size": inputNumber
            }
        })

        document.querySelector('.left-side .l-item .info-l').dispatchEvent(ev)
    })

}


function updateVarList2() 
{
    let el = document.querySelector('.left-side .l-item .info-l').firstElementChild

    document.querySelector('.left-side .l-item .info-l').addEventListener('addInput', function (event) {

        let newOne = el.cloneNode(true)
        newOne.firstElementChild.nextElementSibling.innerText = ""
        el.parentElement.appendChild(newOne)

        document.querySelectorAll('.left-side .l-item .info-l').forEach(function(el){
            inputController('#language .el label', '.left-side .l-item .info-l .i-element .lg')
            inputController('#language .el .tgb', '.left-side .l-item .info-l .i-element .level')

        })
    
            
    })

    document.querySelector('.left-side .l-item .info-l').addEventListener('deleted', function (event) {
        
        console.log(event.detail.indice)
        document.querySelectorAll('.left-side .l-item .info-l > div').forEach(function(el, i){
            if(i == event.detail.indice)
            {
                el.remove()

            }
            inputController('#language .el label', '.left-side .l-item .info-l .i-element .lg')
            inputController('#language .el .tgb', '.left-side .l-item .info-l .i-element .level')

        })


    })

}

variableInputController2()
updateVarList2()


function variableInputController3()
{
    let inputNumber
    document.getElementById('addhobby').addEventListener('click', function(){
        inputNumber = document.querySelectorAll('#hobby .content .el input').length
        
        let ev = new CustomEvent('addInput', {
            detail:{
                "size": inputNumber
            }
        })

        document.querySelector('.left-side .info-h').dispatchEvent(ev)
    })

}


function updateVarList3() 
{
    let el = document.querySelector('.left-side  .info-h').firstElementChild

    document.querySelector('.left-side .info-h').addEventListener('addInput', function (event) {        
        let newOne = el.cloneNode(true)
        newOne.firstElementChild.nextElementSibling.innerText = ""
        el.parentElement.appendChild(newOne)
        inputController('#hobby .el label', '.left-side .info-h .i-element span')


    })

    document.querySelector('.left-side .info-h').addEventListener('deleted', function (event) {
        
        console.log(event.detail.indice)
        document.querySelectorAll('.left-side .info-h > div').forEach(function(el, i){
            if(i == event.detail.indice)
            {
                el.remove()

            }
        })
        inputController('#hobby .el label', '.left-side .info-h .i-element span')

    })

}

function updateExperienceList() {
    let el = document.querySelector('.right-side .exp-container').firstElementChild

    document.getElementById('addExp').addEventListener('click', function () {
        let newOne = el.cloneNode(true)
        //newOne.querySelectorAll('div').forEach(div => div.innerText = "") 
        document.querySelector('.right-side .exp-container').appendChild(newOne)
        syncExperienceInputs()
    })

    document.querySelector('.right-side .exp-container').addEventListener('deleteExp', function (event) {
        console.log("dljfkdj")
        if(event.detail.indice > 0)
        {
            document.querySelectorAll('.right-side .exp-container exp-item').forEach(function(el, index){
                if(index == event.detail.indice)
                {
                    console.log(el)
                }                
            })
            syncExperienceInputs() 
        }
    })

    document.querySelectorAll('#profExperience .content .exp-item .btn-cont button:last-child').forEach((el, index)=>{
        el.addEventListener('click', function (event){
            let delE = new CustomEvent('deleteExp', {
                detail:{
                    'indice': index
                }
            })
            console.log(delE)
            document.querySelector('.right-side .exp-container').dispatchEvent(delE)
        })

    })
}

function syncExperienceInputs() {
    document.querySelectorAll('#profExperience .exp-item').forEach((expEl, index) => {
        const startDateInput = expEl.querySelectorAll('input[type="date"]')[0];
        const endDateInput = expEl.querySelectorAll('input[type="date"]')[1];

        // Synchroniser le poste et l'entreprise (inchangé)
        expEl.querySelector('.your_post').addEventListener('input', function () {
            let jobName = document.querySelectorAll('.right-side .exp-container .exp-item')[index].querySelector('.job-name');
            jobName.innerHTML = `${this.value} à <span class="special">${expEl.querySelector('input[placeholder="Orange"]').value}</span>`;
        });

        expEl.querySelector('input[placeholder="Orange"]').addEventListener('input', function () {
            let jobName = document.querySelectorAll('.right-side .exp-container .exp-item')[index].querySelector('.job-name');
            jobName.innerHTML = `${expEl.querySelector('.your_post').value} à <span class="special">${this.value}</span>`;
        });

        startDateInput.addEventListener('input', function () {
            endDateInput.setAttribute('min', this.value); 
            if (endDateInput.value && this.value > endDateInput.value) {
                endDateInput.value = this.value; 
            }
            console.log(this.value)
            document.querySelectorAll('.right-side .exp-container .exp-item')[index].querySelector('.start-date').innerHTML = this.value;
            document.querySelectorAll('.right-side .exp-container .exp-item')[index].querySelector('.end-date').innerText = endDateInput.value;
        });

        endDateInput.addEventListener('input', function () {
            document.querySelectorAll('.right-side .exp-container .exp-item')[index].querySelector('.end-date').innerText = this.value;
        });

        // Synchroniser la description (inchangé)
        expEl.querySelector('textarea[name="description"]').addEventListener('input', function () {
            document.querySelectorAll('.right-side .exp-container .exp-item')[index].querySelector('.desc').innerText = this.value;
        });
    });
}

// Initialisation
updateExperienceList();
syncExperienceInputs();



function updateEduList()
{
    let el = document.querySelector('.right-side .exp-container').firstElementChild

    document.getElementById('addExp').addEventListener('click', function () {
        let newOne = el.cloneNode(true)
        newOne.querySelectorAll('div').forEach(div => div.innerText = "") 

        document.querySelector('.right-side .exp-container').appendChild(newOne)
        syncExperienceInputs()
    })

    document.querySelector('.right-side .exp-container').addEventListener('click', function (event) {
        if (event.target.classList.contains('fa-x')) {
            let expItem = event.target.closest('.exp-item')
            if (expItem) {
                expItem.remove()
                syncExperienceInputs()
            }
        }
    })
}


function syncEduInputs() {
    document.querySelectorAll('#education .exp-item').forEach((expEl, index) => {
        const startDateInput = expEl.querySelectorAll('input[type="date"]')[0]
        const endDateInput = expEl.querySelectorAll('input[type="date"]')[1]

        // Synchroniser le poste et l'entreprise (inchangé)
        expEl.querySelector('.your_diploma').addEventListener('input', function () {
            let diploma = document.querySelectorAll('.right-side .edu-container .edu-item')[index].querySelector('.desc')
            diploma.innerText = `${this.value}`
        });

        expEl.querySelector('.your_university').addEventListener('input', function () {
            let diploma = document.querySelectorAll('.right-side .edu-container .edu-item')[index].querySelector('.university-name')
            diploma.innerText = `${this.value}`
        });

        // Limiter la date de fin
        startDateInput.addEventListener('input', function () {
            endDateInput.setAttribute('min', this.value); // Définir la date de début comme minimum pour la date de fin
            if (endDateInput.value && this.value > endDateInput.value) {
                endDateInput.value = this.value // Ajuster la date de fin si elle est antérieure
            }

            document.querySelectorAll('.right-side .edu-container .edu-item')[index].querySelector('.start-date').innerText = this.value
            document.querySelectorAll('.right-side .edu-container .edu-item')[index].querySelector('.end-date').innerText = endDateInput.value
        })

        endDateInput.addEventListener('input', function () {
            document.querySelectorAll('.right-side .edu-container .edu-item')[index].querySelector('.end-date').innerText = this.value
        })

    })
}



























variableInputController3()
updateVarList3()














variableInputController()
updateVarList()

inputController('#personnalInfo .el label', '.right-side .person-info > div')
inputController('#formContact .el label', '.left-side .info .i-element span')
inputController('#skills .el label', '.left-side .info-cont .i-element span')
inputController('#language .el label', '.left-side .l-item .info-l .i-element .lg')
inputController('#language .el .tgb', '.left-side .l-item .info-l .i-element .level')
inputController('#hobby .el label', '.left-side .info-h .i-element span')






languageFormHandler()
hobbyFormHandler()
referenceFormHandler() 
switcher()



