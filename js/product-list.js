class ProductList {
    constructor (productsUrl, renderContainer, cart) {
        this.cart = cart;
        fetch(productsUrl)
            .then(result => result.json() )
            .then(products => {
                this.products = products;
                this.renderCarousel(renderContainer, products);
                this.renderProducts(renderContainer, products);
                this.addEventListeners();
            })
    }
    getProductById(id) {
        return this.products.find(el => el.id === id);
    }
    renderCarousel(container, products) {
        let carouselDomString = ''
        products.forEach(product => {
            carouselDomString +=
                `<div class="carousel-inner">
                    <div class="carousel-item carousel-item-next carousel-item-left">
                      <div class="intro mx-auto">
                        <h1 class="display-4">Welcome to Vydelka</h1>
                        <p class="lead">Best online shop in the World!</p>
                        <hr class="my-4">
                        <p>Buy with discount today</p>
                        <p class="lead">
                          <a class="btn btn-primary btn-lg smooth" href="#products" role="button">Start shopping</a>
                        </p>
                      </div>    
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" src="img/products/${product.image}"
                          alt="${product.title}">
                    </div>
                </div>`;
        });
        container.html(carouselDomString);
    }
    
    renderProducts(container, products) {
        let productListDomString = ''
        products.forEach(product => {
            productListDomString += 
                `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                  <div class="card product">
                    <img class="card-img-top" src="img/products/${product.image}" 
                        alt="${product.title}">
                    <div class="card-body">
                      <h4 class="card-title">${product.title}</h4>
                      <p class="card-text">${product.description}</p>
                      <button class="btn btn-info" data-toggle="modal"
                        data-target="#productInfoModal" data-id="${product.id}">Info
                      </button>
                      <button class="btn btn-primary buy" data-id="${product.id}">
                        $${product.price} - Buy
                      </button>
                    </div>
                  </div>
                </div>`;
        });
        container.html(productListDomString);
    }
    addEventListeners() {
        $('#productInfoModal').on('show.bs.modal', event => {
            const button = $(event.relatedTarget); // Button that triggered the modal
            const id  = String(button.data('id')); // Extract info from data-* attributes
            const product = this.getProductById(id);
            const modal = $('#productInfoModal');
            modal.find('.modal-body .card-img-top')
                .attr('src', 'img/products/'+product.image)
                .attr('alt', product.title);
            modal.find('.modal-body .card-title').text(product.title);
            modal.find('.modal-body .card-text').text(product.description);
            modal.find('button.buy')
                .text(`${product.price} - Buy`)
                .data('id', id);
        });
        $('.card.product button.buy, #productInfoModal button.buy').click( event => {
            const button = $(event.target);
            const id  = button.data('id'); 
            this.cart.addProduct(id);
            window.showAlert('Product added to cart');
        });
    }
}
