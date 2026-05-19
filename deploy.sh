#!/bin/bash
# 八字命理学习工具 - 服务器部署脚本
# 用法：在服务器上执行此脚本

set -e

echo "=== 八字命理学习工具 部署脚本 ==="

# 1. 安装 Nginx
echo "[1/5] 检查并安装 Nginx..."
if ! command -v nginx &> /dev/null; then
    apt-get update
    apt-get install -y nginx
fi

# 2. 创建网站目录
echo "[2/5] 创建网站目录..."
mkdir -p /var/www/bazi
cd /var/www/bazi

# 3. 检查是否有上传的 dist 目录
if [ -d "/root/bazi-dist" ]; then
    echo "[3/5] 复制 dist 文件到网站目录..."
    cp -r /root/bazi-dist/* /var/www/bazi/
elif [ -f "/root/bazi-dist.tar.gz" ]; then
    echo "[3/5] 解压 dist 文件到网站目录..."
    tar -xzf /root/bazi-dist.tar.gz -C /tmp/
    cp -r /tmp/dist/* /var/www/bazi/
else
    echo "错误：未找到 bazi-dist 目录或 bazi-dist.tar.gz 文件！"
    echo "请先上传构建好的 dist 目录或 tar.gz 包到 /root/ 目录"
    exit 1
fi

# 4. 配置 Nginx
echo "[4/5] 配置 Nginx..."
cat > /etc/nginx/sites-available/bazi << 'EOF'
server {
    listen 80;
    server_name _;
    
    root /var/www/bazi;
    index index.html;
    
    # SPA 路由支持（React Router）
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/javascript application/json;
}
EOF

# 启用配置
ln -sf /etc/nginx/sites-available/bazi /etc/nginx/sites-enabled/bazi
# 禁用默认配置（可选）
rm -f /etc/nginx/sites-enabled/default

# 5. 启动/重启 Nginx
echo "[5/5] 启动 Nginx..."
nginx -t
systemctl restart nginx
systemctl enable nginx

echo ""
echo "=== 部署完成！==="
echo ""
echo "网站已部署到: http://$(curl -s ifconfig.me 2>/dev/null || echo '你的服务器IP')"
echo ""
echo "如果无法访问，请检查："
echo "1. 防火墙是否放行了 80 端口"
echo "2. 安全组是否放行了 80 端口"
echo ""
