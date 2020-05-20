// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');
const httpStatus = require('http-status');
const moment = require('moment');
const { formatDate } = require('../config/config');
const app = require('../app');
const { getTrainsFromRenfe } = require('../utils/scrapper.util');

jest.mock('../../src/utils/scrapper.util');

describe('Train routes', () => {
    describe('GET /trains', () => {
        let query;
        beforeEach(() => {
            query = {
                from: 'Madrid',
                to: 'Zaragoza',
                departDate: moment().add(1, 'd').format(formatDate),
                returnDate: moment().add(2, 'd').format(formatDate)
            };
        });

        test('should return 200 and a data array if data is retrieved', async () => {
            const expectedArray = [
                {
                    trainId: 'tren03203',
                    departure: '20.30',
                    arrival: '21.54',
                    duration: '1 h. 24 min.',
                    trainType: 'AVE',
                    price: '55.7',
                    classType: 'Turista',
                    fare: 'Flexible'
                }
            ];
            getTrainsFromRenfe.mockResolvedValue(expectedArray);

            const res = await request(app).get('/trains').query(query);
            expect(res.status).toBe(httpStatus.OK);
            expect(res.body.length).toEqual(1);
            expect(res.body).toEqual(expect.arrayContaining(expectedArray));
        });

        test('should return 200 and an empty array if no data is retrieved', async () => {
            getTrainsFromRenfe.mockResolvedValue([]);

            const res = await request(app).get('/trains').query(query);
            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toEqual([]);
        });

        test('should return 400 and error message if request data is missing', async () => {
            query = {};

            const res = await request(app).get('/trains').query(query);
            expect(res.status).toBe(httpStatus.BAD_REQUEST);
            expect(res.body).toEqual({
                message: '"from" is required'
            });
        });

        test('should return 400 and error message if departure date is in the past', async () => {
            query.departDate = moment().add(-2, 'd').format(formatDate);

            const res = await request(app).get('/trains').query(query);
            expect(res.status).toBe(httpStatus.BAD_REQUEST);
            expect(res.body).toEqual({
                message: '"departDate" must be greater than "now"'
            });
        });

        test('should return 400 and error message if return date is smaller than departure date', async () => {
            query.returnDate = moment().add(-2, 'd').format(formatDate);

            const res = await request(app).get('/trains').query(query);
            expect(res.status).toBe(httpStatus.BAD_REQUEST);
            expect(res.body).toEqual({
                message: '"returnDate" must be larger than or equal to "ref:departDate"'
            });
        });

        test('should return 500 if an error is thrown while fetching the data', async () => {
            const errorMessage = 'Async error';
            getTrainsFromRenfe.mockRejectedValue(new Error(errorMessage));

            const res = await request(app).get('/trains').query(query);
            expect(res.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
            expect(res.body).toHaveProperty('message', errorMessage);
            expect(res.body).toHaveProperty('stack');
        });
    });
});
