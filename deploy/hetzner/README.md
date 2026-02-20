# Hetzner Deployment (Production)

## 1) Provision server
- Ubuntu 24.04 (CX22/CX32 is enough for MVP)
- DNS A record: `example.com` -> server IP

## 2) Install Docker
```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker
```

## 3) Upload project
```bash
mkdir -p ~/apps
cd ~/apps
git clone <your-repo-url> nemovitosti-v-polsku
cd nemovitosti-v-polsku
```

## 4) Production config
```bash
cp .env.production.example .env.production
nano .env.production
```

Edit:
- domain URLs
- DB password in both `POSTGRES_PASSWORD` and `DATABASE_URL`
- `NEXTAUTH_SECRET`
- Stripe variables
- auth provider variables

Edit Caddy domain:
```bash
nano deploy/hetzner/Caddyfile
```
Replace `example.com` with your real domain.

## 5) Start stack
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

## 6) Seed initial curated content (one-time)
```bash
docker compose -f docker-compose.prod.yml exec app npm run prisma:seed
```

## 7) Verify
```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f app
```
Open `https://example.com`.

## 8) Stripe webhook in production
- In Stripe dashboard, add endpoint:
  - `https://example.com/api/stripe/webhook`
- Subscribe to at least:
  - `checkout.session.completed`
  - `customer.subscription.deleted`
- Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`
- Restart app after env change:
```bash
docker compose -f docker-compose.prod.yml up -d
```

## 9) Update deploy
```bash
cd ~/apps/nemovitosti-v-polsku
git pull
docker compose -f docker-compose.prod.yml up -d --build
```

## 10) Backup (minimum)
Daily Postgres dump:
```bash
docker compose -f docker-compose.prod.yml exec -T db pg_dump -U postgres nemovitosti > backup_$(date +%F).sql
```
