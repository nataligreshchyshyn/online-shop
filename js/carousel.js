renderCarousel(container, products) {
        let carouselDomString = ''
        products.forEach(product => {
            carouselDomString +=
                `<div class="carousel-item">
                  <img class="d-block w-100" src="img/products/${product.image}"
                      alt="${product.title}">
                </div>`;
        });
        container.html(carouselDomString);
    }
