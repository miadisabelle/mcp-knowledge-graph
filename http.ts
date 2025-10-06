import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import minimist from 'minimist';
import { isAbsolute } from 'path';
import http from 'http';

import { handleHttpRequest, main as indexMain } from './index.js';

// Parse args and handle paths safely
const argv = minimist(process.argv.slice(2));
let memoryPath = argv['memory-path'];

// If a custom path is provided, ensure it's absolute
if (memoryPath && !isAbsolute(memoryPath)) {
    memoryPath = path.resolve(process.cwd(), memoryPath);
}

// Define the path to the JSONL file
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Use the custom path or default to the installation directory
const MEMORY_FILE_PATH = memoryPath || path.join(__dirname, 'memory.jsonl');

async function main() {
  const port = argv['port'] || 3000;
  const httpServer = http.createServer(async (req, res) => {
    // Use the handleHttpRequest from index.ts
    await handleHttpRequest(req, res);
  });

  httpServer.listen(port, () => {
    console.log(`Knowledge Graph MCP Server running on http://localhost:${port}`);
  });

  // Call the main function from index.ts with the http server
  await indexMain(httpServer);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});