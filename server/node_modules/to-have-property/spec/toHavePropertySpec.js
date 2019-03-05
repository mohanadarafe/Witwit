require('../index');

describe('toHaveProperty matcher', function() {
	it('should be defined in Expectation', function() {
		expect( expect().toHaveProperty).toBeDefined();
	});

	it('should be function in Expectation', function() {
		expect( typeof expect().toHaveProperty ).toEqual('function');
	});

	it('should find property in object', function() {
		expect({ x: 10 }).toHaveProperty('x');
	});

	it('should find property in object and check is it equal to value', function() {
		expect({ y: 123}).toHaveProperty('y', 123);
	});
});