const catchAsync = require('../catchAsync');

describe('catchAsync utils', () => {
    test('should call next if there is a error', () => {
        const nextFn = jest.fn();
        const error = new Error('Any error');
        const asyncMock = jest.fn().mockRejectedValue(error);
        const method = catchAsync(async () => {
            await asyncMock();
            expect(nextFn).toHaveBeenCalledWith(error);
        });

        method(undefined, undefined, nextFn);
    });

    test('should call the passed function upon resolving the promise', () => {
        const nextFn = jest.fn();
        const funcToBeCalledOnPromiseResolve = jest.fn();
        const method = catchAsync(funcToBeCalledOnPromiseResolve);
        method(undefined, undefined, nextFn);
        expect(funcToBeCalledOnPromiseResolve).toHaveBeenCalledWith(undefined, undefined, nextFn);
    });
});
