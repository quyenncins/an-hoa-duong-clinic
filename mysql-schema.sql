-- ============================================================
-- Script tạo database cho An Hoà Đường trên MySQL (Hostinger).
-- Cách dùng: hPanel → Databases → phpMyAdmin → chọn đúng database
-- vừa tạo → tab "SQL" → dán toàn bộ nội dung file này → Go.
-- Chỉ cần chạy 1 lần duy nhất.
-- ============================================================

CREATE TABLE IF NOT EXISTS clinic_doctors (
  id VARCHAR(64) PRIMARY KEY,
  payload JSON NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS clinic_services (
  id VARCHAR(64) PRIMARY KEY,
  payload JSON NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS clinic_medicines (
  id VARCHAR(64) PRIMARY KEY,
  payload JSON NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS clinic_appointments (
  id VARCHAR(64) PRIMARY KEY,
  payload JSON NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS clinic_orders (
  id VARCHAR(64) PRIMARY KEY,
  payload JSON NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS clinic_users (
  id VARCHAR(64) PRIMARY KEY,
  payload JSON NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS clinic_records (
  id VARCHAR(64) PRIMARY KEY,
  payload JSON NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
