#WebSocket Authentication Functions
#
#

import redis
import lgirproject.settings

r = redis.Redis(host="127.0.0.1", port="6379", db=0)

#
rDecode = lambda encodedString : encodedString.decode('utf-8')

#
def Remember(token,username):
    r.set("token_" + token, username)

#
def Bind(token, channel):
    if r.exists("token_" + token):
        username = rDecode(r.get("token_" + token))
        r.set("channel_" + channel, username)
        r.delete("token_" + token)
        return True
    else:
        return False
    
#
def Check(channel):
    return r.exists("channel_" + channel)

#
def Remove(channel):
    if Check(channel):
        r.delete("channel_" + channel)

#
def RemoveAll():
    r.flushall()
RemoveAll()