import { initBotId } from 'botid/client/core';

export function init() {
  initBotId({
    protect: [
      {
        path: '/api/post-data',
        method: 'POST',
      },
    ],
  });
}
