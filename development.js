const draggable = document.querySelectorAll('.draggable');
const container = document.querySelectorAll('.container');
draggable.forEach(draggables => {
     draggables.addEventListener('dragstart',() => {
          draggables.classList.add('dragging');
     });
     draggables.addEventListener('dragend',() => {
          draggables.classList.remove('dragging');
     });
});
container.forEach(containers => {
     containers.addEventListener('dragover',event => {
          event.preventDefault();
          const afterElement = getDragAfterElement(containers,event.clientY);
          const dragging = document.querySelector('.dragging');
          if(afterElement == null){
               containers.appendChild(dragging);
          }else{
               containers.insertBefore(dragging,afterElement);
          }
     });
});
function getDragAfterElement(containers,y){
     const draggingElements = [...containers.querySelectorAll('.draggable:not(.dragging)')];
     return draggingElements.reduce((closest,child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if(offset<0 && offset>closest.offset){
               return {offset: offset,element: child};
          }else{
               return closest;
          }
     },{offset: Number.NEGATIVE_INFINITY}).element;
}