import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5050/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5050/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Delete failed!");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5050/products/${editingProduct._id}`,
        editingProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Product updated successfully!");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error("Update failed!");
    }
  };

  if (loading)
    return (
      <div
        className="text-center animate-pulse"
        style={{ padding: "80px 0", color: "#BB4B2A" }}
      >
        LOADING...
      </div>
    );

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div style={{ overflowX: "auto" }}>
        <table
          className="w-full text-left"
          style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}
        >
          <thead>
            <tr
              className="uppercase text-gray-500"
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                padding: "0 16px",
              }}
            >
              <th style={{ paddingBottom: "16px", paddingLeft: "24px" }}>
                Image
              </th>
              <th style={{ paddingBottom: "16px" }}>Name</th>
              <th style={{ paddingBottom: "16px" }}>Price</th>
              <th
                style={{
                  paddingBottom: "16px",
                  paddingRight: "24px",
                  textAlign: "right",
                }}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr
                key={item._id}
                className="group"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  transition: "0.3s",
                }}
              >
                <td
                  style={{
                    padding: "16px 0 16px 24px",
                    borderRadius: "16px 0 0 16px",
                  }}
                >
                  <img
                    src={item.image}
                    alt=""
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </td>

                <td style={{ padding: "16px 0", fontWeight: 500 }}>
                  {item.title}
                </td>

                <td
                  style={{
                    padding: "16px 0",
                    color: "#BB4B2A",
                    fontWeight: 700,
                  }}
                >
                  ${item.price}
                </td>

                <td
                  style={{
                    padding: "16px 24px 16px 0",
                    borderRadius: "0 16px 16px 0",
                    textAlign: "right",
                  }}
                >
                  <button
                    onClick={() => setEditingProduct(item)}
                    style={{
                      padding: "8px",
                      color: "#60a5fa",
                      borderRadius: "8px",
                      marginRight: "8px",
                      transition: "0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(59,130,246,0.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{
                      padding: "8px",
                      color: "#f87171",
                      borderRadius: "8px",
                      transition: "0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(239,68,68,0.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editingProduct && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(6px)",
              padding: "16px",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: "#161616",
                width: "100%",
                maxWidth: "420px",
                padding: "32px",
                borderRadius: "30px",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  marginBottom: "24px",
                  color: "#BB4B2A",
                }}
              >
                Edit Product
              </h2>

              <form onSubmit={handleUpdate} style={{ display: "grid", gap: "16px" }}>
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      title: e.target.value,
                    })
                  }
                  placeholder="Product name"
                  style={{
                    width: "100%",
                    background: "#0f0f0f",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "16px",
                    borderRadius: "12px",
                    outline: "none",
                  }}
                />

                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: Number(e.target.value),
                    })
                  }
                  placeholder="Price"
                  style={{
                    width: "100%",
                    background: "#0f0f0f",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "16px",
                    borderRadius: "12px",
                    outline: "none",
                  }}
                />

                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      image: e.target.value,
                    })
                  }
                  placeholder="Image URL"
                  style={{
                    width: "100%",
                    background: "#0f0f0f",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "16px",
                    borderRadius: "12px",
                    outline: "none",
                  }}
                />

                <div style={{ display: "grid", gap: "4px" }}>
                  <label
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      marginLeft: "4px",
                      color: "#6b7280",
                    }}
                  >
                    Product Label
                  </label>
                  <select
                    value={editingProduct.label || "None"}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        label: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      background: "#0f0f0f",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: "16px",
                      borderRadius: "12px",
                      color: "#d1d5db",
                      outline: "none",
                    }}
                  >
                    <option value="None">None</option>
                    <option value="New">New</option>
                    <option value="Sale">Sale</option>
                    <option value="Best Seller">Best Seller</option>
                  </select>
                </div>

                <div style={{ display: "flex", gap: "12px", paddingTop: "16px" }}>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.05)",
                      padding: "16px",
                      borderRadius: "12px",
                      fontWeight: 700,
                      transition: "0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)")
                    }
                  >
                    CANCEL
                  </button>

                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      background: "#BB4B2A",
                      padding: "16px",
                      borderRadius: "12px",
                      fontWeight: 700,
                      boxShadow: "0 10px 25px rgba(187,75,42,0.2)",
                      transition: "0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.filter = "brightness(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.filter = "brightness(1)")
                    }
                  >
                    SAVE
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminProducts;
