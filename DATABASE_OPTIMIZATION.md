# Database Optimization Recommendations

## Search Performance Indexes

To optimize search performance for the admin contact management pages, add the following indexes:

### Prerequisites
```sql
-- Enable trigram extension for ILIKE searches (MUST be run first)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

### Get In Touch Table
```sql
-- Improve search performance on name, email, phone, and location fields
CREATE INDEX IF NOT EXISTS idx_get_in_touch_name ON get_in_touch USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_get_in_touch_email ON get_in_touch USING gin (email gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_get_in_touch_phone ON get_in_touch USING gin (phone gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_get_in_touch_location ON get_in_touch USING gin (location gin_trgm_ops);

-- Improve sorting/pagination performance
CREATE INDEX IF NOT EXISTS idx_get_in_touch_created_at ON get_in_touch (created_at DESC);
```

### HMS Students Table
```sql
-- Improve search performance on full_name, email, and phone_number fields
CREATE INDEX IF NOT EXISTS idx_hms_students_full_name ON hms_students USING gin (full_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_hms_students_email ON hms_students USING gin (email gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_hms_students_phone_number ON hms_students USING gin (phone_number gin_trgm_ops);

-- Improve sorting/pagination performance
CREATE INDEX IF NOT EXISTS idx_hms_students_created_at ON hms_students (created_at DESC);
```

### Users Table
```sql
-- Improve search performance on name and email fields
CREATE INDEX IF NOT EXISTS idx_users_name ON users USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_users_email ON users USING gin (email gin_trgm_ops);

-- Improve sorting/pagination performance
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at DESC);
```

## Benefits

- **Faster Search**: GIN indexes with trigram operators significantly improve ILIKE pattern matching
- **Better Pagination**: Indexes on created_at improve ORDER BY performance
- **Scalability**: Performance remains good as data grows

## Implementation

**IMPORTANT**: Run the scripts in the following order:

1. **First**: Run the Prerequisites section to enable the pg_trgm extension
2. **Second**: Run the Get In Touch Table indexes
3. **Third**: Run the HMS Students Table indexes
4. **Fourth**: Run the Users Table indexes

You can run these SQL commands in your Vercel Postgres database console or via migration script.

**Note**: The `pg_trgm` extension must be enabled before creating trigram indexes.
