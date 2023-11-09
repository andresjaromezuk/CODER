const socket = io()

const span = document.querySelector('#productos')

const boton = document.querySelector('#boton')
boton.addEventListener('click', (e) =>{
  e.preventDefault()
  const title = document.querySelector('.title')
  const description = document.querySelector('.description')
  const price = document.querySelector('.price')
  const code = document.querySelector('.code')
  const stock = document.querySelector('.stock')

  const producto = {
    title:  title.value,
    description: description.value,
    price: price.value, 
    thumbnail: [], 
    code: code.value, 
    stock: stock.value, 
    status:true,
    category: "productos"
  }
  console.log(producto)
  socket.emit('nuevoProducto', producto)
  title.value = ''
  description.value= ''
  price.value = '' 
  code.value =  '' 
  stock.value = '' 
 
})

socket.on('productos', products =>{
  span.innerHTML = ""
  products.forEach(product => {
    span.innerHTML += `
      <li>Producto: ${product.title}</li>
      <p>Code: ${product.code}</p>
      <p>Stock: ${product.stock}</p>
      <div>
        <img src="${product.thumbnail[0]}" alt="">
      </div>`
  });
  
  
})