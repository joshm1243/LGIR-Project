import redis
from django.contrib.auth import authenticate

r = redis.Redis(host="127.0.0.1", port="6379", db=0)
tokendict = {'Name': 'key'}

def AddSocketConnection(key, user):
    print(key, "has been assigned to", user)
    usertoken = {user: key}
    tokendict.update(usertoken) #
    r.lpush('tokenlist', key)   #use hexists to find key?

def CheckAuthentication(user, token)
    authenticate(self, request, username=none, token=none)
    
    