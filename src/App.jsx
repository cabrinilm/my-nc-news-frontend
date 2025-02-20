import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ArticlesCard } from "../Components/ArticlesCard";
import { ArticleCard } from "../Components/ArticleCard";
import "./App.css";
import { UserAccountProvider } from "../context/UserAccountProvider";

import { Header } from "../Components/Header";
import { Users } from "../Components/pages/Users";
import { TopicCard } from "../Components/pages/TopicCard";
import { ArticlesByTopic } from "../Components/pages/ArticlesByTopic";
function App() {
  return (
    <UserAccountProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<ArticlesCard />} />
          <Route path="/article/:id" element={<ArticleCard />} />
          <Route path="/topics" element={<TopicCard />} />
          <Route path="/topics/:topic_name" element={<ArticlesByTopic />} />
        </Routes>
      </Router>
    </UserAccountProvider>
  );
}

export default App;
