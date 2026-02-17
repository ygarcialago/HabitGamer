import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");

const inputDir = path.join(rootDir, "Assets");

const outputDir = path.join(rootDir, "public", "avatars");

async function optimize() {
  await fs.mkdir(outputDir, { recursive: true });

  const files = await fs.readdir(inputDir);

  await Promise.all(
    files
      .filter((file) => file.endsWith(".png"))
      .map(async (file) => {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(
          outputDir,
          file.replace(".png", ".webp")
        );

        await sharp(inputPath)
          .resize(256, 256, { fit: "cover", position: "centre" })
          .webp({ quality: 80 })
          .toFile(outputPath);

        console.log(`Optimized: ${file}`);
      })
  );
}

optimize();
