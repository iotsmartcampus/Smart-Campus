import client from "../client/resourceClient";

const sendCommand = async function(command, type, id) {
  console.log(command, type, id);
  try {
    await client.post("/sendCommand", { command, type, id });
  } catch (e) {
    throw e;
  }
};

export { sendCommand };
