import { mapSeries } from 'bluebird';
import Git from './index';
import { Context } from '../context';
import { Config } from '../config';

export default async function push(
  remotes: Git[],
  _config: Config,
  { spinner }: Context
): Promise<string> {
  const result = '';
  const message = `branches to targets \n  - ${remotes
    .map((remote) => `${remote.targetRemote}`)
    .join('\n  - ')}`;
  spinner.start(`pushing ${message}`);
  await Promise.all(
    remotes.map(async (remote: Git) => {
      const branches = await remote.getBranches();
      if (branches.length) {
        await mapSeries(branches, async (branch) => remote.push(branch));
      }
    })
  );
  spinner.succeed(`pushing ${message}`);
  return result;
}
