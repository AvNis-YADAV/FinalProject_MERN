import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Verified.css";
function Verified() {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [searchParams, setSearchParamas] = useSearchParams();
  const navigate = useNavigate();
  // ?token=jreicjerkjcrejcjrek
  const handleVerifyClick = async () => {
    setLoading(true);
    const token = searchParams.get("token");
    console.log(token);
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/verify/${token}`,
        { method: "GET" }
      );

      if (response.ok) {
        setVerified(true);
        setTimeout(() => navigate("/"), 2000);
      } else {
        setVerified(false);
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setVerified(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <button
        className="verify-btn"
        onClick={handleVerifyClick}
        disabled={loading || verified}
      >
        Verify Email
      </button>
      {loading && <p className="loading">Verifying email...</p>}
      {verified && <p className="verified">Email successfully verified!</p>}
    </div>
  );
}

export default Verified;
