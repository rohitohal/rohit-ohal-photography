import "../styles/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <span className="login-overline">
          ADMIN ACCESS
        </span>

        <h1>
          Rohit Ohal Photography
        </h1>

        <p>
          Sign in to access the CMS.
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>

      </div>

    </div>
  );
}