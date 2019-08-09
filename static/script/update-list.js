let saveBtn = document.querySelector('.save-btn')
let addBtn = document.getElementById('add-input')
let list = document.querySelector('.list')

addBtn.addEventListener('click', ()=>{
  let newTask = `
  <input type="checkbox" class="checkbox">
      <textarea class=" note-text col-10 m-0" rows="2" data-id="<%= list.id %>">${document.getElementById('input-form').value}</textarea><button class="bg-danger ml-1 close-btn">X</button>`
let newTaskDiv = document.createElement('div')
newTaskDiv.classList.add('p-2')
newTaskDiv.innerHTML = newTask
  document.querySelector('.form-groups').appendChild(newTaskDiv)
})


saveBtn.addEventListener('click', () => {
  let id = saveBtn.getAttribute('data-id')
  edList(id)
})

list.addEventListener('click', (e)=>{
  if(e.target.classList.contains('close-btn')){
    e.target.parentNode.remove()

  }
})

async function edList(id) {
  let noteTitle = document.getElementById('note-title')
  let noteText = document.querySelectorAll('.note-text')
  let text =[]
  noteText.forEach((el)=>{
    if(el.value){
      text.push([el.value, el.previousElementSibling.checked])

    }
  })
    let data = {
      id: id,
      title: noteTitle.value,
      text: text
    }
  let req = await fetch(`/api/lists/${id}`, {
    method: 'PUT',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  }
  )
  window.location.href = `/`
}