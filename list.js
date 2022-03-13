const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const mylist = [
    'Skyblock',
    'Bedwars',
    'Murder Mystery',
    'Duels',
    'Skywars',
];

const listItems = []; // it is created to represent the list items

let dragStartIndex; // it keeps track of each index

createList();  

function createList() { //createList function is created to generate a list
    [...mylist]   // ... operator is known as spread  operator, it helps us to make a copy of the array
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)  // mapping the object with the string
        .forEach((person, index) => {   //person represnt each items of the array, index  reprents the indexing  of the items

            const listItem = document.createElement('li');

  // map takes an array and return a new array according to our need
  // Math.random is a js function          

            listItem.setAttribute('data-index', index); 

            listItem.innerHTML = `
        <span class="number">${index + 1}</span> 
         <div class="draggable" draggable = "true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>     
        `;  //the ` operator is used to assign any variable inside ${}
            // draggable = true is a html property that makes the class draggable
            //person-name is the element inside of the array
            // i class is for griplines

            listItems.push(listItem);  //push is an array method that pushes the elements inside of the array

            draggable_list.appendChild(listItem);  // it will append the <li> tag inside <ul>
        });

    addEventListener();
}

//html drag and drop api
function dragStart() {  //
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index'); // it will fetch the closest li tag from which we are fetching the elements
    console.log(dragStartIndex);
}

function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over'); //
}

function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}
function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
}

function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');

    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');

}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if (personName !== mylist[index]) {
            listItem.classList.add('wrong');
        }
        else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}

function addEventListener() {
    const draggables = document.querySelectorAll('.draggable');  //its selecting all the html documents
    const dragListItems = document.querySelectorAll('.draggable-list li'); //it will select all the elements with class name draggable-list li

    draggables.forEach(draggable => { 
        draggable.addEventListener('dragstart', dragStart);  
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}


check.addEventListener("click", checkOrder);