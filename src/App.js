import Header from "./components/Header"
import Details from "./components/Details"
import SearchContent from "./components/SearchContent"
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


const App = () => {
  return (
    <Router>
      <div>
        <Header />
          <Switch>
            <Route path="/search/:id" component={SearchContent} />
            <Route path="/:name/:id" component={Details} />
            <Route path="/" exact component={Home}/>
          </Switch>
      </div>
    </Router>
  )
}

const Home = () => {
  return (
    <>
      
    </>
  )
}

export default App;
