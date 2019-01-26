import requests
import json
lat = 42.5
longitude = -90.6
radius =5
url = 'https://conuhacks-playback-api.touchtunes.com/plays?startDate=2018-02-19T21:00:00Z&endDate=2018-02-19T22:00:00Z&offset=0' 
head = {'client-secret': '9923ac9b-8fd3-421f-b0e5-952f807c6885'}
r = requests.get(url, headers= head)
data = json.loads(r.text)
print(type(data['plays']))
lst = data['plays']
print(type(lst[0]))
properList =[]
i=0
for x in lst:
	if(x['style'] == "ROCK"):
		properList.append(x)
		i= i+1

print(properList)

cleanList
for x in properList:
	result = distace(longitude,lat,x['longitude'], x['latitude'])
	if(result <= radius):	
		cleanList.append(x)		
	
