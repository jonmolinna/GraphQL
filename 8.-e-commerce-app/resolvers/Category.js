exports.Category = {
    products: (parent, { filter }, context) => {
        const categoryId = parent.id;
        const { products } = context;
        const categoryProducts = products.filter(product => product.categoryId === categoryId);
        let filteredCategoryProducts = categoryProducts;

        if (filter) {
            if (filter.onSale === true) {
                filteredCategoryProducts = filteredCategoryProducts.filter(product => product.onSale);
            }
        }

        return filteredCategoryProducts;
    }
};