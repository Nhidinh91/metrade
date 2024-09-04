

export const pageLinks = [
  { id: 1, href: "", text: "Apparel" },
  { id: 2, href: "", text: "Books" },
  { id: 3, href: "", text: "Electronics" },
  { id: 4, href: "", text: "Decor" },
  { id: 5, href: "", text: "Sport" },
  { id: 6, href: "", text: "Entertainment & Services" },
];

export const products = [
  {
    _id: 1,
    name: "Introduction to Programming Textbook",
    image:
      "https://cdn.mall.adeptmind.ai/https%3A%2F%2Ftarget.scene7.com%2Fis%2Fimage%2FTarget%2FGUEST_9a67ab3d-4ba0-4383-9684-016b595c33df%3Fwid%3D1000%26hei%3D1000_large.webp",
    photos: [
      "https://cdn.mall.adeptmind.ai/https%3A%2F%2Ftarget.scene7.com%2Fis%2Fimage%2FTarget%2FGUEST_9a67ab3d-4ba0-4383-9684-016b595c33df%3Fwid%3D1000%26hei%3D1000_large.webp",
      "https://www.oreilly.com/api/v2/epubs/9781788839129/files/assets/f8bd5ea1-098a-4eca-b80f-7b8683546b49.png",
    ],
    description:
      "A comprehensive guide to programming for beginners, covering all the essential concepts and languages.",
    price: 35,
    pickup_point: "Myllypuuro",
    category_id: "Books", // Matched to the 'Books' category
    stock_quantity: 1,
    status: "active",
    created_at: "2024-09-03T08:00:00Z",
    updated_at: "2024-09-03T08:00:00Z",
    deleted_at: null,
  },
  {
    _id: 2,
    name: "Basic Kitchenware Set",
    image:
      "https://m.media-amazon.com/images/I/51sYSZpVkEL._AC_UF894,1000_QL80_.jpg",
    photos: [
      "https://m.media-amazon.com/images/I/51sYSZpVkEL._AC_UF894,1000_QL80_.jpg",
      "https://image.made-in-china.com/202f0j00hjvoyVnRQIqm/19-PCS-Non-Stick-Silicone-Kitchenware-Set-Food-Grade-Cooking-Set-with-Storage-Box-for-Kitchen-Use.webp",
      "https://m.media-amazon.com/images/I/710sadzEabL._AC_UF1000,1000_QL80_.jpg",
    ],
    description:
      "A complete set of kitchenware including pots, pans, and utensils, perfect for student housing.",
    price: 50,
    pickup_point: "Myyrmäki",
    category_id: "Decor", // Matched to the 'Decor' category
    stock_quantity: 2,
    status: "active",
    created_at: "2024-09-03T09:00:00Z",
    updated_at: "2024-09-03T09:00:00Z",
    deleted_at: null,
  },
  {
    _id: 3,
    name: "Laptop Stand",
    image:
      "https://oakywood.shop/cdn/shop/products/220812_Oakywood_D5_0945.jpg?crop=center&height=450&v=1667243131&width=600",
    photos: [
      "https://oakywood.shop/cdn/shop/products/220812_Oakywood_D5_0945.jpg?crop=center&height=450&v=1667243131&width=600",
      "https://www.lifespanfitness.com/cdn/shop/files/wooden-laptop-stand.jpg?v=1701409146",
    ],
    description:
      "Ergonomic laptop stand to improve your posture during long study hours.",
    price: 19,
    pickup_point: "Myyrmäki",
    category_id: "Electronics", // Matched to the 'Electronics' category
    stock_quantity: 1,
    status: "active",
    created_at: "2024-09-03T11:00:00Z",
    updated_at: "2024-09-03T11:00:00Z",
    deleted_at: null,
  },
  {
    _id: 4,
    name: "Wireless Headphones",
    image:
      "https://content.abt.com/image.php/apple-headphones-MGYJ3AMA-angled.jpg?image=/images/products/BDP_Images/apple-headphones-MGYJ3AMA-angled.jpg&canvas=1&width=750&height=550",
    photos: [
      "https://content.abt.com/image.php/apple-headphones-MGYJ3AMA-angled.jpg?image=/images/products/BDP_Images/apple-headphones-MGYJ3AMA-angled.jpg&canvas=1&width=750&height=550",
      "https://images-cdn.ubuy.co.in/633ac057a9a3195e41204741-apple-airpods-max-wireless-over-ear.jpg",
    ],
    description:
      "Noise-canceling wireless headphones for focused study sessions.",
    price: 75,
    pickup_point: "Karamalmi",
    category_id: "Electronics", // Matched to the 'Electronics' category
    stock_quantity: 1,
    status: "active",
    created_at: "2024-09-03T12:00:00Z",
    updated_at: "2024-09-03T12:00:00Z",
    deleted_at: null,
  },
  {
    _id: 5,
    name: "Mathematics Reference Book",
    image:
      "https://m.media-amazon.com/images/I/91HiVdrb-TL._AC_UF1000,1000_QL80_.jpg",
    photos: [
      "https://m.media-amazon.com/images/I/91HiVdrb-TL._AC_UF1000,1000_QL80_.jpg",
      "https://m.media-amazon.com/images/I/51D4PCiPeHL._AC_SX148_SY213_QL70_.jpg",
    ],
    description:
      "An essential reference book for advanced mathematics courses.",
    price: 30,
    pickup_point: "Karamalmi",
    category_id: "Books", // Matched to the 'Books' category
    stock_quantity: 1,
    status: "active",
    created_at: "2024-09-03T14:00:00Z",
    updated_at: "2024-09-03T14:00:00Z",
    deleted_at: null,
  },
  {
    _id: 6,
    name: "Portable Power Bank",
    image:
      "https://sourceec.com.au/product_pic/managed_upload/2023/07/27/pb005_1-175054-3936.jpg",
    photos: [
      "https://sourceec.com.au/product_pic/managed_upload/2023/07/27/pb005_1-175054-3936.jpg",
      "https://i5.walmartimages.com/seo/Power-Bank-2800-USB-Smart-Charger-for-Smartphones-and-Tablets_6b715db6-cfb5-44e2-ac87-b22fa9487e2c.c38ff30f2f784502dacd5b8b05adaf4f.jpeg",
    ],
    description:
      "A high-capacity power bank to keep your devices charged throughout the day.",
    price: 15,
    pickup_point: "Myyrmäki",
    category_id: "Electronics", // Matched to the 'Electronics' category
    stock_quantity: 3,
    status: "active",
    created_at: "2024-09-03T15:00:00Z",
    updated_at: "2024-09-03T15:00:00Z",
    deleted_at: null,
  },
  {
    _id: 7,
    name: "Eco-Friendly Reusable Water Bottle",
    image:
      "https://oceanbottle.co/cdn/shop/products/OceanBottle_GO_Front_Forest-Green_2048px.jpg?v=1674755554&width=340",
    photos: [
      "https://oceanbottle.co/cdn/shop/products/OceanBottle_GO_Front_Forest-Green_2048px.jpg?v=1674755554&width=340",
      "https://www.gearpatrol.com/wp-content/uploads/sites/2/2019/02/Ocean-Bottle-gear-patrol-full-lead-jpg.webp",
    ],
    description:
      "A stainless steel, eco-friendly reusable water bottle with a Metropolia logo.",
    price: 12,
    pickup_point: "Myllypuuro",
    category_id: "Sport", // Matched to the 'Sport' category
    stock_quantity: 2,
    status: "active",
    created_at: "2024-09-03T17:00:00Z",
    updated_at: "2024-09-03T17:00:00Z",
    deleted_at: null,
  },
  {
    _id: 8,
    name: "Men's Casual T-Shirt",
    image:
      "https://s3.ap-south-1.amazonaws.com/goshop.com.bd/uploads/all/Mf7fnZTgN28UkwEnWGU98AVV5cQyjm2HuuGy0qub.jpg",
    photos: [
      "https://s3.ap-south-1.amazonaws.com/goshop.com.bd/uploads/all/Mf7fnZTgN28UkwEnWGU98AVV5cQyjm2HuuGy0qub.jpg",
      "https://static.qns.digital/img/p/2/4/8/2/2/3/1/2482231-full_product.jpg",
    ],
    description:
      "Comfortable cotton T-shirt for everyday wear. Available in multiple colors.",
    price: 15,
    pickup_point: "Myyrmäki",
    category_id: "Clothing", // Matched to the 'Clothing' category
    stock_quantity: 10,
    status: "active",
    created_at: "2024-09-03T18:00:00Z",
    updated_at: "2024-09-03T18:00:00Z",
    deleted_at: null,
  },
  {
    _id: 9,
    name: "Women's Yoga Pants",
    image:
      "https://www.utllibourne.com/wp-content/uploads/2023/09/yoga-pants-for-women-994hkt-1.jpg",
    photos: [
      "https://www.utllibourne.com/wp-content/uploads/2023/09/yoga-pants-for-women-994hkt-1.jpg",
      "https://i.dailymail.co.uk/1s/2022/02/22/10/54495789-0-image-a-4_1645525342880.jpg",
    ],
    description:
      "High-quality yoga pants with moisture-wicking fabric, ideal for workouts.",
    price: 25,
    pickup_point: "Karamalmi",
    category_id: "Clothing", // Matched to the 'Clothing' category
    stock_quantity: 5,
    status: "active",
    created_at: "2024-09-03T18:30:00Z",
    updated_at: "2024-09-03T18:30:00Z",
    deleted_at: null,
  },
  {
    _id: 10,
    name: "Running Shoes",
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2023/09/running-shoes-2048px-5946.jpg?auto=webp&quality=75&width=1024",
    photos: [
      "https://cdn.thewirecutter.com/wp-content/media/2023/09/running-shoes-2048px-5946.jpg?auto=webp&quality=75&width=1024",
      "https://pyxis.nymag.com/v1/imgs/a6d/fc0/4da4be21d1741718404660586a5b6a6f3e.jpg",
    ],
    description:
      "Lightweight and comfortable running shoes for all types of terrain.",
    price: 45,
    pickup_point: "Myyrmäki",
    category_id: "Shoes", // Matched to the 'Shoes' category
    stock_quantity: 6,
    status: "active",
    created_at: "2024-09-03T19:30:00Z",
    updated_at: "2024-09-03T19:30:00Z",
    deleted_at: null,
  },
  {
    _id: 11,
    name: "Men's Leather Dress Shoes",
    image:
      "https://www.barkershoes.com/cdn/shop/collections/8I5A5326_1024x700_crop_center.jpg?v=1618574799",
    photos: [
      "https://www.barkershoes.com/cdn/shop/collections/8I5A5326_1024x700_crop_center.jpg?v=1618574799",
      "https://row.barkershoes.com/cdn/shop/collections/3f33f93653c8f99191d9026e822c136b_1024x700_crop_center.jpg?v=1611838815",
    ],
    description:
      "Classic leather dress shoes with a sleek design, perfect for formal occasions.",
    price: 60,
    pickup_point: "Karamalmi",
    category_id: "Shoes", // Matched to the 'Shoes' category
    stock_quantity: 4,
    status: "active",
    created_at: "2024-09-03T20:00:00Z",
    updated_at: "2024-09-03T20:00:00Z",
    deleted_at: null,
  },
];


export const categories = [
  {
    _id: "Apparel",
    name: "Apparel",
    description: "Clothing and accessories for students",
    parent_id: null,
    ancestors: [],
    children: ["Clothing", "Shoes"],
    is_active: true,
    keywords: ["apparel", "clothing", "accessories"],
    created_at: "2024-09-03T18:00:00Z",
    updated_at: "2024-09-03T18:00:00Z",
  },
  {
    _id: "Clothing",
    name: "Clothing",
    description: "Men’s and women’s clothing",
    parent_id: "Apparel",
    ancestors: ["Apparel"],
    children: [],
    is_active: true,
    keywords: ["clothing", "fashion", "apparel"],
    created_at: "2024-09-03T18:10:00Z",
    updated_at: "2024-09-03T18:10:00Z",
  },
  {
    _id: "Shoes",
    name: "Shoes",
    description: "Footwear for all occasions",
    parent_id: "Apparel",
    ancestors: ["Apparel"],
    children: [],
    is_active: true,
    keywords: ["shoes", "footwear", "apparel"],
    created_at: "2024-09-03T18:20:00Z",
    updated_at: "2024-09-03T18:20:00Z",
  },
  {
    _id: "Books",
    name: "Books",
    description: "Textbooks and reading materials for students",
    parent_id: null,
    ancestors: [],
    children: [],
    is_active: true,
    keywords: ["books", "textbooks", "reading"],
    created_at: "2024-09-03T18:30:00Z",
    updated_at: "2024-09-03T18:30:00Z",
  },
  {
    _id: "Electronics",
    name: "Electronics",
    description: "Gadgets, devices, and tech accessories",
    parent_id: null,
    ancestors: [],
    children: [],
    is_active: true,
    keywords: ["electronics", "gadgets", "devices"],
    created_at: "2024-09-03T18:40:00Z",
    updated_at: "2024-09-03T18:40:00Z",
  },
  {
    _id: "Decor",
    name: "Decor",
    description: "Home decor items for student housing",
    parent_id: null,
    ancestors: [],
    children: [],
    is_active: true,
    keywords: ["decor", "home", "furnishings"],
    created_at: "2024-09-03T18:50:00Z",
    updated_at: "2024-09-03T18:50:00Z",
  },
  {
    _id: "Sport",
    name: "Sport",
    description: "Sporting goods and fitness equipment",
    parent_id: null,
    ancestors: [],
    children: [],
    is_active: true,
    keywords: ["sport", "fitness", "equipment"],
    created_at: "2024-09-03T19:00:00Z",
    updated_at: "2024-09-03T19:00:00Z",
  },
  {
    _id: "Entertainments & Services",
    name: "Entertainments & Services",
    description: "Entertainment options and services for students",
    parent_id: null,
    ancestors: [],
    children: ["Entertainment", "Services"],
    is_active: true,
    keywords: ["entertainment", "services", "activities"],
    created_at: "2024-09-03T19:10:00Z",
    updated_at: "2024-09-03T19:10:00Z",
  },
  {
    _id: "Entertainment",
    name: "Entertainment",
    description: "Tickets, events, and leisure activities",
    parent_id: "Entertainments & Services",
    ancestors: ["Entertainments & Services"],
    children: [],
    is_active: true,
    keywords: ["entertainment", "leisure", "tickets"],
    created_at: "2024-09-03T19:20:00Z",
    updated_at: "2024-09-03T19:20:00Z",
  },
  {
    _id: "Services",
    name: "Services",
    description: "Student services like tutoring and repairs",
    parent_id: "Entertainments & Services",
    ancestors: ["Entertainments & Services"],
    children: [],
    is_active: true,
    keywords: ["services", "tutoring", "repairs"],
    created_at: "2024-09-03T19:30:00Z",
    updated_at: "2024-09-03T19:30:00Z",
  },
];

