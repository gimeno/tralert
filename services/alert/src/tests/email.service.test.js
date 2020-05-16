const emailService = require('../services/email.service');

describe('Cron service', () => {
    describe('sendAlertsEmail method', () => {
        let sendEmailSpy;
        beforeEach(() => {
            sendEmailSpy = jest.spyOn(emailService.transport, 'sendMail').mockResolvedValue();
        });

        test('should not call sendEmail if no email address is passed', () => {
            emailService.sendAlertsEmail('', undefined);
            expect(sendEmailSpy).not.toHaveBeenCalled();
        });
    });
});
