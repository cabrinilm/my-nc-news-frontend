import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ArticlesCard } from "../Components/ArticlesCard"
import { ArticleCard } from "../Components/ArticleCard"
import './App.css'


function App() {


  return (
     <Router>
      <Routes>
      <Route path="/" element={<ArticlesCard/>} />
      <Route path="/article/:id" element={<ArticleCard />} />
      </Routes>
     </Router>
       

  )
}

export default App
