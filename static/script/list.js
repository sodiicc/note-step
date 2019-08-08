let checkbox = document.querySelectorAll('.checkbox')
console.log('checked', checkbox)
checkbox.forEach((el)=>{
  if(el.checked){
    el.nextElementSibling.style.textDecoration = 'line-through'
    el.nextElementSibling.style.color = 'green'
  }
  el.addEventListener('click', ()=>{

    edList(el.nextElementSibling.getAttribute('data-id'))
    
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
  console.log('id', +id)
  let noteText = document.querySelectorAll('.list-item')
  console.log('noteText', noteText)
  
  noteText.forEach((el)=>{
    console.log('el', el)
    text.push([el.innerText, el.previousElementSibling.checked])
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
  console.log('data-sr', data)
}