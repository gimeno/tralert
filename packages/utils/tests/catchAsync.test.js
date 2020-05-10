const catchAsync = require('../catchAsync');

describe('catchAsync utils', () => {
    let nextFn;
    beforeAll(() => {
        nextFn = jest.fn();
    });

    test('should call next if there is a error', async () => {
        const error = new Error('Any error');
        const asyncMock = jest.fn().mockRejectedValue(error);
        const method = catchAsync(async () => {
            await asyncMock();
            expect(nextFn).toHaveBeenCalledWith(error);
        });

        method(undefined, undefined, nextFn);
    });

    test('should ', () => {
        const mock = jest.fn().mockResolvedValue('result');
        let result = '';
        const method = catchAsync(async () => {
            result = await mock();
            expect(result).toBe('result');
        });

        method();
    });
});
