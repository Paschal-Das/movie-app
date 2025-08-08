import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
//

const HomePage = () => {
    const [data, setData] = useState([])
    const [query, setQuery] =useState('')

    useEffect(() => {
        const getMovies = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:5000/get-movies')
                console.log(res.data)
                setData(res.data)
            } catch (error) {
                alert(`Error in fetching data: ${error}`)
            }
        }
        getMovies()
    }, [])

    const filteredMovies=data.filter(movie => (
      movie.title.toLowerCase().includes(query.toLowerCase())
    ))
  return (
    <div >
      {/* Title */}
      <div className="flex justify-between mt-5 items-center mx-10">
        <h1 className='text-blue-700 text-4xl m-4 font-mono'>MDb</h1>
        <input type="text" placeholder='Search movies here' value={query}
            className='bg-gray-200 p-2 w-1/4 h-14 px-10 rounded-4xl mr-20'
            onChange={(e) => setQuery(e.target.value)}
        />
        <i className='fa fa-search absolute left-300 top-12' style={{fontSize: 20}}></i>
        <Link to='/'><i className='fa fa-heart text-red-400' style={{fontSize: 30}}></i></Link>

      </div>


        <div className="grid grid-cols-3 gap-6 p-6">
            {filteredMovies.map(item => (
                <div
  key={item.id}
  className="group relative border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer transform hover:-translate-y-1"
>
  <img
    src={item.image}
    alt={item.title}
    className="w-full h-64 object-cover mb-4 rounded-lg transition-transform duration-300 group-hover:scale-105"
  />
  <h2 className="text-2xl font-bold text-gray-800 mb-2 truncate">{item.title}</h2>
  <p className="text-gray-600 mb-3 line-clamp-3">{item.description}</p>

  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
    <span>📅 {item.release_date}</span>
    <span className="bg-yellow-100 text-yellow-700 font-semibold px-2 py-1 rounded">
      ⭐ {item.rating}
    </span>
  </div>

  <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
    Learn More
  </button>
</div>

            ))}
        </div>


    </div>
  )
}

export default HomePage
