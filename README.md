# Scam Alerts — all-scams.com

Nederlandstalig platform om websites te controleren, scams te melden en kennis te delen.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Prisma + MariaDB (`alls_cams_com`)
- Auth.js (credentials)
- PM2 op poort **3010** achter LiteSpeed op `all-scams.com`

## Lokaal ontwikkelen

```bash
# MariaDB via SSH-tunnel (VPS luistert alleen op 127.0.0.1:3306)
ssh -i ~/.ssh/auto_leads_deploy -N -L 3307:127.0.0.1:3306 root@89.116.38.197

cp .env.example .env   # DATABASE_URL → 127.0.0.1:3307
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev            # http://localhost:3010
```

## Productie (VPS)

- App: `/home/all-scams.com/app`
- PM2 name: `all-scams`
- Poort: `3010` (free-port check in `scripts/ensure-free-port.sh`)
- Domain: `https://all-scams.com`
- Deploy: push naar `main` → GitHub Actions SSH deploy

## Admin

Na seed: `admin@all-scams.com` (wachtwoord staat in seed / change on first login).
