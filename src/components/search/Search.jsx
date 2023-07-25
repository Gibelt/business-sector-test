import { Form, InputGroup, Button } from 'react-bootstrap'

function Search({ setSearchFilter }) {
  return (
    <InputGroup className="w-50 mb-3" style={{minWidth: '300px'}}>
      <Form.Control
        onChange={(e) => setSearchFilter(e.target.value)}
        as="input"
        placeholder="Поиск"
        className="rounded-0 shadow-none ps-4"
      />
      <InputGroup.Text className="rounded-0">
        <Button variant="transparent">
          <i className="bi bi-search" />
        </Button>
      </InputGroup.Text>
    </InputGroup>
  )
}

export default Search
