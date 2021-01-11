let fruits = [
    {id: 1, title: 'Яблоки', price: 10, img: 'https://images-na.ssl-images-amazon.com/images/I/918YNa3bAaL._SL1500_.jpg'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://5.imimg.com/data5/VN/YP/MY-33296037/orange-600x600-500x500.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://www.aweta.com/images/produces/overzicht/aweta-product-mango.png'}
]

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img src="${fruit.img}" class="card-img-top" style="height: 300px;" alt="${fruit.title}" />
            <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = fruits.map(fruit => toHTML(fruit)).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close()   
        }}
    ]
})



document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(()=> {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(()=> {
            console.log('Cancel');
            
        })
    }
})
