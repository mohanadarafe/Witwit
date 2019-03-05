var _ = require('lodash');

beforeEach(function () {
	jasmine.addMatchers({
		toHaveProperty: function (util) {
			return {
				compare: function (actual, propertyName, propertyValue) {
					var result = {};

					if (!actual.hasOwnProperty(propertyName)) {
						result.pass = false;
						result.message = 'Expected ' + actual +
						' to have property ' + propertyName +
						', but has only ' + Object.keys(actual).join(', ') + '.';
						return result;
					}

					if (propertyValue !== undefined) {
						result.pass = util.equals(actual[propertyName], propertyValue);
					} else {
						result.pass = true;
					}

					if (!result.pass) {
						result.message = 'Expected property "' + propertyName + '" of ' + actual +
						' to be equal to ' + propertyValue +
						' but it is ' + actual[propertyName];
					}

					return result;
				}
			};
		},
		toHaveProperties: function (util) {
			return {
				compare: function (actual) {
					var result = {},
						properties = arguments[1];

					if (typeof properties === 'string') {
						properties = _(Array.prototype.slice.call(arguments, 1)).zipObject().value();
					}

					var missedProperties,
						propertiesWithIncorrectValues = [];

					missedProperties = _(properties).pairs().reduce(function(missed, property) {
						var propertyName = property[0],
							propertyValue = property[1];

						if (!actual.hasOwnProperty(propertyName)) {
							missed.push({
								name: propertyName,
								value: propertyValue
							});
						} else if (propertyValue !== undefined) {
							if (!util.equals(actual[propertyName], propertyValue)) {
								propertiesWithIncorrectValues.push({
									name: propertyName,
									should: propertyValue,
									has: actual[propertyName]
								});
							}
						}

						return missed;
					}, []);

					var messages = [];
					result.pass = true;
					result.message = '';
					if (missedProperties.length > 0) {
						result.pass = false;
						messages.push(
							'Expected ' + actual + ' to have properties ' + _(missedProperties).map('name').value() + ', but has only ' + Object.keys(actual).join(', ') + '.'
						);
					}

					if (propertiesWithIncorrectValues.length > 0) {
						result.pass = false;
						messages.push('Expected ' + actual + ' to have properties ' + _(propertiesWithIncorrectValues).map(function(property) {
							return property.name + ' = ' + property.should + ' but it is ' + property.has;
						}).join(', ') + '.');
					}

					if (result.pass) {
						result.message = 'All properties are here';
					} else {
						result.message = messages.join(' and \n');
					}

					return result;
				}
			};
		}
	});
});

