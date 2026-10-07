import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  RefreshCw,
  Search,
  Settings,
  Trash2,
  Users,
  X,
} from "lucide-react";

import "./AdminDashboard.css";

const API_URL = "http://localhost:5000/api";
const ITEMS_PER_PAGE = 8;

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedContact, setSelectedContact] =
    useState(null);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [error, setError] = useState("");

  const adminData = useMemo(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("adminData")
        ) || {}
      );
    } catch {
      return {};
    }
  }, []);

  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  /* ================================
     FETCH CONTACTS
  ================================= */

  const fetchContacts = async () => {
    const token = getToken();

    if (!token) {
      window.location.href =
        "/admin/login";
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/contact`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem(
          "adminToken"
        );

        localStorage.removeItem(
          "adminData"
        );

        window.location.href =
          "/admin/login";

        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to fetch messages."
        );
      }

      setContacts(data.data || []);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  /* ================================
     LOGOUT
  ================================= */

  const logout = () => {
    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "adminData"
    );

    window.location.href =
      "/admin/login";
  };

  /* ================================
     UPDATE STATUS
  ================================= */

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/contact/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${getToken()}`,
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to update status."
        );
      }

      setContacts((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status:
                  data.data.status,
              }
            : item
        )
      );

      setSelectedContact((prev) =>
        prev &&
        prev._id === id
          ? {
              ...prev,
              status:
                data.data.status,
            }
          : prev
      );
    } catch (err) {
      alert(
        err.message ||
          "Unable to update status."
      );
    }
  };

  /* ================================
     DELETE
  ================================= */

  const deleteContact = async (
    id
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/contact/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to delete message."
        );
      }

      setContacts((prev) =>
        prev.filter(
          (item) =>
            item._id !== id
        )
      );

      setSelectedContact(null);
      setDeleteTarget(null);
    } catch (err) {
      alert(
        err.message ||
          "Unable to delete message."
      );
    }
  };

  /* ================================
     STATS
  ================================= */

  const stats = {
    total: contacts.length,

    new: contacts.filter(
      (item) =>
        item.status === "new"
    ).length,

    read: contacts.filter(
      (item) =>
        item.status === "read"
    ).length,

    replied: contacts.filter(
      (item) =>
        item.status === "replied"
    ).length,
  };

  /* ================================
     SEARCH + FILTER
  ================================= */

  const filteredContacts =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      return contacts.filter(
        (contact) => {
          const searchMatch =
            !query ||
            contact.name
              ?.toLowerCase()
              .includes(query) ||
            contact.email
              ?.toLowerCase()
              .includes(query) ||
            contact.subject
              ?.toLowerCase()
              .includes(query) ||
            contact.message
              ?.toLowerCase()
              .includes(query);

          const statusMatch =
            statusFilter === "all" ||
            contact.status ===
              statusFilter;

          return (
            searchMatch &&
            statusMatch
          );
        }
      );
    }, [
      contacts,
      searchTerm,
      statusFilter,
    ]);

  /* ================================
     PAGINATION
  ================================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredContacts.length /
          ITEMS_PER_PAGE
      )
    );

  const safePage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedContacts =
    filteredContacts.slice(
      (safePage - 1) *
        ITEMS_PER_PAGE,

      safePage *
        ITEMS_PER_PAGE
    );

  /* ================================
     CHART DATA
  ================================= */

  const chartData =
    createChartData(
      contacts
    );

  /* ================================
     DATE
  ================================= */

  const formatDate = (date) => {
    return new Date(
      date
    ).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <div className="dashboard-shell">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          className="dashboard-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* ================================
          SIDEBAR
      ================================= */}

      <aside
        className={`dashboard-sidebar ${
          sidebarOpen
            ? "open"
            : ""
        }`}
      >

        <div className="sidebar-logo">

          <span className="logo-mark">
            V
          </span>

          <div>
            <strong>
              VIKAS<span>.</span>
            </strong>

            <small>
              ADMIN PANEL
            </small>
          </div>

        </div>


        <nav className="sidebar-nav">

          <span className="sidebar-title">
            MENU
          </span>

          <a
            href="#overview"
            className="sidebar-link active"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <LayoutDashboard
              size={17}
            />

            Dashboard
          </a>

          <a
            href="#messages"
            className="sidebar-link"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <MessageSquare
              size={17}
            />

            Messages

            <span className="sidebar-count">
              {stats.new}
            </span>
          </a>

          <a
            href="#analytics"
            className="sidebar-link"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <BarChart3
              size={17}
            />

            Analytics
          </a>

          <span className="sidebar-title second">
            SYSTEM
          </span>

          <a
            href="/"
            className="sidebar-link"
          >
            <Home size={17} />

            View Website
          </a>

          <button
            className="sidebar-link sidebar-button"
            onClick={fetchContacts}
          >
            <RefreshCw
              size={17}
            />

            Refresh
          </button>

          <button
            className="sidebar-link sidebar-button"
            onClick={logout}
          >
            <LogOut size={17} />

            Logout
          </button>

        </nav>


        <div className="sidebar-bottom">

          <div className="sidebar-profile">

            <div className="profile-avatar">
              {(
                adminData.name ||
                "V"
              )
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <strong>
                {adminData.name ||
                  "Vikas Kumar"}
              </strong>

              <span>
                Administrator
              </span>
            </div>

          </div>

        </div>

      </aside>


      {/* ================================
          MAIN
      ================================= */}

      <main className="dashboard-main">

        {/* TOPBAR */}

        <header className="dashboard-topbar">

          <button
            className="mobile-menu"
            onClick={() =>
              setSidebarOpen(
                !sidebarOpen
              )
            }
          >
            {sidebarOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

          <div className="topbar-title">
            <span>
              ADMIN DASHBOARD
            </span>

            <strong>
              Overview
            </strong>
          </div>

          <div className="topbar-right">

            <div className="online-dot">
              <i></i>
              Online
            </div>

            <div className="topbar-user">
              {adminData.name ||
                "Vikas Kumar"}
            </div>

          </div>

        </header>


        {/* CONTENT */}

        <div className="dashboard-content">

          {/* ============================
              WELCOME
          ============================= */}

          <section
            className="dashboard-welcome"
            id="overview"
          >

            <div>

              <span>
                DASHBOARD / OVERVIEW
              </span>

              <h1>
                Welcome back
                <b>.</b>
              </h1>

              <p>
                Here's what's happening
                with your portfolio today.
              </p>

            </div>

            <button
              className="refresh-main"
              onClick={
                fetchContacts
              }
              disabled={loading}
            >
              <RefreshCw
                size={15}
                className={
                  loading
                    ? "spin"
                    : ""
                }
              />

              REFRESH DATA
            </button>

          </section>


          {/* ============================
              STAT CARDS
          ============================= */}

          <section className="dashboard-cards">

            <DashboardCard
              icon={
                <Inbox size={18} />
              }
              title="TOTAL MESSAGES"
              value={stats.total}
              description="All contacts"
              type="purple"
            />

            <DashboardCard
              icon={
                <Clock3 size={18} />
              }
              title="NEW MESSAGES"
              value={stats.new}
              description="Need attention"
              type="blue"
            />

            <DashboardCard
              icon={
                <Eye size={18} />
              }
              title="READ MESSAGES"
              value={stats.read}
              description="Reviewed"
              type="orange"
            />

            <DashboardCard
              icon={
                <Check size={18} />
              }
              title="REPLIED"
              value={stats.replied}
              description="Completed"
              type="green"
            />

          </section>


          {/* ============================
              ANALYTICS GRID
          ============================= */}

          <section
            className="analytics-grid"
            id="analytics"
          >

            {/* CHART */}

            <div className="panel chart-panel">

              <div className="panel-header">

                <div>
                  <span>
                    ANALYTICS
                  </span>

                  <h2>
                    Message Overview
                  </h2>
                </div>

                <div className="chart-legend">
                  <i></i>
                  Messages
                </div>

              </div>


              <div className="chart-summary">

                <strong>
                  {stats.total}
                </strong>

                <span>
                  Total received
                </span>

              </div>


              <div className="line-chart">

                <div className="chart-y-labels">
                  <span>
                    {Math.max(
                      stats.total,
                      5
                    )}
                  </span>

                  <span>
                    {Math.max(
                      Math.ceil(
                        stats.total /
                          2
                      ),
                      2
                    )}
                  </span>

                  <span>
                    0
                  </span>
                </div>

                <svg
                  viewBox="0 0 700 240"
                  preserveAspectRatio="none"
                >

                  <defs>

                    <linearGradient
                      id="chartFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#ff3d00"
                        stopOpacity="0.28"
                      />

                      <stop
                        offset="100%"
                        stopColor="#ff3d00"
                        stopOpacity="0"
                      />
                    </linearGradient>

                  </defs>


                  {[40, 100, 160, 220].map(
                    (y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="700"
                        y2={y}
                        stroke="rgba(255,255,255,.06)"
                        strokeWidth="1"
                      />
                    )
                  )}


                  <path
                    d={chartData.area}
                    fill="url(#chartFill)"
                  />

                  <path
                    d={chartData.line}
                    fill="none"
                    stroke="#ff3d00"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {chartData.points.map(
                    (point, index) => (
                      <circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill="#ff3d00"
                        stroke="#111"
                        strokeWidth="3"
                      />
                    )
                  )}

                </svg>


                <div className="chart-months">
                  {chartData.labels.map(
                    (label) => (
                      <span
                        key={label}
                      >
                        {label}
                      </span>
                    )
                  )}
                </div>

              </div>

            </div>


            {/* DONUT */}

            <div className="panel donut-panel">

              <div className="panel-header">

                <div>
                  <span>
                    BREAKDOWN
                  </span>

                  <h2>
                    Message Status
                  </h2>
                </div>

                <BarChart3
                  size={17}
                />

              </div>


              <div className="donut-wrap">

                <div
                  className="donut"
                  style={{
                    background:
                      `conic-gradient(
                        #ff3d00 ${
                          stats.total
                            ? (stats.new /
                                stats.total) *
                              100
                            : 0
                        }%,
                        #8b5cf6 ${
                          stats.total
                            ? ((stats.new +
                                stats.read) /
                                stats.total) *
                              100
                            : 0
                        }%,
                        #22c55e ${
                          stats.total
                            ? 100
                            : 0
                        }%
                      )`,
                  }}
                >
                  <div>
                    <strong>
                      {stats.total}
                    </strong>

                    <span>
                      Messages
                    </span>
                  </div>
                </div>

              </div>


              <div className="donut-legend">

                <LegendItem
                  color="#ff3d00"
                  label="New"
                  value={stats.new}
                />

                <LegendItem
                  color="#8b5cf6"
                  label="Read"
                  value={stats.read}
                />

                <LegendItem
                  color="#22c55e"
                  label="Replied"
                  value={stats.replied}
                />

              </div>

            </div>

          </section>


          {/* ============================
              RECENT + QUICK STATS
          ============================= */}

          <section className="lower-grid">

            <div className="panel activity-panel">

              <div className="panel-header">

                <div>
                  <span>
                    RECENT ACTIVITY
                  </span>

                  <h2>
                    Latest Messages
                  </h2>
                </div>

                <MessageSquare
                  size={17}
                />

              </div>


              <div className="activity-list">

                {contacts
                  .slice(0, 5)
                  .map(
                    (
                      contact
                    ) => (
                      <div
                        className="activity-item"
                        key={
                          contact._id
                        }
                        onClick={() =>
                          setSelectedContact(
                            contact
                          )
                        }
                      >

                        <div className="activity-icon">
                          <Mail
                            size={15}
                          />
                        </div>

                        <div className="activity-info">

                          <strong>
                            {contact.name}
                          </strong>

                          <span>
                            {contact.subject}
                          </span>

                        </div>

                        <div className="activity-status">

                          <StatusBadge
                            status={
                              contact.status
                            }
                          />

                          <small>
                            {formatShortDate(
                              contact.createdAt
                            )}
                          </small>

                        </div>

                      </div>
                    )
                  )}

                {contacts.length ===
                  0 && (
                  <div className="no-data">
                    No messages yet.
                  </div>
                )}

              </div>

            </div>


            <div className="panel quick-panel">

              <div className="panel-header">

                <div>
                  <span>
                    QUICK STATS
                  </span>

                  <h2>
                    Portfolio Inbox
                  </h2>
                </div>

                <Users size={17} />

              </div>


              <div className="quick-stat">

                <div>
                  <span>
                    RESPONSE QUEUE
                  </span>

                  <strong>
                    {stats.new}
                  </strong>
                </div>

                <div className="quick-progress">
                  <i
                    style={{
                      width: `${
                        stats.total
                          ? (stats.new /
                              stats.total) *
                            100
                          : 0
                      }%`,
                    }}
                  ></i>
                </div>

              </div>


              <div className="quick-stat">

                <div>
                  <span>
                    COMPLETED
                  </span>

                  <strong>
                    {stats.replied}
                  </strong>
                </div>

                <div className="quick-progress green">
                  <i
                    style={{
                      width: `${
                        stats.total
                          ? (stats.replied /
                              stats.total) *
                            100
                          : 0
                      }%`,
                    }}
                  ></i>
                </div>

              </div>


              <div className="quick-bottom">

                <div>
                  <Clock3
                    size={16}
                  />

                  <span>
                    Last updated
                  </span>
                </div>

                <strong>
                  Just now
                </strong>

              </div>

            </div>

          </section>


          {/* ============================
              CONTACT TABLE
          ============================= */}

          <section
            className="panel messages-panel"
            id="messages"
          >

            <div className="messages-heading">

              <div>
                <span>
                  INBOX
                </span>

                <h2>
                  Contact Messages
                </h2>
              </div>

              <strong>
                {filteredContacts.length}
                {" "}RESULTS
              </strong>

            </div>


            {/* SEARCH */}

            <div className="message-toolbar">

              <div className="message-search">

                <Search size={15} />

                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(
                      e.target.value
                    );
                    setCurrentPage(1);
                  }}
                />

                {searchTerm && (
                  <button
                    onClick={() =>
                      setSearchTerm(
                        ""
                      )
                    }
                  >
                    <X size={13} />
                  </button>
                )}

              </div>


              <div className="message-filters">

                {[
                  "all",
                  "new",
                  "read",
                  "replied",
                ].map(
                  (status) => (
                    <button
                      key={status}
                      className={
                        statusFilter ===
                        status
                          ? "active"
                          : ""
                      }
                      onClick={() => {
                        setStatusFilter(
                          status
                        );
                        setCurrentPage(
                          1
                        );
                      }}
                    >
                      {status.toUpperCase()}
                    </button>
                  )
                )}

              </div>

            </div>


            {/* TABLE */}

            <div className="messages-table">

              <div className="messages-table-head">

                <span>
                  CONTACT
                </span>

                <span>
                  SUBJECT
                </span>

                <span>
                  DATE
                </span>

                <span>
                  STATUS
                </span>

                <span>
                  ACTION
                </span>

              </div>


              {loading ? (

                <div className="table-empty">
                  <RefreshCw
                    className="spin"
                    size={22}
                  />

                  Loading messages...
                </div>

              ) : paginatedContacts.length ===
                0 ? (

                <div className="table-empty">
                  <MessageSquare
                    size={24}
                  />

                  No messages found.
                </div>

              ) : (

                paginatedContacts.map(
                  (contact) => (

                    <div
                      className="message-row"
                      key={
                        contact._id
                      }
                    >

                      <div className="message-contact">

                        <div className="message-avatar">
                          {contact.name
                            ?.charAt(
                              0
                            )
                            ?.toUpperCase()}
                        </div>

                        <div>

                          <strong>
                            {contact.name}
                          </strong>

                          <span>
                            {contact.email}
                          </span>

                        </div>

                      </div>


                      <div className="message-subject">
                        {contact.subject}
                      </div>


                      <div className="message-date">
                        {formatDate(
                          contact.createdAt
                        )}
                      </div>


                      <StatusBadge
                        status={
                          contact.status
                        }
                      />


                      <div className="message-actions">

                        <button
                          onClick={() =>
                            setSelectedContact(
                              contact
                            )
                          }
                          title="View"
                        >
                          <Eye
                            size={14}
                          />
                        </button>

                        <button
                          className="delete-action"
                          onClick={() =>
                            setDeleteTarget(
                              contact
                            )
                          }
                          title="Delete"
                        >
                          <Trash2
                            size={14}
                          />
                        </button>

                      </div>

                    </div>

                  )
                )

              )}

            </div>


            {/* PAGINATION */}

            {filteredContacts.length >
              ITEMS_PER_PAGE && (
              <div className="pagination">

                <span>
                  Page{" "}
                  {safePage} of{" "}
                  {totalPages}
                </span>

                <div>

                  <button
                    disabled={
                      safePage === 1
                    }
                    onClick={() =>
                      setCurrentPage(
                        safePage - 1
                      )
                    }
                  >
                    <ChevronLeft
                      size={15}
                    />
                  </button>

                  {Array.from(
                    {
                      length:
                        totalPages,
                    },
                    (_, index) => (
                      <button
                        key={index}
                        className={
                          safePage ===
                          index + 1
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setCurrentPage(
                            index + 1
                          )
                        }
                      >
                        {index + 1}
                      </button>
                    )
                  )}

                  <button
                    disabled={
                      safePage ===
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        safePage + 1
                      )
                    }
                  >
                    <ChevronRight
                      size={15}
                    />
                  </button>

                </div>

              </div>
            )}

          </section>

        </div>

      </main>


      {/* ================================
          MESSAGE MODAL
      ================================= */}

      {selectedContact && (
        <MessageModal
          contact={
            selectedContact
          }
          onClose={() =>
            setSelectedContact(
              null
            )
          }
          onStatusChange={
            updateStatus
          }
          onDeleteRequest={
            setDeleteTarget
          }
          formatDate={
            formatDate
          }
        />
      )}


      {/* ================================
          DELETE MODAL
      ================================= */}

      {deleteTarget && (
        <DeleteModal
          contact={
            deleteTarget
          }
          onCancel={() =>
            setDeleteTarget(
              null
            )
          }
          onConfirm={() =>
            deleteContact(
              deleteTarget._id
            )
          }
        />
      )}

    </div>
  );
}


/* ========================================
   DASHBOARD CARD
======================================== */

function DashboardCard({
  icon,
  title,
  value,
  description,
  type,
}) {
  return (
    <div
      className={`dashboard-card ${type}`}
    >

      <div className="card-icon">
        {icon}
      </div>

      <div className="card-data">

        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>

        <small>
          {description}
        </small>

      </div>

    </div>
  );
}


/* ========================================
   LEGEND
======================================== */

function LegendItem({
  color,
  label,
  value,
}) {
  return (
    <div className="legend-item">

      <i
        style={{
          background: color,
        }}
      ></i>

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


/* ========================================
   STATUS
======================================== */

function StatusBadge({
  status,
}) {
  const label = {
    new: "NEW",
    read: "READ",
    replied: "REPLIED",
  };

  return (
    <span
      className={`status-badge ${status}`}
    >
      <i></i>

      {label[status] ||
        status?.toUpperCase()}
    </span>
  );
}


/* ========================================
   CHART DATA
======================================== */

function createChartData(
  contacts
) {
  const labels = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  const values = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ];

  contacts.forEach(
    (contact) => {
      const day =
        new Date(
          contact.createdAt
        ).getDay();

      const index =
        day === 0
          ? 6
          : day - 1;

      values[index]++;
    }
  );

  const max =
    Math.max(
      ...values,
      1
    );

  const points =
    values.map(
      (value, index) => {
        const x =
          index * 116 + 12;

        const y =
          220 -
          (value / max) *
            170;

        return {
          x,
          y,
        };
      }
    );

  const line =
    points
      .map(
        (point, index) =>
          `${
            index === 0
              ? "M"
              : "L"
          } ${point.x} ${point.y}`
      )
      .join(" ");

  const area =
    `${line} L ${points.at(-1).x} 230 L ${points[0].x} 230 Z`;

  return {
    labels,
    values,
    points,
    line,
    area,
  };
}


/* ========================================
   SHORT DATE
======================================== */

function formatShortDate(
  date
) {
  return new Date(
    date
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
    }
  );
}


/* ========================================
   MESSAGE MODAL
======================================== */

function MessageModal({
  contact,
  onClose,
  onStatusChange,
  onDeleteRequest,
  formatDate,
}) {
  return (
    <div
      className="dashboard-modal-overlay"
      onMouseDown={onClose}
    >

      <div
        className="dashboard-modal"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        <div className="modal-header">

          <div>
            <span>
              MESSAGE DETAILS
            </span>

            <h3>
              {contact.subject}
            </h3>
          </div>

          <button
            onClick={onClose}
          >
            <X size={18} />
          </button>

        </div>


        <div className="modal-person">

          <div className="message-avatar large">
            {contact.name
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div>

            <strong>
              {contact.name}
            </strong>

            <a
              href={`mailto:${contact.email}`}
            >
              <Mail size={13} />
              {contact.email}
            </a>

          </div>

        </div>


        <div className="modal-message">

          <span>
            MESSAGE
          </span>

          <p>
            {contact.message}
          </p>

        </div>


        <div className="modal-meta">

          <div>
            <span>
              RECEIVED
            </span>

            <strong>
              {formatDate(
                contact.createdAt
              )}
            </strong>
          </div>

          <div>
            <span>
              STATUS
            </span>

            <StatusBadge
              status={
                contact.status
              }
            />
          </div>

        </div>


        <div className="modal-actions">

          <button
            className={
              contact.status ===
              "new"
                ? "active"
                : ""
            }
            onClick={() =>
              onStatusChange(
                contact._id,
                "new"
              )
            }
          >
            NEW
          </button>

          <button
            className={
              contact.status ===
              "read"
                ? "active"
                : ""
            }
            onClick={() =>
              onStatusChange(
                contact._id,
                "read"
              )
            }
          >
            MARK READ
          </button>

          <button
            className={
              contact.status ===
              "replied"
                ? "active"
                : ""
            }
            onClick={() =>
              onStatusChange(
                contact._id,
                "replied"
              )
            }
          >
            REPLIED
          </button>

          <a
            className="reply-button"
            href={`mailto:${contact.email}?subject=${encodeURIComponent(
              `Re: ${contact.subject}`
            )}`}
            onClick={() =>
              onStatusChange(
                contact._id,
                "replied"
              )
            }
          >
            <Mail size={14} />
            REPLY
          </a>

          <button
            className="modal-delete"
            onClick={() =>
              onDeleteRequest(
                contact
              )
            }
          >
            <Trash2 size={14} />
            DELETE
          </button>

        </div>

      </div>

    </div>
  );
}


/* ========================================
   DELETE MODAL
======================================== */

function DeleteModal({
  contact,
  onCancel,
  onConfirm,
}) {
  return (
    <div
      className="delete-overlay"
      onMouseDown={onCancel}
    >

      <div
        className="delete-modal"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        <div className="delete-icon">
          <Trash2 size={22} />
        </div>

        <span>
          DELETE MESSAGE
        </span>

        <h3>
          Delete this message?
        </h3>

        <p>
          The message from{" "}
          <strong>
            {contact.name}
          </strong>{" "}
          will be permanently
          removed.
        </p>

        <div className="delete-actions">

          <button
            onClick={onCancel}
          >
            CANCEL
          </button>

          <button
            className="confirm"
            onClick={onConfirm}
          >
            <Trash2 size={14} />
            DELETE
          </button>

        </div>

      </div>

    </div>
  );
}