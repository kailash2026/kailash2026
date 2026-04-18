// 图片下载脚本 - 从免费图库下载冈仁波齐相关图片
// 运行: node scripts/download-images.js

import fs from 'fs';
import path from 'path';
import https from 'https';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

// 确保目录存在
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// 图片列表 - 使用 Unsplash 的随机图片作为占位
const images = [
  {
    name: 'kailash-hero.jpg',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80', // 山脉
    description: '首页 Hero 背景图'
  },
  {
    name: 'culture-religions.jpg',
    url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80', // 经幡
    description: '神山文化页面'
  },
  {
    name: 'guide-season.jpg',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80', // 山景
    description: '朝圣攻略 - 最佳季节'
  },
  {
    name: 'route-darchen.jpg',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // 高原
    description: '转山路线 - 塔尔钦'
  },
  {
    name: 'gallery-landscape-1.jpg',
    url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80', // 雪山
    description: '图库 - 风景'
  },
  {
    name: 'gallery-landscape-2.jpg',
    url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&q=80', // 自然
    description: '图库 - 风景'
  },
  {
    name: 'gallery-pilgrim.jpg',
    url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&q=80', // 徒步
    description: '图库 - 朝圣者'
  }
];

console.log('开始下载图片...\n');

// 下载单张图片
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(IMAGES_DIR, filename);
    
    // 检查文件是否已存在
    if (fs.existsSync(filepath)) {
      console.log(`✓ ${filename} 已存在，跳过`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ ${filename} 下载成功`);
          resolve();
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // 处理重定向
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`✓ ${filename} 下载成功 (redirect)`);
            resolve();
          });
        }).on('error', reject);
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// 批量下载
async function downloadAll() {
  for (const img of images) {
    try {
      await downloadImage(img.url, img.name);
      // 延迟 1 秒，避免请求过快
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`✗ ${img.name} 下载失败: ${err.message}`);
    }
  }
  console.log('\n下载完成！');
  console.log(`图片保存在: ${IMAGES_DIR}`);
}

downloadAll();
