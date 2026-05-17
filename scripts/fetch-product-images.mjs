import exa from 'exa-js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const EXA_API_KEY = process.env.EXA_API_KEY;

if (!CLOUDINARY_URL || !EXA_API_KEY) {
  console.error('Missing environment variables: CLOUDINARY_URL or EXA_API_KEY');
  process.exit(1);
}

cloudinary.config(CLOUDINARY_URL);

const products = [
  { name: 'Rincoe Jelly 1500', category: 'одноразовые' },
  { name: 'Smoant Charon Baby', category: 'pod системы' },
  { name: 'Vaporesso XROS 4', category: 'pod системы' },
  { name: 'Lost Vape Orion Bar', category: 'одноразовые' },
  { name: 'GeekVape Wenax H1', category: 'pod системы' },
  { name: 'Elf Bar 600', category: 'одноразовые' },
  { name: 'OXVA Xlim Pro 2', category: 'pod системы' },
  { name: 'HQD Cuvie Plus', category: 'одноразовые' },
];

async function searchImage(productName) {
  const client = new exa(EXA_API_KEY);
  const query = `${productName} vape product photo white background`;
  
  try {
    const result = await client.searchAndContents(query, {
      type: 'auto',
      numResults: 5,
      text: false,
      highlights: false,
    });
    
    for (const item of result.results) {
      if (item.image && item.image.url) {
        return item.image.url;
      }
    }
    return null;
  } catch (error) {
    console.error(`Error searching for ${productName}:`, error.message);
    return null;
  }
}

async function uploadToCloudinary(imageUrl, productName) {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      public_id: `products/${productName.toLowerCase().replace(/ /g, '_')}`,
      overwrite: true,
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${productName}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('Starting image fetch for products...\n');
  
  const results = [];
  
  for (const product of products) {
    console.log(`Searching for: ${product.name}...`);
    const imageUrl = await searchImage(product.name);
    
    if (imageUrl) {
      console.log(`Found image, uploading to Cloudinary...`);
      const cloudinaryUrl = await uploadToCloudinary(imageUrl, product.name);
      
      if (cloudinaryUrl) {
        console.log(`Uploaded: ${cloudinaryUrl}`);
        results.push({
          name: product.name,
          image: cloudinaryUrl,
        });
      } else {
        console.log(`Upload failed for ${product.name}`);
      }
    } else {
      console.log(`No image found for ${product.name}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  const outputPath = path.join(__dirname, '..', 'lib', 'product-images.ts');
  const outputContent = `// Auto-generated file. Do not edit manually.
export const productImages: Record<string, string> = {
${results.map(r => `  "${r.name}": "${r.image}",`).join('\n')}
};

export function getProductImage(productName: string): string {
  return productImages[productName] || '/placeholder.jpg';
}
`;
  
  fs.writeFileSync(outputPath, outputContent);
  console.log(`\nUpdated ${outputPath}`);
  console.log(`Processed ${results.length}/${products.length} products`);
}

main().catch(console.error);
