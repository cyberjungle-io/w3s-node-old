const { cryptoWaitReady, decodeAddress, signatureVerify } = require('@polkadot/util-crypto');
const { u8aToHex } = require('@polkadot/util');

const isValidSignature = (signedMessage, signature, address) => {
  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);

  return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
};

const main = async () => {
  //Some interfaces, such as using sr25519 however are only available via WASM
  await cryptoWaitReady();
  const isValid = isValidSignature(
    '5EhTqrsqp1VgcksP8uX6xXDTBiXuhJtcDG591L5mtnQZ9AXW',
    '0xb6a9791f2a27c2a2da3081dbc4be274f0d1b8ddc2ece2b768152ad56a2c5116d8ca3491557063b3ae54520f382ad44665b69d514788fd0337f6d518e5a72b188',
    '5EhTqrsqp1VgcksP8uX6xXDTBiXuhJtcDG591L5mtnQZ9AXW'
  );
  console.log(isValid)
  // true
}

main();