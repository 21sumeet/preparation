import { useEffect, useState } from 'react'

import './App.css'
import Pagination from './components/Pagination';

type Product = {
  id:number ,
  title:string,
  price:number,
  thumbnail:string
}

function App() {
  const [product , setproduct]= useState<Product[]>([]);
  const [currentpage , setcurrentpage]= useState (1);
  const itemsperpage = 10;

  useEffect(() => {
    // fetch data from api
    const fetchdata = async () => {
      const res = await fetch('https://dummyjson.com/products')
      const data = await res.json()
      console.log(data)
      setproduct(data.products);
    }
    fetchdata()
  }, [])
  const startIndex = (currentpage - 1) * itemsperpage;
  const endIndex = startIndex + itemsperpage;
  const paginationdata = product.slice(startIndex, endIndex);

  return (
    <>
      {/* pagination code */}
      <div className="App">
        <div>hello user</div>
         <h2>Products</h2>
          {paginationdata.length === 0 ? (
        <p>Loading...</p>
      ) : (
        paginationdata.map((p) => (
          <div className="card" key={p.id}>
            <img src={p.thumbnail} alt={p.title} className="thumb" />
            <div>
              <h4>{p.title}</h4>
              <p>₹{p.price}</p>
            </div>
          </div>
        ))
      )}
      <Pagination
        currentpage={currentpage}
        totalpages={Math.ceil(product.length / itemsperpage)}
        onPageChange={(page:number) => setcurrentpage(page)}
       />
      </div>
    </>
  )
}

export default App
