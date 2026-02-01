#!/bin/bash

# Configuration
DOMAIN="mehnat-ai.uztrain.uz"
PROJECT_DIR=$(pwd)

echo "🚀 Starting Deployment Setup for $DOMAIN..."

# 1. Update System
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js (v20)
echo "🟢 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install Nginx and Certbot
echo "🌐 Installing Nginx and Certbot..."
sudo apt install -y nginx certbot python3-certbot-nginx

# 4. Install PM2 globally
echo "🔄 Installing PM2..."
sudo npm install -g pm2

# 5. Project Setup
echo "📂 Setting up project dependencies..."
npm install
echo "🏗️ Building frontend..."
npm run build

# 6. Configure Nginx
echo "⚙️ Configuring Nginx..."
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"

sudo bash -c "cat > $NGINX_CONF" <<EOF
server {
    server_name $DOMAIN;

    root $PROJECT_DIR/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Proxy for API if you had a backend server (optional)
    # location /api {
    #     proxy_pass http://localhost:3000;
    # }
}
EOF

# Enable site
if [ -f "/etc/nginx/sites-enabled/$DOMAIN" ]; then
    sudo rm "/etc/nginx/sites-enabled/$DOMAIN"
fi
sudo ln -s $NGINX_CONF /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default 2>/dev/null # Optional: remove default
sudo nginx -t && sudo systemctl restart nginx

# 7. SSL Certificate
echo "🔒 Setting up SSL with Certbot..."
# Non-interactive mode might fail if email not provided, so keeping it interactive-friendly or basic
sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN --redirect

# 8. Start Bot
echo "🤖 Starting Telegram Bot..."
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup | tail -n 1 > /tmp/pm2_startup_cmd.sh # Just loosely capturing startup command
# Note: User might need to run the startup command manually if sudo logic is complex

echo "✅ Setup Complete!"
echo "👉 IMPORTANT: Make sure your .env file is populated with valid keys!"
echo "👉 Website: https://$DOMAIN"
