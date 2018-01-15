import PropTypes from 'prop-types';
import {createActionWithCheck} from '../index';


console.warn = jest.fn((warn) => {
    throw new Error(warn);
});


describe('createActionWithCheck', () => {
    const actionType = 'actionType name';
    const propTypes = {
        message: PropTypes.string.isRequired,
        number: PropTypes.number,
    };

    const actionWithoutType = createActionWithCheck(actionType);
    const actionWithType = createActionWithCheck(actionType, propTypes);

    it('should create redux action without checking payload type.', () => {
        expect(typeof actionWithoutType).toBe('function');

        expect(actionWithoutType()).toEqual({
            type: actionType,
        });
    });

    it('should create redux action with payload without checking payload type.',
        () => {
            const payload = 'payload';
            expect(actionWithoutType(payload)).toEqual({
                type: actionType,
                payload,
            });
        });

    it('should create redux action with payload with checking payload type.',
        () => {
            const payloadWithoutMessage = {
                toto: 'payload'
            };
            expect(() => actionWithType(payloadWithoutMessage)).toThrow(
                `\`message\` is marked as required in \`action ${actionType}\``
            );

            const payloadWithWrongNumberType = {
                message: 'message content',
                number: 'wrong type'
            };
            expect(() => actionWithType(payloadWithWrongNumberType)).toThrow(
                'Invalid argument `number` of type `string` supplied to ' +
                `\`action ${actionType}\``
            );

            const correctPayloadWithNumber = {
                message: 'message content 1',
                number: 3
            };
            expect(() => actionWithType(correctPayloadWithNumber))
                .not.toThrow();

            const correctPayloadWithoutNumber = {
                message: 'message content 2',
            };
            expect(() => actionWithType(correctPayloadWithoutNumber))
                .not.toThrow();
        });
});
