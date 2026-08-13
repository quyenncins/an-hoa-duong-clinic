# Web An Hoà Đường — bản PHP + MySQL trên Hostinger

Bản này **không dùng Supabase nữa**. Toàn bộ dữ liệu (bác sĩ, lịch hẹn,
hồ sơ bệnh án, đơn thuốc, tài khoản...) lưu trong MySQL của chính gói
hosting Hostinger, đọc/ghi qua một API PHP nhỏ đi kèm (`public/api/data.php`).
Mọi thứ gói gọn trong một tài khoản Hostinger duy nhất.

Chỉ còn 3 việc, làm 1 lần: (1) tạo database MySQL, (2) khai báo 7 secret
trên GitHub, (3) đẩy code lên GitHub lần đầu để kích hoạt build tự động.

---

## Phần 1 — Tạo database MySQL trên Hostinger

1. Đăng nhập **hPanel** → **Databases** → **MySQL Databases**.
2. Tạo database mới: đặt tên (vd `anhoaduong`), Hostinger sẽ tự thêm tiền tố dạng `u123456789_anhoaduong`.
3. Tạo user MySQL mới (hoặc dùng user Hostinger tự tạo kèm database), đặt mật khẩu, gán quyền **All Privileges** cho user đó trên database vừa tạo.
4. Ghi lại chính xác 4 giá trị — sẽ cần ở Phần 2:
   - **DB_HOST**: thường là `localhost`
   - **DB_NAME**: tên đầy đủ có tiền tố, vd `u123456789_anhoaduong`
   - **DB_USER**: tên user vừa tạo, vd `u123456789_anhoaduong`
   - **DB_PASS**: mật khẩu vừa đặt
5. Vào **hPanel → Databases → phpMyAdmin** → chọn đúng database vừa tạo → tab **SQL** → dán toàn bộ nội dung file `mysql-schema.sql` (đi kèm gói này) → bấm **Go**. Xong bước này sẽ có 7 bảng `clinic_...`.

---

## Phần 2 — Khai báo 7 secret trên GitHub

Trong repo `an-hoa-duong-clinic` trên GitHub → **Settings → Secrets and variables → Actions** → **New repository secret**, tạo lần lượt:

| Tên secret | Giá trị |
|---|---|
| `DB_HOST` | Lấy ở Phần 1 |
| `DB_NAME` | Lấy ở Phần 1 |
| `DB_USER` | Lấy ở Phần 1 |
| `DB_PASS` | Lấy ở Phần 1 |
| `FTP_SERVER` | hPanel → Website đang dùng cho `anhoaduong.com` → **Files → FTP Accounts** → FTP Hostname |
| `FTP_USERNAME` | Cùng trang trên, FTP Username |
| `FTP_PASSWORD` | Cùng trang trên, FTP Password |
| `FTP_SERVER_DIR` | Cùng trang trên, giá trị **Directory** (thường `/public_html/`), nhớ thêm dấu `/` ở cuối |

**Quan trọng:** website nhận file (`FTP_SERVER_DIR`) phải là một site kiểu **PHP/HTML tiêu chuẩn**, không phải kiểu "Triển khai Ứng dụng Web / Node.js" đã dùng trước đây — vì chỉ hosting PHP tiêu chuẩn mới chạy được file trong `api/`. Nếu domain đang gắn với site kiểu Node.js Web App, vào hPanel đổi/tạo lại website cho domain này theo kiểu **"Trang web PHP/HTML tùy chỉnh"** trước khi tiếp tục.

---

## Phần 3 — Đẩy code lên GitHub

1. Trong repo, xoá các file cũ liên quan Supabase nếu còn sót: `src/supabaseClient.js`, `supabase-schema.sql`, `.env.example` (gói này đã không còn các file đó).
2. Tải lên **toàn bộ** nội dung gói này, bao gồm cả thư mục `public/api/` (chứa `data.php`, `config.example.php`) và `.github/workflows/deploy.yml`. Cách tải: **Add file → Upload files**, kéo từng thư mục vào, hoặc dùng link `github.com/<tài-khoản>/an-hoa-duong-clinic/upload/main/<tên-thư-mục>` nếu trình duyệt không kéo được cả thư mục.
3. Sau khi Commit, vào tab **Actions** — quy trình **"Build và triển khai lên Hostinger"** tự chạy. Có dấu tích xanh là xong.
4. Mở `https://anhoaduong.com` — thử tải lại trang, đăng nhập thử. Banner lỗi màu hồng "Không thể lưu dữ liệu" phải biến mất.

---

## Kiểm tra nhanh nếu vẫn lỗi

Mở thẳng địa chỉ: `https://anhoaduong.com/api/data.php?table=clinic_doctors`

- Thấy một đoạn JSON (dạng `[{"id":"d1","name":...}]`) → API chạy tốt, lỗi nằm ở chỗ khác, gửi lại ảnh Console (F12) cho Claude.
- Thấy **mã nguồn PHP hiện ra dạng chữ** (không phải JSON) → hosting đích chưa hỗ trợ chạy PHP, kiểm tra lại `FTP_SERVER_DIR` có đúng là site kiểu PHP/HTML không (xem lưu ý ở Phần 2).
- Thấy lỗi 500 → sai thông tin database, kiểm tra lại 4 secret `DB_HOST/DB_NAME/DB_USER/DB_PASS`.
- Thấy trang trắng/404 → file chưa được tải lên đúng chỗ, kiểm tra lại tab Actions xem bước "Tải lên Hostinger qua FTP" có chạy thành công không.

---

## Sau này muốn cập nhật nội dung?

Sửa file trong repo trên GitHub, Commit — quy trình tự chạy lại, build và đẩy bản mới lên Hostinger trong khoảng 1–2 phút.

---

## Tài khoản đăng nhập thử

- Quản lý: `quanly` / `123456`
- Bác sĩ: `bs.ngoc`, `bs.duc`, `bs.van`, `bs.khanh` — mật khẩu `123456`
- Bệnh nhân: tự đăng ký tài khoản mới trên web

**Nhớ đổi các mật khẩu demo này** trước khi dùng thật.

---

## Về bảo mật

Bản này vẫn ưu tiên đơn giản, dễ triển khai:

- Mật khẩu người dùng lưu dạng chữ thường trong `clinic_users`, không mã hoá.
- API `data.php` cho phép đọc/ghi công khai (không có xác thực riêng ở tầng API) — ai biết địa chỉ web đều gọi được, giống hệt mức độ an toàn của bản Supabase trước đó.

Trước khi dùng dữ liệu bệnh nhân thật ở quy mô lớn, nên nhờ nâng cấp thêm: mã hoá mật khẩu (dùng `password_hash`/`password_verify` của PHP), và thêm lớp xác thực (token/session) cho API thay vì để mở hoàn toàn.
