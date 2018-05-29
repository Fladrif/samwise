import * as lodash from 'lodash';
import { create } from 'node-tradfri';

import config from './config';

export type STATE = 'on' | 'off';

export interface LightConfig {
  state?: STATE;
  color?: string;
  brightness?: number;
  transitionTime?: number;
}

const client = create({
  coapClientPath: '../libcoap/examples/coap-client',
  identity: config.identity,
  preSharedKey: config.preSharedKey,
  hubIpAddress: config.ipAddress,
});

export async function printDevices(): Promise<void> {
  const devices = await client.getDevices();
  console.log('Devices:', devices);
}

export async function getLights(): Promise<number[]> {
  const devices = await client.getDevices();
  const deviceIDs = devices.map(device => {
    if (device.brightness) return device.id;
    return;
  });
  return lodash<number[]>(deviceIDs).compact().value();
}

export async function turnOnLights(ids: number[]): Promise<void> {
  await ids.map(async id => {
    await client.turnOnDevice(id);
  });
}

export async function turnOffLights(ids: number[]): Promise<void> {
  await ids.map(async id => {
    await client.turnOffDevice(id);
  });
}

export async function setLightState(ids: number[], params: LightConfig): Promise<void> {
  await ids.map(async id => {
    await client.setDeviceState(id, params);
  });
}
