import path from "path";
import { writeFile , readdir ,unlink } from "fs/promises";

export const saveFile = async (file) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_");
  try {
    //console.log("Current working directory ", process.cwd());
    await writeFile(
      path.join(process.cwd(), "public/assets/currentImage/" + filename),
      buffer
    );
    return true
  } catch (error) {
    console.log("Error occurred ", error);
    return false
  }
}

export const cleanFolder = async (skip) => {
  const folderPath = path.join(process.cwd(), "public/assets/currentImage/")
  try {
    const files = await readdir(folderPath);
    for (const file of files) {
      if(file != skip){
        console.log("Deleting file ", file);
        await unlink(path.join(folderPath, file));
      }
    }
    console.log("All files in folder deleted successfully");
  } catch (error) {
    console.error("Error deleting files in folder:", error);
  }
}