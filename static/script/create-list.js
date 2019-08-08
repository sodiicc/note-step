let addInput = document.getElementById('add-input');
let createBtn = document.getElementById('create-btn');
let addList = document.getElementById('new-task');
let listName = document.getElementById('list-name');
let closeBtn = document.getElementById('close-btn');

closeBtn.addEventListener('click', ()=>{
    closeBtn.parentElement.remove()
})

function getValue() {
    let text = document.getElementById("input_form").value;

    let newLi = document.createElement("li");
    addList.appendChild(newLi);
    newLi.innerHTML = text;

    let deleteTask = document.createElement('button');
    deleteTask.textContent = 'x';
    deleteTask.style.margin = '10px 20px';
    deleteTask.classList.add('bg-danger');
    newLi.appendChild(deleteTask);

    deleteTask.addEventListener('click', function () {
        deleteTask.parentElement.remove()
    })
}

addInput.addEventListener('click', function () {
    getValue();
    document.getElementById("input_form").value = "";

});

createBtn.addEventListener('click', async ()=>{
    let dataList = [];
    let idDate = Date.now()
    const listInputs = Array.from(addList.children)
        listInputs.forEach((e)=>{
            dataCheckbox = [e.firstChild.data, false] 
        dataList.push(dataCheckbox) 
    })
    let data = {
        id: idDate,
        title: listName.value,
        text: dataList,
        list: true
    }

    let req = await fetch('http://127.0.0.1:3000/api/lists', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    console.log('req',req)  
    let ans = await req.json()
    window.location.href = `/`
})
