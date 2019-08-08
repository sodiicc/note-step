let noteList = document.querySelector('#noteList')
let createBtn = document.getElementById('addButton')
let createBtnList = document.getElementById('addButtonList')
let currentId

noteList.addEventListener('click', (e) => {
  let id = e.target.dataset.id
  if (e.target.classList.contains('btn-danger')) {
    console.log('delete')
    deleteNote(id)
  } else if (e.target.classList.contains('edit-btn')) {
    console.log('Edit')
    editNote(id)
  } else if (e.target.classList.contains('card-body')) {
    window.location.href = `/id/${id}`
  }else if(e.target.classList.contains('edit-list-btn')){
    editList(id)
  }
})

async function editNote(id) {
  let data = {
    id: id,
    title: getTitleVal(id),
    text: getTextVal(id)
  }
  console.log('data', data)
  window.location.href = `/api/notes/${id}`
}

async function editList(id) {
  let text =[]
  document.querySelectorAll('.list-item').forEach((el)=>{if(el.getAttribute('data-id') == id){
    text.push(el.innerText)
  }
  })
  console.log('text', text)
  let data = {
    id: id,
    title: getTitleVal(id),
    text: text
  }
  console.log('data', data)
  window.location.href = `/api/lists/${id}`
}

async function deleteNote(id) {
  let data = {
    id: id
  }
  let req = await fetch(`http://127.0.0.1:3000/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
  console.log('JSON.stringify(data)', JSON.stringify(data))

  let answer = await req.json()
  if (answer.deleted) {
    let currentCol = getCol(id)
    currentCol.remove()
  }
}

function getTitleVal(id) {
  return document.querySelector(`.card-body[data-id="${id}"] h3`).innerText
}
function getTextVal(id) {
  return document.querySelector(`.card-body[data-id="${id}"] h4`).innerText
}
function getCol(id) {
  return document.querySelector(`.card-body[data-id="${id}"]`).parentNode.parentNode
}
function getCardBody(id) {
  return document.querySelector(`.card-body[data-id="${id}"]`)
}

let checkbox = document.querySelectorAll('.checkbox')
checkbox.forEach((el)=>{
  let id = el.nextElementSibling.getAttribute('data-id')
  console.log('idElem', id)
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
  console.log('data', data)
  let req = await fetch(`http://127.0.0.1:3000/api/lists/checked/${id}`, {
    method: 'PUT',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  }
  )
}
