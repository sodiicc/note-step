
    let addBtn = document.getElementById('add-btn');

    addBtn.addEventListener('click', function () {
        document.getElementById('form-create').style.display = 'block';
    });


let newInput = document.getElementById('add-input');

document.addEventListener('click',(event)=>{
    if(event.target.id==='add-input'){
        let currenInnerHTMLState = document.getElementById('inputContainer').innerHTML;
        console.log(currenInnerHTMLState);

        document.getElementById('inputContainer').innerHTML=currenInnerHTMLState+`<div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <input type="checkbox" aria-label="Checkbox for following text input">
                </div>
            </div>

            <input type="text" class="form-control" aria-label="Text input with checkbox">
            <button id="add-input" type="button" class="btn btn-secondary">+</button>

        </div>`

    }
});

// newInput.addEventListener('click', function () {
//     document.getElementById('inputContainer').innerHTML+=`<div class="input-group mb-3">
//             <div class="input-group-prepend">
//                 <div class="input-group-text">
//                     <input type="checkbox" aria-label="Checkbox for following text input">
//                 </div>
//             </div>
//
//             <input type="text" class="form-control" aria-label="Text input with checkbox">
//             <button id="add-input" type="button" class="btn btn-secondary">+</button>
//
//         </div>`
// })