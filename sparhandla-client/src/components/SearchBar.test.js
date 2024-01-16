import SearchBar from './SearchBar'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('On initial rendering, search button is rendered', async () => {
  render(<SearchBar />)
        const SearchButtonElement = screen.getByRole('button', {name:'Sök'});
        expect(SearchButtonElement).toBeInTheDocument();
})

test('On initial rendering, the input field is rendered', async () => {
    render(<SearchBar />)
          const inputElement = screen.getByPlaceholderText(/Sök produkt/i);
          expect(inputElement).toBeInTheDocument();
  })

  test('On initial rendering, the input element should be empty', async () => {
    render(<SearchBar handleSubmit={ () => {console.log('testing')}} />)
    const inputElement = screen.getByPlaceholderText(/Sök produkt/i);
    expect(inputElement).toBeEmptyDOMElement();
})

test('The input Element has the value of the typed in string', async () => {
    render(<SearchBar handleSubmit={ () => {console.log('testing')}} />)
    userEvent.type(screen.getByPlaceholderText(/Sök produkt/i), 'toblerone')
    const inputElement = screen.getByPlaceholderText(/Sök produkt/i);
    expect(inputElement).toHaveValue('toblerone')
})
