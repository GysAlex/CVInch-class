function changeWorkSpaceBackground()
{
    document.querySelector('#bg-change').addEventListener('change', function(event){
        document.getElementById('try').style.backgroundColor = event.currentTarget.value
    })
}

changeWorkSpaceBackground()

