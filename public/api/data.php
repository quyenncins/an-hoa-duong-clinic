<?php
// API duy nhất cho toàn bộ web An Hoà Đường.
// GET  /api/data.php?table=clinic_doctors   -> trả về mảng dữ liệu của bảng đó
// POST /api/data.php?table=clinic_doctors   -> ghi đè toàn bộ bảng bằng dữ liệu gửi lên
//
// Chỉ 7 tên bảng trong danh sách trắng dưới đây được phép truy cập,
// chống việc gọi API với tên bảng tuỳ ý để đọc/xoá dữ liệu khác.

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/config.php';

$ALLOWED_TABLES = [
    'clinic_doctors',
    'clinic_services',
    'clinic_medicines',
    'clinic_appointments',
    'clinic_orders',
    'clinic_users',
    'clinic_records',
];

$table = isset($_GET['table']) ? $_GET['table'] : '';
if (!in_array($table, $ALLOWED_TABLES, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Tên bảng không hợp lệ']);
    exit;
}

try {
    $pdo = get_pdo();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Không kết nối được database. Kiểm tra lại config.php.']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->prepare("SELECT payload FROM `$table` ORDER BY created_at ASC");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_COLUMN);
    $items = array_map(function ($r) {
        return json_decode($r, true);
    }, $rows);
    echo json_encode(array_values($items));
    exit;
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $items = json_decode($raw, true);

    if (!is_array($items)) {
        http_response_code(400);
        echo json_encode(['error' => 'Dữ liệu gửi lên không hợp lệ']);
        exit;
    }

    try {
        $pdo->beginTransaction();
        $pdo->exec("DELETE FROM `$table`");

        $stmt = $pdo->prepare("INSERT INTO `$table` (id, payload) VALUES (:id, :payload)");
        foreach ($items as $item) {
            if (!isset($item['id'])) continue;
            $stmt->execute([
                ':id' => (string) $item['id'],
                ':payload' => json_encode($item, JSON_UNESCAPED_UNICODE),
            ]);
        }

        $pdo->commit();
        echo json_encode(['ok' => true]);
    } catch (Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['error' => 'Lỗi khi ghi dữ liệu']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Phương thức không được hỗ trợ']);
