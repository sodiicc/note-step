let checkbox = document.querySelectorAll('.checkbox')
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
  let noteText = document.querySelectorAll('.list-item')
  
  noteText.forEach((el)=>{
    text.push([el.innerText, el.previousElementSibling.checked])
  })

    let data = {
      id: id,
      text: text
    }
  let req = await fetch(`/api/lists/checked/${id}`, {
    method: 'PUT',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  }
  )
}