class Product{
    constructor({id, title, description, price, thumbnail, code, stock}){
        this.id = id
        this.title = title 
        this.description = description
        this.price = price
        this.thumbnail = thumbnail 
        this.code = code
        this.stock = stock
    }
}

class productManager{
    static productId = 1
    products

    constructor(){
        this.products = []
    }

    //Métodos

    addIncrementId(){
        return productManager.productId++
    }

    addProduct(datosProducto){
        const {title, description, price, thumbnail, code, stock} = datosProducto
        
        const checkCode = this.products.find(product => product.code == code)
        const producValidation = title && description && price && thumbnail && code && stock !== undefined
        
        if (!checkCode && producValidation ){
            const id = this.addIncrementId()
            const product = new Product({id, title, description, price, thumbnail, code, stock})
            this.products.push(product)
            console.log("Producto creado exitosamente.")
        } else{
            throw new Error("No se puede crear producto. Introduce todos los campos.")
        }
    }

    getProductById(id){
       const product = this.products.find(product => product.id == id)
       if (product){
        return product
       } else{
        throw new Error("Not Found")
       }
    }

    getProduct(){
        return this.products
    }
}

// Instanciación de productManager
const product_manager = new productManager

// 1ra ejecución método addProduct
console.log(product_manager)
product_manager.addProduct({
                            title: "producto prueba", 
                            description: "Este es un producto prueba", 
                            price: 200, 
                            thumbnail: "Sin imagen", 
                            code: "abc123", 
                            stock: 25
                        })

//Ejecución de getProduct
const productos = product_manager.getProduct()
console.log(productos)

// 2da ejecución método addProduct
product_manager.addProduct({
    title: "producto prueba", 
    description: "Este es un producto prueba", 
    price: 200, 
    thumbnail: "Sin imagen", 
    code: "abc123", 
    stock: 25
})

//Ejecución de getPgetProductById
const producto = product_manager.getProductById(1)
console.log(producto)