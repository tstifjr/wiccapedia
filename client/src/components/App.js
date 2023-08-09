import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar'; 
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
// import UserProfile from './UserProfile';
// import EditPage from './EditPage';
import ViewHistory from './ViewHistory';
// import PostPage from './PostPage';
import Page from './Page';
import SearchResults from './SearchResults';

function App() {
  const [username, setUsername] = useState('');

  const handleUser = (user) => setUsername(user);

  const handleLogout = () => {
    fetch('/logout', {
      method : "DELETE",
    }).then(() => {
      // do stuff to frontend upon logging out
      setUsername('')
    })
  }
  console.log(username)

  useEffect(()=>{
    fetch('/check_session').then((res) => {
      if (res.ok) {
        res.json().then((user) => setUsername(user))
      }
    })

  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar username = {username} handleLogout = {handleLogout}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={()=><Signup handleUser={handleUser} />} />
          <Route path="/page/:pageId" component={Page} />
          <Route path="/history/:pageId" component={ViewHistory} />
          <Route path="/search/:query" component={SearchResults} />
          {/* <Route path="/profile" component={UserProfile} />
          <Route path="/edit/:pageId" component={EditPage} />
          <Route path="/post" component={PostPage} /> */}
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
