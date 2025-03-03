function personalInfoHandler()
{
    let form = document.getElementById('cvForm')
    let cont = document.querySelector('#personnalInfo .content')


    /*On the cv*/
    let cvCont = document.querySelector('#personal-info')

    function syncVal() {
        cont.querySelectorAll('input[type=text]').forEach(function (el, index1) {
            el.addEventListener('input', function (event) {
                cvCont.querySelectorAll('span').forEach(function (val, index2) {
                    if (index1 == index2) {
                        val.innerText = event.currentTarget.value.trim()
                    }
                })
            })   
        })
        cont.querySelector('textarea').addEventListener('input', function (event) {
            cvCont.querySelector('.description').innerText = event.currentTarget.value.trim()
        })
    } 

    form.addEventListener('loadCV', function (event) { //This function handles cvLoading
        let personalInfo = event.detail.user.personalInfo
        document.getElementById('cvForm').style.height = `${375}px`
        personalInfo.forEach((el, index) => {

            cont.querySelectorAll('input[type=text]').forEach(function (el2, index2) {
                if (index == index2)
                    el2.value = el
            })
            cont.querySelector('textarea').value = personalInfo[2]
        })

        personalInfo.forEach((el, index) => {
            cvCont.querySelectorAll('span').forEach(function (el2, index2) {
                if (index == index2)
                    el2.innerText = el
            })
        })
        
        syncVal()

    })

    syncVal()
}


function contactHandler()
{
        /*On the form*/

        let form = document.getElementById('cvForm')
        let cont = document.querySelector('#formContact .content')
    
    
        /*On the cv*/
        let cvCont = document.querySelector('#cv-contact .info')

        function syncVal() {
            cont.querySelectorAll('input').forEach(function (el, index1) {
                el.addEventListener('input', function (event) {
                    cvCont.querySelectorAll('span').forEach(function (val, index2) {
                        if (index1 == index2) {
                            val.innerText = event.currentTarget.value.trim()
                        }
                    })
                })
            })
        }

        form.addEventListener('loadCV', function (event) { //This function handles cvLoading
            let contact = event.detail.user.contact
    
            contact.forEach((el, index) => {
                cont.querySelectorAll('input').forEach(function (el2, index2) {
                    if (index == index2)
                        el2.value = el
                })
            })
    
            contact.forEach((el, index) => {
                cvCont.querySelectorAll('span').forEach(function (el2, index2) {
                    if (index == index2)
                        el2.innerText = el
                })
            })
            
            syncVal()

        })

        syncVal()
    
}


function handLingFileUpload()
{

    /*On the CV */
    let form = document.getElementById('cvForm')
    let imgCont = document.getElementById('cv-img')

    const reader = new FileReader()

    form.addEventListener('loadCV', function (event) { //This function handles cvLoading
        let img = event.detail.user.img
        imgCont.src = img
        
    })


    document.getElementById('image').addEventListener('change', function(e){
        const f = e.currentTarget.files[0]
        reader.readAsDataURL(f)
    })

    reader.onload = e => {
        imgCont.src = e.target.result;
    }


}


function skillsHandler() {
    /*On the form*/
    let indice = 1

    let form = document.getElementById('cvForm')
    let cont = document.querySelector('#skills .content')
    let template = cont.firstElementChild
    let addButton = document.getElementById('addSkills')


    /*On the cv*/
    let cvCont = document.querySelector('#cv-skills .info .info-cont')
    let cvTemplate = cvCont.firstElementChild

    /*The Arrays */
    let cvArr = [cvCont.firstElementChild]
    let foArr = [cont.firstElementChild]

    function createItem() {
        const formEl = template.cloneNode(true)
        formEl.querySelector('input').value = ""
        formEl.setAttribute("ind", indice)

        indice++

        const cvEl = cvTemplate.cloneNode(true)
        cvEl.querySelector('span').innerText = ""

        cvArr.push(cvEl)
        foArr.push(formEl)
        syncVal()

        return [formEl, cvEl]
    }

    function newItem() {
        let items = createItem()

        cont.append(items[0])
        cvCont.append(items[1])

        const eve = new CustomEvent('sk-created')// To ajust the form height
        form.dispatchEvent(eve) //
    }

    function removeBoth(indice) {
        if (cont.children.length > 1) {
            Array.from(cont.children).forEach(function (el, index) {
                if (index == indice) {
                    el.remove()
                }
            })

            Array.from(cvCont.children).forEach(function (el, index) {
                if (index == indice) {
                    el.remove()
                }
            })

            let ee = new CustomEvent('sk-deleted')
            form.dispatchEvent(ee)
        }
    }

    addButton.addEventListener('click', newItem)
    cont.addEventListener('deleted', function (event) {
        removeBoth(event.detail.indice)
    })


    form.addEventListener('loadCV', function (event) { //This function handles cvLoading
        let skills = event.detail.user.skills

        for (let i = 0; i < skills.length - 1; i++) {
            newItem()
        }

        skills.forEach((el, index) => {
            foArr.forEach(function (el2, index2) {
                if (index == index2)
                    el2.querySelector('input').value = el
            })
        })

        skills.forEach((el, index) => {
            cvArr.forEach(function (el2, index2) {
                if (index == index2)
                    el2.querySelector('span').innerText = el
            })
        })

    })


    function syncVal() {
        foArr.forEach(function (el, index1) {
            el.querySelector('input').addEventListener('input', function (event) {
                cvArr.forEach(function (val, index2) {
                    if (index1 == index2) {
                        val.querySelector('span').innerText = event.currentTarget.value.trim()
                    }
                })
            })
        })
    }

    syncVal()

}

function removeSkill(event) {
    let indice = Array.from(document.querySelectorAll('#skills .content .el')).indexOf(event.currentTarget.closest('.el'))
    const newEv = new CustomEvent('deleted', {
        detail: {
            "indice": indice
        }
    })
    document.querySelector('#skills .content').dispatchEvent(newEv)
}


function languageHandler() {
    /*On the form*/
    let indice = 1

    let form = document.getElementById('cvForm')
    let cont = document.querySelector('#language .content')
    let template = cont.firstElementChild
    let addButton = document.getElementById('addlanguage')


    /*On the cv*/
    let cvCont = document.querySelector('#cv-languages .info-l')
    let cvTemplate = cvCont.firstElementChild

    /*The Arrays */
    let cvArr = [cvCont.firstElementChild]
    let foArr = [cont.firstElementChild]

    function createItem() {
        const formEl = template.cloneNode(true)
        formEl.querySelector('input').value = ""
        formEl.setAttribute("ind", indice)

        indice++

        const cvEl = cvTemplate.cloneNode(true)
        cvEl.querySelector('span').innerText = ""
        cvEl.querySelector('span:last-child').innerText = ""


        cvArr.push(cvEl)
        foArr.push(formEl)
        syncVal()

        return [formEl, cvEl]
    }

    function newItem() {
        let items = createItem()

        cont.append(items[0])
        cvCont.append(items[1])


        const eve = new CustomEvent('lg-created')// To ajust the form height
        form.dispatchEvent(eve) //
    }

    function removeBoth(indice) {
        if (cont.children.length > 1) {
            Array.from(cont.children).forEach(function (el, index) {
                if (index == indice) {
                    el.remove()
                }
            })

            Array.from(cvCont.children).forEach(function (el, index) {
                if (index == indice) {
                    el.remove()
                }
            })

            let ee = new CustomEvent('lg-deleted')
            form.dispatchEvent(ee)
        }
    }


    form.addEventListener('loadCV', function (event) { //This function handles cvLoading
        let languages = event.detail.user.languages

        for (let i = 0; i < languages[0].length - 1; i++) {
            newItem()
        }

        languages[0].forEach((el, index) => {
            foArr.forEach(function (el2, index2) {
                if (index == index2)
                    el2.querySelector('input').value = el
            })
        })

        languages[0].forEach((el, index) => {
            cvArr.forEach(function (el2, index2) {
                if (index == index2)
                    el2.querySelector('span').innerText = el
            })
        })

        languages[1].forEach((el, index) => {
            foArr.forEach(function (el2, index2) {
                if (index == index2)
                    el2.querySelector('select').value = el
            })
        })

        languages[0].forEach((el, index) => {
            cvArr.forEach(function (el2, index2) {
                if (index == index2)
                    el2.querySelector('span:last-child').innerText = el
            })
        })

    })

    addButton.addEventListener('click', newItem)
    cont.addEventListener('deleted', function (event) {
        removeBoth(event.detail.indice)
    })

    function syncVal() {
        foArr.forEach(function (el, index1) {
            el.querySelector('input').addEventListener('input', function (event) {
                cvArr.forEach(function (val, index2) {
                    if (index1 == index2) {
                        val.querySelector('span').innerText = event.currentTarget.value.trim()
                    }
                })
            })
            el.querySelector('select').addEventListener('change', function (event) {
                cvArr.forEach(function (val, index2) {
                    if (index1 == index2) {
                        val.querySelector('span:last-child').innerText = event.currentTarget.value.trim()
                    }
                })
            })
        })
    }

    syncVal()
}

function removeLanguage(event) {
    let indice = Array.from(document.querySelectorAll('#language .content .el')).indexOf(event.currentTarget.closest('.el'))
    const newEv = new CustomEvent('deleted', {
        detail: {
            "indice": indice
        }
    })
    document.querySelector('#language .content').dispatchEvent(newEv)
}


function hobbyHandler() {
    /*On the form*/
    let indice = 1

    let form = document.getElementById('cvForm')
    let cont = document.querySelector('#hobby .content')
    let template = cont.firstElementChild
    let addButton = document.getElementById('addhobby')


    /*On the cv*/
    let cvCont = document.querySelector('#cv-hobby .info-h')
    let cvTemplate = cvCont.firstElementChild

    /*The Arrays */
    let cvArr = [cvCont.firstElementChild]
    let foArr = [cont.firstElementChild]

    function createItem() {
        const formEl = template.cloneNode(true)
        formEl.querySelector('input').value = ""
        formEl.setAttribute("ind", indice)

        indice++

        const cvEl = cvTemplate.cloneNode(true)
        cvEl.querySelector('span').innerText = ""

        cvArr.push(cvEl)
        foArr.push(formEl)
        syncVal()

        return [formEl, cvEl]
    }

    function removeBoth(indice) {
        if (cont.children.length > 1) {
            Array.from(cont.children).forEach(function (el, index) {
                if (index == indice) {
                    el.remove()
                }
            })

            Array.from(cvCont.children).forEach(function (el, index) {
                if (index == indice) {
                    el.remove()
                }
            })

            const eve = new CustomEvent('h-deleted')// To ajust the form height
            form.dispatchEvent(eve) //
        }
    }

    function newItem() {
        let items = createItem()

        cont.append(items[0])
        cvCont.append(items[1])

        const eve = new CustomEvent('h-created')// To ajust the form height
        form.dispatchEvent(eve) //
    }

    addButton.addEventListener('click', newItem)
    cont.addEventListener('deleted', function (event) {
        removeBoth(event.detail.indice)
    })

    form.addEventListener('loadCV', function (event) {
        let hobbies = event.detail.user.hobbies

        for (let i = 0; i < hobbies.length - 1; i++) {
            newItem()
        }

        hobbies.forEach((el, index) => {
            foArr.forEach(function (el2, index2) {
                if (index == index2)
                    el2.querySelector('input').value = el
            })
        })

        hobbies.forEach((el, index) => {
            cvArr.forEach(function (el2, index2) {
                if (index == index2)
                    el2.querySelector('span').innerText = el
            })
        })

    })

    function syncVal() {
        foArr.forEach(function (el, index1) {
            el.querySelector('input').addEventListener('input', function (event) {
                cvArr.forEach(function (val, index2) {
                    if (index1 == index2) {
                        val.querySelector('span').innerText = event.currentTarget.value.trim()
                    }
                })
            })
        })
    }

    syncVal()

}

function removeHobby(event) {
    let indice = Array.from(document.querySelectorAll('#hobby .content .el')).indexOf(event.currentTarget.closest('.el'))
    const newEv = new CustomEvent('deleted', {
        detail: {
            "indice": indice
        }
    })
    document.querySelector('#hobby .content').dispatchEvent(newEv)
}


function referencesHandler() {
    /*On the form*/
    let indice = 1

    let form = document.getElementById('cvForm')
    let cont = document.querySelector('#references .content')
    let template = cont.firstElementChild
    let addButton = document.getElementById('addreference')


    /*On the cv*/
    let cvCont = document.querySelector('#cv-references .info')
    let cvTemplate = cvCont.firstElementChild

    /*The Arrays */
    let cvArr = [cvCont.firstElementChild]
    let foArr = [cont.firstElementChild]

    function createItem() {
        const formEl = template.cloneNode(true)
        formEl.querySelectorAll('input').forEach(function (el) {
            el.value = ""
        })
        formEl.setAttribute("ind", indice)

        indice++

        const cvEl = cvTemplate.cloneNode(true)
        cvEl.querySelectorAll('span').forEach(function (el) {
            el.innerText = ""
        })



        cvArr.push(cvEl)
        foArr.push(formEl)
        syncVal()

        return [formEl, cvEl]
    }

    function newItem() {
        let items = createItem()

        cont.append(items[0])
        cvCont.append(items[1])
        const eve = new CustomEvent('ref-created')// To ajust the form height
        form.dispatchEvent(eve) //
    }

    function removeBoth(indice) {
        if (cont.children.length > 1) {
            Array.from(cont.children).forEach(function (el, index) {
                if (index == indice) {
                    el.remove()
                }
            })

            Array.from(cvCont.children).forEach(function (el, index) {
                if (index == indice) {
                    el.remove()
                }
            })
            const eve = new CustomEvent('ref-deleted')// To ajust the form height
            form.dispatchEvent(eve) //
        }
    }

    addButton.addEventListener('click', newItem)
    cont.addEventListener('deleted', function (event) {
        removeBoth(event.detail.indice)
    })

    form.addEventListener('loadCV', function (event) {
        let references = event.detail.user.references

        for (let i = 0; i < references.length - 1; i++) {
            newItem()
        }

        references.forEach((el, index) => {
            foArr.forEach((el2, index2) => {
                if (index == index2) {
                    el.forEach((elem, val) => {
                        el2.querySelectorAll('input').forEach((elem2, val2) => {
                            if (val == val2) {
                                elem2.value = elem
                            }
                        })
                    })
                }
            })
        })

        references.forEach((el, index) => {
            cvArr.forEach((el2, index2) => {
                if (index == index2) {
                    el.forEach((elem, val) => {
                        el2.querySelectorAll('span').forEach((elem2, val2) => {
                            if (val == val2) {
                                elem2.innerText = elem
                            }
                        })
                    })
                }
            })
        })

    })

    function syncVal() {
        foArr.forEach(function (tEl1, index1) {
            tEl1.querySelectorAll('input').forEach(function (el1, i1) {
                cvArr.forEach(function (tEl2, ind2) {
                    if (index1 == ind2) {
                        el1.addEventListener('input', function (event) {
                            tEl2.querySelectorAll('span').forEach(function (element, indexElement) {
                                if (indexElement == i1) {
                                    element.innerText = event.currentTarget.value.trim()
                                }
                            })
                        })
                    }
                })
            })

        })
    }

    syncVal()
}

function removeReference(event) {
    let indice = Array.from(document.querySelectorAll('#references .content .el')).indexOf(event.currentTarget.closest('.el'))
    const newEv = new CustomEvent('deleted', {
        detail: {
            "indice": indice
        }
    })
    document.querySelector('#references .content').dispatchEvent(newEv)
}

function experienceHandler() {
    /*On the form*/
    let indice = 1

    let form = document.getElementById('cvForm')
    let cont = document.querySelector('#profExperience .content')
    let template = cont.firstElementChild
    let addButton = document.getElementById('addExp')


    /*On the cv*/
    let cvCont = document.querySelector('#cv-experiences .exp-container')
    let cvTemplate = cvCont.firstElementChild

    /*The Arrays */
    let cvArr = [cvCont.firstElementChild]
    let foArr = [cont.firstElementChild]

    function createItem() {
        const formEl = template.cloneNode(true)
        formEl.querySelectorAll('label').forEach(function (el) {
            el.nextElementSibling.value = ""
        })
        formEl.setAttribute("ind", indice)

        indice++

        const cvEl = cvTemplate.cloneNode(true)
        cvEl.querySelectorAll('span').forEach(function (el) {
            el.innerText = ""
        })



        cvArr.push(cvEl)
        foArr.push(formEl)
        syncVal()

        return [formEl, cvEl]
    }

    function newItem() {
        let items = createItem()

        cont.append(items[0])

        cont.lastElementChild.scrollIntoView({block: "end", inline: "nearest", behavior: "smooth"})                


        cvCont.append(items[1])
    }

    function removeBoth(indice) {
        if (cont.children.length > 1) {
            Array.from(cont.children).forEach(function (el, index) {
                if (index == indice) {
                    el.remove()
                }
            })

            Array.from(cvCont.children).forEach(function (el, index) {
                if (index == indice) {
                    el.remove()
                }
            })
        }
    }

    addButton.addEventListener('click', newItem)
    cont.addEventListener('deleted', function (event) {
        removeBoth(event.detail.indice)
    })


    form.addEventListener('loadCV', function (event) {
        let experiences = event.detail.user.experiences

        for (let i = 0; i < experiences.length - 1; i++) {
            newItem()
        }

        experiences.forEach(function(exp, index){
            foArr.forEach(function(ele, index1){
                if(index1 == index)
                {
                    ele.querySelectorAll('label').forEach(function(elem, ind){
                        exp.forEach(function(elem2, ind2){
                            if(ind == ind2)
                                elem.nextElementSibling.value = elem2
                        })
                    })
                }
            })
        })

        experiences.forEach(function(exp, index){
            cvArr.forEach(function(ele, index1){
                if(index1 == index)
                {
                    ele.querySelectorAll('.range span')[0].innerText = exp[0]
                    ele.querySelectorAll('.range span')[1].innerText = exp[1]

                    ele.querySelectorAll('.job-name span')[0].innerText = exp[2]
                    ele.querySelectorAll('.job-name span')[1].innerText = exp[3]

                    ele.querySelector('.desc span').innerText = exp[4]
                }
            })
        })
    })

    function syncVal() {
        foArr.forEach(function (tEl1, index1) {
            tEl1.querySelectorAll('input[type=date]').forEach(function (el1, i1) {
                cvArr.forEach(function (cvEL, cvInd) {
                    if (cvInd == index1) {
                        cvEL.querySelectorAll('.range span').forEach(function (cvEl2, cvInd2) {
                            el1.addEventListener('input', function (event) {
                                if (cvInd2 == i1) {
                                    cvEl2.innerText = event.target.value.trim()
                                }
                            })
                        })
                    }
                })
            })

            tEl1.querySelectorAll('.j-info input').forEach(function (el1, i1) {
                cvArr.forEach(function (cvEL, cvInd) {
                    if (cvInd == index1) {
                        cvEL.querySelectorAll('.job-name span').forEach(function (cvEl2, cvInd2) {
                            el1.addEventListener('input', function (event) {
                                if (cvInd2 == i1) {
                                    cvEl2.innerText = event.target.value.trim()
                                }
                            })
                        })
                    }
                })
            })

            tEl1.querySelector("textarea").addEventListener('input', function (event) {
                cvArr.forEach(function (el, ind) {
                    if (index1 == ind)
                        el.querySelector('.desc span').innerText = event.target.value.trim()
                })
            })

        })
    }

    syncVal()
}

function removeExp(event) {
    let indice = Array.from(document.querySelectorAll('#profExperience .content .exp-item')).indexOf(event.currentTarget.closest('.exp-item'))
    const newEv = new CustomEvent('deleted', {
        detail: {
            "indice": indice
        }
    })
    document.querySelector('#profExperience .content').dispatchEvent(newEv)
}

function educationHandler() {
    /*On the form*/
    let indice = 1

    let form = document.getElementById('cvForm')
    let cont = document.querySelector('#education .content')
    let template = cont.firstElementChild
    let addButton = document.getElementById('addEdu')


    /*On the cv*/
    let cvCont = document.querySelector('#cv-formation .edu-container')
    let cvTemplate = cvCont.firstElementChild

    /*The Arrays */
    let cvArr = [cvCont.firstElementChild]
    let foArr = [cont.firstElementChild]

    function createItem() {
        const formEl = template.cloneNode(true)
        formEl.querySelectorAll('label').forEach(function (el) {
            el.nextElementSibling.value = ""
        })
        formEl.setAttribute("ind", indice)

        indice++

        const cvEl = cvTemplate.cloneNode(true)
        cvEl.querySelectorAll('span').forEach(function (el) {
            el.innerText = ""
        })



        cvArr.push(cvEl)
        foArr.push(formEl)
        syncVal()

        return [formEl, cvEl]
    }

    function newItem() {
        let items = createItem()

        cont.append(items[0])
        cont.lastElementChild.scrollIntoView({block: "end", inline: "nearest", behavior: "smooth"}) 
        cvCont.append(items[1])
    }

    function removeBoth(indice) {
        if (cont.children.length > 1) {
            Array.from(cont.children).forEach(function (el, index) {
                if (index == indice) {
                    el.remove()
                }
            })

            Array.from(cvCont.children).forEach(function (el, index) {
                if (index == indice) {
                    el.remove()
                }
            })
        }
    }

    addButton.addEventListener('click', newItem)
    cont.addEventListener('deleted', function (event) {
        removeBoth(event.detail.indice)
    })

    form.addEventListener('loadCV', function (event) {
        let education = event.detail.user.education

        for (let i = 0; i < education.length - 1; i++) {
            newItem()
        }

        education.forEach(function(exp, index){
            foArr.forEach(function(ele, index1){
                if(index1 == index)
                {
                    ele.querySelectorAll('label').forEach(function(elem, ind){
                        exp.forEach(function(elem2, ind2){
                            if(ind == ind2)
                                elem.nextElementSibling.value = elem2
                        })
                    })
                }
            })
        })
        education.forEach(function(exp, index){
            cvArr.forEach(function(ele, index1){
                if(index1 == index)
                {
                    ele.querySelectorAll('.range span')[0].innerText = exp[0]
                    ele.querySelectorAll('.range span')[1].innerText = exp[1]

                    ele.querySelector('.university-name').innerText = exp[2]

                    ele.querySelector('.desc').innerText = exp[3]
                }
            })
        })

    })


    function syncVal() {
        foArr.forEach(function (tEl1, index1) {
            tEl1.querySelectorAll('input[type=date]').forEach(function (el1, i1) {
                cvArr.forEach(function (cvEL, cvInd) {
                    if (cvInd == index1) {
                        cvEL.querySelectorAll('.range span').forEach(function (cvEl2, cvInd2) {
                            el1.addEventListener('input', function (event) {
                                if (cvInd2 == i1) {
                                    cvEl2.innerText = event.target.value.trim()
                                }
                            })
                        })
                    }
                })
            })

            tEl1.querySelector(".school-name input").addEventListener('input', function (event) {
                cvArr.forEach(function (el, ind) {
                    if (index1 == ind)
                        el.querySelector('.university-name').innerText = event.target.value.trim()
                })
            })

            tEl1.querySelector(".j-info input").addEventListener('input', function (event) {
                cvArr.forEach(function (el, ind) {
                    if (index1 == ind)
                        el.querySelector('.desc').innerText = event.target.value.trim()
                })
            })
        })
    }

    syncVal()
}

function removeEdu(event) {
    let indice = Array.from(document.querySelectorAll('#education .content .exp-item')).indexOf(event.currentTarget.closest('.exp-item'))
    const newEv = new CustomEvent('deleted', {
        detail: {
            "indice": indice
        }
    })
    document.querySelector('#education .content').dispatchEvent(newEv)
}




handLingFileUpload()
personalInfoHandler()
contactHandler()
skillsHandler()
languageHandler()
hobbyHandler()
referencesHandler()
experienceHandler()
educationHandler()