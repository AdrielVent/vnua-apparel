#!/bin/bash
# DigitalOcean Droplet Deployment Spec (Ubuntu 22.04 / 24.04)

echo "[SYS.AURA] INITIALIZING SERVER ENVIRONMENT..."

# Update and install dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx certbot python3-certbot-nginx

# Install Node.js (v20)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Clone repository (assuming SSH keys are setup)
# git clone git@github.com:YOUR_ORG/engineered-apparel.git
# cd engineered-apparel
# npm install
# npm run build

# PM2 Setup
# pm2 start npm --name "engin-apprl" -- start
# pm2 startup
# pm2 save

echo "[SYS.AURA] NGINX DOMAIN CONFIGURATION REQUIRED"
# Write default Nginx config to /etc/nginx/sites-available/engin-apprl
cat << 'EOF' > /tmp/engin-apprl
server {
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# sudo mv /tmp/engin-apprl /etc/nginx/sites-available/
# sudo ln -s /etc/nginx/sites-available/engin-apprl /etc/nginx/sites-enabled/
# sudo nginx -t
# sudo systemctl restart nginx

# SSL Setup
# sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

echo "[SYS.AURA] NAMECHEAP DNS ROUTING:"
echo "1. Go to Namecheap Dashboard -> Domain List -> Manage -> Advanced DNS."
echo "2. Add an A Record: Host = @, Value = <DROPLET_IP>."
echo "3. Add a CNAME Record: Host = www, Value = yourdomain.com."
