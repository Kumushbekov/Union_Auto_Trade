function getPosts() {
    fetch('https://simple-ecommrce-expressjs.onrender.com/favorite')
        .then((response) => response.json())
        .then((card) => {

            const container = document.getElementById('container')

            container.innerHTML = ""

            card.forEach(post => {
                const postElement = document.createElement('div')
                postElement.classList.add('card')
                postElement.style.backgroundColor = 'white'

                const img = document.createElement('img')
                img.classList.add('img_bmwf15')
                img.style.objectFit = 'contain'
                img.src = post.car.img

                const name = document.createElement('p')
                name.textContent = "Описание: " + post.car.name

                const price = document.createElement('p')
                price.textContent = "Цена: " + post.car.price + '$'

                const button = document.createElement('button')
                button.textContent = "Удалить из избранного"

                postElement.appendChild(img)
                postElement.appendChild(name)
                postElement.appendChild(price)
                postElement.appendChild(button)

                container.appendChild(postElement)

                button.addEventListener('click', () => {
                    fetch('https://simple-ecommrce-expressjs.onrender.com/favorite/' + post.car.id, {
                        method: 'delete'
                    }).then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            getPosts()
                        })
                })
            })
        })
}

getPosts()