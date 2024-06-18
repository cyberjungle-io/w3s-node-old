
const { u8aToHex } = "@polkadot/util";
const {decodeAddress } = "@polkadot/util-crypto";
const { cryptoWaitReady } = require("@polkadot/util-crypto");
const { signatureVerify } = require("@polkadot/util-crypto");

/* module.exports.verifySignature = async (message, signature, address) => {
  const { isValid } = signatureVerify(message, signature, address);
  return isValid;
}
 */
async function testCryptoReady() {
  await cryptoWaitReady();
  console.log("Crypto is ready!");
}
 function validate (signedMessage, signature, address)  {
  console.log("*******validate", signedMessage, signature, address);


  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);
  return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
};
 
module.exports.isValidSignature = async (signedMessage, signature, address) => {
    console.log("+++++++++isValidSignature", signedMessage, signature, address);
    //const publicKey = decodeAddress(address);
    //const hexPublicKey = u8aToHex(publicKey);
    //await testCryptoReady();
    await cryptoWaitReady();
    const isValid =  validate(signedMessage, signature, address);
    console.log("isValidSignatore isValid", isValid);
    return isValid
  }; 
