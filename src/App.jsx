import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Calendar, Stethoscope, Pill, ShoppingCart, ClipboardList, Settings,
  Phone, Clock, X, Plus, Minus, Check, ChevronRight, ChevronLeft,
  Trash2, Pencil, Package, Home, Menu, LogOut, AlertCircle, Loader2,
  MapPin, Search, Lock, LogIn, UserPlus, Users, FileText, CalendarClock,
  User, ClipboardPlus, AlertTriangle, Award, Sparkles, Heart, ShieldCheck,
  MessageCircle, Facebook, Youtube, Quote, ExternalLink, Download, TrendingUp
} from "lucide-react";

/* ---------------------------------- THEME ---------------------------------- */
const C = {
  jade: "#105A39",
  jadeDeep: "#0B3F28",
  jadeSoft: "#1C7A4C",
  paper: "#F1E9D6",
  paperDeep: "#E7DCC1",
  card: "#FBF7EC",
  gold: "#BD891C",
  goldDeep: "#8A6414",
  seal: "#A23A2E",
  ink: "#2A2A22",
  inkMuted: "#726A57",
  line: "#D8CCA9",
};

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@400;500;600;700&display=swap";

/* ---------------------------------- STORAGE ---------------------------------- */
const KEYS = {
  doctors: "clinic_doctors",
  services: "clinic_services",
  medicines: "clinic_medicines",
  appointments: "clinic_appointments",
  orders: "clinic_orders",
  users: "clinic_users",
  records: "clinic_records",
};
const SESSION_KEY = "clinic_session";

const SEED = {
  doctors: [
    { id: "d1", name: "Lương y Trần Bảo Ngọc", specialty: "Nội tổng hợp & Bắt mạch", years: 22, days: [1,2,3,4,5,6], hours: [["08:00","11:30"],["14:00","17:30"]], bio: "Chuyên điều trị các bệnh nội khoa mạn tính bằng thang thuốc gia truyền." },
    { id: "d2", name: "BS.YHCT Nguyễn Minh Đức", specialty: "Châm cứu - Bấm huyệt", years: 15, days: [1,2,3,4,5], hours: [["08:00","11:30"],["13:30","17:00"]], bio: "10 năm công tác tại khoa Y học cổ truyền bệnh viện tuyến tỉnh." },
    { id: "d3", name: "Lương y Phạm Thị Hồng Vân", specialty: "Phụ khoa Đông y", years: 18, days: [2,3,4,5,6], hours: [["08:30","11:30"],["14:00","17:00"]], bio: "Chuyên điều hoà kinh nguyệt, an thai, hậu sản bằng dược liệu." },
    { id: "d4", name: "Lương y Đỗ Văn Khánh", specialty: "Xương khớp - Thoát vị", years: 27, days: [1,2,3,4,5,6,0], hours: [["07:30","11:30"],["14:00","18:00"]], bio: "Kết hợp xoa bóp, giác hơi và thuốc sắc điều trị thoái hoá, thoát vị đĩa đệm." },
  ],
  services: [
    { id: "s1", name: "Khám bệnh & bắt mạch", price: 150000, duration: 30, desc: "Thăm khám tổng quát, bắt mạch, kê đơn theo thể trạng." },
    { id: "s2", name: "Châm cứu", price: 200000, duration: 45, desc: "Liệu trình châm cứu theo huyệt đạo cổ truyền." },
    { id: "s3", name: "Giác hơi", price: 120000, duration: 30, desc: "Giác hơi giải phong hàn, lưu thông khí huyết." },
    { id: "s4", name: "Bấm huyệt trị liệu", price: 180000, duration: 40, desc: "Bấm huyệt giảm đau nhức, thư giãn cơ." },
    { id: "s5", name: "Xoa bóp toàn thân", price: 250000, duration: 60, desc: "Xoa bóp bằng dầu thảo dược, thư giãn toàn thân." },
    { id: "s6", name: "Sắc thuốc theo yêu cầu", price: 30000, duration: 15, desc: "Sắc thang thuốc thành túi mang về, /thang." },
    { id: "s7", name: "Ngâm chân thảo dược", price: 90000, duration: 30, desc: "Ngâm chân bằng nước thảo dược ấm, hỗ trợ giấc ngủ." },
  ],
  medicines: [
    { id: "m1", name: "Trà atiso lá", cat: "Thanh nhiệt - Giải độc", price: 45000, unit: "hộp 20 gói", stock: 40 },
    { id: "m2", name: "Kim ngân hoa khô", cat: "Thanh nhiệt - Giải độc", price: 60000, unit: "gói 100g", stock: 25 },
    { id: "m3", name: "Bát trân thang", cat: "Bổ khí huyết", price: 180000, unit: "thang 7 thang", stock: 15 },
    { id: "m4", name: "Đông trùng hạ thảo", cat: "Bổ khí huyết", price: 850000, unit: "hộp 10g", stock: 8 },
    { id: "m5", name: "Táo nhân an thần thang", cat: "An thần - Dưỡng tâm", price: 150000, unit: "thang 7 thang", stock: 18 },
    { id: "m6", name: "Trà tim sen", cat: "An thần - Dưỡng tâm", price: 40000, unit: "hộp 20 gói", stock: 30 },
    { id: "m7", name: "Hoài sơn - Bạch truật", cat: "Tiêu hoá", price: 95000, unit: "gói 200g", stock: 20 },
    { id: "m8", name: "Trà gừng mật ong", cat: "Tiêu hoá", price: 35000, unit: "hộp 15 gói", stock: 50 },
    { id: "m9", name: "Cao xoa bóp Xuyên khung", cat: "Xương khớp", price: 65000, unit: "hũ 50g", stock: 22 },
    { id: "m10", name: "Độc hoạt tang ký sinh thang", cat: "Xương khớp", price: 210000, unit: "thang 7 thang", stock: 12 },
    { id: "m11", name: "Tang diệp - Cúc hoa", cat: "Cảm cúm - Ho", price: 55000, unit: "gói 150g", stock: 27 },
    { id: "m12", name: "Siro ho thảo dược", cat: "Cảm cúm - Ho", price: 70000, unit: "chai 100ml", stock: 33 },
  ],
  appointments: [],
  orders: [],
  users: [
    { id: "u-admin", role: "manager", username: "quanly", password: "123456", name: "Quản lý phòng khám", phone: "0900000000", createdAt: Date.now() },
    { id: "u-d1", role: "doctor", doctorId: "d1", username: "bs.ngoc", password: "123456", name: "Lương y Trần Bảo Ngọc", phone: "0901111111", createdAt: Date.now() },
    { id: "u-d2", role: "doctor", doctorId: "d2", username: "bs.duc", password: "123456", name: "BS.YHCT Nguyễn Minh Đức", phone: "0902222222", createdAt: Date.now() },
    { id: "u-d3", role: "doctor", doctorId: "d3", username: "bs.van", password: "123456", name: "Lương y Phạm Thị Hồng Vân", phone: "0903333333", createdAt: Date.now() },
    { id: "u-d4", role: "doctor", doctorId: "d4", username: "bs.khanh", password: "123456", name: "Lương y Đỗ Văn Khánh", phone: "0904444444", createdAt: Date.now() },
  ],
  records: [],
};

const CLINIC = {
  name: "An Hoà Đường",
  slogan: "Bình an – Thịnh vượng",
  fullName: "PHÒNG CHẨN TRỊ Y HỌC CỔ TRUYỀN AN HOÀ ĐƯỜNG",
  address: "Số 11 đường Phạm Văn Đồng, phường Phúc Yên, tỉnh Phú Thọ",
  phone: "0977 527 759",
  phoneDial: "0977527759",
  email: "lienhe@anhoaduong.com",
  hours: "Thứ 2 – Chủ nhật: 7h30 – 18h00",
  license: "Giấy phép hoạt động khám chữa bệnh YHCT số 0000/PTH-GPHĐ",
  mapsUrl: "https://maps.google.com/?q=Số+11+đường+Phạm+Văn+Đồng+phường+Phúc+Yên+tỉnh+Phú+Thọ",
  zaloUrl: "https://zalo.me/0977527759",
  facebookUrl: "https://facebook.com/",
  youtubeUrl: "https://youtube.com/",
};

const CATS = [...new Set(SEED.medicines.map((m) => m.cat))];
const DOW = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const VND = (n) => n.toLocaleString("vi-VN") + "đ";

/* Mỗi key ở trên tương ứng với 1 bảng MySQL, đọc/ghi qua API PHP tại
   /api/data.php (xem file public/api/data.php và mysql-schema.sql).
   loadKey đọc toàn bộ bảng; saveKey ghi đè toàn bộ bảng bằng mảng mới nhất —
   cách này giữ nguyên logic gốc của app (mảng trong bộ nhớ = nguồn sự thật),
   phù hợp quy mô một phòng khám. */
async function loadKey(table, fallback) {
  try {
    const res = await fetch(`/api/data.php?table=${encodeURIComponent(table)}`);
    if (!res.ok) throw new Error("bad response");
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      if (fallback.length > 0) await saveKey(table, fallback);
      return fallback;
    }
    return data;
  } catch {
    return fallback;
  }
}
async function saveKey(table, items) {
  try {
    const res = await fetch(`/api/data.php?table=${encodeURIComponent(table)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    });
    if (!res.ok) throw new Error("bad response");
    return true;
  } catch {
    return false;
  }
}
function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function saveSession(val) {
  try {
    if (val) localStorage.setItem(SESSION_KEY, JSON.stringify(val));
    else localStorage.removeItem(SESSION_KEY);
  } catch {}
}
const fmtDate = (d) => new Date(d).toLocaleDateString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });
const todayISO = () => new Date().toISOString().slice(0, 10);

/* ---------------------------------- XUẤT DỮ LIỆU (CSV) ---------------------------------- */
function toCSVValue(v) {
  if (v === null || v === undefined) return "";
  const s = String(v).replace(/"/g, '""');
  return /[",\n]/.test(s) ? `"${s}"` : s;
}
function rowsToCSV(headers, rows) {
  const headerLine = headers.map((h) => toCSVValue(h.label)).join(",");
  const lines = rows.map((row) => headers.map((h) => toCSVValue(h.get(row))).join(","));
  return "\uFEFF" + [headerLine, ...lines].join("\r\n"); // \uFEFF: để Excel hiển thị đúng tiếng Việt có dấu
}
function downloadCSV(filename, headers, rows) {
  const csv = rowsToCSV(headers, rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ---------------------------------- SMALL UI PIECES ---------------------------------- */
function Seal({ label = "AN HOÀ ĐƯỜNG" }) {
  return (
    <div
      style={{
        width: 72, height: 72, borderRadius: "50%", border: `2.5px solid ${C.seal}`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        transform: "rotate(-8deg)", position: "relative",
      }}
    >
      <div style={{ width: 60, height: 60, borderRadius: "50%", border: `1px solid ${C.seal}`, display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
        <span style={{ color: C.seal, fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 10, textAlign: "center", lineHeight: 1.15, letterSpacing: 0.5 }}>{label}</span>
      </div>
    </div>
  );
}

function Slip({ children, stamped }) {
  return (
    <div
      style={{
        background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: "24px 28px",
        position: "relative", boxShadow: "0 1px 0 rgba(0,0,0,0.03)",
      }}
    >
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 5, background: C.jade }} />
      {children}
      {stamped && (
        <div style={{ position: "absolute", bottom: 18, right: 22 }}>
          <Seal />
        </div>
      )}
    </div>
  );
}

function SectionTitle({ eyebrow, title, sub }) {
  return (
    <div style={{ marginBottom: 28 }}>
      {eyebrow && (
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 2, color: C.goldDeep, textTransform: "uppercase", marginBottom: 6 }}>
          {eyebrow}
        </div>
      )}
      <h2 style={{ fontFamily: "'Lora', serif", fontSize: 30, fontWeight: 600, color: C.jadeDeep, margin: 0 }}>{title}</h2>
      {sub && <p style={{ fontFamily: "'Poppins', sans-serif", color: C.inkMuted, marginTop: 8, fontSize: 15, maxWidth: 560 }}>{sub}</p>}
    </div>
  );
}

function Badge({ children, tone = "jade" }) {
  const tones = {
    jade: { bg: "#E4EEE9", fg: C.jadeDeep },
    gold: { bg: "#F3E7CC", fg: C.goldDeep },
    seal: { bg: "#F3DFDB", fg: C.seal },
  };
  const t = tones[tone];
  return (
    <span style={{ background: t.bg, color: t.fg, fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function Btn({ children, onClick, variant = "primary", full, disabled, type = "button", small }) {
  const base = {
    fontFamily: "'Poppins', sans-serif", fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
    border: "none", borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: small ? "8px 14px" : "12px 22px", fontSize: small ? 13 : 14.5, width: full ? "100%" : "auto",
    opacity: disabled ? 0.5 : 1, transition: "opacity .15s, transform .1s",
  };
  const variants = {
    primary: { background: C.jade, color: "#F5EFDD" },
    gold: { background: C.gold, color: "#2A2010" },
    outline: { background: "transparent", color: C.jadeDeep, border: `1.5px solid ${C.jadeDeep}` },
    ghost: { background: "transparent", color: C.inkMuted },
    danger: { background: "transparent", color: C.seal, border: `1.5px solid ${C.seal}` },
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} style={{ ...base, ...variants[variant] }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
}

const inputStyle = {
  fontFamily: "'Poppins', sans-serif", fontSize: 14, padding: "10px 12px", borderRadius: 8,
  border: `1px solid ${C.line}`, background: "#fff", color: C.ink, width: "100%", outline: "none",
};
function Field({ label, children }) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <span style={{ display: "block", fontFamily: "'Poppins', sans-serif", fontSize: 12.5, fontWeight: 600, color: C.inkMuted, marginBottom: 6 }}>{label}</span>
      {children}
    </label>
  );
}

/* ---------------------------------- APP ---------------------------------- */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [storageError, setStorageError] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("home");
  const [staffTab, setStaffTab] = useState("appointments");
  const [navOpen, setNavOpen] = useState(false);
  const [redirectAfter, setRedirectAfter] = useState(null);
  const [authNotice, setAuthNotice] = useState("");

  const [bookingDoctorId, setBookingDoctorId] = useState(null);
  const [bookingHint, setBookingHint] = useState(null);
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [confirmedAppt, setConfirmedAppt] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  useEffect(() => {
    (async () => {
      const [d, s, m, a, o, u, r, session] = await Promise.all([
        loadKey(KEYS.doctors, SEED.doctors),
        loadKey(KEYS.services, SEED.services),
        loadKey(KEYS.medicines, SEED.medicines),
        loadKey(KEYS.appointments, SEED.appointments),
        loadKey(KEYS.orders, SEED.orders),
        loadKey(KEYS.users, SEED.users),
        loadKey(KEYS.records, SEED.records),
        loadSession(),
      ]);
      setDoctors(d); setServices(s); setMedicines(m); setAppointments(a); setOrders(o); setUsers(u); setRecords(r);
      if (session?.userId) {
        const found = u.find((x) => x.id === session.userId);
        if (found) setCurrentUser(found);
      }
      setLoading(false);
    })().catch(() => { setStorageError(true); setLoading(false); });
  }, []);

  const persist = useCallback(async (key, val, setter) => {
    setter(val);
    const ok = await saveKey(key, val);
    if (!ok) setStorageError(true);
  }, []);

  const goto = (p) => { setPage(p); setNavOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleLogin = async (user) => {
    setCurrentUser(user);
    await saveSession({ userId: user.id });
    setAuthNotice("");
    if (redirectAfter) { goto(redirectAfter); setRedirectAfter(null); }
    else goto("home");
  };
  const handleLogout = async () => {
    setCurrentUser(null);
    await saveSession(null);
    goto("home");
  };
  const requireLogin = (targetPage, notice) => {
    setRedirectAfter(targetPage);
    setAuthNotice(notice || "Vui lòng đăng nhập để tiếp tục.");
    goto("auth");
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const med = medicines.find((m) => m.id === id);
    return sum + (med ? med.price * qty : 0);
  }, 0);

  if (loading) {
    return (
      <div style={{ minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center", background: C.paper }}>
        <Loader2 className="animate-spin" color={C.jade} size={28} />
      </div>
    );
  }

  const globalStyles = (
    <style>{`
      * { box-sizing: border-box; }
      ::placeholder { color: #A79E86; }
      input:focus, select:focus, textarea:focus { border-color: ${C.jade} !important; }
      button { font-family: 'Poppins', sans-serif; }
      .drawer:hover { transform: translateY(-3px); box-shadow: 0 6px 14px rgba(31,64,52,0.12); }
      .nav-mobile { display: none; }
      .nav-desktop { display: none !important; }
      @media (min-width: 760px) { .nav-desktop { display: flex !important; } }
      @media (max-width: 759px) { .nav-mobile { display: flex !important; } }
      @media (max-width: 760px) { .hero-grid { grid-template-columns: 1fr !important; } .checkout-grid { grid-template-columns: 1fr !important; } .footer-grid { grid-template-columns: 1fr !important; } }
      @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(162,58,46,0.5); } 70% { box-shadow: 0 0 0 10px rgba(162,58,46,0); } 100% { box-shadow: 0 0 0 0 rgba(162,58,46,0); } }
    `}</style>
  );
  const errorBanner = storageError && (
    <div style={{ background: "#F3DFDB", color: C.seal, textAlign: "center", padding: "8px 12px", fontSize: 13 }}>
      <AlertCircle size={14} style={{ display: "inline", marginRight: 6, verticalAlign: -2 }} />
      Không thể lưu dữ liệu lúc này — thao tác của bạn có thể không được ghi lại.
    </div>
  );

  if (currentUser?.role === "doctor") {
    return (
      <div style={{ background: C.paper, minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
        <link rel="stylesheet" href={FONT_LINK} />
        {globalStyles}{errorBanner}
        <StaffHeader user={currentUser} onLogout={handleLogout} />
        <main style={{ maxWidth: 1080, margin: "0 auto", padding: "36px 24px 80px" }}>
          <DoctorDashboard
            user={currentUser} doctors={doctors}
            appointments={appointments} setAppointments={(v) => persist(KEYS.appointments, v, setAppointments)}
            records={records} setRecords={(v) => persist(KEYS.records, v, setRecords)}
            users={users}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (currentUser?.role === "manager") {
    return (
      <div style={{ background: C.paper, minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
        <link rel="stylesheet" href={FONT_LINK} />
        {globalStyles}{errorBanner}
        <StaffHeader user={currentUser} onLogout={handleLogout} />
        <main style={{ maxWidth: 1080, margin: "0 auto", padding: "36px 24px 80px" }}>
          <StaffDashboard
            staffTab={staffTab} setStaffTab={setStaffTab}
            doctors={doctors} setDoctors={(v) => persist(KEYS.doctors, v, setDoctors)}
            services={services} setServices={(v) => persist(KEYS.services, v, setServices)}
            medicines={medicines} setMedicines={(v) => persist(KEYS.medicines, v, setMedicines)}
            appointments={appointments} setAppointments={(v) => persist(KEYS.appointments, v, setAppointments)}
            orders={orders} setOrders={(v) => persist(KEYS.orders, v, setOrders)}
            users={users} setUsers={(v) => persist(KEYS.users, v, setUsers)}
            records={records}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: C.paper, minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      <link rel="stylesheet" href={FONT_LINK} />
      {globalStyles}{errorBanner}

      <Header page={page} goto={goto} currentUser={currentUser} cartCount={cartCount} setCartOpen={setCartOpen} navOpen={navOpen} setNavOpen={setNavOpen} />

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "36px 24px 80px" }}>
        {page === "home" && <HomePage goto={goto} doctors={doctors} services={services} setBookingDoctorId={setBookingDoctorId} />}
        {page === "doctors" && <DoctorsPage doctors={doctors} onBook={(id) => { setBookingDoctorId(id); goto("booking"); }} />}
        {page === "auth" && (
          <AuthScreen users={users} setUsers={(v) => persist(KEYS.users, v, setUsers)} onSuccess={handleLogin} notice={authNotice} />
        )}
        {page === "booking" && (
          currentUser?.role === "patient" ? (
            <BookingPage
              doctors={doctors} appointments={appointments} bookingDoctorId={bookingDoctorId} setBookingDoctorId={setBookingDoctorId}
              currentUser={currentUser} bookingHint={bookingHint}
              onConfirm={async (appt) => {
                const next = [...appointments, appt];
                await persist(KEYS.appointments, next, setAppointments);
                setConfirmedAppt(appt); setBookingHint(null); goto("appt-confirm");
              }}
            />
          ) : (
            <LoginPrompt text="Đăng nhập tài khoản bệnh nhân để đặt lịch khám và lưu lịch sử khám bệnh của bạn." onLogin={() => requireLogin("booking")} />
          )
        )}
        {page === "appt-confirm" && confirmedAppt && (
          <ApptConfirmPage appt={confirmedAppt} doctor={doctors.find((d) => d.id === confirmedAppt.doctorId)} goto={goto} />
        )}
        {page === "pricing" && <PricingPage services={services} />}
        {page === "pharmacy" && <PharmacyPage medicines={medicines} cart={cart} setCart={setCart} />}
        {page === "checkout" && (
          <CheckoutPage
            cart={cart} medicines={medicines} total={cartTotal} currentUser={currentUser}
            onBack={() => goto("pharmacy")}
            onConfirm={async (order) => {
              const next = [...orders, order];
              await persist(KEYS.orders, next, setOrders);
              setCart({}); setConfirmedOrder(order); goto("order-confirm");
            }}
          />
        )}
        {page === "order-confirm" && confirmedOrder && <OrderConfirmPage order={confirmedOrder} goto={goto} />}
        {page === "my-records" && (
          currentUser?.role === "patient" ? (
            <MyRecordsPage
              currentUser={currentUser} appointments={appointments} records={records} doctors={doctors}
              onRebook={(doctorId, suggestedDate) => { setBookingDoctorId(doctorId); setBookingHint({ suggestedDate }); goto("booking"); }}
            />
          ) : (
            <LoginPrompt text="Đăng nhập để xem lịch hẹn và hồ sơ khám bệnh của bạn." onLogin={() => requireLogin("my-records")} />
          )
        )}
      </main>

      <CartDrawer open={cartOpen} setOpen={setCartOpen} cart={cart} setCart={setCart} medicines={medicines} total={cartTotal}
        onCheckout={() => { setCartOpen(false); goto("checkout"); }} />

      <FloatingContact />
      <Footer />
    </div>
  );
}

function LoginPrompt({ text, onLogin }) {
  return (
    <div style={{ maxWidth: 420, margin: "40px auto", textAlign: "center" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.jade, color: C.gold, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <Lock size={22} />
      </div>
      <p style={{ color: C.inkMuted, fontSize: 14.5, lineHeight: 1.6, marginBottom: 20 }}>{text}</p>
      <Btn onClick={onLogin}><LogIn size={15} /> Đăng nhập / Đăng ký</Btn>
    </div>
  );
}

/* ---------------------------------- HEADER / FOOTER ---------------------------------- */
function Header({ page, goto, currentUser, cartCount, setCartOpen, navOpen, setNavOpen }) {
  const navItems = [
    { id: "home", label: "Trang chủ", icon: Home },
    { id: "doctors", label: "Bác sĩ", icon: Stethoscope },
    { id: "booking", label: "Đặt lịch", icon: Calendar },
    { id: "pricing", label: "Bảng giá", icon: ClipboardList },
    { id: "pharmacy", label: "Nhà thuốc", icon: Pill },
    ...(currentUser ? [{ id: "my-records", label: "Hồ sơ của tôi", icon: FileText }] : []),
  ];
  return (
    <header style={{ background: C.jade, color: "#F5EFDD" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => goto("home")}>
          <img src="/logo.png" alt={CLINIC.name} style={{ width: 46, height: 46, objectFit: "contain", flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 19, letterSpacing: 0.3 }}>{CLINIC.name}</div>
            <div style={{ fontSize: 11, color: "#C9BE9E", letterSpacing: 1 }}>{CLINIC.slogan.toUpperCase()}</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ display: "flex", gap: 2 }} className="nav-desktop">
            {navItems.map((n) => (
              <button key={n.id} onClick={() => goto(n.id)}
                style={{
                  background: page === n.id ? "rgba(255,255,255,0.12)" : "transparent", color: "#F5EFDD",
                  border: "none", padding: "8px 12px", borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                <n.icon size={15} /> {n.label}
              </button>
            ))}
          </div>
          <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: "transparent", border: "none", color: "#F5EFDD", cursor: "pointer", padding: 8 }}>
            <ShoppingCart size={19} />
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: 2, right: 2, background: C.seal, color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>
            )}
          </button>
          {currentUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.gold, color: "#2A2010", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{currentUser.name?.[0] || "?"}</div>
              <span style={{ fontSize: 12.5, fontWeight: 600, maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentUser.name}</span>
            </div>
          ) : (
            <button onClick={() => goto("auth")}
              style={{ background: "transparent", color: "#F5EFDD", border: `1.5px solid ${C.gold}`, borderRadius: 8, padding: "7px 12px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <LogIn size={14} /> Đăng nhập
            </button>
          )}
        </div>
      </div>
      <div style={{ display: "flex", overflowX: "auto", gap: 2, padding: "0 16px 10px", borderTop: "1px solid rgba(255,255,255,0.1)" }} className="nav-mobile">
        {navItems.map((n) => (
          <button key={n.id} onClick={() => goto(n.id)}
            style={{ flexShrink: 0, background: page === n.id ? "rgba(255,255,255,0.14)" : "transparent", color: "#F5EFDD", border: "none", padding: "8px 12px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>
            {n.label}
          </button>
        ))}
      </div>
    </header>
  );
}

function StaffHeader({ user, onLogout }) {
  const roleLabel = user.role === "doctor" ? "Bác sĩ / Lương y" : "Quản lý phòng khám";
  return (
    <header style={{ background: C.jadeDeep, color: "#F5EFDD" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/logo.png" alt={CLINIC.name} style={{ width: 42, height: 42, objectFit: "contain", flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 18 }}>{CLINIC.name}</div>
            <div style={{ fontSize: 11, color: "#C9BE9E", letterSpacing: 1 }}>{roleLabel.toUpperCase()}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px" }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.gold, color: "#2A2010", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{user.name?.[0] || "?"}</div>
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>{user.name}</span>
          </div>
          <button onClick={onLogout} style={{ background: "transparent", color: "#F5EFDD", border: `1.5px solid ${C.gold}`, borderRadius: 8, padding: "7px 12px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <LogOut size={14} /> Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ background: C.jadeDeep, color: "#C9BE9E", padding: "40px 24px 24px", fontSize: 13 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: 32 }} className="footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <img src="/logo.png" alt={CLINIC.name} style={{ width: 38, height: 38, objectFit: "contain", flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: "'Lora', serif", color: "#F5EFDD", fontSize: 17 }}>{CLINIC.name}</div>
              <div style={{ fontSize: 11, color: C.gold }}>{CLINIC.slogan}</div>
            </div>
          </div>
          <div style={{ lineHeight: 1.9 }}>
            <div><MapPin size={13} style={{ display: "inline", marginRight: 6, verticalAlign: -2 }} />{CLINIC.address}{" "}
              <a href={CLINIC.mapsUrl} target="_blank" rel="noreferrer" style={{ color: C.gold, textDecoration: "none" }}>Xem bản đồ <ExternalLink size={10} style={{ display: "inline", verticalAlign: 0 }} /></a>
            </div>
            <div><Clock size={13} style={{ display: "inline", marginRight: 6, verticalAlign: -2 }} />{CLINIC.hours}</div>
            <div><Phone size={13} style={{ display: "inline", marginRight: 6, verticalAlign: -2 }} /><a href={`tel:${CLINIC.phoneDial}`} style={{ color: "#C9BE9E", textDecoration: "none" }}>{CLINIC.phone}</a></div>
            <div style={{ opacity: 0.85 }}>Email: {CLINIC.email}</div>
          </div>
          <div style={{ marginTop: 14, fontSize: 11.5, opacity: 0.75, lineHeight: 1.6 }}>{CLINIC.license}</div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <a href={CLINIC.zaloUrl} target="_blank" rel="noreferrer" style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5EFDD" }}><MessageCircle size={15} /></a>
            <a href={CLINIC.facebookUrl} target="_blank" rel="noreferrer" style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5EFDD" }}><Facebook size={15} /></a>
            <a href={CLINIC.youtubeUrl} target="_blank" rel="noreferrer" style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5EFDD" }}><Youtube size={15} /></a>
          </div>
        </div>
        <div>
          <div style={{ color: "#F5EFDD", fontWeight: 700, fontSize: 12.5, letterSpacing: 1, marginBottom: 12 }}>PHÒNG KHÁM</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span>Đội ngũ lương y</span>
            <span>Bảng giá dịch vụ</span>
            <span>Nhà thuốc</span>
            <span>Hồ sơ của tôi</span>
          </div>
        </div>
        <div>
          <div style={{ color: "#F5EFDD", fontWeight: 700, fontSize: 12.5, letterSpacing: 1, marginBottom: 12 }}>HỖ TRỢ</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span>Đặt lịch khám</span>
            <span>Câu hỏi thường gặp</span>
            <span>Chính sách bảo mật</span>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1080, margin: "28px auto 0", paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center", opacity: 0.7, fontSize: 12 }}>
        © {new Date().getFullYear()} {CLINIC.name}. Đã đăng ký hoạt động theo quy định pháp luật.
      </div>
    </footer>
  );
}

function FloatingContact() {
  return (
    <div style={{ position: "fixed", right: 18, bottom: 18, display: "flex", flexDirection: "column", gap: 10, zIndex: 40 }}>
      <a href={CLINIC.zaloUrl} target="_blank" rel="noreferrer" title="Nhắn Zalo"
        style={{ width: 50, height: 50, borderRadius: "50%", background: "#0068FF", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.25)", textDecoration: "none" }}>
        <MessageCircle size={22} />
      </a>
      <a href={`tel:${CLINIC.phoneDial}`} title="Gọi ngay"
        style={{ width: 50, height: 50, borderRadius: "50%", background: C.seal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.25)", textDecoration: "none", animation: "pulse 2s infinite" }}>
        <Phone size={20} />
      </a>
    </div>
  );
}

/* ---------------------------------- HOME ---------------------------------- */
function HomePage({ goto, doctors, services, setBookingDoctorId }) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40, alignItems: "center", marginBottom: 56 }} className="hero-grid">
        <div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12.5, fontWeight: 700, letterSpacing: 2.5, color: C.goldDeep, textTransform: "uppercase", marginBottom: 14 }}>
            {CLINIC.slogan} · Y học cổ truyền
          </div>
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: 42, lineHeight: 1.18, color: C.jadeDeep, margin: "0 0 18px", fontWeight: 600 }}>
            Bắt mạch, kê đơn,<br />giữ gìn khí huyết an hoà
          </h1>
          <p style={{ color: C.inkMuted, fontSize: 15.5, lineHeight: 1.7, maxWidth: 480, marginBottom: 26 }}>
            Đặt lịch khám với lương y phù hợp, xem trước bảng giá dịch vụ, và đặt thuốc thang mang về —
            tất cả trong một nơi, không cần gọi điện chờ đợi.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn variant="gold" onClick={() => goto("booking")}><Calendar size={16} /> Đặt lịch khám</Btn>
            <Btn variant="outline" onClick={() => goto("pharmacy")}><Pill size={16} /> Đặt thuốc</Btn>
          </div>
        </div>
        <Slip>
          <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: C.jadeDeep, fontSize: 15, marginBottom: 10 }}>Giờ mở cửa</div>
          {[["Thứ 2 – Thứ 7", "7:30 – 18:00"], ["Chủ nhật", "8:00 – 12:00"]].map(([d, h]) => (
            <div key={d} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px dashed ${C.line}`, fontSize: 13.5, color: C.ink }}>
              <span>{d}</span><span style={{ fontWeight: 600 }}>{h}</span>
            </div>
          ))}
          <div style={{ marginTop: 14, fontSize: 12.5, color: C.inkMuted }}>4 lương y · 7 dịch vụ trị liệu · Nhà thuốc thang</div>
        </Slip>
      </div>

      <WhyUs />
      <ProcessSteps />

      <SectionTitle eyebrow="Đội ngũ" title="Lương y phòng khám" sub="Chọn lương y phù hợp với thể trạng và nhu cầu điều trị." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 18, marginBottom: 56 }}>
        {doctors.slice(0, 4).map((d) => (
          <DoctorCard key={d.id} d={d} onBook={() => { setBookingDoctorId(d.id); goto("booking"); }} />
        ))}
      </div>

      <SectionTitle eyebrow="Dịch vụ" title="Được yêu cầu nhiều nhất" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 14, marginBottom: 56 }}>
        {services.slice(0, 4).map((s) => (
          <div key={s.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 18 }}>
            <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: C.jadeDeep, marginBottom: 6 }}>{s.name}</div>
            <div style={{ fontSize: 13, color: C.inkMuted, marginBottom: 10 }}>{s.duration} phút</div>
            <div style={{ fontFamily: "'Lora', serif", color: C.seal, fontWeight: 700, fontSize: 17 }}>{VND(s.price)}</div>
          </div>
        ))}
      </div>

      <Testimonials />
    </div>
  );
}

const WHY_US = [
  { icon: Award, title: "Chuyên môn gia truyền", text: "Lương y nhiều năm kinh nghiệm, kế thừa bài thuốc gia truyền kết hợp kiến thức y học cổ truyền hiện đại." },
  { icon: ShieldCheck, title: "Dược liệu rõ nguồn gốc", text: "Thảo dược được kiểm định, sơ chế và bảo quản đúng chuẩn trước khi bốc thang cho bệnh nhân." },
  { icon: Clock, title: "Giờ giấc linh hoạt", text: "Mở cửa cả tuần, nhiều khung giờ khám để không ảnh hưởng công việc hằng ngày của bệnh nhân." },
  { icon: Heart, title: "Chăm sóc tận tâm", text: "Mỗi bệnh nhân được theo dõi hồ sơ khám xuyên suốt, nhắc lịch tái khám đúng thời điểm." },
  { icon: Sparkles, title: "Minh bạch chi phí", text: "Bảng giá dịch vụ và thuốc niêm yết rõ ràng, không phát sinh trước khi bệnh nhân đồng ý." },
];

function WhyUs() {
  return (
    <div style={{ marginBottom: 56 }}>
      <SectionTitle eyebrow="Vì sao chọn chúng tôi" title="Cam kết với mỗi bệnh nhân" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 16 }}>
        {WHY_US.map((w) => (
          <div key={w.title} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: "20px 18px" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.jade, color: C.gold, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <w.icon size={19} />
            </div>
            <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: C.jadeDeep, fontSize: 14.5, marginBottom: 6 }}>{w.title}</div>
            <div style={{ fontSize: 12.5, color: C.inkMuted, lineHeight: 1.6 }}>{w.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PROCESS = [
  { n: "01", title: "Tư vấn, đặt lịch hẹn", text: "Chọn lương y và khung giờ phù hợp ngay trên app." },
  { n: "02", title: "Bắt mạch, thăm khám", text: "Lương y thăm khám, bắt mạch và đánh giá thể trạng." },
  { n: "03", title: "Kê đơn, lên phác đồ", text: "Chẩn đoán và hướng điều trị được ghi vào hồ sơ bệnh án." },
  { n: "04", title: "Sắc thuốc, theo dõi", text: "Nhận thuốc thang, được hướng dẫn cách dùng và theo dõi tại nhà." },
  { n: "05", title: "Tái khám định kỳ", text: "Nhắc lịch tái khám tự động theo hẹn của lương y." },
];

function ProcessSteps() {
  return (
    <div style={{ marginBottom: 56 }}>
      <SectionTitle eyebrow="Quy trình" title="Quy trình thăm khám" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px,1fr))", gap: 4 }}>
        {PROCESS.map((p, i) => (
          <div key={p.n} style={{ position: "relative", padding: "18px 16px", background: i % 2 === 0 ? C.card : "transparent" }}>
            <div style={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 26, color: C.gold, opacity: 0.6, marginBottom: 8 }}>{p.n}</div>
            <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: C.jadeDeep, fontSize: 14, marginBottom: 6 }}>{p.title}</div>
            <div style={{ fontSize: 12, color: C.inkMuted, lineHeight: 1.5 }}>{p.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  { name: "Nguyễn Thị Hoa", loc: "Phúc Yên, Phú Thọ", text: "Bốc thuốc điều trị mất ngủ ở đây 2 tháng, ngủ ngon hẳn. Lương y hỏi kỹ và giải thích dễ hiểu." },
  { name: "Trần Văn Minh", loc: "Việt Trì, Phú Thọ", text: "Đau vai gáy lâu năm, châm cứu và bấm huyệt vài buổi đã đỡ nhiều. Đặt lịch trên app rất tiện, không phải chờ." },
  { name: "Lê Thị Thu", loc: "Phú Thọ", text: "Thích nhất là xem được hồ sơ khám và nhắc tái khám tự động, không sợ quên như trước." },
];

function Testimonials() {
  return (
    <div style={{ marginBottom: 56 }}>
      <SectionTitle eyebrow="Cảm nhận" title="Phản hồi của bệnh nhân" sub="Nội dung mẫu — có thể thay bằng đánh giá thật của phòng khám." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 16 }}>
        {TESTIMONIALS.map((t) => (
          <div key={t.name} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 18 }}>
            <Quote size={18} color={C.gold} style={{ marginBottom: 10 }} />
            <p style={{ fontSize: 13, color: C.ink, lineHeight: 1.6, marginBottom: 14 }}>{t.text}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.jade, color: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 13 }}>{t.name[0]}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.jadeDeep }}>{t.name}</div>
                <div style={{ fontSize: 11.5, color: C.inkMuted }}>{t.loc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DoctorCard({ d, onBook }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 18 }}>
      <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.jade, color: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 17, marginBottom: 12 }}>
        {d.name.split(" ").slice(-1)[0][0]}
      </div>
      <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: C.jadeDeep, fontSize: 15.5, marginBottom: 3 }}>{d.name}</div>
      <div style={{ fontSize: 12.5, color: C.goldDeep, fontWeight: 600, marginBottom: 8 }}>{d.specialty}</div>
      <div style={{ fontSize: 12.5, color: C.inkMuted, marginBottom: 14 }}>{d.years} năm kinh nghiệm</div>
      <Btn small variant="outline" full onClick={onBook}>Đặt lịch <ChevronRight size={14} /></Btn>
    </div>
  );
}

/* ---------------------------------- DOCTORS ---------------------------------- */
function DoctorsPage({ doctors, onBook }) {
  return (
    <div>
      <SectionTitle eyebrow="Đội ngũ lương y" title="Bác sĩ & lương y" sub="Mỗi lương y có thế mạnh riêng — xem tiểu sử trước khi đặt lịch." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 18 }}>
        {doctors.map((d) => (
          <div key={d.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 20 }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: C.jade, color: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
                {d.name.split(" ").slice(-1)[0][0]}
              </div>
              <div>
                <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: C.jadeDeep, fontSize: 16 }}>{d.name}</div>
                <div style={{ fontSize: 12.5, color: C.goldDeep, fontWeight: 600 }}>{d.specialty}</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: C.inkMuted, lineHeight: 1.6, marginBottom: 14 }}>{d.bio}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
              <Badge tone="jade">{d.years} năm KN</Badge>
              <Badge tone="gold">Làm việc {d.days.length}/7 ngày</Badge>
            </div>
            <Btn full variant="primary" onClick={() => onBook(d.id)}><Calendar size={15} /> Đặt lịch với lương y này</Btn>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- BOOKING ---------------------------------- */
function nextDays(n) {
  const out = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now); d.setDate(now.getDate() + i);
    out.push(d);
  }
  return out;
}
function timeSlots(hoursRanges) {
  const slots = [];
  hoursRanges.forEach(([start, end]) => {
    let [h, m] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    while (h < eh || (h === eh && m < em)) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      m += 30; if (m >= 60) { m -= 60; h += 1; }
    }
  });
  return slots;
}

function BookingPage({ doctors, appointments, bookingDoctorId, setBookingDoctorId, onConfirm, currentUser, bookingHint }) {
  const [step, setStep] = useState(bookingDoctorId ? 2 : 1);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [form, setForm] = useState({ name: currentUser?.name || "", phone: currentUser?.phone || "", note: "" });
  const [error, setError] = useState("");

  const doctor = doctors.find((d) => d.id === bookingDoctorId);
  const days = useMemo(() => nextDays(21), []);

  const availableDays = days.filter((d) => doctor && doctor.days.includes(d.getDay()));
  const bookedForDoctorDate = (d) =>
    appointments.filter((a) => a.doctorId === bookingDoctorId && a.date === d.toDateString()).map((a) => a.time);
  const slots = doctor && date ? timeSlots(doctor.hours).filter((t) => !bookedForDoctorDate(date).includes(t)) : [];

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) { setError("Vui lòng nhập đầy đủ họ tên và số điện thoại."); return; }
    onConfirm({
      id: "a" + Date.now(), doctorId: bookingDoctorId, date: date.toDateString(), dateLabel: date.toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit" }),
      time, patientName: form.name.trim(), phone: form.phone.trim(), note: form.note.trim(),
      patientUserId: currentUser?.id || null, isFollowUp: !!bookingHint,
      status: "Chờ xác nhận", createdAt: Date.now(),
    });
  };

  return (
    <div>
      <SectionTitle eyebrow="Đặt lịch khám" title="Chọn lương y, ngày và giờ" />
      <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
        {["Chọn lương y", "Chọn ngày giờ", "Thông tin"].map((s, i) => (
          <div key={s} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ height: 3, background: step >= i + 1 ? C.gold : C.line, marginBottom: 8 }} />
            <div style={{ fontSize: 12, color: step === i + 1 ? C.jadeDeep : C.inkMuted, fontWeight: step === i + 1 ? 700 : 500 }}>{s}</div>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px,1fr))", gap: 14 }}>
          {doctors.map((d) => (
            <button key={d.id} onClick={() => { setBookingDoctorId(d.id); setDate(null); setTime(null); setStep(2); }}
              style={{ textAlign: "left", background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 16, cursor: "pointer" }}>
              <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: C.jadeDeep }}>{d.name}</div>
              <div style={{ fontSize: 12.5, color: C.goldDeep, fontWeight: 600, marginTop: 3 }}>{d.specialty}</div>
            </button>
          ))}
        </div>
      )}

      {step === 2 && doctor && (
        <div>
          <div style={{ marginBottom: 18, fontSize: 14, color: C.ink }}>
            Lương y: <strong style={{ color: C.jadeDeep }}>{doctor.name}</strong>{" "}
            <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: C.goldDeep, fontSize: 12.5, cursor: "pointer", fontWeight: 600 }}>đổi</button>
          </div>
          {bookingHint?.suggestedDate && (
            <div style={{ background: "#F3E7CC", color: C.goldDeep, fontSize: 13, padding: "10px 14px", borderRadius: 12, marginBottom: 18 }}>
              <CalendarClock size={14} style={{ display: "inline", marginRight: 6, verticalAlign: -2 }} />
              Lương y hẹn tái khám quanh ngày {fmtDate(bookingHint.suggestedDate)} — hãy chọn ngày gần với ngày này.
            </div>
          )}
          <div style={{ fontSize: 13, fontWeight: 700, color: C.inkMuted, marginBottom: 8 }}>CHỌN NGÀY</div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 20 }}>
            {availableDays.map((d) => (
              <button key={d.toDateString()} onClick={() => { setDate(d); setTime(null); }}
                style={{
                  flexShrink: 0, minWidth: 64, padding: "10px 6px", borderRadius: 12, cursor: "pointer",
                  border: `1.5px solid ${date && date.toDateString() === d.toDateString() ? C.jade : C.line}`,
                  background: date && date.toDateString() === d.toDateString() ? C.jade : "#fff",
                  color: date && date.toDateString() === d.toDateString() ? "#F5EFDD" : C.ink, textAlign: "center",
                }}>
                <div style={{ fontSize: 11, opacity: 0.8 }}>{DOW[d.getDay()]}</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{d.getDate()}</div>
              </button>
            ))}
          </div>
          {date && (
            <>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.inkMuted, marginBottom: 8 }}>CHỌN GIỜ</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {slots.length === 0 && <div style={{ color: C.inkMuted, fontSize: 13.5 }}>Hết chỗ trong ngày này, vui lòng chọn ngày khác.</div>}
                {slots.map((t) => (
                  <button key={t} onClick={() => setTime(t)}
                    style={{
                      padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13.5,
                      border: `1.5px solid ${time === t ? C.jade : C.line}`, background: time === t ? C.jade : "#fff",
                      color: time === t ? "#F5EFDD" : C.ink, fontWeight: 600,
                    }}>{t}</button>
                ))}
              </div>
            </>
          )}
          <Btn disabled={!date || !time} onClick={() => setStep(3)}>Tiếp tục <ChevronRight size={15} /></Btn>
        </div>
      )}

      {step === 3 && doctor && (
        <form onSubmit={submit} style={{ maxWidth: 440 }}>
          <div style={{ marginBottom: 18, fontSize: 14, color: C.ink }}>
            <strong style={{ color: C.jadeDeep }}>{doctor.name}</strong> · {date.toLocaleDateString("vi-VN")} · {time}{" "}
            <button type="button" onClick={() => setStep(2)} style={{ background: "none", border: "none", color: C.goldDeep, fontSize: 12.5, cursor: "pointer", fontWeight: 600 }}>đổi</button>
          </div>
          <Field label="Họ và tên"><input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nguyễn Văn A" /></Field>
          <Field label="Số điện thoại"><input style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="09xx xxx xxx" /></Field>
          <Field label="Triệu chứng / ghi chú (không bắt buộc)"><textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Mô tả ngắn tình trạng của bạn" /></Field>
          {error && <div style={{ color: C.seal, fontSize: 13, marginBottom: 12 }}>{error}</div>}
          <Btn type="submit"><Check size={15} /> Xác nhận đặt lịch</Btn>
        </form>
      )}
    </div>
  );
}

function ApptConfirmPage({ appt, doctor, goto }) {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <SectionTitle eyebrow="Đặt lịch thành công" title="Phiếu hẹn khám" />
      <Slip stamped>
        <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: C.goldDeep, fontWeight: 700, letterSpacing: 1 }}>MÃ PHIẾU #{appt.id.slice(-6).toUpperCase()}</div>
        <div style={{ height: 1, background: `repeating-linear-gradient(90deg, ${C.line}, ${C.line} 6px, transparent 6px, transparent 12px)`, margin: "12px 0" }} />
        {[["Bệnh nhân", appt.patientName], ["Điện thoại", appt.phone], ["Lương y", doctor?.name], ["Ngày khám", appt.dateLabel], ["Giờ hẹn", appt.time], ["Trạng thái", appt.status]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13.5 }}>
            <span style={{ color: C.inkMuted }}>{k}</span><span style={{ fontWeight: 600, color: C.ink }}>{v}</span>
          </div>
        ))}
        {appt.note && <div style={{ marginTop: 10, fontSize: 13, color: C.inkMuted, fontStyle: "italic" }}>Ghi chú: {appt.note}</div>}
      </Slip>
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <Btn variant="outline" onClick={() => goto("home")}>Về trang chủ</Btn>
        <Btn variant="primary" onClick={() => goto("pharmacy")}>Đặt thêm thuốc <ChevronRight size={14} /></Btn>
      </div>
    </div>
  );
}

/* ---------------------------------- PRICING ---------------------------------- */
function PricingPage({ services }) {
  return (
    <div>
      <SectionTitle eyebrow="Minh bạch chi phí" title="Bảng giá dịch vụ" sub="Giá niêm yết, chưa bao gồm chi phí thuốc thang riêng." />
      <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        {services.map((s, i) => (
          <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: i < services.length - 1 ? `1px solid ${C.line}` : "none", gap: 12 }}>
            <div>
              <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: C.jadeDeep, fontSize: 15.5 }}>{s.name}</div>
              <div style={{ fontSize: 12.5, color: C.inkMuted, marginTop: 2 }}>{s.desc} · {s.duration} phút</div>
            </div>
            <div style={{ fontFamily: "'Lora', serif", fontWeight: 700, color: C.seal, fontSize: 17, whiteSpace: "nowrap" }}>{VND(s.price)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- PHARMACY ---------------------------------- */
function PharmacyPage({ medicines, cart, setCart }) {
  const [openCat, setOpenCat] = useState(null);
  const [query, setQuery] = useState("");
  const cats = [...new Set(medicines.map((m) => m.cat))];

  const filtered = query.trim()
    ? medicines.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))
    : null;

  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));

  return (
    <div>
      <SectionTitle eyebrow="Nhà thuốc" title="Tủ thuốc Đông y" sub="Chọn theo ngăn thuốc, hoặc tìm nhanh theo tên." />
      <div style={{ position: "relative", marginBottom: 26, maxWidth: 340 }}>
        <Search size={16} color={C.inkMuted} style={{ position: "absolute", left: 12, top: 12 }} />
        <input style={{ ...inputStyle, paddingLeft: 36 }} placeholder="Tìm tên thuốc..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {filtered ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 12 }}>
          {filtered.map((m) => <MedCard key={m.id} m={m} onAdd={() => add(m.id)} qty={cart[m.id] || 0} />)}
          {filtered.length === 0 && <div style={{ color: C.inkMuted }}>Không tìm thấy thuốc phù hợp.</div>}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px,1fr))", gap: 14 }}>
          {cats.map((cat) => (
            <button key={cat} className="drawer" onClick={() => setOpenCat(cat)}
              style={{
                textAlign: "left", cursor: "pointer", background: "linear-gradient(180deg,#3A5F4E,#2C4A3B)", border: `1px solid ${C.jadeDeep}`,
                borderRadius: 12, padding: "18px 14px", color: "#F5EFDD", position: "relative", transition: "transform .15s",
              }}>
              <div style={{ position: "absolute", top: 10, right: 12, width: 20, height: 8, borderRadius: 12, background: C.gold, opacity: 0.85 }} />
              <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 14.5, marginTop: 20, lineHeight: 1.35 }}>{cat}</div>
              <div style={{ fontSize: 11.5, color: "#C9BE9E", marginTop: 8 }}>{medicines.filter((m) => m.cat === cat).length} vị thuốc</div>
            </button>
          ))}
        </div>
      )}

      {openCat && !filtered && (
        <div style={{ marginTop: 30 }}>
          <button onClick={() => setOpenCat(null)} style={{ background: "none", border: "none", color: C.goldDeep, fontWeight: 700, fontSize: 13, cursor: "pointer", marginBottom: 14, display: "flex", alignItems: "center", gap: 4 }}>
            <ChevronLeft size={15} /> Tất cả ngăn thuốc
          </button>
          <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: C.jadeDeep, fontSize: 18, marginBottom: 14 }}>{openCat}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 12 }}>
            {medicines.filter((m) => m.cat === openCat).map((m) => <MedCard key={m.id} m={m} onAdd={() => add(m.id)} qty={cart[m.id] || 0} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function MedCard({ m, onAdd, qty }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 15 }}>
      <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: C.jadeDeep, fontSize: 14.5, marginBottom: 3 }}>{m.name}</div>
      <div style={{ fontSize: 12, color: C.inkMuted, marginBottom: 10 }}>{m.unit}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Lora', serif", fontWeight: 700, color: C.seal }}>{VND(m.price)}</span>
        <Btn small variant={qty ? "primary" : "outline"} onClick={onAdd}><Plus size={13} /> {qty ? `Đã thêm ${qty}` : "Thêm"}</Btn>
      </div>
    </div>
  );
}

/* ---------------------------------- CART / CHECKOUT ---------------------------------- */
function CartDrawer({ open, setOpen, cart, setCart, medicines, total, onCheckout }) {
  if (!open) return null;
  const items = Object.entries(cart).filter(([, q]) => q > 0);
  const inc = (id, d) => setCart((c) => { const n = Math.max(0, (c[id] || 0) + d); const cp = { ...c }; if (n === 0) delete cp[id]; else cp[id] = n; return cp; });
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(21,45,36,0.45)", zIndex: 50, display: "flex", justifyContent: "flex-end" }} onClick={() => setOpen(false)}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 360, maxWidth: "92vw", background: C.paper, height: "100%", overflowY: "auto", padding: 22, boxShadow: "-4px 0 16px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 19, color: C.jadeDeep }}>Giỏ thuốc</div>
          <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: C.inkMuted }}><X size={20} /></button>
        </div>
        {items.length === 0 && <div style={{ color: C.inkMuted, fontSize: 14 }}>Chưa có thuốc nào trong giỏ.</div>}
        {items.map(([id, qty]) => {
          const m = medicines.find((x) => x.id === id);
          if (!m) return null;
          return (
            <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${C.line}` }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{m.name}</div>
                <div style={{ fontSize: 12, color: C.inkMuted }}>{VND(m.price)}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => inc(id, -1)} style={{ width: 24, height: 24, borderRadius: 8, border: `1px solid ${C.line}`, background: "#fff", cursor: "pointer" }}><Minus size={12} /></button>
                <span style={{ fontSize: 13, fontWeight: 700, minWidth: 16, textAlign: "center" }}>{qty}</span>
                <button onClick={() => inc(id, 1)} style={{ width: 24, height: 24, borderRadius: 8, border: `1px solid ${C.line}`, background: "#fff", cursor: "pointer" }}><Plus size={12} /></button>
              </div>
            </div>
          );
        })}
        {items.length > 0 && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 17, color: C.jadeDeep }}>
              <span>Tổng cộng</span><span>{VND(total)}</span>
            </div>
            <Btn full onClick={onCheckout}>Đặt mua <ChevronRight size={15} /></Btn>
          </>
        )}
      </div>
    </div>
  );
}

function CheckoutPage({ cart, medicines, total, onBack, onConfirm, currentUser }) {
  const [form, setForm] = useState({ name: currentUser?.name || "", phone: currentUser?.phone || "", address: "" });
  const [error, setError] = useState("");
  const items = Object.entries(cart).filter(([, q]) => q > 0);

  if (items.length === 0) {
    return <div style={{ textAlign: "center", padding: "60px 0", color: C.inkMuted }}>
      Giỏ thuốc đang trống. <button onClick={onBack} style={{ color: C.goldDeep, background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>Quay lại nhà thuốc</button>
    </div>;
  }

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) { setError("Vui lòng điền đầy đủ thông tin nhận thuốc."); return; }
    onConfirm({
      id: "o" + Date.now(),
      items: items.map(([id, qty]) => { const m = medicines.find((x) => x.id === id); return { id, name: m?.name, price: m?.price, qty }; }),
      total, patientName: form.name.trim(), phone: form.phone.trim(), address: form.address.trim(),
      status: "Chờ xử lý", createdAt: Date.now(),
    });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 36 }} className="checkout-grid">
      <div>
        <SectionTitle eyebrow="Đặt mua thuốc" title="Thông tin nhận hàng" />
        <form onSubmit={submit} style={{ maxWidth: 440 }}>
          <Field label="Họ và tên"><input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nguyễn Văn A" /></Field>
          <Field label="Số điện thoại"><input style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="09xx xxx xxx" /></Field>
          <Field label="Địa chỉ nhận thuốc"><textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Số nhà, đường, phường/xã, quận/huyện" /></Field>
          {error && <div style={{ color: C.seal, fontSize: 13, marginBottom: 12 }}>{error}</div>}
          <div style={{ display: "flex", gap: 10 }}>
            <Btn type="button" variant="outline" onClick={onBack}>Quay lại</Btn>
            <Btn type="submit"><Check size={15} /> Xác nhận đặt mua</Btn>
          </div>
        </form>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.inkMuted, marginBottom: 10 }}>ĐƠN THUỐC</div>
        <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 16 }}>
          {items.map(([id, qty]) => { const m = medicines.find((x) => x.id === id); return (
            <div key={id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, padding: "6px 0" }}>
              <span>{m?.name} × {qty}</span><span style={{ fontWeight: 600 }}>{VND((m?.price || 0) * qty)}</span>
            </div>
          ); })}
          <div style={{ borderTop: `1px dashed ${C.line}`, marginTop: 8, paddingTop: 10, display: "flex", justifyContent: "space-between", fontFamily: "'Lora', serif", fontWeight: 700, color: C.jadeDeep }}>
            <span>Tổng cộng</span><span>{VND(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderConfirmPage({ order, goto }) {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <SectionTitle eyebrow="Đặt mua thành công" title="Đơn thuốc của bạn" />
      <Slip stamped>
        <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: C.goldDeep, fontWeight: 700, letterSpacing: 1 }}>ĐƠN #{order.id.slice(-6).toUpperCase()}</div>
        <div style={{ height: 1, background: `repeating-linear-gradient(90deg, ${C.line}, ${C.line} 6px, transparent 6px, transparent 12px)`, margin: "12px 0" }} />
        {order.items.map((it) => (
          <div key={it.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, padding: "4px 0" }}>
            <span>{it.name} × {it.qty}</span><span style={{ fontWeight: 600 }}>{VND(it.price * it.qty)}</span>
          </div>
        ))}
        <div style={{ borderTop: `1px dashed ${C.line}`, marginTop: 8, paddingTop: 10, display: "flex", justifyContent: "space-between", fontFamily: "'Lora', serif", fontWeight: 700, color: C.jadeDeep }}>
          <span>Tổng cộng</span><span>{VND(order.total)}</span>
        </div>
        <div style={{ marginTop: 12, fontSize: 13, color: C.inkMuted }}>Giao đến: {order.address}</div>
      </Slip>
      <div style={{ marginTop: 20 }}>
        <Btn variant="outline" onClick={() => goto("home")}>Về trang chủ</Btn>
      </div>
    </div>
  );
}

/* ---------------------------------- AUTH ---------------------------------- */
function AuthScreen({ users, setUsers, onSuccess, notice }) {
  const [role, setRole] = useState("patient");
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", password: "", name: "", phone: "" });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (mode === "login") {
      const found = users.find((u) => u.role === role && u.username === form.username.trim() && u.password === form.password);
      if (!found) { setError("Tên đăng nhập hoặc mật khẩu không đúng."); return; }
      onSuccess(found);
    } else {
      if (!form.name.trim() || !form.phone.trim() || !form.username.trim() || !form.password) { setError("Vui lòng điền đầy đủ thông tin."); return; }
      if (users.some((u) => u.username === form.username.trim())) { setError("Tên đăng nhập đã tồn tại, vui lòng chọn tên khác."); return; }
      const newUser = { id: "u" + Date.now(), role: "patient", username: form.username.trim(), password: form.password, name: form.name.trim(), phone: form.phone.trim(), createdAt: Date.now() };
      const next = [...users, newUser];
      setUsers(next);
      onSuccess(newUser);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "20px auto" }}>
      <SectionTitle eyebrow="Tài khoản" title={mode === "login" ? "Đăng nhập" : "Đăng ký tài khoản"} />
      {notice && (
        <div style={{ background: "#F3E7CC", color: C.goldDeep, fontSize: 13, padding: "10px 14px", borderRadius: 12, marginBottom: 18, display: "flex", gap: 8, alignItems: "flex-start" }}>
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} /> {notice}
        </div>
      )}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: C.card, borderRadius: 12, padding: 4, border: `1px solid ${C.line}` }}>
        {[["patient", "Bệnh nhân"], ["doctor", "Bác sĩ"], ["manager", "Quản lý"]].map(([id, label]) => (
          <button key={id} onClick={() => { setRole(id); setMode("login"); setError(""); }}
            style={{ flex: 1, padding: "8px 4px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 700,
              background: role === id ? C.jade : "transparent", color: role === id ? "#F5EFDD" : C.inkMuted }}>
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={submit}>
        {mode === "register" && (
          <>
            <Field label="Họ và tên"><input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nguyễn Văn A" /></Field>
            <Field label="Số điện thoại"><input style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="09xx xxx xxx" /></Field>
          </>
        )}
        <Field label="Tên đăng nhập"><input style={inputStyle} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="ten.dangnhap" /></Field>
        <Field label="Mật khẩu"><input type="password" style={inputStyle} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••" /></Field>
        {error && <div style={{ color: C.seal, fontSize: 13, marginBottom: 12 }}>{error}</div>}
        <Btn type="submit" full>{mode === "login" ? <><LogIn size={15} /> Đăng nhập</> : <><UserPlus size={15} /> Tạo tài khoản</>}</Btn>
      </form>

      {role === "patient" && (
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: C.inkMuted }}>
          {mode === "login" ? (
            <>Chưa có tài khoản? <button onClick={() => { setMode("register"); setError(""); }} style={{ background: "none", border: "none", color: C.goldDeep, fontWeight: 700, cursor: "pointer" }}>Đăng ký ngay</button></>
          ) : (
            <>Đã có tài khoản? <button onClick={() => { setMode("login"); setError(""); }} style={{ background: "none", border: "none", color: C.goldDeep, fontWeight: 700, cursor: "pointer" }}>Đăng nhập</button></>
          )}
        </div>
      )}
      {role !== "patient" && mode === "login" && (
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 12.5, color: C.inkMuted }}>
          Tài khoản {role === "doctor" ? "bác sĩ" : "quản lý"} do phòng khám cấp sẵn, liên hệ quản lý nếu chưa có.
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- MY RECORDS (patient) ---------------------------------- */
function MyRecordsPage({ currentUser, appointments, records, doctors, onRebook }) {
  const myAppts = appointments.filter((a) => a.patientUserId === currentUser.id).sort((a, b) => b.createdAt - a.createdAt);
  const myRecords = records.filter((r) => r.patientUserId === currentUser.id).sort((a, b) => b.createdAt - a.createdAt);
  const today = todayISO();

  return (
    <div>
      <SectionTitle eyebrow={`Xin chào, ${currentUser.name}`} title="Hồ sơ của tôi" sub="Lịch hẹn và hồ sơ khám bệnh được lương y ghi lại qua các lần khám." />

      <div style={{ fontSize: 13, fontWeight: 700, color: C.inkMuted, marginBottom: 10 }}>LỊCH HẸN</div>
      {myAppts.length === 0 ? <EmptyState text="Bạn chưa có lịch hẹn nào." /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          {myAppts.map((a) => {
            const d = doctors.find((x) => x.id === a.doctorId);
            return (
              <div key={a.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, color: C.jadeDeep, fontSize: 14 }}>{d?.name || "—"}</div>
                  <div style={{ fontSize: 12.5, color: C.inkMuted }}>{a.dateLabel} lúc {a.time} {a.isFollowUp && <Badge tone="gold">Tái khám</Badge>}</div>
                </div>
                <Badge tone={a.status === "Đã huỷ" ? "seal" : "jade"}>{a.status}</Badge>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ fontSize: 13, fontWeight: 700, color: C.inkMuted, marginBottom: 10 }}>HỒ SƠ BỆNH ÁN</div>
      {myRecords.length === 0 ? <EmptyState text="Chưa có hồ sơ khám bệnh nào." /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {myRecords.map((r) => {
            const d = doctors.find((x) => x.id === r.doctorId);
            const overdue = r.followUpDate && r.followUpDate < today;
            return (
              <Slip key={r.id}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: C.jadeDeep }}>{fmtDate(r.visitDate)}</div>
                  <div style={{ fontSize: 12.5, color: C.goldDeep, fontWeight: 600 }}>{d?.name}</div>
                </div>
                <div style={{ fontSize: 13.5, marginBottom: 6 }}><strong>Chẩn đoán:</strong> {r.diagnosis}</div>
                {r.prescriptionText && <div style={{ fontSize: 13.5, marginBottom: 6 }}><strong>Đơn thuốc:</strong> {r.prescriptionText}</div>}
                {r.notes && <div style={{ fontSize: 13, color: C.inkMuted, marginBottom: 6, fontStyle: "italic" }}>{r.notes}</div>}
                {r.followUpDate && (
                  <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, borderTop: `1px dashed ${C.line}`, paddingTop: 10 }}>
                    <Badge tone={overdue ? "seal" : "gold"}>
                      <CalendarClock size={12} style={{ display: "inline", verticalAlign: -2, marginRight: 4 }} />
                      Tái khám dự kiến: {fmtDate(r.followUpDate)}{overdue ? " (đã qua hẹn)" : ""}
                    </Badge>
                    <Btn small variant="outline" onClick={() => onRebook(r.doctorId, r.followUpDate)}>Đặt lịch tái khám</Btn>
                  </div>
                )}
              </Slip>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- STAFF DASHBOARD ---------------------------------- */
function StaffDashboard(props) {
  const { staffTab, setStaffTab, doctors, setDoctors, services, setServices, medicines, setMedicines, appointments, setAppointments, orders, setOrders, users, setUsers, records } = props;
  const tabs = [
    { id: "appointments", label: "Lịch hẹn", icon: Calendar },
    { id: "orders", label: "Đơn thuốc", icon: Package },
    { id: "followups", label: "Lịch tái khám", icon: CalendarClock },
    { id: "records", label: "Hồ sơ bệnh án", icon: FileText },
    { id: "doctors", label: "Lương y", icon: Stethoscope },
    { id: "services", label: "Dịch vụ", icon: ClipboardList },
    { id: "medicines", label: "Kho thuốc", icon: Pill },
    { id: "users", label: "Người dùng", icon: Users },
    { id: "reports", label: "Báo cáo / Xuất dữ liệu", icon: Download },
  ];
  return (
    <div>
      <SectionTitle eyebrow="Khu vực quản lý" title="Quản lý phòng khám" sub="Chế độ nội bộ — không có xác thực bảo mật trong bản demo này, chỉ dùng để minh hoạ." />
      <div style={{ display: "flex", gap: 4, marginBottom: 26, flexWrap: "wrap", borderBottom: `1px solid ${C.line}` }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setStaffTab(t.id)}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: "none", border: "none", cursor: "pointer",
              borderBottom: `2px solid ${staffTab === t.id ? C.jade : "transparent"}`, color: staffTab === t.id ? C.jadeDeep : C.inkMuted,
              fontWeight: staffTab === t.id ? 700 : 500, fontSize: 13.5,
            }}>
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {staffTab === "appointments" && <ApptAdmin appointments={appointments} setAppointments={setAppointments} doctors={doctors} />}
      {staffTab === "orders" && <OrderAdmin orders={orders} setOrders={setOrders} />}
      {staffTab === "followups" && <FollowUpAdmin records={records} doctors={doctors} />}
      {staffTab === "records" && <RecordsOverview records={records} doctors={doctors} />}
      {staffTab === "doctors" && <DoctorAdmin doctors={doctors} setDoctors={setDoctors} users={users} setUsers={setUsers} />}
      {staffTab === "services" && <ServiceAdmin services={services} setServices={setServices} />}
      {staffTab === "medicines" && <MedicineAdmin medicines={medicines} setMedicines={setMedicines} />}
      {staffTab === "users" && <UserAdmin users={users} setUsers={setUsers} doctors={doctors} />}
      {staffTab === "reports" && (
        <ReportsAdmin
          appointments={appointments} orders={orders} records={records}
          doctors={doctors} services={services} medicines={medicines} users={users}
        />
      )}
    </div>
  );
}

function FollowUpAdmin({ records, doctors }) {
  const today = todayISO();
  const withFollowUp = records.filter((r) => r.followUpDate).sort((a, b) => a.followUpDate.localeCompare(b.followUpDate));
  if (withFollowUp.length === 0) return <EmptyState text="Chưa có lịch tái khám nào được hẹn." />;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {withFollowUp.map((r) => {
        const d = doctors.find((x) => x.id === r.doctorId);
        const overdue = r.followUpDate < today;
        return (
          <div key={r.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, color: C.jadeDeep, fontSize: 14.5 }}>{r.patientName}</div>
              <div style={{ fontSize: 12.5, color: C.inkMuted, marginTop: 2 }}>{d?.name} · Khám lần trước: {fmtDate(r.visitDate)}</div>
            </div>
            <Badge tone={overdue ? "seal" : "gold"}>
              {overdue ? <AlertTriangle size={12} style={{ display: "inline", verticalAlign: -2, marginRight: 4 }} /> : <CalendarClock size={12} style={{ display: "inline", verticalAlign: -2, marginRight: 4 }} />}
              {fmtDate(r.followUpDate)}{overdue ? " — quá hẹn" : ""}
            </Badge>
          </div>
        );
      })}
    </div>
  );
}

function RecordsOverview({ records, doctors }) {
  if (records.length === 0) return <EmptyState text="Chưa có hồ sơ bệnh án nào." />;
  const sorted = [...records].sort((a, b) => b.createdAt - a.createdAt);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {sorted.map((r) => {
        const d = doctors.find((x) => x.id === r.doctorId);
        return (
          <div key={r.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
              <div style={{ fontWeight: 700, color: C.jadeDeep }}>{r.patientName}</div>
              <div style={{ fontSize: 12.5, color: C.goldDeep, fontWeight: 600 }}>{d?.name} · {fmtDate(r.visitDate)}</div>
            </div>
            <div style={{ fontSize: 13, color: C.ink }}><strong>Chẩn đoán:</strong> {r.diagnosis}</div>
            {r.followUpDate && <div style={{ fontSize: 12.5, color: C.inkMuted, marginTop: 4 }}>Tái khám dự kiến: {fmtDate(r.followUpDate)}</div>}
          </div>
        );
      })}
    </div>
  );
}

function UserAdmin({ users, setUsers, doctors }) {
  const [editing, setEditing] = useState(null);
  const remove = (id) => setUsers(users.filter((u) => u.id !== id));
  const roleLabel = { patient: "Bệnh nhân", doctor: "Bác sĩ", manager: "Quản lý" };
  const roleTone = { patient: "jade", doctor: "gold", manager: "seal" };
  const sorted = [...users].sort((a, b) => (a.role > b.role ? 1 : -1));
  return (
    <>
      <AdminList items={sorted} addLabel="Cấp tài khoản nội bộ" onAdd={() => setEditing({ id: "", role: "doctor", username: "", password: "", name: "", phone: "", doctorId: "" })} renderRow={(u) => (
        <div key={u.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 700, color: C.jadeDeep }}>{u.name} <Badge tone={roleTone[u.role]}>{roleLabel[u.role]}</Badge></div>
            <div style={{ fontSize: 12.5, color: C.inkMuted, marginTop: 3 }}>@{u.username} · {u.phone}</div>
          </div>
          {u.role !== "manager" && <button onClick={() => remove(u.id)} style={{ background: "none", border: "none", color: C.seal, cursor: "pointer" }}><Trash2 size={16} /></button>}
        </div>
      )} />
      {editing && (
        <EditModal title="Cấp tài khoản nội bộ" onClose={() => setEditing(null)}>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!editing.username.trim() || !editing.password || !editing.name.trim()) return;
            setUsers([...users, { ...editing, id: "u" + Date.now(), createdAt: Date.now() }]);
            setEditing(null);
          }}>
            <Field label="Vai trò">
              <select style={inputStyle} value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })}>
                <option value="doctor">Bác sĩ</option>
                <option value="manager">Quản lý</option>
              </select>
            </Field>
            {editing.role === "doctor" && (
              <Field label="Gắn với lương y">
                <select style={inputStyle} value={editing.doctorId} onChange={(e) => setEditing({ ...editing, doctorId: e.target.value, name: doctors.find((d) => d.id === e.target.value)?.name || editing.name })}>
                  <option value="">— Chọn lương y —</option>
                  {doctors.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </Field>
            )}
            <Field label="Họ tên hiển thị"><input style={inputStyle} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
            <Field label="Số điện thoại"><input style={inputStyle} value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} /></Field>
            <Field label="Tên đăng nhập"><input style={inputStyle} value={editing.username} onChange={(e) => setEditing({ ...editing, username: e.target.value })} /></Field>
            <Field label="Mật khẩu"><input style={inputStyle} value={editing.password} onChange={(e) => setEditing({ ...editing, password: e.target.value })} /></Field>
            <Btn type="submit" full><Check size={15} /> Tạo tài khoản</Btn>
          </form>
        </EditModal>
      )}
    </>
  );
}

/* ---------------------------------- BÁO CÁO / XUẤT DỮ LIỆU ---------------------------------- */
function ReportsAdmin({ appointments, orders, records, doctors, services, medicines, users }) {
  const revenueOrders = orders.filter((o) => o.status !== "Đã huỷ");
  const totalRevenue = revenueOrders.reduce((s, o) => s + (o.total || 0), 0);
  const patientCount = users.filter((u) => u.role === "patient").length;
  const completedAppts = appointments.filter((a) => a.status === "Đã khám").length;
  const cancelledAppts = appointments.filter((a) => a.status === "Đã huỷ").length;

  const STATS = [
    { label: "Tổng lịch hẹn", value: appointments.length, icon: Calendar },
    { label: "Đã khám", value: completedAppts, icon: Check },
    { label: "Đơn thuốc (không tính đã huỷ)", value: revenueOrders.length, icon: Package },
    { label: "Doanh thu thuốc", value: VND(totalRevenue), icon: TrendingUp },
    { label: "Bệnh nhân đã đăng ký", value: patientCount, icon: Users },
    { label: "Hồ sơ bệnh án", value: records.length, icon: FileText },
  ];

  const EXPORTS = [
    {
      label: "Lịch hẹn", filename: "lich-hen.csv", rows: appointments,
      headers: [
        { label: "Mã phiếu", get: (r) => r.id },
        { label: "Bệnh nhân", get: (r) => r.patientName },
        { label: "Điện thoại", get: (r) => r.phone },
        { label: "Lương y", get: (r) => doctors.find((d) => d.id === r.doctorId)?.name || "" },
        { label: "Ngày khám", get: (r) => r.dateLabel },
        { label: "Giờ hẹn", get: (r) => r.time },
        { label: "Trạng thái", get: (r) => r.status },
        { label: "Tái khám", get: (r) => (r.isFollowUp ? "Có" : "") },
        { label: "Ghi chú", get: (r) => r.note || "" },
      ],
    },
    {
      label: "Đơn thuốc", filename: "don-thuoc.csv", rows: orders,
      headers: [
        { label: "Mã đơn", get: (r) => r.id },
        { label: "Khách hàng", get: (r) => r.patientName },
        { label: "Điện thoại", get: (r) => r.phone },
        { label: "Địa chỉ", get: (r) => r.address },
        { label: "Số mặt hàng", get: (r) => r.items?.length || 0 },
        { label: "Tổng tiền", get: (r) => r.total },
        { label: "Trạng thái", get: (r) => r.status },
      ],
    },
    {
      label: "Hồ sơ bệnh án", filename: "ho-so-benh-an.csv", rows: records,
      headers: [
        { label: "Mã hồ sơ", get: (r) => r.id },
        { label: "Bệnh nhân", get: (r) => r.patientName },
        { label: "Lương y", get: (r) => doctors.find((d) => d.id === r.doctorId)?.name || "" },
        { label: "Ngày khám", get: (r) => r.visitDate },
        { label: "Chẩn đoán", get: (r) => r.diagnosis },
        { label: "Đơn thuốc/hướng điều trị", get: (r) => r.prescriptionText || "" },
        { label: "Ngày tái khám", get: (r) => r.followUpDate || "" },
      ],
    },
    {
      label: "Người dùng", filename: "nguoi-dung.csv", rows: users,
      headers: [
        { label: "Họ tên", get: (r) => r.name },
        { label: "Vai trò", get: (r) => ({ patient: "Bệnh nhân", doctor: "Bác sĩ", manager: "Quản lý" }[r.role] || r.role) },
        { label: "Tên đăng nhập", get: (r) => r.username },
        { label: "Điện thoại", get: (r) => r.phone },
      ],
    },
    {
      label: "Lương y", filename: "luong-y.csv", rows: doctors,
      headers: [
        { label: "Họ tên", get: (r) => r.name },
        { label: "Chuyên môn", get: (r) => r.specialty },
        { label: "Số năm kinh nghiệm", get: (r) => r.years },
      ],
    },
    {
      label: "Dịch vụ", filename: "dich-vu.csv", rows: services,
      headers: [
        { label: "Tên dịch vụ", get: (r) => r.name },
        { label: "Giá", get: (r) => r.price },
        { label: "Thời lượng (phút)", get: (r) => r.duration },
      ],
    },
    {
      label: "Kho thuốc", filename: "kho-thuoc.csv", rows: medicines,
      headers: [
        { label: "Tên vị thuốc", get: (r) => r.name },
        { label: "Danh mục", get: (r) => r.cat },
        { label: "Đơn vị", get: (r) => r.unit },
        { label: "Giá", get: (r) => r.price },
        { label: "Tồn kho", get: (r) => r.stock },
      ],
    },
  ];

  const exportAll = () => {
    EXPORTS.forEach((e) => downloadCSV(e.filename, e.headers, e.rows));
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px,1fr))", gap: 12, marginBottom: 28 }}>
        {STATS.map((s) => (
          <div key={s.label} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 16 }}>
            <s.icon size={16} color={C.goldDeep} style={{ marginBottom: 8 }} />
            <div style={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 19, color: C.jadeDeep }}>{s.value}</div>
            <div style={{ fontSize: 11.5, color: C.inkMuted, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.inkMuted }}>XUẤT DỮ LIỆU (định dạng CSV, mở được bằng Excel)</div>
        <Btn small variant="gold" onClick={exportAll}><Download size={14} /> Xuất tất cả</Btn>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {EXPORTS.map((e) => (
          <div key={e.filename} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, color: C.jadeDeep, fontSize: 14 }}>{e.label}</div>
              <div style={{ fontSize: 12, color: C.inkMuted }}>{e.rows.length} dòng dữ liệu</div>
            </div>
            <Btn small variant="outline" disabled={e.rows.length === 0} onClick={() => downloadCSV(e.filename, e.headers, e.rows)}>
              <Download size={13} /> Tải CSV
            </Btn>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- DOCTOR DASHBOARD ---------------------------------- */
function DoctorDashboard({ user, doctors, appointments, setAppointments, records, setRecords, users }) {
  const [tab, setTab] = useState("appointments");
  const [recordFor, setRecordFor] = useState(null);
  const doctor = doctors.find((d) => d.id === user.doctorId);
  const myAppts = appointments.filter((a) => a.doctorId === user.doctorId).sort((a, b) => b.createdAt - a.createdAt);
  const myRecords = records.filter((r) => r.doctorId === user.doctorId).sort((a, b) => b.createdAt - a.createdAt);
  const setStatus = (id, status) => setAppointments(appointments.map((a) => (a.id === id ? { ...a, status } : a)));

  const saveRecord = (rec) => {
    setRecords([...records, { ...rec, id: "r" + Date.now(), doctorId: user.doctorId, createdAt: Date.now() }]);
    setRecordFor(null);
  };

  return (
    <div>
      <SectionTitle eyebrow={doctor?.specialty} title={`Xin chào, ${user.name}`} sub="Quản lý lịch hẹn và ghi hồ sơ khám bệnh cho bệnh nhân của bạn." />
      <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: `1px solid ${C.line}` }}>
        {[["appointments", "Lịch hẹn của tôi", Calendar], ["records", "Hồ sơ bệnh án", FileText]].map(([id, label, Icon]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: "none", border: "none", cursor: "pointer",
              borderBottom: `2px solid ${tab === id ? C.jade : "transparent"}`, color: tab === id ? C.jadeDeep : C.inkMuted, fontWeight: tab === id ? 700 : 500, fontSize: 13.5 }}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {tab === "appointments" && (
        myAppts.length === 0 ? <EmptyState text="Chưa có lịch hẹn nào." /> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {myAppts.map((a) => (
              <div key={a.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, color: C.jadeDeep, fontSize: 14.5 }}>{a.patientName} <span style={{ color: C.inkMuted, fontWeight: 400 }}>· {a.phone}</span></div>
                  <div style={{ fontSize: 13, color: C.ink, marginTop: 2 }}>{a.dateLabel} lúc {a.time} {a.isFollowUp && <Badge tone="gold">Tái khám</Badge>}</div>
                  {a.note && <div style={{ fontSize: 12.5, color: C.inkMuted, marginTop: 2, fontStyle: "italic" }}>{a.note}</div>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <select value={a.status} onChange={(e) => setStatus(a.id, e.target.value)} style={{ ...inputStyle, width: "auto", padding: "6px 10px", fontSize: 12.5 }}>
                    {APPT_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <Btn small variant="outline" onClick={() => setRecordFor(a)}><ClipboardPlus size={13} /> Tạo hồ sơ</Btn>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {tab === "records" && (
        myRecords.length === 0 ? <EmptyState text="Chưa tạo hồ sơ bệnh án nào." /> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {myRecords.map((r) => (
              <div key={r.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, color: C.jadeDeep }}>{r.patientName}</div>
                  <div style={{ fontSize: 12.5, color: C.inkMuted }}>{fmtDate(r.visitDate)}</div>
                </div>
                <div style={{ fontSize: 13 }}><strong>Chẩn đoán:</strong> {r.diagnosis}</div>
                {r.prescriptionText && <div style={{ fontSize: 13, marginTop: 3 }}><strong>Đơn thuốc:</strong> {r.prescriptionText}</div>}
                {r.followUpDate && <div style={{ fontSize: 12.5, color: C.goldDeep, marginTop: 5 }}><CalendarClock size={12} style={{ display: "inline", verticalAlign: -2, marginRight: 4 }} />Tái khám: {fmtDate(r.followUpDate)}</div>}
              </div>
            ))}
          </div>
        )
      )}

      {recordFor && (
        <EditModal title={`Hồ sơ khám — ${recordFor.patientName}`} onClose={() => setRecordFor(null)}>
          <RecordForm appt={recordFor} onSave={saveRecord} />
        </EditModal>
      )}
    </div>
  );
}

function RecordForm({ appt, onSave }) {
  const [f, setF] = useState({
    patientUserId: appt.patientUserId || null, patientName: appt.patientName, apptId: appt.id,
    visitDate: todayISO(), diagnosis: "", prescriptionText: "", notes: "", followUpDate: "",
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (!f.diagnosis.trim()) return; onSave({ ...f, followUpDate: f.followUpDate || null }); }}>
      <Field label="Ngày khám"><input type="date" style={inputStyle} value={f.visitDate} onChange={(e) => setF({ ...f, visitDate: e.target.value })} /></Field>
      <Field label="Chẩn đoán"><textarea style={{ ...inputStyle, minHeight: 60 }} value={f.diagnosis} onChange={(e) => setF({ ...f, diagnosis: e.target.value })} placeholder="Thể trạng, bệnh chứng theo y học cổ truyền..." /></Field>
      <Field label="Đơn thuốc / hướng điều trị"><textarea style={{ ...inputStyle, minHeight: 60 }} value={f.prescriptionText} onChange={(e) => setF({ ...f, prescriptionText: e.target.value })} placeholder="Vị thuốc, liều lượng, cách dùng..." /></Field>
      <Field label="Ghi chú thêm (không bắt buộc)"><textarea style={{ ...inputStyle, minHeight: 50 }} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} /></Field>
      <Field label="Ngày hẹn tái khám (không bắt buộc)"><input type="date" style={inputStyle} value={f.followUpDate} onChange={(e) => setF({ ...f, followUpDate: e.target.value })} /></Field>
      <Btn type="submit" full><Check size={15} /> Lưu hồ sơ</Btn>
    </form>
  );
}

const APPT_STATUSES = ["Chờ xác nhận", "Đã xác nhận", "Đã khám", "Đã huỷ"];
const ORDER_STATUSES = ["Chờ xử lý", "Đang chuẩn bị", "Đang giao", "Hoàn tất", "Đã huỷ"];

function EmptyState({ text }) {
  return <div style={{ padding: "40px 0", textAlign: "center", color: C.inkMuted, fontSize: 14 }}>{text}</div>;
}

function ApptAdmin({ appointments, setAppointments, doctors }) {
  if (appointments.length === 0) return <EmptyState text="Chưa có lịch hẹn nào." />;
  const sorted = [...appointments].sort((a, b) => b.createdAt - a.createdAt);
  const setStatus = (id, status) => setAppointments(appointments.map((a) => (a.id === id ? { ...a, status } : a)));
  const remove = (id) => setAppointments(appointments.filter((a) => a.id !== id));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {sorted.map((a) => {
        const d = doctors.find((x) => x.id === a.doctorId);
        return (
          <div key={a.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, color: C.jadeDeep, fontSize: 14.5 }}>{a.patientName} <span style={{ color: C.inkMuted, fontWeight: 400 }}>· {a.phone}</span></div>
              <div style={{ fontSize: 13, color: C.ink, marginTop: 2 }}>{d?.name || "—"} · {a.dateLabel} lúc {a.time}</div>
              {a.note && <div style={{ fontSize: 12.5, color: C.inkMuted, marginTop: 2, fontStyle: "italic" }}>{a.note}</div>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <select value={a.status} onChange={(e) => setStatus(a.id, e.target.value)} style={{ ...inputStyle, width: "auto", padding: "6px 10px", fontSize: 12.5 }}>
                {APPT_STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <button onClick={() => remove(a.id)} style={{ background: "none", border: "none", color: C.seal, cursor: "pointer" }}><Trash2 size={16} /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OrderAdmin({ orders, setOrders }) {
  if (orders.length === 0) return <EmptyState text="Chưa có đơn thuốc nào." />;
  const sorted = [...orders].sort((a, b) => b.createdAt - a.createdAt);
  const setStatus = (id, status) => setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  const remove = (id) => setOrders(orders.filter((o) => o.id !== id));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {sorted.map((o) => (
        <div key={o.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, color: C.jadeDeep, fontSize: 14.5 }}>{o.patientName} <span style={{ color: C.inkMuted, fontWeight: 400 }}>· {o.phone}</span></div>
              <div style={{ fontSize: 12.5, color: C.inkMuted, marginTop: 2 }}>{o.address}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)} style={{ ...inputStyle, width: "auto", padding: "6px 10px", fontSize: 12.5 }}>
                {ORDER_STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <button onClick={() => remove(o.id)} style={{ background: "none", border: "none", color: C.seal, cursor: "pointer" }}><Trash2 size={16} /></button>
            </div>
          </div>
          <div style={{ marginTop: 10, borderTop: `1px dashed ${C.line}`, paddingTop: 8 }}>
            {o.items.map((it) => (
              <div key={it.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, padding: "2px 0", color: C.ink }}>
                <span>{it.name} × {it.qty}</span><span>{VND(it.price * it.qty)}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: C.jadeDeep, fontSize: 13.5, marginTop: 4 }}>
              <span>Tổng</span><span>{VND(o.total)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminList({ items, renderRow, onAdd, addLabel }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
        <Btn small variant="gold" onClick={onAdd}><Plus size={14} /> {addLabel}</Btn>
      </div>
      {items.length === 0 ? <EmptyState text="Chưa có dữ liệu." /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{items.map(renderRow)}</div>
      )}
    </div>
  );
}

function DoctorAdmin({ doctors, setDoctors }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: "", name: "", specialty: "", years: 1, days: [1,2,3,4,5], hours: [["08:00","11:30"],["14:00","17:30"]], bio: "" };
  const save = (d) => {
    if (d.id) setDoctors(doctors.map((x) => (x.id === d.id ? d : x)));
    else setDoctors([...doctors, { ...d, id: "d" + Date.now() }]);
    setEditing(null);
  };
  const remove = (id) => setDoctors(doctors.filter((d) => d.id !== id));
  return (
    <>
      <AdminList items={doctors} addLabel="Thêm lương y" onAdd={() => setEditing(blank)} renderRow={(d) => (
        <div key={d.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div>
            <div style={{ fontWeight: 700, color: C.jadeDeep }}>{d.name}</div>
            <div style={{ fontSize: 12.5, color: C.goldDeep }}>{d.specialty} · {d.years} năm KN</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setEditing(d)} style={{ background: "none", border: "none", color: C.jadeDeep, cursor: "pointer" }}><Pencil size={16} /></button>
            <button onClick={() => remove(d.id)} style={{ background: "none", border: "none", color: C.seal, cursor: "pointer" }}><Trash2 size={16} /></button>
          </div>
        </div>
      )} />
      {editing && <EditModal title={editing.id ? "Sửa lương y" : "Thêm lương y"} onClose={() => setEditing(null)}>
        <DoctorForm value={editing} onSave={save} />
      </EditModal>}
    </>
  );
}

function DoctorForm({ value, onSave }) {
  const [f, setF] = useState(value);
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
      <Field label="Họ tên"><input style={inputStyle} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
      <Field label="Chuyên môn"><input style={inputStyle} value={f.specialty} onChange={(e) => setF({ ...f, specialty: e.target.value })} /></Field>
      <Field label="Số năm kinh nghiệm"><input type="number" style={inputStyle} value={f.years} onChange={(e) => setF({ ...f, years: Number(e.target.value) })} /></Field>
      <Field label="Tiểu sử ngắn"><textarea style={{ ...inputStyle, minHeight: 60 }} value={f.bio} onChange={(e) => setF({ ...f, bio: e.target.value })} /></Field>
      <Btn type="submit" full><Check size={15} /> Lưu</Btn>
    </form>
  );
}

function ServiceAdmin({ services, setServices }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: "", name: "", price: 0, duration: 30, desc: "" };
  const save = (s) => {
    if (s.id) setServices(services.map((x) => (x.id === s.id ? s : x)));
    else setServices([...services, { ...s, id: "s" + Date.now() }]);
    setEditing(null);
  };
  const remove = (id) => setServices(services.filter((s) => s.id !== id));
  return (
    <>
      <AdminList items={services} addLabel="Thêm dịch vụ" onAdd={() => setEditing(blank)} renderRow={(s) => (
        <div key={s.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div>
            <div style={{ fontWeight: 700, color: C.jadeDeep }}>{s.name}</div>
            <div style={{ fontSize: 12.5, color: C.inkMuted }}>{s.desc} · {s.duration} phút · <strong style={{ color: C.seal }}>{VND(s.price)}</strong></div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setEditing(s)} style={{ background: "none", border: "none", color: C.jadeDeep, cursor: "pointer" }}><Pencil size={16} /></button>
            <button onClick={() => remove(s.id)} style={{ background: "none", border: "none", color: C.seal, cursor: "pointer" }}><Trash2 size={16} /></button>
          </div>
        </div>
      )} />
      {editing && <EditModal title={editing.id ? "Sửa dịch vụ" : "Thêm dịch vụ"} onClose={() => setEditing(null)}>
        <ServiceForm value={editing} onSave={save} />
      </EditModal>}
    </>
  );
}

function ServiceForm({ value, onSave }) {
  const [f, setF] = useState(value);
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
      <Field label="Tên dịch vụ"><input style={inputStyle} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
      <Field label="Mô tả"><input style={inputStyle} value={f.desc} onChange={(e) => setF({ ...f, desc: e.target.value })} /></Field>
      <Field label="Giá (VNĐ)"><input type="number" style={inputStyle} value={f.price} onChange={(e) => setF({ ...f, price: Number(e.target.value) })} /></Field>
      <Field label="Thời lượng (phút)"><input type="number" style={inputStyle} value={f.duration} onChange={(e) => setF({ ...f, duration: Number(e.target.value) })} /></Field>
      <Btn type="submit" full><Check size={15} /> Lưu</Btn>
    </form>
  );
}

function MedicineAdmin({ medicines, setMedicines }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: "", name: "", cat: CATS[0], price: 0, unit: "", stock: 0 };
  const save = (m) => {
    if (m.id) setMedicines(medicines.map((x) => (x.id === m.id ? m : x)));
    else setMedicines([...medicines, { ...m, id: "m" + Date.now() }]);
    setEditing(null);
  };
  const remove = (id) => setMedicines(medicines.filter((m) => m.id !== id));
  return (
    <>
      <AdminList items={medicines} addLabel="Thêm vị thuốc" onAdd={() => setEditing(blank)} renderRow={(m) => (
        <div key={m.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div>
            <div style={{ fontWeight: 700, color: C.jadeDeep }}>{m.name}</div>
            <div style={{ fontSize: 12.5, color: C.inkMuted }}>{m.cat} · {m.unit} · <strong style={{ color: C.seal }}>{VND(m.price)}</strong> · Tồn: {m.stock}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setEditing(m)} style={{ background: "none", border: "none", color: C.jadeDeep, cursor: "pointer" }}><Pencil size={16} /></button>
            <button onClick={() => remove(m.id)} style={{ background: "none", border: "none", color: C.seal, cursor: "pointer" }}><Trash2 size={16} /></button>
          </div>
        </div>
      )} />
      {editing && <EditModal title={editing.id ? "Sửa vị thuốc" : "Thêm vị thuốc"} onClose={() => setEditing(null)}>
        <MedicineForm value={editing} onSave={save} />
      </EditModal>}
    </>
  );
}

function MedicineForm({ value, onSave }) {
  const [f, setF] = useState(value);
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
      <Field label="Tên vị thuốc"><input style={inputStyle} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
      <Field label="Danh mục">
        <select style={inputStyle} value={f.cat} onChange={(e) => setF({ ...f, cat: e.target.value })}>
          {CATS.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="Đơn vị (vd: hộp 20 gói)"><input style={inputStyle} value={f.unit} onChange={(e) => setF({ ...f, unit: e.target.value })} /></Field>
      <Field label="Giá (VNĐ)"><input type="number" style={inputStyle} value={f.price} onChange={(e) => setF({ ...f, price: Number(e.target.value) })} /></Field>
      <Field label="Tồn kho"><input type="number" style={inputStyle} value={f.stock} onChange={(e) => setF({ ...f, stock: Number(e.target.value) })} /></Field>
      <Btn type="submit" full><Check size={15} /> Lưu</Btn>
    </form>
  );
}

function EditModal({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(21,45,36,0.5)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.paper, borderRadius: 16, padding: 24, width: 420, maxWidth: "100%", maxHeight: "88vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 18, color: C.jadeDeep }}>{title}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.inkMuted }}><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
