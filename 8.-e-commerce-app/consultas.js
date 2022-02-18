/**
mutation {
  addProduct(input: {
    name: "Fork",
    image: "img-55",
    price: 555.55,
    onSale: true,
    quantity: 2,
    categoryId: "c01b1ff4-f894-4ef2-b27a-22aacc2fca70",
    description: "Gold Diamond Fork"
  }) {
    id
    name
  }
}

mutation {
  addCategory(input: {
    name: "Office"
  }) {
    id
    name
  }
}

query {
  products (filter: {
    onSale: true,
    avgRating: 3
  }) {
    name
    price
    reviews {
      rating
    }
  }
}

query {
  category(id: "c01b1ff4-f894-4ef2-b27a-22aacc2fca70") {
    id
    name
    products(filter: {
      onSale: true
    }) {
      name
      price
      onSale
    }
  }
}

query {
  category(id: "c01b1ff4-f894-4ef2-b27a-22aacc2fca70") {
    id
    name
    products {
      name
      price
      onSale
    }
  }
}

query {
  products(filter: {onSale: true }) {
    name
    price
    onSale
  }
}

query {
  product(id: "53a0724c-a416-4cac-ae45-bfaedce1f147") {
    name
    description
    image
    price
    reviews {
      title
      comment
      title
    }
  }
}

query {
  products {
    name
    category {
      id
      name
    }
  }
}

query {
  category(id: "c01b1ff4-f894-4ef2-b27a-22aacc2fca70") {
    id
    name
    products {
      name
      price
    }
  }
}

query {
  category(id: "c01b1ff4-f894-4ef2-b27a-22aacc2fca70") {
    id
    name
  }
}

query {
  categories {
    id
    name
  }
}

query {
  product(id: "53a0724c-a416-4cac-ae45-bfaedce1f147") {
    name
    description
    price
    quantity
    onSale
  }
}

query {
  products {
    name
    description
    price
    quantity
    onSale
  }
}

query {
  hello,
  numberOfAnimals,
  price,
  isCool,
  cursos
}

*/