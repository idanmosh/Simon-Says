import { ids } from '../constants';

const randId = () => ids[Math.floor(Math.random() * ids.length)];

export default randId;