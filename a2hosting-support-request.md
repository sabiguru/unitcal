# A2 Hosting Support Request Template

## 🎯 **Recommended Support Request:**

**Subject:** PostgreSQL Node.js Application Authentication Issue - psql works but Node.js apps fail

**Message:**

Hello A2 Hosting Support,

I'm experiencing a PostgreSQL authentication issue with my Node.js application where direct `psql` connections work perfectly, but Node.js applications (using the pg module and Prisma) fail with authentication errors.

**My Configuration:**
- Database: `benafaco_calcfort_prod`  
- User: `benafaco_calcfort_user`
- Host: `localhost` / `127.0.0.1`
- Port: `5432`

**What Works:**
✅ `psql -h localhost -U benafaco_calcfort_user -d benafaco_calcfort_prod` (connects successfully)

**What Fails:**
❌ Node.js applications using the same credentials get "Authentication failed" errors
❌ Connection string: `postgresql://benafaco_calcfort_user:password@localhost:5432/benafaco_calcfort_prod`

**Specific Questions:**
1. Does A2 Hosting's PostgreSQL configuration require different authentication methods for `psql` vs Node.js applications?
2. Are there specific connection parameters (SSL, authentication method) required for Node.js pg module connections?
3. Should I use `localhost`, `127.0.0.1`, or a different host for Node.js connections?
4. Do I need to configure anything in pg_hba.conf or is this managed by A2 Hosting?

**Error Details:**
```
PrismaClientInitializationError: Authentication failed against database server, 
the provided database credentials for `benafaco_calcfort_user` are not valid.
```

This appears to be a difference in authentication methods between psql and Node.js applications rather than incorrect credentials.

Thank you for your assistance.

---

## 🔧 **Alternative Quick Fixes to Try First:**

Before contacting support, try these:

### **1. Reset Database User Password**
- Go to cPanel → PostgreSQL Databases
- Change password for `benafaco_calcfort_user`
- Update your `.env.local` with new password

### **2. Try These Connection Formats:**
```bash
# Format 1: No SSL, TCP connection
DATABASE_URL="postgresql://benafaco_calcfort_user:PASSWORD@127.0.0.1:5432/benafaco_calcfort_prod?sslmode=disable"

# Format 2: No port specified
DATABASE_URL="postgresql://benafaco_calcfort_user:PASSWORD@localhost/benafaco_calcfort_prod?sslmode=disable"

# Format 3: Different SSL mode
DATABASE_URL="postgresql://benafaco_calcfort_user:PASSWORD@localhost:5432/benafaco_calcfort_prod?sslmode=prefer"
```

### **3. Check A2 Hosting Documentation**
- Look for "Node.js PostgreSQL" or "PostgreSQL connection" in their knowledge base
- They might have specific configuration requirements

## 📞 **When to Contact Support:**

Contact support if:
- ✅ You've tried different connection formats
- ✅ You've reset the database user password  
- ✅ The issue persists after 24 hours
- ✅ You need this resolved quickly for production

The support request above gives them all the technical details they need to help you efficiently.