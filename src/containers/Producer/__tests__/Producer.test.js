import React from 'react';
import { Provider } from 'react-redux';
import ProducerContainer, { Producer } from '../Producer';
import { ProducerInfo, Loader, Button } from '../../../components';
import { mountWithIntl, shallowWithIntl } from '../../../services/intlTestHelper';
import configureMockStore from 'redux-mock-store';
import * as producersActions from '../../../action_performers/producers';
import * as appActions from '../../../action_performers/app';

const mockStore = configureMockStore();
const store = mockStore({
    Producers: {
        producer: {
            data: {
                name: 'Peter Producer',
                price: 2.4,
                marketPrice: 2.5,
                annualProduction: 3000,
                purchased: 1300,
                capacity: 8,
                dates: 'Sep 12 - Feb 22',
                tradingStrategy: false,
                id: 1,
                complete: false,
                plantType: 'solar',
                picture: 'https://pbs.twimg.com/profile_images/929933611754708992/ioSgz49P_400x400.jpg',
                location: 'Lippendorf, Neukieritzsch',
                description: 'desc'
            },
            loading: false,
            error: null
        }
    }
});

const context = {
    intl: {
        formatMessage: jest.fn()
    },
    router: {
        history: { push: jest.fn() }
    }
};

const commonProps = {
    match: { params: { producerId: '1' } }
};

const props = {
    ...Producer.defaultProps,
    producer: {
        id: 1,
        name: 'test'
    }
};

function renderContainer() {
    return mountWithIntl(
        <Provider store={store}>
            <ProducerContainer {...commonProps} context={context} />
        </Provider>
    );
}

function renderComponent() {
    return shallowWithIntl(<Producer {...commonProps} {...props} context={context} />);
}

describe('<Producer /> Component', () => {
    beforeEach(() => {
        context.router.history.push = jest.fn();
        context.intl.formatMessage = jest.fn();
        context.intl.formatMessage.mockReturnValue('test');
        producersActions.performGetProducer = jest.fn();
        appActions.performSetupBreadcrumbs = jest.fn();
    });

    it(`should contains following controls:
        - <div> with class "producer-page";
        - 1 <h1>;
        - 2 <Button> component";
        - 1 <Loader> component";
        - 1 <ProducerInfo> component";`, () => {
        const component = renderContainer();

        expect(component.find('.producer-page')).toHaveLength(1);
        expect(component.find('h1')).toHaveLength(1);
        expect(component.find(Loader)).toHaveLength(1);
        expect(component.find(ProducerInfo)).toHaveLength(1);
        expect(component.find(Button)).toHaveLength(2);
    });

    it('should call prepare common function', () => {
        const component = renderContainer();
        const info = component.find(ProducerInfo).at(0);
        expect(info.props()).toEqual({
            description: 'desc',
            details: {
                annualProduction: 3000,
                capacity: 8,
                energyType: 'Solar',
                location: 'Lippendorf, Neukieritzsch',
                name: 'Peter Producer',
                price: 2.4,
                marketPrice: 2.5,
                purchased: 1300,
                selectedSince: 'Sep 12 - Feb 22'
            },
            labels: {
                annualProduction: 'Annual Production',
                capacity: 'Peak Capacity',
                energyType: 'Type of energy',
                location: 'Location',
                name: 'Name',
                price: 'Price',
                marketPrice: 'vs. market price of',
                purchased: 'Energy purchased',
                selectedSince: 'Selected since'
            },
            picture: 'https://pbs.twimg.com/profile_images/929933611754708992/ioSgz49P_400x400.jpg'
        });
    });

    it('should returns correct props map', () => {
        const stateDummy = {
            Producers: {
                producer: {
                    data: 'test_data',
                    error: 'test_error',
                    loading: 'test_loading'
                }
            }
        };
        const props = Producer.mapStateToProps(stateDummy);
        expect(props).toEqual({
            producer: 'test_data',
            error: 'test_error',
            loading: 'test_loading'
        });
    });

    it('should perform related actions on did mount step', () => {
        renderContainer();

        expect(producersActions.performGetProducer.mock.calls.length).toEqual(1);
        const [[arg1]] = producersActions.performGetProducer.mock.calls;
        expect(arg1).toEqual('1');
        expect(appActions.performSetupBreadcrumbs.mock.calls.length).toEqual(2);
        const [[bArg1], [bArg2]] = appActions.performSetupBreadcrumbs.mock.calls;
        expect(bArg1).toEqual(undefined);
        expect(bArg2).toEqual([
            {
                icon: 'faChartBar',
                id: 'trading',
                label: 'Trading',
                path: '/trading'
            },
            {
                id: 'buy_energy',
                label: 'Buy Energy',
                path: '/trading/buy_energy'
            },
            {
                id: 'producer',
                label: 'Peter Producer',
                path: '/trading/buy_energy/producer/1'
            }
        ]);

        const component = renderComponent();
        expect(appActions.performSetupBreadcrumbs.mock.calls.length).toEqual(4);
        component.setProps({ producer: { id: 1, name: 'Test' } });
        component.setProps({ producer: { id: 2, name: 'Test' } });
        expect(appActions.performSetupBreadcrumbs.mock.calls.length).toEqual(6);
        component.setProps({ producer: { id: 2, name: 'Test' } });
        expect(appActions.performSetupBreadcrumbs.mock.calls.length).toEqual(6);
    });

    it('should provide possibility navigate to producers list', () => {
        const component = renderComponent();
        component.setContext(context);
        const back = component.find(Button).at(1);
        back.props().onClick();

        const { push } = context.router.history;
        expect(push.mock.calls.length).toEqual(1);
        const [[route]] = push.mock.calls;
        expect(route).toEqual('/trading/buy_energy');
    });
});
