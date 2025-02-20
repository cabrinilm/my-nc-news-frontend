import { useState, useEffect } from "react";
import Loading from "./Loading";
import { getTopics } from "../api";

export const TopicCard = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        const topicData = await getTopics();
        console.log(topicData); 
        setTopics(topicData || []); 
      } catch (error) {
        console.log("Error fetching topics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopicData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <h2>Topics</h2>
      <div className="topics-container">
        {topics.map((topic, index) => (
          <div key={index}>
            <p className="topic">{topic.slug}</p>
          </div>
        ))}
      </div>
    </>
  );
};
