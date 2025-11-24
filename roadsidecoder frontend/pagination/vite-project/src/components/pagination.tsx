import './Pagination.css'

type props = {
  currentpage: number,
  totalpages: number,
  onPageChange: (page:number) => void
}

const Pagination = ({currentpage , totalpages , onPageChange}:props ) => {
  const pages = [...Array(totalpages)].map((_, i) => i + 1);

  return (
    <div className='pagination '>
        <button
        className="page-btn"
        disabled={currentpage === 1} 
        onClick={() => onPageChange(currentpage - 1)}
        >prev</button>

        {pages.map((page) => (
          <button
            key={page}
            className={`page-btn ${page === currentpage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
        className="page-btn"
        disabled={currentpage === totalpages} 
        onClick={() => onPageChange(currentpage + 1)}
        >next</button>

    </div>
  )
}

export default Pagination