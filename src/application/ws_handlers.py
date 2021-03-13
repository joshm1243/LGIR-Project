import redis
from django.contrib.auth import authenticate

r = redis.Redis(host="127.0.0.1", port="6379", db=0)
# tokendict = {}

def AddSocketConnection(key, user):
    print(key, "has been assigned to", user)
    usertoken = {user: key}
    # tokendict.update(usertoken)
    r.set(key, user)   #use hexists to find key?

def CheckAuthentication(token):
    # User is already authenticated at this point
    # Checks if the token exists in Redis
    return r.exists(token)

    