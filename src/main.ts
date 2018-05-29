import * as tradfri from './tradfri';

async function main(): Promise<void> {
  await tradfri.printDevices();

  const ids = await tradfri.getLights();

  //const params = {
  //  brightness: 254
  //};
  //await tradfri.setLightState(ids, params);
  // await tradfri.turnOnLights(ids);
  await tradfri.turnOffLights(ids);
}

main().catch(console.error);
