import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const publicDir = path.join(root, 'public');

const pairs = [
  ['css', 'public/css'],
  ['images', 'public/images']
];

function copyDirectory(sourceRelativePath, targetRelativePath) {
  const source = path.join(root, sourceRelativePath);
  const target = path.join(root, targetRelativePath);

  if (!fs.existsSync(source)) {
    console.warn(`⚠️  Не найдено: ${sourceRelativePath}. Если папка уже лежит в ${targetRelativePath}, это нормально.`);
    return;
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true, force: true });
  console.log(`✅ ${sourceRelativePath} → ${targetRelativePath}`);
}

fs.mkdirSync(publicDir, { recursive: true });
pairs.forEach(([source, target]) => copyDirectory(source, target));

const requiredFiles = [
  'public/css/style.css',
  'public/images/logo.svg',
  'public/images/photos/hero-main.jpg',
  'public/images/photos/chocolate-cake.jpg',
  'public/images/photos/macarons.jpg',
  'public/images/photos/cherry-cake.jpg',
  'public/images/photos/cappuccino.jpg'
];

const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(root, file)));

if (missingFiles.length > 0) {
  console.warn('\n⚠️  Некоторые важные файлы не найдены:');
  missingFiles.forEach(file => console.warn(`   - ${file}`));
  console.warn('Скопируй старые папки css и images в корень проекта и запусти скрипт ещё раз.');
} else {
  console.log('\n✅ Основные CSS и изображения на месте. Можно запускать npm install и npm run dev.');
}
