require('../index');

describe('toHaveProperties matcher', function() {
	it('should be defined in Expectation', function() {
		expect( expect().toHaveProperties).toBeDefined();
	});

	it('should be function in Expectation', function() {
		expect( typeof expect().toHaveProperties ).toEqual('function');
	});

	it('should fail if can not find all properties in object', function() {
		expect({ x: 10 }).not.toHaveProperties('x', 'y');
	});

	it('should find properties in object and check are they equal to values', function() {
		expect({ x: 12, y: 23}).toHaveProperties({'x': 12, 'y': 23});
	});

	it('should find properties in object and check are they equal to values', function() {
		expect({ x: 12, y: 23, z: 34}).toHaveProperties({'x': 12, 'y': 23});
	});
});