<?php
// MẪU cấu hình — không chứa thông tin thật, an toàn khi lưu trên GitHub.
// Khi triển khai tự động qua GitHub Actions, file config.php thật sẽ được
// tạo ra từ 4 secret (DB_HOST, DB_NAME, DB_USER, DB_PASS) khai báo trên
// GitHub, KHÔNG lưu mật khẩu thật trong repo. Xem README.md.
//
// Nếu anh muốn tự tạo config.php thủ công để chạy thử, copy file này
// thành "config.php" (cùng thư mục), điền đúng 4 giá trị lấy từ:
// hPanel → Databases → MySQL Databases.

define('DB_HOST', 'localhost');
define('DB_NAME', 'điền_tên_database_ở_đây');
define('DB_USER', 'điền_tên_user_database_ở_đây');
define('DB_PASS', 'điền_mật_khẩu_database_ở_đây');

function get_pdo() {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    return new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
}
