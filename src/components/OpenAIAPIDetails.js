import React, { useState, useEffect } from "react";
import axios from "axios";

const OpenAIAPIDetails = () => {
  const [apiDetails, setApiDetails] = useState(null);
  const [error, setError] = useState("");

  // Fetch API details on component mount
  useEffect(() => {
    const fetchAPIDetails = async () => {
      try {
        const res = await axios.get("https://api.openai.com/v1/dashboard/billing/subscription", {
          headers: {
            Authorization: `Bearer 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`,
          },
        });

        setApiDetails(res.data);
      } catch (err) {
        console.error("Error fetching API details:", err);
        setError("Failed to fetch API details. Please check the API key or connection.");
      }
    };

    fetchAPIDetails();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!apiDetails) {
    return <p>Loading API details...</p>;
  }

  return (
    <div>
      <h1>OpenAI API Details</h1>
      <p><strong>Plan:</strong> {apiDetails.plan.title}</p>
      <p><strong>Start Date:</strong> {new Date(apiDetails.start_date * 1000).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(apiDetails.end_date * 1000).toLocaleDateString()}</p>
      <p><strong>Total Hard Limit:</strong> ${apiDetails.hard_limit_usd}</p>
    </div>
  );
};

export default OpenAIAPIDetails;
