import mongoose from 'mongoose';
import debugLib from 'debug';

const debug = debugLib('api:server');
const { connect } = mongoose;

export default async (host, dbname) => {
  const string = `Dabase is now connected`;
  try {
    await connect(host, { dbname });
    debug(string, host, dbname);
    console.log(string, dbname);
  } catch (e) {
    debug(err, e);
  }
};
