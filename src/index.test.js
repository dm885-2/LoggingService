import {format} from "./index.js";



test('format of [{"river":"auth","event":"signUp"}] to "r:auth-e:signUp', () => {
    expect(format([{"river":"auth","event":"signUp"}])).toBe("r:auth-e:signUp");
  });

test('format of [{"river":"auth","event":"signUp"},{"river":"auth","event":"signUp"}] to "r:auth-e:signUp', () => {
    expect(format([{"river":"auth","event":"signUp"},{"river":"auth","event":"signUp"}])).toBe("r:auth-e:signUp/r:auth-e:signUp");
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
    expect(() => format([{"event":"signUp"}])).toThrow();
});
test('format should thow an error if one of the objects is missing a river', () => {
    expect(() => format([{"river":"auth"}])).toThrow();
});

test('format should thow an error if one of the objects is missing a river', () => {
    expect(() => format([{"river":"auth","event":"signUp"},{"river":"auth"}])).toThrow();
});






