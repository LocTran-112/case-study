import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Context from './Context';
import Loading from './Components/Reuse/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [hasNewPost, setHasNewPost] = useState(false)
  const [selectedPost, setSelectedPost] = useState(false)

  useEffect(() => {
    initAuthUser();
  }, []);

  const initAuthUser = () => {
    const authenticatedUser = localStorage.getItem('auth');
    if (authenticatedUser) {
      setUser(JSON.parse(authenticatedUser));
    }
  };


  return (
    <Context.Provider value={{ isLoading, setIsLoading, user, setUser, hasNewPost, setHasNewPost, selectedPost, setSelectedPost }}>
      <Router>
        <Routes>
          <Route exact path="/" element ={<Home/>} />
          <Route exact path="/login" element ={<Login/>}/>
        </Routes>
      </Router>
      {isLoading && <Loading />}
    </Context.Provider>
  );
}

export default App;
