const fs = require("fs");
const rawDatata = fs.readFileSync("p059_cipher.txt", "utf-8");

const data = rawDatata.split(",").map(Number);
// console.log(data);

for (let i = 97; i <= 122; i++) {
  for (let j = 97; j <= 122; j++) {
    for (let k = 97; k <= 122; k++) {
      const password = [i, j, k];
      let decrypted = "";
      let spaceCount = 0;
      for (let m = 0; m < data.length; m++) {
        const charCode = data[m] ^ password[m % 3];
        if (charCode === 32) spaceCount++;
        decrypted += String.fromCharCode(charCode);
      }

      if (decrypted.toLowerCase().includes(" the ") && spaceCount > 15) {
        console.log(
          `Password: ${String.fromCharCode(i)}${String.fromCharCode(j)}${String.fromCharCode(k)}`,
        );
        console.log(`Decrypted message: ${decrypted}`);
        break;
      }
    }
  }
}
