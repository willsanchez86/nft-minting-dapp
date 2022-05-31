/**
 *  This array contains the addresses of the whitelisted users.
 *  Make sure to add your white-listed users to this array. Otherwise,
 *  they will not be able to interact with the contract and mint on pre-sale process. For the public sale,
 *  the whitelist is not required.
 *
 *  ** IMPORTANT: **
 *  Since we are passing the whitelist root (merkleroot) to the contract constructor when deploying,
 *  if you add a new user address to the whitelist or remove an existing user address from the whitelist,
 *  you must change the merkleroot in the contract. For this reason, I created a new script to update the merkleroot
 *  in the contract. You can find it in `scripts/setMerkleRoot.js`.
 */

 module.exports = [
    '0xFD821ac0fe07f65f8c7b72616E145d393a82d406', //artist_test
    '0xDF2D8bAe5FC6b0F7e634fee9b195CbE704C1dF07', //founder_test
    '0xf5A4D5c1dB584eF0f045B07C69549ead0B0b5058', //test1
    '0xeD420aC05F3073aa9D0BB935d64E390A93D0D325', //test2
    '0x8Ece4bE69d61AE15Dc4286e243290F77077Eb8f1' //test3
  ]