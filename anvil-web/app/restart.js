import { spawnSync } from 'child_process';

export default async () => {
  spawnSync('git', ['pull']);
};
