import fs from 'fs';
import archiver from 'archiver';

const output = fs.createWriteStream('clickdeal-marketplace.zip');
const archive = archiver('zip', {
  zlib: { level: 9 }
});

output.on('close', () => {
  console.log('Project has been zipped successfully!');
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Add files and directories
archive.glob('**/*', {
  ignore: [
    'node_modules/**',
    'dist/**',
    '.git/**',
    'clickdeal-marketplace.zip',
    'scripts/create-zip.js'
  ]
});

archive.finalize();