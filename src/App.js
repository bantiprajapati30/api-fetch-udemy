import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies]= useState([]);
  const [isLoading, setIsLoading] =useState(false);
  const [error, setError] = useState(null)

   const fetchMovieHandler =useCallback(async ()=> {
    setIsLoading(true);
    try {
      setError(null);
      const response = await fetch('https://react-http-2cbaf-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json')
      if(!response.ok) {
        throw new Error("something went wrong")
      }
      const data= await response.json();
      const loadedMovies=[];
      for(const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
       console.log(data)
       
        setMovies(loadedMovies);
       
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false);
  }, []);
  
  useEffect(()=> {
    fetchMovieHandler();
  }, [fetchMovieHandler])

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-2cbaf-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json', {
             method: 'POST',
             body: JSON.stringify(movie),
             headers: {
               'Content-type':'application/json'
             }
      });
      const data= await response.json();
      console.log(data);
  }

  //this is advance version of line 53 to 56 start
  let content = <p>Found no movie</p> 
  if(movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if(error) {
    content=<p>{error}</p>
  }
  if (isLoading) {
    content = <p>Loading...</p>
  }
  //this is advance version of line 53 to 56 end
  return (
    <React.Fragment>
      <section>
      <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length ===0 && !error && <p>Movie is not found</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error &&<p>{error}</p>} */}
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
