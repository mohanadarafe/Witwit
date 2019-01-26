import numpy as numpy
import numpy as numpy
def xyconverter(lon, lat):
	x = 6371*numpy.cos(lon*numpy.pi/2)*numpy.cos(lat*numpy.pi/2)
	y = 6371*numpy.cos(lon*numpy.pi/2)*numpy.sin(lat*numpy.pi/2)
	return (x,y)

print (xyconverter(100,-100))
print (numpy.cos(numpy.pi/2))
print(numpy.sin(numpy.pi/2))

def distance (o1, o2, p1, p2):
	center = xyconverter(o1,o2)
	point = xyconverter(p2, p2)
	distance = numpy.sqrt(numpy.square(center[0]-point[0])+numpy.square(center[1]-point[1]))
	return distance
