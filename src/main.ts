import config from './config';
import { create } from 'node-tradfri';

async function main(): Promise<void> {
  const client = create({
    coapClientPath: '../libcoap/examples/coap-client',
    identity: config.identity,
    preSharedKey: config.preSharedKey,
    hubIpAddress: config.ipAddress,
  });

  const devices = await client.getDevices();
  console.log('Devices:', devices);
}

main().catch(console.error);
