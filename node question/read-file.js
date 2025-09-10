//import { readFile } from "fs/promises";
const readFile = require("fs").promises.readFile;

const read = async () => {
  try {
    const data = await readFile("example.txt", "utf-8");
    console.log(data);
  } catch (err) {
    console.log("error", err);
  }
};
read();
