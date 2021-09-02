import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies]= useState([]);
  const [isLoading, setIsLoading] =useState(false);
  const [error, setError] = useState(null)

   const fetchMovieHandler =useCallback(async ()=> {
    setIsLoading(true);
    try {
      setError(null);
      const response = await fetch('https://swapi.dev/api/films')
      if(!response.ok) {
        throw new Error("something went wrong")
      }
      const data= await response.json();
    
        const transformedData=data.results.map(movieData=> {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            releaseDate:movieData.release_date,
            openingText:movieData.opening_crawl
          }
        })
        setMovies(transformedData);
       
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false);
  }, []);
  
  useEffect(()=> {
    fetchMovieHandler();
  }, [fetchMovieHandler])

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
