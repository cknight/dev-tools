export function getSecureRandom(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(cryptoRand() * (max - min + 1)) + min;
}

function cryptoRand()
{
    const randomBuffer = new Uint32Array(1);
    self.crypto.getRandomValues(randomBuffer);
    return ( randomBuffer[0] / (0xffffffff + 1) );
}
