function handler()
{
    userKeys = []
    const cont = document.getElementById('results')
    function makeItem(name, path)
    {
        let div = document.createElement('div')
        div.classList.add('res-item',  'flex',  'flex-row',  'items-center',  'justify-between',  'shrink-0', 'px-1')
        div.innerHTML = `<div class="img-cont rounded-full">
                            <img src=${path} alt="" srcset="" class="w-full h-full object-fill">
                        </div>
                        <div class="name">
                            ${name}
                        </div>
                        <div class="edit">
                            <button class="p-2 bg-blue-900 rounded-3xl text-white" onclick='recover(event)'>
                             consulter
                            </button>
                        </div>`
        cont.appendChild(div)
    }

    function elSetter()
    {
        let users = []
        Object.keys(localStorage).forEach((el)=>{
            userKeys.push(el)
            users[el] = JSON.parse(localStorage[el])
        })        
        
        return users
    }


    function fillingTheSearchContent()
    {
        let essay = elSetter()
        
        Object.keys(essay).forEach(function(el){
            makeItem(essay[el].personalInfo[1], essay[el].img)
        })
    }

    fillingTheSearchContent()

    elSetter()
}

handler()