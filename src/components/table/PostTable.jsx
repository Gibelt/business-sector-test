import Table from 'react-bootstrap/Table'

function PostTable({ posts, handleSort }) {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th onClick={() => handleSort('id')} className="table-head">
            <div className="d-flex justify-content-center  gap-3">
              ID <i className="bi bi-chevron-down" />
            </div>
          </th>
          <th onClick={() => handleSort('title')} className="table-head">
            <div className="d-flex justify-content-center gap-3">
              Заголовок <i className="bi bi-chevron-down" />
            </div>
          </th>
          <th onClick={() => handleSort('body')} className="table-head">
            <div className="d-flex justify-content-center gap-3">
              Описание <i className="bi bi-chevron-down" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td className="align-middle text-center">
              {post.id}
            </td>
            <td>{post.title}</td>
            <td>{post.body}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default PostTable
