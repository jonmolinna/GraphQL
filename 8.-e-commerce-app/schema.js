const { gql } = require("apollo-server");

// Schema
// String, Int, Float, Boolean, Arrays
// String! => campo obligatorio
// [String!]! => 1. campo obligado, 2. no devuervas nulo o no anulable por dentro y fuera
exports.typeDefs = gql`
    type Query {
        hello: String,
        numberOfAnimals: Int,
        price: Float,
        isCool: Boolean,
        cursos: [String!]!,
        products(filter: ProductsFilterInput): [Product!]!,
        product(id: ID!): Product,
        categories: [Category!]!
        category(id: ID!): Category
    }

    type Mutation {
        addCategory(input: AddCategoryInput!): Category!
        addProduct(input: AddProductInput!): Product!
        addReview(input: AddReviewInput!): Review!
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        image: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
        category: Category
        reviews: [Review!]!
    }

    type Category {
        id: ID!
        name: String!
        products(filter: ProductsFilterInput): [Product!]!
    }

    type Review {
        id: ID!,
        date: String!,
        title: String!,
        comment: String!
        rating: Int!
    }

    input ProductsFilterInput {
        onSale: Boolean
        avgRating: Int
    }

    input AddCategoryInput {
        name: String!
    }

    input AddProductInput {
        name: String!
        description: String!
        quantity: Int!
        image: String!
        price: Float!
        onSale: Boolean!
        categoryId: String!
    }

    input AddReviewInput {
        date: String!
        title: String!
        comment: String!
        rating: Int!
        productId: ID!
    }
`;