import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5050/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders!");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5050/orders/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Status updated to ${newStatus}`);
      setOrders(
        orders.map(o =>
          o._id === id ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  if (loading)
    return (
      <div
        className="text-center font-bold animate-pulse"
        style={{ padding: "80px 0", color: "#BB4B2A" }}
      >
        LOADING...
      </div>
    );

  return (
    <>
      <div style={{ width: "100%", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table
          className="w-full text-left"
          style={{ borderSpacing: "0 12px", borderCollapse: "separate" }}
        >
          <thead>
            <tr
              className="uppercase text-gray-500"
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                padding: "0 16px"
              }}
            >
              <th style={{ paddingBottom: "16px", paddingLeft: "24px" }}>
                Customer / Email
              </th>
              <th style={{ paddingBottom: "16px" }}>Products</th>
              <th style={{ paddingBottom: "16px" }}>Total</th>
              <th style={{ paddingBottom: "16px" }}>Status</th>
              <th
                style={{
                  paddingBottom: "16px",
                  paddingRight: "24px",
                  textAlign: "right"
                }}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <motion.tr
                key={order._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  transition: "0.3s",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.25)"
                }}
              >
                <td
                  style={{
                    padding: "20px 0 20px 24px",
                    borderRadius: "20px 0 0 20px"
                  }}
                >
                  <div style={{ fontWeight: 600, color: "#fff" }}>
                    {order.customerInfo.fullName}
                  </div>
                  <div style={{ fontSize: "11px", color: "#6b7280" }}>
                    {order.customerInfo.email}
                  </div>
                </td>

                <td
                  style={{
                    padding: "20px 0",
                    fontSize: "14px",
                    color: "#d1d5db",
                    fontStyle: "italic"
                  }}
                >
                  {order.items
                    .map(item => item.title)
                    .join(", ")
                    .substring(0, 30)}
                  ...
                </td>

                <td
                  style={{
                    padding: "20px 0",
                    fontFamily: "monospace",
                    color: "#BB4B2A",
                    fontWeight: 700
                  }}
                >
                  ${order.totalPrice}
                </td>

                <td style={{ padding: "20px 0" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "999px",
                      fontSize: "10px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      background:
                        order.status === "Pending"
                          ? "rgba(234,179,8,0.2)"
                          : order.status === "Delivered"
                          ? "rgba(34,197,94,0.2)"
                          : "rgba(59,130,246,0.2)",
                      color:
                        order.status === "Pending"
                          ? "#eab308"
                          : order.status === "Delivered"
                          ? "#22c55e"
                          : "#3b82f6"
                    }}
                  >
                    {order.status}
                  </span>
                </td>

                <td
                  style={{
                    padding: "20px 24px 20px 0",
                    borderRadius: "0 20px 20px 0",
                    textAlign: "right"
                  }}
                >
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    style={{
                      background: "#0f0f0f",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      fontSize: "11px",
                      padding: "8px",
                      borderRadius: "8px",
                      outline: "none",
                      cursor: "pointer"
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "#6b7280",
              fontStyle: "italic"
            }}
          >
            There are no orders yet.
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default AdminOrders;
