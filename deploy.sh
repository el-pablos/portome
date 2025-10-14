#!/bin/bash

# Deployment script for porto.tams.codes portfolio
set -e

echo "🚀 Starting deployment for porto.tams.codes..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Please run as root${NC}"
    exit 1
fi

# Update system
echo -e "${YELLOW}📦 Updating system packages...${NC}"
apt update && apt upgrade -y

# Install required packages
echo -e "${YELLOW}📦 Installing required packages...${NC}"
apt install -y nginx certbot python3-certbot-nginx ufw

# Create backup of existing nginx config if it exists
if [ -f /etc/nginx/sites-available/porto.tams.codes ]; then
    echo -e "${YELLOW}📄 Backing up existing nginx config...${NC}"
    cp /etc/nginx/sites-available/porto.tams.codes /etc/nginx/sites-available/porto.tams.codes.backup.$(date +%Y%m%d_%H%M%S)
fi

# Copy nginx configuration
echo -e "${YELLOW}⚙️  Setting up nginx configuration...${NC}"
cp porto.tams.codes.conf /etc/nginx/sites-available/porto.tams.codes

# Create symbolic link if it doesn't exist
if [ ! -L /etc/nginx/sites-enabled/porto.tams.codes ]; then
    ln -s /etc/nginx/sites-available/porto.tams.codes /etc/nginx/sites-enabled/
fi

# Remove default nginx site if it exists
if [ -L /etc/nginx/sites-enabled/default ]; then
    rm /etc/nginx/sites-enabled/default
fi

# Test nginx configuration
echo -e "${YELLOW}🔧 Testing nginx configuration...${NC}"
nginx -t

# Configure firewall
echo -e "${YELLOW}🔥 Configuring UFW firewall...${NC}"
ufw --force enable
ufw allow ssh
ufw allow 'Nginx Full'
ufw allow 8003/tcp

# Generate DH parameters if they don't exist
if [ ! -f /etc/nginx/dhparam.pem ]; then
    echo -e "${YELLOW}🔐 Generating DH parameters (this may take a while)...${NC}"
    openssl dhparam -out /etc/nginx/dhparam.pem 2048
fi

echo -e "${GREEN}✅ Deployment configuration completed!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Make sure your domain porto.tams.codes points to this server's IP"
echo "2. Run: certbot --nginx -d porto.tams.codes -d www.porto.tams.codes"
echo "3. Run: systemctl reload nginx"
echo -e "${GREEN}4. Your site will be available at https://porto.tams.codes${NC}"

# Create a convenience script for SSL setup
cat > setup_ssl.sh << 'EOF'
#!/bin/bash
echo "🔐 Setting up SSL certificate..."
certbot --nginx -d porto.tams.codes -d www.porto.tams.codes
systemctl reload nginx
echo "✅ SSL setup completed!"
EOF

chmod +x setup_ssl.sh

echo -e "${GREEN}📝 Created setup_ssl.sh script. Run it after DNS is configured.${NC}"