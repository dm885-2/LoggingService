import {jest, test} from '@jest/globals';
import helpers from '../src/helpers.js';
import { format, savelog, getLogs } from "./index.js";


const sessionId = 1;
const requestId = 1;

// Mock functions.
helpers.query = jest.fn();
const publishFn = jest.fn();


describe('Test of format', () => {
  test('format of [{"river":"auth","event":"signUp"}] to "r:auth-e:signUp', () => {
    expect(format([{ "river": "auth", "event": "signUp" }])).toBe("r:auth-e:signUp ");
  });

  test('format of [{"river":"auth","event":"signUp"},{"river":"auth","event":"signUp"}] to "r:auth-e:signUp', () => {
    expect(format([{ "river": "auth", "event": "signUp" }, { "river": "auth", "event": "signUp" }])).toBe("r:auth-e:signUp -> r:auth-e:signUp ");
  });

  test('format should expect two arguments', () => {
    expect(() => format()).toThrow();
  });
  test('format should expect an array as first argument', () => {
    expect(() => format("string")).toThrow();
  });

  test('format should thow an error if the array is empty', () => {
    expect(() => format([])).toThrow();
  });

  test('format should thow an error if one of the objects is missing a river', () => {
    expect(() => format([{ "event": "signUp" }])).toThrow();
  });
  test('format should thow an error if one of the objects is missing a river', () => {
    expect(() => format([{ "river": "auth" }])).toThrow();
  });

  test('format should thow an error if one of the objects is missing a river', () => {
    expect(() => format([{ "river": "auth", "event": "signUp" }, { "river": "auth" }])).toThrow();
  });


});


describe('Testing savelog', () => {
  beforeEach(async () => {
    helpers.query.mockClear();
    publishFn.mockClear();
  });

  test('It should query the database when adding a log', async () => {
    const msg = {sessionId: sessionId, requestId: requestId, logPath: [{"river":"auth","event":"signUp"},{"river":"auth","event":"signUp"}], userId: 1};
    await savelog(msg);

    // Check that it queried the database.
    expect(helpers.query).toHaveBeenCalledTimes(1);
  });

  test('It should query the database twices adding 2 logs', async () => {
    const msg = {sessionId: sessionId, requestId: requestId, logPath: [{"river":"auth","event":"signUp"},{"river":"auth","event":"signUp"}], userId: 1};
    await savelog(msg);
    await savelog(msg);

    // Check that it queried the database.
    expect(helpers.query).toHaveBeenCalledTimes(2);
  });

  test('msq needs to be an object', async () => {
    expect(() =>  savelog("string").toThrow());
  });

  test('msq needs to have a sessionId', async () => {
    expect(() =>  savelog({ requestId: requestId, logPath: [{"river":"auth","event":"signUp"},{"river":"auth","event":"signUp"}], userId: 1}).toThrow());
  });

  test('msq needs to have a requestId', async () => {
    expect(() =>  savelog({sessionId: sessionId,  logPath: [{"river":"auth","event":"signUp"},{"river":"auth","event":"signUp"}], userId: 1}).toThrow());
  });

  test('msq needs to have LogPath', async () => {
    expect(() =>  savelog({sessionId: sessionId, requestId: requestId, userId: 1}).toThrow());
  });

  test('msq needs to have userid', async () => {
    expect(() =>  savelog({sessionId: sessionId, requestId: requestId, logPath: [{"river":"auth","event":"signUp"},{"river":"auth","event":"signUp"}]}).toThrow());
  });

});

describe('Testing getLogs', () => {
  beforeEach(async () => {
    helpers.query.mockClear();
    publishFn.mockClear();
  });

  

  test('msq needs to be an object', async () => {
    expect(() =>  getLogs("string", publishFn ).toThrow());
  });

  test('msq needs to have a sessionId', async () => {
    expect(() =>  getLogs({ requestId: requestId}, publishFn).toThrow());
  });

  test('msq needs to have a requestId', async () => {
    expect(() =>  getLogs({sessionId: sessionId},publishFn).toThrow());
  });

  test('no publis', async () => {
    expect(() =>  getLogs({requestId: requestId, sessionId: sessionId}).toThrow());
  });

  test('no input', async () => {
    expect(() =>  getLogs().toThrow());
  });


  test('It should query the database when adding getting all the logs ', async () => {
    const msg = {sessionId: sessionId, requestId: requestId};
    await getLogs(msg, publishFn);

    // Check that it queried the database.
    expect(helpers.query).toHaveBeenCalledTimes(1);
  });

  test('It should query the database twices getting logs twice', async () => {
    const msg = {sessionId: sessionId, requestId: requestId};
    await getLogs(msg, publishFn);
    await getLogs(msg, publishFn);

    // Check that it queried the database.
    expect(helpers.query).toHaveBeenCalledTimes(2);
  });

  test('Expect output of query to be correct', async () => {
    const logs = ["input", "output"];
    helpers.query.mockReturnValueOnce(logs);

    const msg = {sessionId: sessionId, requestId: requestId};

    await getLogs(msg, publishFn);

    expect(publishFn).toHaveBeenCalledTimes(1);
    expect(publishFn).toHaveBeenCalledWith('getLogs-response', {data: logs, sessionId: sessionId,requestId: requestId});

  });
});
