const mongoose = require('mongoose');
const moment = require('moment');
const { Alert } = require('../../models');

const pastDepartureDateAlert = {
    _id: mongoose.Types.ObjectId(),
    origin: 'originFake',
    destination: 'destinationFake',
    departDate: moment().add(-10, 'd'),
    returnDate: moment().add(-2, 'd'),
    price: 5,
    userId: 'auth0|ABC1234'
};

const nonFoundPreviousTrainAlert = {
    _id: mongoose.Types.ObjectId(),
    origin: 'originFake',
    destination: 'destinationFake',
    departDate: moment().add(1, 'd'),
    returnDate: moment().add(2, 'd'),
    price: 30,
    userId: 'auth0|ABC1234'
};

const foundPreviousTrainAlert = {
    _id: mongoose.Types.ObjectId(),
    origin: 'originFake',
    destination: 'destinationFake',
    departDate: moment().add(10, 'd'),
    returnDate: moment().add(20, 'd'),
    price: 30,
    userId: 'auth0|ABC1234',
    previousTransports: [
        {
            transportId: 'tren03094',
            price: '20,70',
            transportType: 'train'
        }
    ]
};

const alertFromRandomUser = {
    _id: mongoose.Types.ObjectId(),
    origin: 'originFake',
    destination: 'destinationFake',
    departDate: moment().add(20, 'd'),
    returnDate: moment().add(21, 'd'),
    price: 30,
    userId: 'auth0|RANDOMUSER123'
};

const insertAlerts = async (alerts) => {
    await Alert.insertMany(alerts);
};

module.exports = {
    pastDepartureDateAlert,
    nonFoundPreviousTrainAlert,
    foundPreviousTrainAlert,
    alertFromRandomUser,
    insertAlerts
};
