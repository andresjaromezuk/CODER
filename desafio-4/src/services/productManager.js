import fs from 'fs/promises'
import Product from '../models/product.js'

export default class ProductManager{
    static productId = 1

    constructor(path){
        this.path = path
    }

    //Métodos

    /**
    * Valida que no se repita código de producto
    * @param {Object} datosProducto - un producto con sus atributos
    * @param {Array} products - Todos los productos 
    * @throws {Error} - si el code se repite o falta alguna propiedad
    */
    #validateProductCode(datosProducto, products){
        const {code} = datosProducto
        //Validamos que no se repita el code 
        const checkCode = products.find(product => product.code === code)        
        if (checkCode){ 
            throw new Error("No se puede crear producto. El código de producto ya existe.")
        } 
    }

    /**
    * Valida los campos de un producto
    * @param {Object} datosProducto - un producto con sus atributos
    * @throws {Error} - si el code se repite o falta alguna propiedad
    */
    #validateAtributes(datosProducto){
        const {title, description, price, thumbnail, code, stock, status, category} = datosProducto
        
        //Validamos que no se repita el code ni falten propiedades
        const producValidation = title && description && price && code && stock && category && status
        
        if (!producValidation){ 
            throw new Error("No se puede crear producto. Introduce todos los campos.")
        }
    }

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
        
        //Traemos todos los productos
        const products = await this.getProducts()

        //Validación de campos
        this.#validateAtributes(datosProducto)
        this.#validateProductCode(datosProducto, products)

        //Generemos id único y creamos producto
        const id = await this.addIncrementId()
        datosProducto.id = id
        const product = new Product(datosProducto)
        products.push(product)
        
        //Guardamos producto
        const productsJson = JSON.stringify(products, null, 2)
        await fs.writeFile(this.path, productsJson)
        console.log("Producto creado exitosamente.")
        return product
    }

    /**
     * Retorna un producto según id o lanza error si este no existe
     * @param {number} a - un id
     * @throws {Error} - si no existe el id
     * @returns {Object} - produto encontrado
     */
    async getProductById(id){
        const products = await this.getProducts()
        const product = products.find(product => product.id === id)
        if (!product){
            throw new Error("El producto no existe")
        }
        return product
    }

    async updateProduct(req){
        const {pid} = req.params
        const {body} = req

        //Chequeamos si el producto existe
        await this.getProductById(Number(pid))
        
        //Traemos todos los productos
        const products = await this.getProducts()

        //Validación de campos
        this.#validateAtributes(body)

        //Buscamos le posición de producto en el array
        const index = products.findIndex(product => product.id === Number(pid))
    
        //Asignamos el id 
        body.id = Number(pid)

        //Devolvemos producto a la misma posición del array
        products[index] = body
        
        //Se evalúa que tenga el mismo id
        if (!body.id ===  Number(pid)){
            throw new Error("El producto tiene que tener el mismo id")
        } 
        const productsToUpdate = JSON.stringify(products, null, 2)
        await fs.writeFile(this.path, productsToUpdate) 
        console.log("Producto actualizado", body)
        return body
        
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
