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

    /**
    * Genera un id autoincrementable 
    * @returns {number} - Id nuevo
    */
    addIncrementId(){
        return productManager.productId++
    }

    /**
     * Devuelve los productos existentes
     * @returns {Array} - arreglo de productos
     */
    getProduct(){
        return this.products
    }

    /**
    * Crea un producto
    * @param {Object} a - un producto
    * @throws {Error} - si el code se repite o falta alguna propiedad
    */
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

    /**
     * Retorna un producto según id o lanza error si este no existe
     * @param {number} a - un id
     * @throws {Error} - si no existe el id
     * @returns {Object} - produto encontrado
     */
    getProductById(id){
       const product = this.products.find(product => product.id === id)
       if (product){
        return product
       } else{
        throw new Error("Not Found")
       }
    }

}

// Instanciación de productManager
const product_manager = new productManager

//Primera ejecución de getProduct
console.log("\n\n\n1. Primera ejecución de getProduct")
console.log("-----------------------------------\n")
const productos1 = product_manager.getProduct()
console.log(productos1)

// Primera ejecución método addProduct
console.log("\n\n\n2. Primera ejecución método addProduct")
console.log("---------------------------------------\n")
product_manager.addProduct({
                                title: "producto prueba", 
                                description: "Este es un producto prueba", 
                                price: 200, 
                                thumbnail: "Sin imagen", 
                                code: "abc123", 
                                stock: 25
                            })

//Segunda ejecución de getProduct
console.log("\n\n\n3. Segunda ejecución de getProduct")
console.log("----------------------------------\n")
const productos2 = product_manager.getProduct()
console.log(productos2)

//Ejecución de getProductById
console.log("\n\n\n4. Ejecución de getProductById")
console.log("-------------------------------\n")
const producto = product_manager.getProductById(1)
console.log(producto)

// Segunda ejecución método addProduct
console.log("\n\n\n5. Segunda ejecución método addProduct")
console.log("--------------------------------------\n")
product_manager.addProduct({
                                title: "producto prueba", 
                                description: "Este es un producto prueba", 
                                price: 200, 
                                thumbnail: "Sin imagen", 
                                code: "abc123", 
                                stock: 25
                            })

