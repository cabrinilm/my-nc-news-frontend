import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ArticlesCard } from "../Components/ArticlesCard"
import { ArticleCard } from "../Components/ArticleCard"
import './App.css'
import { UserAccountProvider } from "../context/UserAccountProvider";

import { Header } from "../Components/Header";
import { Users } from "../Components/pages/Users";
function App() {
  

  return (
    <UserAccountProvider>
     <Router>
     <Header/>
      <Routes>
        <Route path="/Users" element={<Users/>} />
      <Route path="/" element={<ArticlesCard/>} />
      <Route path="/article/:id" element={<ArticleCard />} />
      </Routes>
     </Router>
     </UserAccountProvider>

  );
}

export default App
