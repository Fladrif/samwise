import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as tradfri from './tradfri';

const ROOM = 65540
const LAMP = 65538

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'Samwise';
});

router.get('/turnon', async (ctx) => {
  const ids = await tradfri.getLights();
  await tradfri.turnOnLights(ids);
  ctx.body = 'done';
});

router.get('/turnon/:light', async (ctx) => {
  const light = ctx.params.light;

  if (light === 'room') {
    await tradfri.turnOnLights([ROOM]);
  } else if (light === 'lamp') {
    await tradfri.turnOnLights([LAMP]);
  } else {
    const ids = await tradfri.getLights();
    await tradfri.turnOnLights(ids);
  }
  ctx.body = 'done';
});

router.get('/turnoff', async (ctx) => {
  const ids = await tradfri.getLights();
  await tradfri.turnOffLights(ids);
  ctx.body = 'done';
});

router.get('/turnoff/:light', async (ctx) => {
  const light = ctx.params.light;

  if (light === 'room') {
    await tradfri.turnOffLights([ROOM]);
  } else if (light === 'lamp') {
    await tradfri.turnOffLights([LAMP]);
  } else {
    const ids = await tradfri.getLights();
    await tradfri.turnOffLights(ids);
  }
  ctx.body = 'done';
});

app.use(router.routes());
app.listen(3000);
console.log('listening on 3000');
