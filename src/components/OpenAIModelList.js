import React, { useState, useEffect } from "react";
import axios from "axios";

const OpenAIModelList = () => {
  const [models, setModels] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await axios.get("https://api.openai.com/v1/models", {
          headers: {
            Authorization: ``,
          },
        });
        setModels(res.data.data); // `data` contains the list of models
      } catch (err) {
        console.error("Error fetching models:", err);
        setError("Failed to fetch models. Please check the API key or connection.");
      }
    };

    fetchModels();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!models.length) {
    return <p>Loading model list...</p>;
  }

  return (
    <div>
      <h1>OpenAI Model List</h1>
      <ul>
        {models.map((model) => (
          <li key={model.id}>
            <strong>{model.id}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OpenAIModelList;
