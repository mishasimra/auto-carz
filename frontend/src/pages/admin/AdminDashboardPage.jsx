import { LogOut, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/client.js";
import AdminTable from "../../components/admin/AdminTable.jsx";
import LoadingState from "../../components/common/LoadingState.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

const initialProduct = {
  name: "",
  shortDescription: "",
  description: "",
  price: "",
  category: "",
  imageUrl: "",
  specs: "",
  featured: false
};

const initialCategory = { name: "", description: "" };
const initialReview = { customerName: "", rating: 5, comment: "", vehicle: "", featured: false };

const AdminDashboardPage = () => {
  const { logout } = useAuth();
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [productForm, setProductForm] = useState(initialProduct);
  const [categoryForm, setCategoryForm] = useState(initialCategory);
  const [reviewForm, setReviewForm] = useState(initialReview);
  const [uploading, setUploading] = useState(false);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [statsRes, categoriesRes, productsRes, reviewsRes, inquiriesRes] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/categories"),
        api.get("/products"),
        api.get("/reviews"),
        api.get("/inquiries")
      ]);

      setStats(statsRes.data.data);
      setCategories(categoriesRes.data.data);
      setProducts(productsRes.data.data);
      setReviews(reviewsRes.data.data);
      setInquiries(inquiriesRes.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const createCategory = async (event) => {
    event.preventDefault();
    try {
      await api.post("/categories", categoryForm);
      toast.success("Category created");
      setCategoryForm(initialCategory);
      loadDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create category");
    }
  };

  const createProduct = async (event) => {
    event.preventDefault();
    try {
      await api.post("/products", {
        ...productForm,
        price: Number(productForm.price),
        specs: productForm.specs
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        images: productForm.imageUrl ? [productForm.imageUrl] : []
      });
      toast.success("Product created");
      setProductForm(initialProduct);
      loadDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product");
    }
  };

  const uploadProductImage = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const response = await api.post("/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setProductForm((current) => ({ ...current, imageUrl: response.data.data.url }));
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const createReview = async (event) => {
    event.preventDefault();
    try {
      await api.post("/reviews", reviewForm);
      toast.success("Review created");
      setReviewForm(initialReview);
      loadDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create review");
    }
  };

  const handleDelete = async (resource, id, label) => {
    try {
      await api.delete(`/${resource}/${id}`);
      toast.success(`${label} deleted`);
      loadDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to delete ${label.toLowerCase()}`);
    }
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      await api.put(`/inquiries/${id}`, { status });
      toast.success("Inquiry updated");
      loadDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update inquiry");
    }
  };

  if (loading) {
    return <LoadingState label="Loading admin dashboard..." />;
  }

  return (
    <section className="section page-hero-pad admin-page">
      <div className="container">
        <div className="admin-topbar">
          <div>
            <span className="eyebrow">Admin Panel</span>
            <h1>Control your catalog, reviews, and customer inquiries</h1>
          </div>
          <button
            className="button ghost"
            onClick={() => {
              logout();
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="admin-tabs">
          {["overview", "products", "categories", "reviews", "inquiries"].map((item) => (
            <button
              key={item}
              className={tab === item ? "active" : ""}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {tab === "overview" ? (
          <div className="stats-grid">
            {Object.entries(stats).map(([key, value]) => (
              <article key={key} className="stat-card">
                <span>{key}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
        ) : null}

        {tab === "categories" ? (
          <div className="admin-grid">
            <form className="glass-card admin-form" onSubmit={createCategory}>
              <h3>
                <Plus size={16} />
                Add category
              </h3>
              <input
                required
                placeholder="Category name"
                value={categoryForm.name}
                onChange={(event) => setCategoryForm({ ...categoryForm, name: event.target.value })}
              />
              <textarea
                rows="4"
                placeholder="Description"
                value={categoryForm.description}
                onChange={(event) =>
                  setCategoryForm({ ...categoryForm, description: event.target.value })
                }
              />
              <button className="button primary">Save category</button>
            </form>
            <AdminTable
              columns={[
                { key: "name", label: "Name" },
                { key: "description", label: "Description" }
              ]}
              rows={categories}
              actions={(row) => (
                <button
                  className="icon-button"
                  onClick={() => handleDelete("categories", row._id, "Category")}
                >
                  <Trash2 size={16} />
                </button>
              )}
            />
          </div>
        ) : null}

        {tab === "products" ? (
          <div className="admin-grid">
            <form className="glass-card admin-form" onSubmit={createProduct}>
              <h3>
                <Plus size={16} />
                Add product
              </h3>
              <input
                required
                placeholder="Product name"
                value={productForm.name}
                onChange={(event) => setProductForm({ ...productForm, name: event.target.value })}
              />
              <input
                required
                placeholder="Short description"
                value={productForm.shortDescription}
                onChange={(event) =>
                  setProductForm({ ...productForm, shortDescription: event.target.value })
                }
              />
              <textarea
                rows="4"
                required
                placeholder="Full description"
                value={productForm.description}
                onChange={(event) =>
                  setProductForm({ ...productForm, description: event.target.value })
                }
              />
              <input
                type="number"
                required
                placeholder="Price"
                value={productForm.price}
                onChange={(event) => setProductForm({ ...productForm, price: event.target.value })}
              />
              <select
                required
                value={productForm.category}
                onChange={(event) =>
                  setProductForm({ ...productForm, category: event.target.value })
                }
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                placeholder="Image URL"
                value={productForm.imageUrl}
                onChange={(event) =>
                  setProductForm({ ...productForm, imageUrl: event.target.value })
                }
              />
              <input type="file" accept="image/*" onChange={uploadProductImage} />
              {uploading ? <span className="field-hint">Uploading image...</span> : null}
              <input
                placeholder="Specs (comma separated)"
                value={productForm.specs}
                onChange={(event) => setProductForm({ ...productForm, specs: event.target.value })}
              />
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={productForm.featured}
                  onChange={(event) =>
                    setProductForm({ ...productForm, featured: event.target.checked })
                  }
                />
                Featured product
              </label>
              <button className="button primary">Save product</button>
            </form>
            <AdminTable
              columns={[
                { key: "name", label: "Product" },
                { key: "price", label: "Price", render: (row) => `Rs ${row.price}` },
                { key: "category", label: "Category", render: (row) => row.category?.name || "-" }
              ]}
              rows={products}
              actions={(row) => (
                <button
                  className="icon-button"
                  onClick={() => handleDelete("products/admin", row._id, "Product")}
                >
                  <Trash2 size={16} />
                </button>
              )}
            />
          </div>
        ) : null}

        {tab === "reviews" ? (
          <div className="admin-grid">
            <form className="glass-card admin-form" onSubmit={createReview}>
              <h3>
                <Plus size={16} />
                Add review
              </h3>
              <input
                required
                placeholder="Customer name"
                value={reviewForm.customerName}
                onChange={(event) =>
                  setReviewForm({ ...reviewForm, customerName: event.target.value })
                }
              />
              <input
                type="number"
                min="1"
                max="5"
                required
                placeholder="Rating"
                value={reviewForm.rating}
                onChange={(event) => setReviewForm({ ...reviewForm, rating: Number(event.target.value) })}
              />
              <input
                placeholder="Vehicle"
                value={reviewForm.vehicle}
                onChange={(event) => setReviewForm({ ...reviewForm, vehicle: event.target.value })}
              />
              <textarea
                rows="4"
                required
                placeholder="Comment"
                value={reviewForm.comment}
                onChange={(event) => setReviewForm({ ...reviewForm, comment: event.target.value })}
              />
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={reviewForm.featured}
                  onChange={(event) =>
                    setReviewForm({ ...reviewForm, featured: event.target.checked })
                  }
                />
                Featured review
              </label>
              <button className="button primary">Save review</button>
            </form>
            <AdminTable
              columns={[
                { key: "customerName", label: "Customer" },
                { key: "rating", label: "Rating" },
                { key: "comment", label: "Comment" }
              ]}
              rows={reviews}
              actions={(row) => (
                <button
                  className="icon-button"
                  onClick={() => handleDelete("reviews", row._id, "Review")}
                >
                  <Trash2 size={16} />
                </button>
              )}
            />
          </div>
        ) : null}

        {tab === "inquiries" ? (
          <AdminTable
            columns={[
              { key: "name", label: "Customer" },
              { key: "phone", label: "Phone" },
              { key: "message", label: "Message" },
              { key: "status", label: "Status" }
            ]}
            rows={inquiries}
            actions={(row) => (
              <div className="table-actions">
                <button className="tiny-button" onClick={() => updateInquiryStatus(row._id, "contacted")}>
                  Mark Contacted
                </button>
                <button className="tiny-button" onClick={() => updateInquiryStatus(row._id, "closed")}>
                  Close
                </button>
              </div>
            )}
          />
        ) : null}
      </div>
    </section>
  );
};

export default AdminDashboardPage;
