# 🚀 Cloudflare D1 Database Setup Guide

## ✅ **Completed Setup**

Your Cloudflare D1 database is now fully configured and ready to use!

### 📋 **What's Been Set Up:**

1. **D1 Database Created**: `four-sense-db`

   - Database ID: `d2311e4a-e1b4-4243-9b16-a29b9d5b750e`
   - Account ID: `c5ee47df9ce5561add2e15f7ae56826c`

2. **Configuration Files**:

   - `wrangler.toml` - Cloudflare Worker configuration
   - `drizzle.config.prod.ts` - Production database configuration
   - Updated `package.json` with database commands

3. **Database Schema Deployed**:
   - `AdminUsers` table created in both local and remote D1
   - Schema matches your existing local SQLite database

## 🔧 **Environment Variables Setup**

Create a `.env.local` file with these variables:

```bash
# Cloudflare D1 Configuration
CLOUDFLARE_ACCOUNT_ID=c5ee47df9ce5561add2e15f7ae56826c
CLOUDFLARE_D1_TOKEN=your_api_token_here

# Database URLs
DATABASE_URL=./dev.db
PROD_DATABASE_ID=d2311e4a-e1b4-4243-9b16-a29b9d5b750e

# Environment
NODE_ENV=development
```

## 🔑 **Getting Your D1 API Token**

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use "Custom token" template
4. Set permissions:
   - **Account**: `Zone:Read`, `D1:Edit`
   - **Account Resources**: Include - All accounts
5. Copy the generated token to your `.env.local` file

## 📝 **Available Commands**

### Development (SQLite):

- `bun run db:generate` - Generate migrations
- `bun run db:push` - Push to local SQLite
- `bun run db:studio` - Open database studio

### Production (D1):

- `bun run db:prod:generate` - Generate for D1
- `bun run db:prod:push` - Push to D1 (requires env vars)
- `npx wrangler d1 execute four-sense-db --remote --file=./drizzle/migration.sql`

### D1 Management:

- `npx wrangler d1 list` - List all databases
- `npx wrangler d1 execute four-sense-db --remote --command "SELECT * FROM AdminUsers;"` - Query data

## 🌐 **Deployment**

Your database is ready for production! When deploying to Cloudflare Pages/Workers:

1. Set environment variables in your Cloudflare dashboard
2. Your app will automatically use D1 in production
3. Local development continues using SQLite

## 📊 **Database Structure**

```sql
CREATE TABLE AdminUsers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## ✅ **Next Steps**

1. Create your `.env.local` file with the API token
2. Test your API endpoints with D1
3. Deploy to production when ready!

Your D1 database is now live and ready to handle production traffic! 🎉
