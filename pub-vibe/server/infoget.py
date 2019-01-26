import requests

url = 'https://conuhacks-playback-api.touchtunes.com/plays?startDate=2017-02-19T21:00:00Z&endDate=2018-01-19T22:00:00Z&offset=0'
head = {'client-secret': '9923ac9b-8fd3-421f-b0e5-952f807c6885'}
r = requests.get(url, headers= head)
#pretty = r.json()
print (r.json())