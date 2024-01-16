import { React, useState } from 'react'


export default function SearchBar (props) {
  const [searchWord, setSearchWord] = useState('')

  function handleChange (event) {
    setSearchWord(event.target.value)
  }

  /**
   * On submit make a fetch request using the search word
   * and get an array of object containing the image url
   * and the name of each product in the array
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    const productsList = await fetchSetProductslist()
    props.handleSubmit(productsList)
    // console.log('search word', productsList)
  }

  /**
   *  Returns an array of product objects
   */
  const fetchSetProductslist = async () => {
    const response = await fetch(`https://cscloud8-18.lnu.se/spar-handla/api/v1/product/${searchWord}`)
    return await response.json()
  }

  return (
    <div className="searchBar--div">
        <form onSubmit={handleSubmit} className="d-flex" >
        <input placeholder='Sök produkt' className="form-control me-sm-2" type="text" onChange={handleChange} />
        <button type='submit' className='btn btn-warning btn-lg search-button' >Sök</button>
      </form>
    </div>
  )
}
