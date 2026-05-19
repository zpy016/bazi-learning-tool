#!/bin/bash
# =============================================================================
# 八字命理学习工具 - 服务器初始化脚本
# 在火山云服务器(ROOT用户)上执行此脚本，完成Nginx安装和配置
# =============================================================================

set -e

echo "=========================================="
echo "  八字命理学习工具 - 服务器初始化"
echo "=========================================="

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. 更新系统
echo -e "${YELLOW}[1/6] 更新系统包...${NC}"
apt-get update -qq

# 2. 安装 Nginx
echo -e "${YELLOW}[2/6] 安装 Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    apt-get install -y -qq nginx
    echo -e "${GREEN}✓ Nginx 安装完成${NC}"
else
    echo -e "${GREEN}✓ Nginx 已安装${NC}"
fi

# 3. 创建网站目录
echo -e "${YELLOW}[3/6] 创建网站目录...${NC}"
mkdir -p /var/www/bazi
cd /var/www/bazi

# 创建一个临时首页（部署后会被覆盖）
cat > /var/www/bazi/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>八字命理学习工具</title></head>
<body style="display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#1a1a2e;color:#d4af37;font-family:sans-serif;">
<div style="text-align:center;">
<h1>🏗️ 八字命理学习工具</h1>
<p>网站正在部署中，请稍候...</p>
<p style="color:#666;">如果长时间未更新，请检查 GitHub Actions 部署状态</p>
</div>
</body>
</html>
EOF

echo -e "${GREEN}✓ 网站目录创建完成${NC}"

# 4. 配置 Nginx
echo -e "${YELLOW}[4/6] 配置 Nginx...${NC}"
cat > /etc/nginx/sites-available/bazi << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root /var/www/bazi;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    # SPA 路由支持（React Router）
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, immutable";
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# 启用配置
ln -sf /etc/nginx/sites-available/bazi /etc/nginx/sites-enabled/bazi

# 移除默认配置
rm -f /etc/nginx/sites-enabled/default

echo -e "${GREEN}✓ Nginx 配置完成${NC}"

# 5. 测试并重载 Nginx
echo -e "${YELLOW}[5/6] 测试并重载 Nginx...${NC}"
nginx -t
systemctl restart nginx
systemctl enable nginx

echo -e "${GREEN}✓ Nginx 启动完成${NC}"

# 6. 配置防火墙
echo -e "${YELLOW}[6/6] 配置防火墙...${NC}"
if command -v ufw &> /dev/null; then
    ufw allow 80/tcp comment 'HTTP - 八字命理网站'
    ufw allow 22/tcp comment 'SSH'
    ufw status | grep -q "Status: active" || echo "提示：UFW 未启用，如需启用请执行：ufw enable"
    echo -e "${GREEN}✓ 防火墙规则配置完成${NC}"
else
    echo "UFW 未安装，跳过防火墙配置"
fi

# 获取公网IP
PUBLIC_IP=$(curl -s ifconfig.me 2>/dev/null || echo "无法获取")

echo ""
echo "=========================================="
echo -e "  ${GREEN}🎉 服务器初始化完成！${NC}"
echo "=========================================="
echo ""
echo -e "  公网IP: ${YELLOW}${PUBLIC_IP}${NC}"
echo -e "  网站地址: ${YELLOW}http://${PUBLIC_IP}${NC}"
echo ""
echo "  下一步："
echo "  1. 在 GitHub 仓库 Settings → Secrets 中配置："
echo "     - SERVER_IP = ${PUBLIC_IP}"
echo "     - SERVER_USER = root"
echo "     - SERVER_PASSWORD = 你的服务器密码"
echo ""
echo "  2. 推送代码到 GitHub，自动部署即会触发"
echo ""
echo "=========================================="
