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
  console.log('id', id)
  edList(id)
})

list.addEventListener('click', (e)=>{
  if(e.target.classList.contains('close-btn')){
    e.target.parentNode.remove()
    console.log('e.target.parentNode', e.target.parentNode)

  }
})

async function edList(id) {
  console.log('id', +id)
  let noteTitle = document.getElementById('note-title')
  let noteText = document.querySelectorAll('.note-text')
  let text =[]
  noteText.forEach((el)=>{
    text.push([el.value, el.previousElementSibling.checked])
  })
  
  console.log('text', text)
    let data = {
      id: id,
      title: noteTitle.value,
      text: text
    }
  console.log('data', data)
  let req = await fetch(`http://127.0.0.1:3000/api/lists/${id}`, {
    method: 'PUT',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  }
  )
  console.log('data-sr', data)
  window.location.href = `/`
}