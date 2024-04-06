import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as process from 'process';

const LOCAL_CONFIG = 'local';
const EXTENSION = '.yml';

const CURRENT_WORKING_PATH = process.cwd();
const CONFIG_DIR = CURRENT_WORKING_PATH + '/' + 'config';
const CHARACTER_SET = 'utf8';

export default () => {
  return yaml.load(readConfigFile()) as Record<string, any>;
};

function readConfigFile() {
  const fileName = LOCAL_CONFIG;
  const filePath = fileName + EXTENSION;

  return readFileSync(join(CONFIG_DIR, filePath), CHARACTER_SET);
}
