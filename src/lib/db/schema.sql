-- Donations table
-- Covers all Paystack channels (auto) and cash (manual)
CREATE TABLE IF NOT EXISTS donations (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('paystack', 'cash')),
  channel TEXT CHECK (channel IN ('card', 'mobile_money', 'bank_transfer', 'ussd', 'apple_pay', 'qr')),
  amount REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'GHS',
  donor_name TEXT,
  donor_email TEXT,
  donor_phone TEXT,
  date TEXT NOT NULL,
  reference TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'reconciled')),
  note TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- In-kind donations table
-- Tracks physical goods/items donated
CREATE TABLE IF NOT EXISTS inkind_submissions (
  id TEXT PRIMARY KEY,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  country TEXT,
  item_description TEXT NOT NULL,
  estimated_value REAL,
  photos TEXT DEFAULT '[]',
  message TEXT,
  expected_ship_date TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'in_transit', 'received')),
  admin_note TEXT,
  received_at TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- Indexes for query performance
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_type ON donations(type);
CREATE INDEX IF NOT EXISTS idx_donations_channel ON donations(channel);
CREATE INDEX IF NOT EXISTS idx_donations_date ON donations(date);
CREATE INDEX IF NOT EXISTS idx_inkind_status ON inkind_submissions(status);
CREATE INDEX IF NOT EXISTS idx_inkind_created ON inkind_submissions(created_at);
