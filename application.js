const draggableList = document.getElementById('draggable-list');
const checkButton = document.getElementById('check-button');
const richestPeople = ['Jeff Bezos','Bill Gates','Warren Buffett','Bernard Arnault','Carlos Slim Helu','Amancio Ortega','Larry Ellison','Mark Zuckerberg','Michael Bloomberg','Larry Page'];
const listItems = [];
let dragStartIndex;
function createList(){
     [...richestPeople].map(a => ({value: a,sort: Math.random()}))
                         .sort((a,b) => a.sort - b.sort)
                         .map(a => a.value)
                         .forEach((person,index) => {
                              const list = document.createElement('li');
                              list.setAttribute('data-index',index);
                              list.innerHTML = `
                                   <span class="number">${index + 1}</span>
                                   <div class="draggable" draggable="true">
                                        <p class="person-name">${person}</p>
                                        <i class="fas fa-grip-lines"></i>
                                   </div>
                              `;
                              listItems.push(list);
                              draggableList.appendChild(list);
                         });
     addEventListeners();
}
createList();
function dragStart(){
     dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragEnter(){
     this.classList.add('over');
}
function dragLeave(){
     this.classList.remove('over');
}
function dragOver(event){
     event.preventDefault();
}
function drop(){
     const dragEndIndex = +this.getAttribute('data-index');
     swapItems(dragStartIndex,dragEndIndex);
     this.classList.remove('over');
}
function swapItems(fromIndex,toIndex){
     const itemOne = listItems[fromIndex].querySelector('.draggable');
     const itemTwo = listItems[toIndex].querySelector('.draggable');
     listItems[fromIndex].appendChild(itemTwo);
     listItems[toIndex].appendChild(itemOne);
}
function checkOrder(){
     listItems.forEach((listItem,index) => {
          const personName = listItem.querySelector('.draggable').innerText.trim();
          if(personName !== richestPeople[index]){
               listItem.classList.add('wrong');
          }else{
               listItem.classList.remove('wrong');
               listItem.classList.add('right');
          }
     });
}
checkButton.addEventListener('click',checkOrder);
function addEventListeners(){
     const draggable = document.querySelectorAll('.draggable');
     const draggableItems = document.querySelectorAll('.draggable-list li');
     draggable.forEach(draggables => {
          draggables.addEventListener('dragstart',dragStart);
     });
     draggableItems.forEach(item => {
          item.addEventListener('dragover',dragOver);
          item.addEventListener('drop',drop);
          item.addEventListener('dragenter',dragEnter);
          item.addEventListener('dragleave',dragLeave);
     });
}