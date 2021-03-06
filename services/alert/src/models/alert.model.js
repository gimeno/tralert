const mongoose = require('mongoose');
const pick = require('lodash.pick');
const moment = require('moment');
const { formatDate } = require('../config/config');

const alertSchema = mongoose.Schema(
    {
        origin: {
            type: String,
            required: true,
            trim: true
        },
        destination: {
            type: String,
            required: true,
            trim: true
        },
        departDate: {
            type: Date,
            required: true
        },
        returnDate: {
            type: Date
        },
        price: {
            type: Number,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        previousTransports: {
            type: [
                {
                    transportId: String,
                    transportType: String,
                    price: String
                }
            ]
        }
    },
    {
        timestamps: true,
        toObject: { getters: true },
        toJSON: { getters: true }
    }
);

alertSchema.methods.transform = function transform() {
    const alert = this;
    const alertJson = pick(alert.toJSON(), ['id', 'origin', 'destination', 'departDate', 'returnDate', 'price']);
    alertJson.departDate = moment(alertJson.departDate).format(formatDate);
    alertJson.returnDate = moment(alertJson.returnDate).format(formatDate);
    return alertJson;
};

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
