// Import stylesheets of HTML and js-datepicker
// for Vite parsing
import './styles.css';
import 'js-datepicker/dist/datepicker.min.css';

import { DateTime } from 'luxon';
import datepicker from 'js-datepicker';

// js-datepicker format for #age div
const picker = datepicker('#age', {
    maxDate: new Date(), // Block out future dates
    formatter: (input, date) => {
        // Show a clean date string in the input field when picked
        const value = date.toLocaleDateString();
        input.value = value;
    }
});

// Get nodes
const form = document.getElementById('ageForm');
const resultDiv = document.getElementById('result');

// Form handler after user hits the calculate button
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Grab the native JS Date object straight from the datepicker instance
    const selectedDate = picker.dateSelected;

    if (!selectedDate) {
        resultDiv.innerHTML = `<span style='color: red;'>Please select a date first!</span>`
        return;
    }

    // LUXON CALCULATION
    const DateTime = luxon.DateTime;

    // Convert the native JS Date into a Luxon DateTime object
    const birthDate = DateTime.fromJSDate(selectedDate);
    const now = DateTime.now();

    // Diff the two dates targeting specifically years and months
    const ageDuration = now.diff(birthDate, ['years', 'months', 'days']).toObject();

    // Extract values (and round down to whole integers)
    const years = Math.floor(ageDuration.years || 0);
    const months = Math.floor(ageDuration.months || 0);
    const days = Math.floor(ageDuration.days || 0);

    // Helper function to append on 's' unless the count is exactly 1
    const pluralize = (count, word) => {
        return count === 1 ? `${count} ${word}` : `${count} ${word}s`
    };

    const yearsText = pluralize(years, 'year');
    const monthsText = pluralize(months, 'month');
    const daysText = pluralize(days, 'day');

    // Update the UI with the final result
    resultDiv.innerHTML = `You are <strong>${yearsText}</strong>, <strong>${monthsText}</strong> and <strong>${daysText}</strong> old!`;
})