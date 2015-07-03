var operators = {
	contains: function(data, field, value) {
		// Skip filtering
		if (!value || value === '') {
			return data;
		}

		var v = value.toLowerCase();

		var nextData = data.filter(function(d) {
			var val = d.get(field);

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