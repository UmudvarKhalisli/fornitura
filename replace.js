const fs = require('fs');
const files = [
  'src/app/[locale]/layout.tsx',
  'src/app/[locale]/product/[productSlug]/page.tsx',
  'src/components/home/cta-section.tsx',
  'src/components/home/hero-section.tsx',
  'src/components/home/repair-intro.tsx',
  'src/components/layout/footer.tsx',
  'src/components/layout/header.tsx',
  'src/components/products/product-card.tsx'
];
files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/settings\?\.whatsapp_number\s*\|\|\s*''/g, "settings?.whatsapp_number || '+994 50 210 79 20'");
    content = content.replace(/settings\?\.phone_number\s*\|\|\s*''/g, "settings?.phone_number || '+994 50 210 79 20'");
    content = content.replace(/settings\.whatsapp_number/g, "(settings?.whatsapp_number || '+994 50 210 79 20')");
    content = content.replace(/settings\.phone_number/g, "(settings?.phone_number || '+994 50 210 79 20')");
    content = content.replace(/\+994 XX XXX XX XX/g, '+994 50 210 79 20');
    fs.writeFileSync(f, content);
  }
});