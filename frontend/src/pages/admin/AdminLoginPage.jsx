import { Gauge } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../api/client.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const response = await api.post("/auth/login", form);
      login(response.data.data);
      toast.success("Welcome back");
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="admin-auth-shell">
      <form className="glass-card admin-auth-card" onSubmit={handleSubmit}>
        <div className="admin-auth-heading">
          <Gauge />
          <div>
            <span className="eyebrow">Admin Access</span>
            <h1>Auto Carz Dashboard</h1>
          </div>
        </div>
        <input
          type="email"
          required
          placeholder="Admin email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
        />
        <button className="button primary" disabled={submitting}>
          {submitting ? "Signing in..." : "Login"}
        </button>
      </form>
    </section>
  );
};

export default AdminLoginPage;
