const operators = {
    contains(data, field, value) {
        // Skip filtering
        if (!value || value === '') {
            return data;
        }

        const v = value.toLowerCase();

        const nextData = data.filter((d) => {
            const val = d.get(field);

            // Ignore/Skip
            if (!val || val === '') {
                return false;
            }

            return val.toLowerCase().indexOf(v) !== -1;
        });

        return nextData;
    }
};

function FilterUtils(data, options) {
    return operators[options.get('operator')](data, options.get('field'), options.get('value'));
}

module.exports = FilterUtils;
