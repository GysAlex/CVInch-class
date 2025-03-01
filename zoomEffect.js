function zoom() {
    let previewArea = document.getElementById('cv-container')
    let scale = 1
    previewArea.addEventListener('wheel', function(event) {
        event.preventDefault()
        if (event.deltaY < 0) {
            scale += 0.1 // Zoom avant
          } else {
            scale -= 0.1 // Zoom arrière
          }
        
          // Limite l'échelle pour éviter un zoom excessif
          scale = Math.max(0.1, Math.min(3, scale))
        
          // Applique la transformation CSS
          previewArea.style.transform = `scale(${scale})`
        }
    )
}

function twoFingers() 
{

    const conteneur = document.getElementById('try');
    let estEnTrainDeDeplacer = false;
    let positionPrecedenteX, positionPrecedenteY;
    
    conteneur.addEventListener('mousedown', (e) => {
      estEnTrainDeDeplacer = true;
      positionPrecedenteX = e.clientX;
      positionPrecedenteY = e.clientY;
      conteneur.style.cursor = 'grabbing';
    });
    
    conteneur.addEventListener('mousemove', (e) => {
      if (!estEnTrainDeDeplacer) return;
    
      const deltaX = positionPrecedenteX - e.clientX;
      const deltaY = positionPrecedenteY - e.clientY;
    
      conteneur.scrollLeft += deltaX;
      conteneur.scrollTop += deltaY;
    
      positionPrecedenteX = e.clientX;
      positionPrecedenteY = e.clientY;
    });
    
    conteneur.addEventListener('mouseup', () => {
      estEnTrainDeDeplacer = false;
      conteneur.style.cursor = 'grab';
    });
    
    conteneur.addEventListener('mouseleave', () => {
      estEnTrainDeDeplacer = false;
      conteneur.style.cursor = 'grab';
    });
 
}



zoom()
twoFingers()