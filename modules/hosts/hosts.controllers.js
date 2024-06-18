//const PolkadotWallet = require('../../lib/polkadotWallet');
const { getDb } = require("../../config/db");
const {
  cryptoWaitReady,
  decodeAddress,
  signatureVerify,
} = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");



const isValidSignature = async (signedMessage, signature, address) => {
  console.log("*******isValidSignature", signedMessage, signature, address);
  await cryptoWaitReady();
  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);
  return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
};



module.exports.registerHost = async (mdata) => {
  //console.log('Controller registerHost', mdata);
  const db = getDb();
  //
  const isValid = await isValidSignature(
    mdata.owner_id,
    mdata.signature,
    mdata.owner_id
  );
  console.log("isValid", isValid);
  if (isValid) {
    try {
      const collection = db.collection("hosts");
      await collection.updateOne(
        { host_id: mdata.host_id },
        { $set: mdata },
        { upsert: true }
      );
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  } else {
    console.log("Invalid signature");
    throw new Error("Invalid signature");
  }
};
