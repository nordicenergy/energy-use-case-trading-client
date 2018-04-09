import { dispatcher } from '../../store';

import {
    performResetBreadcrumbs,
    performSetupRootBreadcrumb,
    performSetupBreadcrumbs
} from '../app';

describe('Users action performers', () => {
    beforeEach(done => {
        dispatcher.dispatchAction = jest.fn();
        done();
    });

    it('should call dispatch method for get user data', () => {
        performSetupBreadcrumbs([
            {
                id: 'testId',
                label: 'Test',
                path: '/test'
            }
        ]);

        const [firstCall] = dispatcher.dispatchAction.mock.calls;
        const [type, meta] = firstCall;
        expect(dispatcher.dispatchAction.mock.calls.length).toEqual(1);
        expect(type).toEqual('SETUP_BREADCRUMBS');
        expect(meta).toEqual([
            {
                id: 'testId',
                label: 'Test',
                path: '/test'
            }
        ]);
    });
});
