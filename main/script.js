const inputAuto = document.getElementById('header_auto-input')
const inputPriceFrom = document.getElementById('header_price-input-from')
const inputPriceTill = document.getElementById('header_price-input-till')
const select = document.getElementById('sort')
const buttonSearch = document.getElementById('button_search')

buttonSearch.addEventListener('click', () => {

    const filters = {
        sort: select.value,
        name: inputAuto.value,
        minPrice: inputPriceFrom.value,
        maxPrice: inputPriceTill.value
    }

    const sp = new URLSearchParams(filters)

    getPosts('https://simple-ecommrce-expressjs.onrender.com/car?' + sp)
})

function getPosts(url) {
    fetch(url)
        .then((response) => response.json())
        .then((card) => {

            const container = document.getElementById('container')

            container.innerHTML = ""

            card.forEach(post => {
                const postElement = document.createElement('div')
                postElement.classList.add('card')

                const name = document.createElement('p')
                name.textContent = "Описание: " + post.name
                name.style.color = 'black'
                name.style.width = '200px'
                name.style.display = 'flex'
                name.style.justifyContent = 'center'
                name.style.paddingBottom = '5px'
                name.style.fontFamily = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"

                const img = document.createElement('img')
                img.classList.add('img_bmwf15')
                img.src = post.img
                img.style.width = '200px'
                img.style.height = '150px'
                img.style.objectFit = 'contain'
                img.style.paddingBottom = '5px'

                const price = document.createElement('p')
                price.textContent = "Цена: " + post.price + '$'
                price.style.color = 'black'
                price.style.width = '200px'
                price.style.display = 'flex'
                price.style.justifyContent = 'left'
                price.style.paddingBottom = '5px'
                price.style.fontFamily = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"

                const button = document.createElement('button')
                if (post.isFavorite === false) {
                    button.textContent = "Избранное"
                    button.style.fontFamily = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"
                    button.addEventListener('click', () => {
                        fetch('https://simple-ecommrce-expressjs.onrender.com/favorite', {
                            method: 'post',
                            body: JSON.stringify({
                                carId: post.id,
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then((response) => response.json())
                            .then((data) => {
                                getPosts(url)
                                console.log(data)
                            })
                    })

                } else {
                    button.textContent = "Удалить из избранного"
                    button.style.fontFamily = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"
                    button.addEventListener('click', () => {
                        fetch('https://simple-ecommrce-expressjs.onrender.com/favorite/' + post.id, {
                            method: 'delete'
                        }).then((response) => response.json())
                            .then((data) => {
                                console.log(data)
                                getPosts(url)
                            })
                    })
                }

                const btnDelete = document.createElement('button')
                btnDelete.textContent = "Удалить"
                btnDelete.style.fontFamily = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"
                btnDelete.addEventListener('click', () => {
                    fetch('https://simple-ecommrce-expressjs.onrender.com/car/' + post.id, {
                        method: 'delete'
                    }).then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            getPosts(url)
                        })
                })

                const linkChange = document.createElement('a')
                linkChange.textContent = "Изменить"
                linkChange.style.fontFamily = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"
                linkChange.style.color = 'black'
                linkChange.style.textDecoration = 'none'
                linkChange.style.borderTop = "1px solid #505050"; // Немного темнее
                linkChange.style.borderBottom = "1px solid #505050";
                linkChange.style.borderLeft = "1px solid #505050";
                linkChange.style.borderRight = "1px solid #505050";
                linkChange.style.borderRadius = '10%'
                linkChange.style.fontSize = 'small'
                linkChange.style.cursor = 'default';
                // linkChange.style.backgroundColor = 'white'
                linkChange.setAttribute('href', "../createAd/index.html?id=" + post.id)


                postElement.appendChild(img)
                postElement.appendChild(name)
                postElement.appendChild(price)
                postElement.appendChild(button)
                postElement.appendChild(btnDelete)
                postElement.appendChild(linkChange)


                container.appendChild(postElement)
            })
        })
}

getPosts('https://simple-ecommrce-expressjs.onrender.com/car?')


//  найти контейнер, проверка через консоль лог
//  добавить классы каждому параграффу, чтобы выглядело как надо


// { carId: '9318u7t981y3hhgv' }


// /favorite
// method: 'post'
// { carId: 'wirhvbwiouhowirb' }


// /favorite/:carId
// method: 'delete'

// сократить код

//  добавить кнопку для удаления поста
// ! todo картинки cover и contain для imgr


// ! todo параметры повторить
// при создании объявления сделать так, чтобы кнопка "создать" была заменена на "изменить" и не было запроса "get", соответственно через условие. 
