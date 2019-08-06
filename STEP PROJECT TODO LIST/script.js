let addBtn = document.getElementById('add-btn');

addBtn.addEventListener('click', function () {
    document.getElementById('form-create').style.display = 'block';
});


function getValue() {
    let text = document.getElementById("input_form").value;

    let newLi = document.createElement("li");
    document.getElementById('new-task').appendChild(newLi);
    newLi.innerHTML = text;

    let deleteTask = document.createElement('button');
    deleteTask.textContent = 'x';
    deleteTask.style.margin = '10px 20px'
    newLi.appendChild(deleteTask);
    deleteTask.addEventListener('click', function () {
        newLi.style.display= 'none';
    })
}

let addInput = document.getElementById('add-input');
addInput.addEventListener('click', function () {
    getValue();
    document.getElementById("input_form").value = "";

});

