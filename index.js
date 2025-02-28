const fs = require('fs');
const path = require('path');
const Terser = require('terser');

// Fungsi untuk meminifikasi file JavaScript
function minifyFile(inputFile, outputFile) {
    // Baca isi file input
    const code = fs.readFileSync(inputFile, 'utf8');
    const originalSize = code.length;

    // Konfigurasi terser
    const options = {
        compress: {
            drop_console: true, // Menghapus console.log dari kode
        },
        mangle: true, // Mengubah nama variabel menjadi lebih pendek
        output: {
            comments: false, // Menghapus komentar dari kode
        },
    };

    // Meminifikasi kode
    Terser.minify(code, options)
        .then((minified) => {
            // Menulis kode yang telah diminifikasi ke file output
            fs.writeFileSync(outputFile, minified.code, 'utf8');
            const minifiedSize = minified.code.length;
            const savings = originalSize - minifiedSize;
            const compressionPercentage = ((savings / originalSize) * 100).toFixed(2);

            console.log(`File berhasil diminifikasi: ${outputFile}`);
            console.log(`Compression: ${compressionPercentage}%`);
            console.log(`Saving: ${(savings / 1024).toFixed(2)} kB`);
        })
        .catch((error) => {
            console.error('Terjadi kesalahan saat meminifikasi file:', error);
        });
}

// Fungsi untuk memindai folder dan memproses semua file JavaScript
function scanAndMinifyFolder(inputDir, outputDir) {
    // Membuat folder output jika belum ada
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Membaca isi folder input
    fs.readdirSync(inputDir, { withFileTypes: true }).forEach((entry) => {
        const inputPath = path.join(inputDir, entry.name);
        const outputPath = path.join(outputDir, entry.name);

        if (entry.isDirectory()) {
            // Jika entry adalah folder, rekursif memindai folder tersebut
            scanAndMinifyFolder(inputPath, outputPath);
        } else if (entry.isFile() && path.extname(entry.name) === '.js') {
            // Jika entry adalah file JavaScript, meminifikasikannya
            minifyFile(inputPath, outputPath);
        }
    });
}

// Jalankan fungsi scanAndMinifyFolder
const inputDir = path.join(__dirname, 'input'); // Folder input
const outputDir = path.join(__dirname, 'output'); // Folder output

scanAndMinifyFolder(inputDir, outputDir);
