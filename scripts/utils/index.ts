import fs from "fs";
import { parse, stringify } from "envfile";

export default function writeEnv(key: string, value: string) {
  // Write back to .env
  const { parse, stringify } = require("envfile");
  const fs = require("fs");
  const sourcePath = ".env";
  const envFile: string = fs.readFileSync(sourcePath);
  const envObject = parse(envFile);
  envObject[key] = value;
  fs.writeFileSync(sourcePath, stringify(envObject));
  console.log(`Write to .env ${key} success`);
}
