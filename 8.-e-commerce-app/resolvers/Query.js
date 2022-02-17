const { db } = require('../db');

exports.Query = {
    hello: () => {
        return "World!"
    },
    numberOfAnimals: () => {
        return 55;
    },
    price: () => {
        return 12.37
    },
    isCool: () => false,
    cursos: () => {
        return ["Python", "React", "Javascript"]
    },
    products: (parent, args, context) => {
        const { filter } = args;
        let filteredProducts = db.products;

        if (filter) {
            if (filter.onSale === true) {
                filteredProducts = filteredProducts.filter(product => product.onSale);
            }
        }
        return filteredProducts
    },
    product: (parent, args, context) => {
        // console.log(args);
        const productId = args.id;
        const product = db.products.find(product => product.id === productId);
        if (!product) return null;
        return product;
    },
    categories: () => db.categories,
    category: (parent, args, context) => {
        const { id } = args;
        return db.categories.find(category => category.id === id);
    },
};