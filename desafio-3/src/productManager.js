import fs from 'fs/promises'

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

export class ProductManager{
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
            //Buscamos el id del último elemento en el array para incrementar
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            const id = products[products.length - 1].id + 1
            return id
        } catch (error) {       
            //Si no hay productos retornamos un id inicial     
            return productManager.productId++
        }
    }

    /**
     * Devuelve los productos existentes
     * @returns {Array} - arreglo de productos
     */
    async getProducts(limit){
        try {
            //Si el limit es = 0 devolvemos todos los productos sino la cantidad pedida
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            return limit ? products.splice(0,limit): products
        } catch (e) {
            console.log(e.message)
            //Si no hay producto retornamos array vacío
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

            //Traemos todos los productos
            const products = await this.getProducts()

            //Validamos que no se repita el code ni falten propiedades
            const checkCode = products.find(product => product.code === code)
            const producValidation = title && description && price && thumbnail && code && stock
            
            if (checkCode || !producValidation ){ 
                throw new Error("No se puede crear producto. Introduce todos los campos.")
            } 

            //Generemos id único y creamos producto
            const id = await this.addIncrementId()
            const product = new Product({id, title, description, price, thumbnail, code, stock})
            products.push(product)
            
            //Guardamos producto
            const productsJson = JSON.stringify(products, null, 2)
            await fs.writeFile(this.path, productsJson)
            console.log("Producto creado exitosamente.")
            return product
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
    async getProductById(id){
        try {
            const products = await this.getProducts()
            const product = products.find(product => product.id === id)
            if (!product){
                throw new Error("Not Found")
            }
            return product
        } catch (e) {
            console.log(e.message)
        }
    }

    async updateProduct(id, price){

        try {
            //Buscamos producto a actualizar por id
            let productToUpdate = await this.getProductById(id)

            //Si existe proseguimos, sino lanza el error getProductById
            if (productToUpdate){

                //Obtenemos todos los productos
                const products = await this.getProducts()
    
                //Buscamos le posición de producto en el array
                const index = products.findIndex(product => product.id === id)
    
                //Cambiamos el precio del producto
                productToUpdate.price = price
    
                //Devolvemos producto a la misma posición del array
                products[index] = productToUpdate
                
                //Se evalúa que tenga el mismo id
                if (!productToUpdate.id === id){
                    throw new Error("El producto tiene que tener el mismo id")
                } 
                const productsToUpdate = JSON.stringify(products, null, 2)
                await fs.writeFile(this.path, productsToUpdate) 
                console.log("Producto actualizado", productToUpdate)
                return productToUpdate
            } 
        } catch (e) {
            console.log(e.message)
        }
    }

    async deleteProduct(id){
        try {
            
            //Buscamos producto para ver si existe el id
            let productToDelete = await this.getProductById(id)
        
            if (!productToDelete){
                throw new Error("El producto que buscas no existe")
            }

            const products = await this.getProducts()

            //Filtramos todos los productos excluyendo el id
            const productDeleted = products.filter(product => product.id !== id)
            
            //Guardamos el resto de los productos
            const productsUpdated = JSON.stringify(productDeleted, null, 2)
            await fs.writeFile(this.path, productsUpdated) 
            return {productToDelete, productDeleted}
            

        } catch (e) {
            console.log(e.message)
        }
    }

}
