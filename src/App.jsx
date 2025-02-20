import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ArticlesCard } from "../Components/ArticlesCard";
import { ArticleCard } from "../Components/ArticleCard";
import "./App.css";
import { UserAccountProvider } from "../context/UserAccountProvider";

import { Header } from "../Components/Header";
import { Users } from "../Components/pages/Users";
import { TopicCard } from "../Components/pages/TopicCard";
import { ArticlesByTopic } from "../Components/pages/ArticlesByTopic";
import  NotFound  from "../Components/pages/NotFound";
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
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserAccountProvider>
  );
}

export default App;
