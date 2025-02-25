let currentIndex = 0;
function switcher() 
{    
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
            if (index == 0) 
            {
                currentIndex--   
            }
            
            else
            {
                currentIndex++
            }

            displayHandler(currentIndex)

        })
    })

    

   console.log(currentIndex)
}

switcher()