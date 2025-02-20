import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ArticlesCard } from "../Components/ArticlesCard"
import { ArticleCard } from "../Components/ArticleCard"
import './App.css'
import { UserAccountProvider } from "../context/UserAccountProvider";
import { UserSelector } from "../Components/UserSelector";

function App() {
  

  return (
    <UserAccountProvider>
     <Router>
      <UserSelector/>
      <Routes>
      <Route path="/" element={<ArticlesCard/>} />
      <Route path="/article/:id" element={<ArticleCard />} />
      </Routes>
     </Router>
     </UserAccountProvider>

  );
}

export default App
