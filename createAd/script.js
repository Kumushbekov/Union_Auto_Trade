const inputAuto = document.getElementById('model_auto')
const inputPrice = document.getElementById('price_auto')
const inputLink = document.getElementById('input_link')
const button = document.getElementById('button')

const sp = new URLSearchParams(window.location.search)
const idAuto = sp.get("id")
console.log(idAuto)
console.log(window.location)

if(idAuto === null) {
    button.addEventListener('click', () => {
        fetch('https://simple-ecommrce-expressjs.onrender.com/car', {
            method: 'post',
            body: JSON.stringify({
                name: inputAuto.value,
                price: inputPrice.value,
                img: inputLink.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((data) => {
                console.log(data)
                inputAuto.value = ''
                inputPrice.value = ''
                inputLink.value = ''
            })
    })
    button.textContent = "Создать объявление"

} else {
    button.addEventListener('click', () => {
        fetch('https://simple-ecommrce-expressjs.onrender.com/car/' + idAuto, {
            method: 'put',
            body: JSON.stringify({
                name: inputAuto.value,
                price: inputPrice.value,
                img: inputLink.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((data) => {
                console.log(data)
                inputAuto.value = ''
                inputPrice.value = ''
                inputLink.value = ''
            })
    })
    
    button.textContent = "Изменить"
    fetch('https://simple-ecommrce-expressjs.onrender.com/car/' + idAuto)
    .then((response) => response.json())
    .then((card) => {
        inputAuto.value = card.name
        inputPrice.value = card.price
        inputLink.value = card.img
    })
}