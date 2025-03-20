import CasualShirt from "../assets/casualShirt.jpg";
import FormalShirt from '../assets/formalShirt.jpg';
import PrintedShirt from '../assets/printedShirt.jpeg';
import DenimJacket from '../assets/denim.jpeg';
import Hoodie from '../assets/hoodie.jpeg';
import LeatherJacket from '../assets/leatherJacket.jpeg'

const products = [
    { 
      id: 1, 
      name: "Casual Shirt", 
      price: "$25", 
      image: CasualShirt,
      sizes: ["S", "M", "L", "XL", "XXL"],
      category: "Shirts",
      inStock: true
    },
    { 
      id: 2, 
      name: "Formal Shirt", 
      price: "$30", 
      image: FormalShirt,
      sizes: ["S", "M", "L", "XL"],
      category: "Shirts",
      inStock: true
    },
    { 
      id: 3, 
      name: "Printed Shirt", 
      price: "$28", 
      image: PrintedShirt,
      sizes: ["M", "L", "XL", "XXL"],
      category: "Shirts",
      inStock: false
    },
    { 
      id: 4, 
      name: "Denim Jacket", 
      price: "$45", 
      image: DenimJacket,
      sizes: ["M", "L", "XL"],
      category: "Jackets",
      inStock: true
    },
    { 
      id: 5, 
      name: "Hoodie", 
      price: "$40", 
      image: Hoodie,
      sizes: ["S", "M", "L", "XL", "XXL"],
      category: "Hoodies",
      inStock: true
    },
    { 
      id: 6, 
      name: "Leather Jacket", 
      price: "$60", 
      image: LeatherJacket,
      sizes: ["M", "L", "XL"],
      category: "Jackets",
      inStock: false
    }
  ];
  

export default products;