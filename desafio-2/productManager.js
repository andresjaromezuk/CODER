const {promises: fs} = require('fs')

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

    constructor(path){
        this.path = path
    }

    //Métodos

    /**
    * Genera un id autoincrementable 
    * @returns {number} - Id nuevo
    */
    async addIncrementId(){
        try {
            const products = JSON.parse(await fs.readFile(this.path))
            const id = products[products.length - 1].id + 1
            return id
        } catch (error) {            
            return productManager.productId++
        }
    }

    /**
     * Devuelve los productos existentes
     * @returns {Array} - arreglo de productos
     */
    async getProduct(){
        try {
            return JSON.parse(await fs.readFile(this.path))
        } catch (e) {
            return []
        }
    }

    /**
    * Crea un producto
    * @param {Object} a - un producto
    * @throws {Error} - si el code se repite o falta alguna propiedad
    */
    async addProduct(datosProducto){
        const {title, description, price, thumbnail, code, stock} = datosProducto
        
        try {

            const products = await this.getProduct()
            const checkCode = products.find(product => product.code === code)
            const producValidation = title && description && price && thumbnail && code && stock
            
            if (!checkCode && producValidation ){
                
                const id = await this.addIncrementId()
                const product = new Product({id, title, description, price, thumbnail, code, stock})
                products.push(product)
                
                const productsJson = JSON.stringify(products)
                await fs.writeFile(this.path, productsJson)
                console.log("Producto creado exitosamente.")
                return product
            } else {
                throw new Error("No se puede crear producto. Introduce todos los campos.")
            }
        }
        catch(e){
            console.log(e.message)
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
const product_manager = new productManager('./products.json')


// product_manager.addProduct(
//                                 {
//                                     title: "producto prueba", 
//                                     description: "Este es un producto prueba", 
//                                     price: 200, 
//                                     thumbnail: "Sin imagen", 
//                                     code: "abc123", 
//                                     stock: 25
//                                 }
//                             )

product_manager.addProduct(
                                {
                                    title: "producto prueba", 
                                    description: "Este es un producto prueba", 
                                    price: 200, 
                                    thumbnail: "Sin imagen", 
                                    code: "abc789", 
                                    stock: 25
                                }
                            )
