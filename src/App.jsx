import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PaginationComponent from './components/pagination/PaginationComponent'
import PostTable from './components/table/PostTable'
import Search from './components/search/Search'

function App() {
  const { search } = window.location
  const params = new URLSearchParams(search)
  const [posts, setPosts] = useState([])
  const [activePage, setActivePage] = useState(
    parseInt(`${params.get('page')}`, 10) || 1,
  )
  const [sortOrder, setSortOrder] = useState('ascending')
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchFilter, setSearchFilter] = useState('')
  const [chevron, setChevron] = useState('down')

  const handleSort = (key) => {
    const sortedData = Array.from(posts).sort((a, b) => {
      if (sortOrder === 'ascending') {
        return key === 'id' ? a[key] - b[key] : a[key].localeCompare(b[key])
      }
      return key === 'id' ? b[key] - a[key] : b[key].localeCompare(a[key])
    })

    setPosts(sortedData)
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
    setChevron(sortOrder === 'ascending' ? 'down' : 'up')
  }

  const handelPageClick = (number) => {
    setActivePage(number)
  }

  const handelPrevPageClick = () => {
    if (activePage > 1) {
      handelPageClick(activePage - 1)
    }
  }

  const handelNextPageClick = () => {
    if (activePage < 34) {
      handelPageClick(Number(activePage) + 1)
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString())
    updatedSearchParams.set('page', activePage)
    setSearchParams(updatedSearchParams.toString())
    window.scrollTo({ behavior: 'smooth', top: '0px' })
  }, [activePage])

  const indexOfLastPost = activePage * 10
  const indexOdFirstPost = indexOfLastPost - 10
  const data = posts.filter((item) => {
    if (searchFilter.toLowerCase() === '') {
      return item
    }
    return (
      item.title.toLowerCase().includes(searchFilter) ||
      item.body.toLowerCase().includes(searchFilter) ||
      String(item.id) === searchFilter
    )
  })

  return (
    <div className="container p-3">
      <Search setSearchFilter={setSearchFilter} />
      <PostTable
        posts={data.slice(indexOdFirstPost, indexOfLastPost)}
        handleSort={handleSort}
        chevron={chevron}
      />
      {data.length > 0 && (
        <PaginationComponent
          itemsCount={data.length}
          itemsPerPage={10}
          currentPage={activePage}
          setCurrentPage={handelPageClick}
          prevPage={handelPrevPageClick}
          nextPage={handelNextPageClick}
        />
      )}
    </div>
  )
}

export default App
