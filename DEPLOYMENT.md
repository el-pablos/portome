# Deployment Guide for porto.tams.codes

## Prerequisites
- Ubuntu/Debian server with root access
- Domain `porto.tams.codes` pointing to your server's IP address
- Node.js and npm installed

## Quick Deployment

### 1. Run the deployment script
```bash
sudo ./deploy.sh
```

### 2. Set up SSL certificate (after DNS is configured)
```bash
sudo ./setup_ssl.sh
```

### 3. Start the portfolio service
```bash
# Copy service file
sudo cp porto-tamas-portfolio.service /etc/systemd/system/

# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable porto-tamas-portfolio
sudo systemctl start porto-tamas-portfolio

# Check status
sudo systemctl status porto-tamas-portfolio
```

## Manual Steps

### 1. Install Dependencies
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx certbot python3-certbot-nginx ufw nodejs npm
```

### 2. Build the Application
```bash
npm install
npm run build
```

### 3. Configure Nginx
```bash
# Copy nginx config
sudo cp porto.tams.codes.conf /etc/nginx/sites-available/porto.tams.codes

# Enable the site
sudo ln -s /etc/nginx/sites-available/porto.tams.codes /etc/nginx/sites-enabled/

# Remove default site
sudo rm -f /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Generate DH parameters
sudo openssl dhparam -out /etc/nginx/dhparam.pem 2048
```

### 4. Configure SSL
```bash
# Get SSL certificate
sudo certbot --nginx -d porto.tams.codes -d www.porto.tams.codes

# Set up auto-renewal
sudo systemctl enable certbot.timer
```

### 5. Configure Firewall
```bash
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 8003/tcp
```

### 6. Start Services
```bash
# Start nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Start portfolio server
./start_server.sh
```

## File Structure
```
/root/work/porto-tamas/
├── build/                 # Built React application
├── src/                   # Source code
├── public/               # Public assets
├── tams.my.id.conf       # Nginx configuration
├── deploy.sh             # Deployment script
├── start_server.sh       # Server start script
├── setup_ssl.sh          # SSL setup script
├── tams-portfolio.service # Systemd service
└── DEPLOYMENT.md         # This file
```

## Nginx Configuration

The nginx configuration includes:
- HTTP to HTTPS redirect
- SSL/TLS security
- Static file caching
- React Router support (SPA)
- Security headers
- Gzip compression

## Port Configuration

- **Port 80**: HTTP (redirects to HTTPS)
- **Port 443**: HTTPS (main website)
- **Port 8003**: Backend/API service (if needed)

## SSL Certificate

The configuration uses Let's Encrypt certificates:
- Main certificate: `/etc/letsencrypt/live/tams.my.id/fullchain.pem`
- Private key: `/etc/letsencrypt/live/tams.my.id/privkey.pem`

Auto-renewal is handled by systemd timer.

## Troubleshooting

### Check nginx status
```bash
sudo systemctl status nginx
sudo nginx -t
```

### Check SSL certificate
```bash
sudo certbot certificates
```

### Check portfolio service
```bash
sudo systemctl status tams-portfolio
sudo journalctl -u tams-portfolio -f
```

### Check firewall
```bash
sudo ufw status
```

### Test the site
```bash
curl -I https://tams.my.id
```

## Updating the Site

1. Make changes to the code
2. Rebuild: `npm run build`
3. Restart service: `sudo systemctl restart tams-portfolio`
4. Reload nginx: `sudo systemctl reload nginx`

## Security Notes

- SSL/TLS configured with modern security settings
- Security headers enabled
- Firewall configured
- Regular updates recommended
- Monitor logs regularly

## Monitoring

- Nginx logs: `/var/log/nginx/`
- Service logs: `sudo journalctl -u tams-portfolio`
- SSL monitoring: `sudo certbot certificates`