import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const name = localStorage.getItem("username");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };
  return (
    <header>
      <div className="header-brand">
        <div className="header-icon">🏛️</div>
        <div>
          <div className="header-title">NationalBank Portal</div>
          <div className="header-sub">Holiday &amp; Service Calendar</div>
        </div>
      </div>
      <nav className="header-nav">
        <Link to="/" className="nav-btn">Home</Link>
        {name ? (
          <>
            <span className="nav-user">👤 {name}</span>
            <button className="nav-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/signup" className="nav-btn primary">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <p>© 2026 <span>NationalBank</span> · Bank Holiday &amp; Service Calendar · All Rights Reserved.</p>
    </footer>
  );
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SEED_BRANCHES = [
  {
    id: 1,
    name: "Head Office — Hyderabad",
    address: "Bank Street, Abids, Hyderabad, Telangana 500001",
    manager: "Suresh Reddy",
    phone: "+91-40-2345-6789",
    hours: { Mon: { open: "09:30", close: "17:30", closed: false }, Tue: { open: "09:30", close: "17:30", closed: false }, Wed: { open: "09:30", close: "17:30", closed: false }, Thu: { open: "09:30", close: "17:30", closed: false }, Fri: { open: "09:30", close: "17:30", closed: false }, Sat: { open: "09:30", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Telangana",
  },
  {
    id: 2,
    name: "Mumbai — Fort Branch",
    address: "Horniman Circle, Fort, Mumbai, Maharashtra 400001",
    manager: "Priya Sharma",
    phone: "+91-22-6789-1234",
    hours: { Mon: { open: "10:00", close: "18:00", closed: false }, Tue: { open: "10:00", close: "18:00", closed: false }, Wed: { open: "10:00", close: "18:00", closed: false }, Thu: { open: "10:00", close: "18:00", closed: false }, Fri: { open: "10:00", close: "18:00", closed: false }, Sat: { open: "10:00", close: "14:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Maharashtra",
  },
  {
    id: 3,
    name: "Delhi — Connaught Place",
    address: "Block A, Connaught Place, New Delhi 110001",
    manager: "Arvind Mehta",
    phone: "+91-11-2341-5678",
    hours: { Mon: { open: "09:00", close: "17:00", closed: false }, Tue: { open: "09:00", close: "17:00", closed: false }, Wed: { open: "09:00", close: "17:00", closed: false }, Thu: { open: "09:00", close: "17:00", closed: false }, Fri: { open: "09:00", close: "17:00", closed: false }, Sat: { open: "09:00", close: "13:30", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Delhi",
  },
  {
    id: 4,
    name: "Chennai — Anna Salai",
    address: "Anna Salai, Chennai, Tamil Nadu 600002",
    manager: "Kavitha Rajan",
    phone: "+91-44-4567-8901",
    hours: { Mon: { open: "09:30", close: "17:30", closed: false }, Tue: { open: "09:30", close: "17:30", closed: false }, Wed: { open: "09:30", close: "17:30", closed: false }, Thu: { open: "09:30", close: "17:30", closed: false }, Fri: { open: "09:30", close: "17:30", closed: false }, Sat: { open: "09:30", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Tamil Nadu",
  },
  {
    id: 5,
    name: "Kolkata — Dalhousie Square",
    address: "BBD Bag, Kolkata, West Bengal 700001",
    manager: "Debashis Bose",
    phone: "+91-33-2234-5678",
    hours: { Mon: { open: "10:00", close: "16:30", closed: false }, Tue: { open: "10:00", close: "16:30", closed: false }, Wed: { open: "10:00", close: "16:30", closed: false }, Thu: { open: "10:00", close: "16:30", closed: false }, Fri: { open: "10:00", close: "16:30", closed: false }, Sat: { open: "10:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "West Bengal",
  },
  {
    id: 6,
    name: "Vijayawada — MG Road Branch",
    address: "MG Road, Vijayawada, Andhra Pradesh 520010",
    manager: "Venkata Rao",
    phone: "+91-866-2345-6789",
    hours: { Mon: { open: "09:30", close: "17:30", closed: false }, Tue: { open: "09:30", close: "17:30", closed: false }, Wed: { open: "09:30", close: "17:30", closed: false }, Thu: { open: "09:30", close: "17:30", closed: false }, Fri: { open: "09:30", close: "17:30", closed: false }, Sat: { open: "09:30", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Andhra Pradesh",
  },
  {
    id: 7,
    name: "Bengaluru — MG Road Branch",
    address: "MG Road, Bengaluru, Karnataka 560001",
    manager: "Ramesh Nair",
    phone: "+91-80-2345-6789",
    hours: { Mon: { open: "09:30", close: "17:30", closed: false }, Tue: { open: "09:30", close: "17:30", closed: false }, Wed: { open: "09:30", close: "17:30", closed: false }, Thu: { open: "09:30", close: "17:30", closed: false }, Fri: { open: "09:30", close: "17:30", closed: false }, Sat: { open: "09:30", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Karnataka",
  },
  {
    id: 8,
    name: "Jaipur — MI Road Branch",
    address: "MI Road, Jaipur, Rajasthan 302001",
    manager: "Vikram Singh",
    phone: "+91-141-2345-6789",
    hours: { Mon: { open: "09:00", close: "17:00", closed: false }, Tue: { open: "09:00", close: "17:00", closed: false }, Wed: { open: "09:00", close: "17:00", closed: false }, Thu: { open: "09:00", close: "17:00", closed: false }, Fri: { open: "09:00", close: "17:00", closed: false }, Sat: { open: "09:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Rajasthan",
  },
  {
    id: 9,
    name: "Ahmedabad — CG Road Branch",
    address: "CG Road, Ahmedabad, Gujarat 380009",
    manager: "Dhruv Patel",
    phone: "+91-79-2345-6789",
    hours: { Mon: { open: "09:30", close: "17:30", closed: false }, Tue: { open: "09:30", close: "17:30", closed: false }, Wed: { open: "09:30", close: "17:30", closed: false }, Thu: { open: "09:30", close: "17:30", closed: false }, Fri: { open: "09:30", close: "17:30", closed: false }, Sat: { open: "09:30", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Gujarat",
  },
  {
    id: 10,
    name: "Lucknow — Hazratganj Branch",
    address: "Hazratganj, Lucknow, Uttar Pradesh 226001",
    manager: "Anil Kumar",
    phone: "+91-522-2345-6789",
    hours: { Mon: { open: "09:00", close: "17:00", closed: false }, Tue: { open: "09:00", close: "17:00", closed: false }, Wed: { open: "09:00", close: "17:00", closed: false }, Thu: { open: "09:00", close: "17:00", closed: false }, Fri: { open: "09:00", close: "17:00", closed: false }, Sat: { open: "09:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Uttar Pradesh",
  },
  {
    id: 11,
    name: "Bhopal — MP Nagar Branch",
    address: "MP Nagar, Bhopal, Madhya Pradesh 462011",
    manager: "Sunita Verma",
    phone: "+91-755-2345-6789",
    hours: { Mon: { open: "09:30", close: "17:30", closed: false }, Tue: { open: "09:30", close: "17:30", closed: false }, Wed: { open: "09:30", close: "17:30", closed: false }, Thu: { open: "09:30", close: "17:30", closed: false }, Fri: { open: "09:30", close: "17:30", closed: false }, Sat: { open: "09:30", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Madhya Pradesh",
  },
  {
    id: 12,
    name: "Patna — Fraser Road Branch",
    address: "Fraser Road, Patna, Bihar 800001",
    manager: "Rajiv Sinha",
    phone: "+91-612-2345-6789",
    hours: { Mon: { open: "09:00", close: "17:00", closed: false }, Tue: { open: "09:00", close: "17:00", closed: false }, Wed: { open: "09:00", close: "17:00", closed: false }, Thu: { open: "09:00", close: "17:00", closed: false }, Fri: { open: "09:00", close: "17:00", closed: false }, Sat: { open: "09:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Bihar",
  },
  {
    id: 13,
    name: "Chandigarh — Sector 17 Branch",
    address: "Sector 17, Chandigarh 160017",
    manager: "Harpreet Kaur",
    phone: "+91-172-2345-6789",
    hours: { Mon: { open: "09:30", close: "17:30", closed: false }, Tue: { open: "09:30", close: "17:30", closed: false }, Wed: { open: "09:30", close: "17:30", closed: false }, Thu: { open: "09:30", close: "17:30", closed: false }, Fri: { open: "09:30", close: "17:30", closed: false }, Sat: { open: "09:30", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Chandigarh (UT)",
  },
  {
    id: 14,
    name: "Raipur — Pandri Branch",
    address: "Pandri, Raipur, Chhattisgarh 492001",
    manager: "Meena Tiwari",
    phone: "+91-771-2345-6789",
    hours: { Mon: { open: "09:00", close: "17:00", closed: false }, Tue: { open: "09:00", close: "17:00", closed: false }, Wed: { open: "09:00", close: "17:00", closed: false }, Thu: { open: "09:00", close: "17:00", closed: false }, Fri: { open: "09:00", close: "17:00", closed: false }, Sat: { open: "09:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Chhattisgarh",
  },
  {
    id: 15,
    name: "Dehradun — Rajpur Road Branch",
    address: "Rajpur Road, Dehradun, Uttarakhand 248001",
    manager: "Pooja Negi",
    phone: "+91-135-2345-6789",
    hours: { Mon: { open: "09:30", close: "17:30", closed: false }, Tue: { open: "09:30", close: "17:30", closed: false }, Wed: { open: "09:30", close: "17:30", closed: false }, Thu: { open: "09:30", close: "17:30", closed: false }, Fri: { open: "09:30", close: "17:30", closed: false }, Sat: { open: "09:30", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Uttarakhand",
  },
  {
    id: 16,
    name: "Guwahati — Pan Bazar Branch",
    address: "Pan Bazar, Guwahati, Assam 781001",
    manager: "Bimal Das",
    phone: "+91-361-2345-6789",
    hours: { Mon: { open: "09:00", close: "17:00", closed: false }, Tue: { open: "09:00", close: "17:00", closed: false }, Wed: { open: "09:00", close: "17:00", closed: false }, Thu: { open: "09:00", close: "17:00", closed: false }, Fri: { open: "09:00", close: "17:00", closed: false }, Sat: { open: "09:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Assam",
  },
  {
    id: 17,
    name: "Ranchi — Main Road Branch",
    address: "Main Road, Ranchi, Jharkhand 834001",
    manager: "Sunil Mahato",
    phone: "+91-651-2345-6789",
    hours: { Mon: { open: "09:30", close: "17:30", closed: false }, Tue: { open: "09:30", close: "17:30", closed: false }, Wed: { open: "09:30", close: "17:30", closed: false }, Thu: { open: "09:30", close: "17:30", closed: false }, Fri: { open: "09:30", close: "17:30", closed: false }, Sat: { open: "09:30", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Jharkhand",
  },
  {
    id: 18,
    name: "Thiruvananthapuram — MG Road Branch",
    address: "MG Road, Thiruvananthapuram, Kerala 695001",
    manager: "Sreekumar Pillai",
    phone: "+91-471-2345-6789",
    hours: { Mon: { open: "09:30", close: "17:30", closed: false }, Tue: { open: "09:30", close: "17:30", closed: false }, Wed: { open: "09:30", close: "17:30", closed: false }, Thu: { open: "09:30", close: "17:30", closed: false }, Fri: { open: "09:30", close: "17:30", closed: false }, Sat: { open: "09:30", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Kerala",
  },
  {
    id: 19,
    name: "Amritsar — Hall Bazar Branch",
    address: "Hall Bazar, Amritsar, Punjab 143001",
    manager: "Gurinder Singh",
    phone: "+91-183-2345-6789",
    hours: { Mon: { open: "09:00", close: "17:00", closed: false }, Tue: { open: "09:00", close: "17:00", closed: false }, Wed: { open: "09:00", close: "17:00", closed: false }, Thu: { open: "09:00", close: "17:00", closed: false }, Fri: { open: "09:00", close: "17:00", closed: false }, Sat: { open: "09:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Punjab",
  },
  {
    id: 20,
    name: "Faridabad — NIT Branch",
    address: "NIT, Faridabad, Haryana 121001",
    manager: "Neha Yadav",
    phone: "+91-129-2345-6789",
    hours: { Mon: { open: "09:30", close: "17:30", closed: false }, Tue: { open: "09:30", close: "17:30", closed: false }, Wed: { open: "09:30", close: "17:30", closed: false }, Thu: { open: "09:30", close: "17:30", closed: false }, Fri: { open: "09:30", close: "17:30", closed: false }, Sat: { open: "09:30", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Haryana",
  },
  {
    id: 21,
    name: "Shimla — Mall Road Branch",
    address: "The Mall, Shimla, Himachal Pradesh 171001",
    manager: "Rakesh Thakur",
    phone: "+91-177-2345-6789",
    hours: { Mon: { open: "09:00", close: "17:00", closed: false }, Tue: { open: "09:00", close: "17:00", closed: false }, Wed: { open: "09:00", close: "17:00", closed: false }, Thu: { open: "09:00", close: "17:00", closed: false }, Fri: { open: "09:00", close: "17:00", closed: false }, Sat: { open: "09:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Himachal Pradesh",
  },
  {
    id: 22,
    name: "Panaji — Panaji City Branch",
    address: "Church Square, Panaji, Goa 403001",
    manager: "Fernandes Lopes",
    phone: "+91-832-2345-6789",
    hours: { Mon: { open: "09:30", close: "17:30", closed: false }, Tue: { open: "09:30", close: "17:30", closed: false }, Wed: { open: "09:30", close: "17:30", closed: false }, Thu: { open: "09:30", close: "17:30", closed: false }, Fri: { open: "09:30", close: "17:30", closed: false }, Sat: { open: "09:30", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Goa",
  },
  {
    id: 23,
    name: "Bhubaneswar — Janpath Branch",
    address: "Janpath, Bhubaneswar, Odisha 751001",
    manager: "Sasmita Mohanty",
    phone: "+91-674-2345-6789",
    hours: { Mon: { open: "09:00", close: "17:00", closed: false }, Tue: { open: "09:00", close: "17:00", closed: false }, Wed: { open: "09:00", close: "17:00", closed: false }, Thu: { open: "09:00", close: "17:00", closed: false }, Fri: { open: "09:00", close: "17:00", closed: false }, Sat: { open: "09:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Odisha",
  },
  {
    id: 24,
    name: "Shillong — Police Bazar Branch",
    address: "Police Bazar, Shillong, Meghalaya 793001",
    manager: "Badonbok Lyngdoh",
    phone: "+91-364-2345-6789",
    hours: { Mon: { open: "09:00", close: "17:00", closed: false }, Tue: { open: "09:00", close: "17:00", closed: false }, Wed: { open: "09:00", close: "17:00", closed: false }, Thu: { open: "09:00", close: "17:00", closed: false }, Fri: { open: "09:00", close: "17:00", closed: false }, Sat: { open: "09:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Meghalaya",
  },
  {
    id: 25,
    name: "Gangtok — MG Marg Branch",
    address: "MG Marg, Gangtok, Sikkim 737101",
    manager: "Tenzin Lepcha",
    phone: "+91-3592-234567",
    hours: { Mon: { open: "09:30", close: "17:00", closed: false }, Tue: { open: "09:30", close: "17:00", closed: false }, Wed: { open: "09:30", close: "17:00", closed: false }, Thu: { open: "09:30", close: "17:00", closed: false }, Fri: { open: "09:30", close: "17:00", closed: false }, Sat: { open: "09:30", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Sikkim",
  },
  {
    id: 26,
    name: "Agartala — HGB Road Branch",
    address: "HGB Road, Agartala, Tripura 799001",
    manager: "Biplab Chakraborty",
    phone: "+91-381-2345-6789",
    hours: { Mon: { open: "09:00", close: "17:00", closed: false }, Tue: { open: "09:00", close: "17:00", closed: false }, Wed: { open: "09:00", close: "17:00", closed: false }, Thu: { open: "09:00", close: "17:00", closed: false }, Fri: { open: "09:00", close: "17:00", closed: false }, Sat: { open: "09:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Tripura",
  },
  {
    id: 27,
    name: "Itanagar — Naharlagun Branch",
    address: "Naharlagun, Itanagar, Arunachal Pradesh 791110",
    manager: "Tage Taki",
    phone: "+91-360-2345-6789",
    hours: { Mon: { open: "09:00", close: "16:30", closed: false }, Tue: { open: "09:00", close: "16:30", closed: false }, Wed: { open: "09:00", close: "16:30", closed: false }, Thu: { open: "09:00", close: "16:30", closed: false }, Fri: { open: "09:00", close: "16:30", closed: false }, Sat: { open: "09:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Arunachal Pradesh",
  },
  {
    id: 28,
    name: "Imphal — Paona Bazar Branch",
    address: "Paona Bazar, Imphal, Manipur 795001",
    manager: "Sanajaoba Singh",
    phone: "+91-385-2345-6789",
    hours: { Mon: { open: "09:00", close: "16:30", closed: false }, Tue: { open: "09:00", close: "16:30", closed: false }, Wed: { open: "09:00", close: "16:30", closed: false }, Thu: { open: "09:00", close: "16:30", closed: false }, Fri: { open: "09:00", close: "16:30", closed: false }, Sat: { open: "09:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Manipur",
  },
  {
    id: 29,
    name: "Aizawl — Zarkawt Branch",
    address: "Zarkawt, Aizawl, Mizoram 796001",
    manager: "Lalnunpuia Ralte",
    phone: "+91-389-2345-6789",
    hours: { Mon: { open: "09:00", close: "16:30", closed: false }, Tue: { open: "09:00", close: "16:30", closed: false }, Wed: { open: "09:00", close: "16:30", closed: false }, Thu: { open: "09:00", close: "16:30", closed: false }, Fri: { open: "09:00", close: "16:30", closed: false }, Sat: { open: "09:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Mizoram",
  },
  {
    id: 30,
    name: "Kohima — NST Junction Branch",
    address: "NST Junction, Kohima, Nagaland 797001",
    manager: "Neikhriezo Rhakho",
    phone: "+91-370-2345-6789",
    hours: { Mon: { open: "09:00", close: "16:30", closed: false }, Tue: { open: "09:00", close: "16:30", closed: false }, Wed: { open: "09:00", close: "16:30", closed: false }, Thu: { open: "09:00", close: "16:30", closed: false }, Fri: { open: "09:00", close: "16:30", closed: false }, Sat: { open: "09:00", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Nagaland",
  },
  {
    id: 31,
    name: "Pondicherry — Mission Street Branch",
    address: "Mission Street, Puducherry 605001",
    manager: "Anand Krishnamurthy",
    phone: "+91-413-2345-6789",
    hours: { Mon: { open: "09:30", close: "17:30", closed: false }, Tue: { open: "09:30", close: "17:30", closed: false }, Wed: { open: "09:30", close: "17:30", closed: false }, Thu: { open: "09:30", close: "17:30", closed: false }, Fri: { open: "09:30", close: "17:30", closed: false }, Sat: { open: "09:30", close: "13:00", closed: false }, Sun: { open: "", close: "", closed: true } },
    region: "Puducherry (UT)",
  },
];

function getBranches() {
  const stored = localStorage.getItem("branches");
  if (stored) {
    const parsed = JSON.parse(stored);
    // If stored data has fewer than 29 branches, refresh with new seed
    if (parsed.length < 31) {
      localStorage.setItem("branches", JSON.stringify(SEED_BRANCHES));
      return SEED_BRANCHES;
    }
    return parsed;
  }
  localStorage.setItem("branches", JSON.stringify(SEED_BRANCHES));
  return SEED_BRANCHES;
}

function saveBranches(data) {
  localStorage.setItem("branches", JSON.stringify(data));
}

export default function BranchHours() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const role = users.find((u) => u.username === username)?.role || null;
  const canManage = role === "admin";

  const [branches, setBranches] = useState(getBranches);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [regionFilter, setRegionFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");

  const regions = [
    "All",
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Chandigarh (UT)", "Delhi", "Puducherry (UT)",
  ];

  const filtered = branches.filter((b) => {
    const matchRegion = regionFilter === "All" || b.region === regionFilter;
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.address.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchSearch;
  });

  const startEdit = (branch) => {
    setEditId(branch.id);
    setEditData(JSON.parse(JSON.stringify(branch)));
  };

  const handleHourChange = (day, field, value) => {
    setEditData((prev) => ({
      ...prev,
      hours: { ...prev.hours, [day]: { ...prev.hours[day], [field]: value } },
    }));
  };

  const handleClosedToggle = (day) => {
    setEditData((prev) => ({
      ...prev,
      hours: { ...prev.hours, [day]: { ...prev.hours[day], closed: !prev.hours[day].closed } },
    }));
  };

  const handleSave = () => {
    const updated = branches.map((b) => b.id === editId ? editData : b);
    setBranches(updated);
    saveBranches(updated);
    const audit = JSON.parse(localStorage.getItem("auditLog")) || [];
    audit.unshift({ id: Date.now(), action: "Updated Branch Hours", detail: editData.name, user: username, at: new Date().toISOString() });
    localStorage.setItem("auditLog", JSON.stringify(audit));
    setEditId(null);
    setEditData(null);
    setSuccess(`Hours updated for ${editData.name}`);
    setTimeout(() => setSuccess(""), 3000);
  };

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="page-content">
          <div className="access-denied">
            <div className="access-icon">🔒</div>
            <div className="access-title">Login Required</div>
            <div className="access-desc">Please log in to view branch hours.</div>
            <button className="btn-primary" style={{ marginTop: 20, width: "auto", padding: "12px 32px" }} onClick={() => navigate("/login")}>Go to Login</button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="page-content">
        <div className="page-hero">
          <div className="page-hero-inner">
            <div className="page-breadcrumb">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <span className="breadcrumb-sep">›</span>
              <span>Branch Hours</span>
            </div>
            <h1 className="page-title">Branch Hours Manager</h1>
            <p className="page-desc">View and manage operational hours for all NationalBank branches across India.</p>
          </div>
        </div>

        {success && <div className="section-inner"><div className="form-alert success">✓ {success}</div></div>}

        {/* Filters */}
        <div className="section-inner" style={{ paddingBottom: 8 }}>
          <div className="filter-bar">
            <input className="form-input filter-search" type="text" placeholder="🔍  Search branches..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {regions.map((r) => (
                <button key={r} className={`state-btn${regionFilter === r ? " active" : ""}`} onClick={() => setRegionFilter(r)}>{r}</button>
              ))}
            </div>
            <div className="filter-count">{filtered.length} branch{filtered.length !== 1 ? "es" : ""}</div>
          </div>
        </div>

        {/* Branch Cards */}
        <div className="section-inner">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏦</div>
              <div className="empty-title">No branches found</div>
              <div className="empty-desc">Try adjusting your region filter or search term.</div>
            </div>
          ) : (
            <div className="branch-list">
              {filtered.map((branch) => (
                <div className="branch-card" key={branch.id}>
                  <div className="branch-card-header">
                    <div>
                      <div className="branch-name">🏦 {branch.name}</div>
                      <div className="branch-meta">{branch.address}</div>
                      <div className="branch-meta">👤 {branch.manager} &nbsp;|&nbsp; 📞 {branch.phone}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="type-badge" style={{ background: "#f0f4fa", color: "#0a1628", border: "1px solid #dde3ec" }}>{branch.region}</span>
                      {canManage && editId !== branch.id && (
                        <button className="action-btn edit" onClick={() => startEdit(branch)}>✏️ Edit Hours</button>
                      )}
                    </div>
                  </div>

                  {editId === branch.id ? (
                    <div className="branch-edit-grid">
                      {DAYS.map((day) => {
                        const h = editData.hours[day];
                        return (
                          <div className="branch-edit-row" key={day}>
                            <div className="branch-day-label">{day}</div>
                            <label className="branch-closed-toggle">
                              <input type="checkbox" checked={h.closed} onChange={() => handleClosedToggle(day)} />
                              <span>Closed</span>
                            </label>
                            {!h.closed && (
                              <>
                                <input className="form-input" type="time" value={h.open} onChange={(e) => handleHourChange(day, "open", e.target.value)} style={{ width: 120 }} />
                                <span style={{ color: "var(--muted)", fontSize: 13 }}>to</span>
                                <input className="form-input" type="time" value={h.close} onChange={(e) => handleHourChange(day, "close", e.target.value)} style={{ width: 120 }} />
                              </>
                            )}
                          </div>
                        );
                      })}
                      <div className="form-actions" style={{ marginTop: 16 }}>
                        <button className="btn-secondary" onClick={() => setEditId(null)}>Cancel</button>
                        <button className="btn-primary form-submit-btn" onClick={handleSave}>Save Hours →</button>
                      </div>
                    </div>
                  ) : (
                    <div className="branch-hours-grid">
                      {DAYS.map((day) => {
                        const h = branch.hours[day];
                        return (
                          <div className={`branch-hours-cell${h.closed ? " closed" : ""}`} key={day}>
                            <div className="branch-hours-day">{day}</div>
                            {h.closed ? (
                              <div className="branch-hours-closed">Closed</div>
                            ) : (
                              <div className="branch-hours-time">{h.open}<br />{h.close}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
