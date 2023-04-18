const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

// Wrap the entire code block in an async function to allow use of await
async function compileContracts() {
  try {
    // Define directory paths
    const buildPath = path.resolve(__dirname, "build");
    const contractsPath = path.resolve(__dirname, "contracts");

    // Remove any previous build directory if exists, and recreate a new one
    await fs.remove(buildPath);
    console.log("Removed previous 'build' directory and creating new one.");
    await fs.ensureDir(buildPath);

    // Read all Solidity contract files in the contracts directory
    const contractFiles = await fs.readdir(contractsPath);
    console.log("Reading contract files:", contractFiles);

    // Read each Solidity contract file and add it to sources array
    const sources = {};
    contractFiles.forEach((file) => {
      const filePath = path.resolve(contractsPath, file);
      console.log("Reading Solidity contract:", filePath);

      const source = fs.readFileSync(filePath, "utf-8");
      sources[file] = { content: source };
    });

    // Compile all the Solidity contracts using the Solidity compiler
    const input = {
      language: "Solidity",
      sources,
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    };
    console.log("Compiling Solidity contracts using the Solidity compiler");
    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    console.log("Compiled contracts:", output);

    // Write each compiled contract to its own JSON file and export contract object
    for (let contractName in output.contracts) {
      const contract = output.contracts[contractName];
      for (let key in contract) {
        console.log(
          `Writing compiled contract ${key} to a JSON file: ${contract}`
        );
        fs.outputJsonSync(path.resolve(buildPath, key + ".json"), contract);
        module.exports[key] = contract[key];
      }

      // for (let key in contract) {
      //   module.exports[key] = contract[key];
      // }
    }
  } catch (e) {
    console.log("Error:", e);
  }
}

compileContracts(); // call the async function essentially to invoke the entire chain of functions
