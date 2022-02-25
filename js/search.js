const search = function () {
    const input = document.querySelector('.search-block > input')
    const searchBtn = document.querySelector('.search-block > button')

    const renderGoods = (goods) => {
        const goodsConteiner = document.querySelector('.long-goods-list')

        goodsConteiner.innerHTML = ''

        goods.forEach(good => {
            const goodBlock = document.createElement('div')

            goodBlock.classList.add('col-lg-3')
            goodBlock.classList.add('col-sm-6')

            goodBlock.innerHTML = `
                               <div class="goods-card">
                            <span class="label ${good.label ? null : 'd-none'}">${good.label}</span></span>
                            <img src="db/${good.img}" alt="${good.name}" class="goods-image">
                            <h3 class="goods-title">${good.name}</h3>
                            <p class="goods-description">${good.description}</p>
                            <button class="button goods-card-btn add-to-cart" data-id="${good.id}">
                            <span class="button-price">$${good.price}</span>
                            </button>
					</div>
					
            `
            goodsConteiner.append(goodBlock)
        })
    }

    const getData = (value) => {
        fetch('/db/db.json')
            .then((res) => res.json())
            .then((data) => {
                const array = data.filter(good => {
                    return good.name.toLowerCase().includes(value.toLowerCase());

                })

                localStorage.setItem('goods', JSON.stringify(array)) //сохраняем в localStorage

                if (window.location.pathname !== "/goods.html") {
                    window.location.href = '/goods.html'
                } else {
                    renderGoods(array)
                }
            })
    }
    /* input.addEventListener('input', (event) => {
         console.log(event.target.value);
     })*/
    searchBtn.addEventListener('click', () => {
        getData(input.value)
    })

    /*try {
        searchBtn.addEventListener('click', () => {
            console.log(input.value);
        })
    } catch (e) {
        console.error("Уважаемый верстальщик, верните класс, пожалуйста)))");
    
}Таким образом можно поставить заглушку/предосторожность или просто добавить свойс-во котор.не хватает*/
}



search()