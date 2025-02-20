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
        {topics.map((topic, index) => {
          let imageUrl;
  
        
          if (topic.slug === 'coding') {
            imageUrl = 'https://img.freepik.com/fotos-gratis/computador-laptop-cinza-ligado_400718-47.jpg?t=st=1740048973~exp=1740052573~hmac=58c743397dd1644cc532e7421dc50e6b1758184d7341896c344e86dc5669c6bd&w=2000';
          } else if (topic.slug === 'football') {
            imageUrl = 'https://img.freepik.com/fotos-gratis/homem-joga-socerl-no-parque-torneio-de-mini-futebol-cara-em-um-traje-esporte-preto_1157-43536.jpg?t=st=1740049126~exp=1740052726~hmac=bcdcec5d9067f8150f27610b6b8436e24ae84097736ae6d9d4133936875220b1&w=2000';
          } else if (topic.slug === 'cooking') {
            imageUrl = 'https://img.freepik.com/fotos-gratis/vista-superior-das-maos-cortadas-de-cozinheiro-senior-irreconhecivel-corte-cenoura-cozinhar-ensopado-de-legumes_1098-20510.jpg?t=st=1740049182~exp=1740052782~hmac=19e2a3c87857078fbefa53f4747c8a0861dcff957e7278927910b6048a91c653&w=2000';
          }
  
          return (
            <div key={index} className="topic-box" style={{ backgroundImage: `url(${imageUrl})` }}>
              <div className="topic-content">
                <p className="topic">{topic.slug}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
  
};
