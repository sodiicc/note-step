let noteList = document.querySelector('#noteList')
let createBtn = document.getElementById('addButton')
let createBtnList = document.getElementById('addButtonList')
let currentId

noteList.addEventListener('click', (e) => {
  let id = e.target.dataset.id
  if (e.target.classList.contains('btn-danger')) {
    deleteNote(id)
  } else if (e.target.classList.contains('edit-btn')) {
    editNote(id)
  } else if (e.target.classList.contains('card-body')) {
    window.location.href = `/id/${id}`
  }else if(e.target.classList.contains('edit-list-btn')){
    editList(id)
  }
})

function editNote(id) {
  window.location.href = `/api/notes/${id}`
}

function editList(id) {
  window.location.href = `/api/lists/${id}`
}

async function deleteNote(id) {
  let data = {
    id: id
  }
  let req = await fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })

  let answer = await req.json()
  if (answer.deleted) {
    let currentCol = getCol(id)
    currentCol.remove()
  }
}

function getCol(id) {
  return document.querySelector(`.card-body[data-id="${id}"]`).parentNode.parentNode}

let checkbox = document.querySelectorAll('.checkbox')
checkbox.forEach((el)=>{
  let id = el.nextElementSibling.getAttribute('data-id')
  if(el.checked){
    el.parentElement.parentElement.appendChild(el.parentElement)
    el.nextElementSibling.style.textDecoration = 'line-through'
    el.nextElementSibling.style.color = 'green'
  }
  el.addEventListener('click', (event)=>{
    let e = event.target

    edList(id)
    
    if(el.checked){
      el.parentElement.parentElement.appendChild(el.parentElement)
      el.nextElementSibling.style.textDecoration = 'line-through'
      el.nextElementSibling.style.color = 'green'
    }else{
      el.nextElementSibling.style.textDecoration = ''
      el.nextElementSibling.style.color = ''
      
    }
  })
})

async function edList(id) {
  let text =[]
  let noteText = document.querySelectorAll('.list-item')
  
  noteText.forEach((el)=>{
    if(el.getAttribute('data-id') == id){
      text.push([el.innerText, el.previousElementSibling.checked])

    }
  })

    let data = {
      id: id,
      text: text
    }
  await fetch(`/api/lists/checked/${id}`, {
    method: 'PUT',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  }
  )
}
