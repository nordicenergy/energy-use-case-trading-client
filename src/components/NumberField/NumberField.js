import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LongPressButton from './LongPressButton';
import './NumberField.css';

const SMALL_STEP = 0.1;
const MEDIUM_STEP = 1;
const LARGE_STEP = 10;
const VALUE_FOR_SMALL_STEP = 10;
const VALUE_FOR_MEDIUM_STEP = 100;

class NumberField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: !props.defaultValue || isNaN(props.defaultValue) ? '' : Number(props.defaultValue)
        };
    }

    getState() {
        const value = this.props.value || this.state.value;
        return value ? { ...this.state, value } : this.state;
    }

    getStep(value) {
        const { step } = this.props;

        if (step) {
            return step;
        }

        if (!value || (value < VALUE_FOR_SMALL_STEP && value > -VALUE_FOR_SMALL_STEP)) {
            return SMALL_STEP;
        }

        if (value < VALUE_FOR_MEDIUM_STEP && value > -VALUE_FOR_MEDIUM_STEP) {
            return MEDIUM_STEP;
        }

        return LARGE_STEP;
    }

    handlePress(isIncrease) {
        const { onChange } = this.props;
        const { value } = this.getState();
        const valueFloat = isNaN(value) || !value ? 0 : Number(value);
        const step = isIncrease ? this.getStep(valueFloat) : -this.getStep(valueFloat);
        const changedValue = Number((valueFloat + step).toFixed(1));

        this.setState(
            () => ({ value: changedValue }),
            () => {
                if (typeof onChange === 'function') {
                    onChange(changedValue);
                }
            }
        );
    }

    handleOnChange(event) {
        const { onChange } = this.props;
        const { value } = event.currentTarget;

        this.setState(
            () => ({ value }),
            () => {
                if (typeof onChange === 'function') {
                    onChange(value);
                }
            }
        );
    }

    render() {
        const { className, label, units, id } = this.props;
        const { value } = this.getState();
        const step = this.getStep(value);
        const classes = classNames('number-field', className);

        return (
            <div className={classes}>
                <label className="number-field-label" htmlFor={id}>
                    {label}
                </label>
                <LongPressButton sign="-" onPress={() => this.handlePress()} />
                <input
                    className="number-field-input"
                    id={id}
                    type="number"
                    step={step}
                    value={value}
                    onChange={event => this.handleOnChange(event)}
                />
                <LongPressButton sign="+" onPress={() => this.handlePress(true)} />
                {units && <small className="number-field-units">{units}</small>}
            </div>
        );
    }
}

NumberField.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    units: PropTypes.string,
    step: PropTypes.number,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
NumberField.defaultProps = {
    defaultValue: ''
};

export default NumberField;
