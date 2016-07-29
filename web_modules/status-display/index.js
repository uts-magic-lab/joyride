// highly-reliable module to display a status message onscreen

import './style.css';

var currentStatus = null;

var statusDisplay = {
    get: function get() {
        return currentStatus;
    },

    set: function set(name, message) {
        currentStatus = name;

        let el = document.getElementById('status-display');
        if (!el) {
            el = document.createElement('div');
            el.id = 'status-display';
            document.body.appendChild(el);
        }
        el.setAttribute('data-status', name || '');

        if ('textContent' in el) {
            el.textContent = message || '';
        }
        else {
            el.innerText = message || '';
        }

        console.log(`Status="${name}"`, message);
    }
}

export default statusDisplay;
