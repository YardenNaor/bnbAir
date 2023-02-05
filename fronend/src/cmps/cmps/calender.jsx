import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { Component } from 'react';

export class Calender extends Component({onSetDate}) {


    handleSelect(ranges) {
        onSetDate(ranges)
    }
    render() {
        const selectionRange = {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
        return (
            <DateRangePicker
                ranges={[selectionRange]}
                onChange={this.handleSelect}
            />
        )
    }
}