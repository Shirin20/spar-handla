
import React, { useState, useContext } from 'react'
import { CartContext } from './components/CartContext'
import './App.css'
import SearchBar from './components/SearchBar'
import shop from './components/img/shop.jpg'
import logo from './components/img/logo.png'
import Product from './components/Product'
import { Cart } from './components/Cart'
import { Badge, Container, Navbar } from 'react-bootstrap'
import { RiFileList3Line } from "react-icons/ri"



export default function App () {
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useContext(CartContext)

  const [products, setProducts] = useState('')

  const [page,setPage] = useState("")
  const pages = {
    "": <div> <img src={shop} alt='shopping bag' className='shopping-bag'/></div>,
    "products": <div className='products-list'>
      {products.length
      ? products.map(product => {
        return (
          <Product
          key={product.id}
          {...product}
            />
            )
          })
          : <p className='products-noProduct' >No product to show!</p>
          }
          </div>,
    "cart": <div><Cart />
          <button className='btn-md back-button' onClick={click => products.length ? setPage('products') : setPage('') }>Back</button>
    </div>
  }


  /**
   *  When a search is submitted set page to product component
   */
  function updateProductOnSearch (newProductList) {
    setProducts(newProductList)
    setPage('products')  
  }

return (
  <Container>
    <div className='app--container'>
      <Navbar className='navbar'>
        <Container>
          <Navbar.Brand>
            <a href="/">
              <img className='nav--logo' src={logo} alt= 'Spar Handla Butik Logo' />
            </a>
          </Navbar.Brand>

          <Navbar.Brand> 
            <SearchBar handleSubmit={updateProductOnSearch} />
          </Navbar.Brand>
    
          <Navbar.Brand>
            <button onClick={() => setPage('cart')}
                    className='btn btn-warning btn-md shoppin-list-icon'
                    variant="contained" >
                    <RiFileList3Line size="2em" color="black" fontSize="25px" />
                    <Badge>{cart.length}</Badge>
            </button>
          </Navbar.Brand>
        </Container>
      </Navbar>
          {pages[page]}
    </div>
        <footer className='footer'>
          <p>Contact us by mail: Info@sparhandla.se</p>
        </footer> 
  </Container>
  )
}
