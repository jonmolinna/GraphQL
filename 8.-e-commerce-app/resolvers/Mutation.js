const { v4: uuid } = require("uuid")

exports.Mutation = {
    addCategory: (parent, { input }, { categories }) => {
        const { name } = input;

        const newCategory = {
            id: uuid(),
            name,
        };

        categories.push(newCategory);

        return newCategory;
    },
    addProduct: (parent, { input }, { products }) => {
        const { name, image, price, onSale, quantity, categoryId, description } = input;
        // tarea: verifica que exista la categoria
        const newProduct = {
            id: uuid(),
            name,
            image,
            price,
            onSale,
            quantity,
            categoryId,
            description
        };

        products.push(newProduct);

        return newProduct;
    },
    addReview: (parent, { input }, { reviews }) => {
        const { date, title, comment, rating, productId } = input;

        const newReview = {
            id: uuid(),
            date,
            title,
            comment,
            rating,
            productId,
        }

        reviews.push(newReview);

        return newReview;
    },
    deleteCategory: (parent, { id }, { db }) => {
        db.categories = db.categories.filter(category => category.id !== id);
        // productos que pertenecen a dicha categoria que devuelva null
        db.products = db.products.map(product => {
            if (product.categoryId === id) return {
                ...product,
                categoryId: null
            }
            else return product
        })
        return true;
    },
    deleteProduct: (parent, { id }, { db }) => {
        db.products = db.products.filter(product => product.id !== id);
        db.reviews = db.reviews.filter(review => review.productId !== id);
        return true;
    },
    deleteReview: (parent, { id }, { db }) => {
        db.reviews = db.reviews.filter(review => review.id !== id);
        return true;
    },
    updateCategory: (parent, { id, input }, { db }) => {
        const index = db.categories.findIndex(category => category.id === id);
        if (index === -1) return null;
        db.categories[index] = {
            ...db.categories[index],
            ...input,
        };
        return db.categories[index];
    },
    updateProduct: (parent, { id, input }, { db }) => {
        const index = db.products.findIndex(product => product.id === id);
        if (index === -1) return null;
        db.products[index] = {
            ...db.products[index],
            ...input,
        };
        return db.products[index];
    },
    updateReview: (parent, { id, input }, { db }) => {
        const index = db.reviews.findIndex(review => review.id === id);
        if (index === -1) return null;
        db.reviews[index] = {
            ...db.reviews[index],
            ...input,
        };
        return db.reviews[index];
    }
};