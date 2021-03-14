import redis
import lgirproject.settings

r = redis.Redis(host="127.0.0.1", port="6379", db=0)

#
rDecode = lambda encodedString : encodedString.decode('utf-8')


def ResetMaster(appcode):
    if r.exists("application_editor_" + appcode):
        r.set("application_editor_" + appcode,"")

def EditCheck(appcode,channel):
    appKey = "application_editor_" + appcode
    if not r.exists(appKey) or rDecode(r.get(appKey))  == "":
        r.set(appKey,channel)
        return True

def Leave(appcode,channel):
    appKey = "application_editor_" + appcode
    if rDecode(r.get(appKey)) == channel:
        r.set(appKey,"")
    if r.exists("channel_" + channel):
        r.delete("channel_" + channel)


def EditRequest(appcode,channel):
    queueKey = "editor_queue_" + appcode
    if not r.exists(queueKey) or rDecode(r.get(queueKey)) == "":
        r.set(queueKey,channel)
        return True

def GetNextEditor(appcode):
    return rDecode(r.get("editor_queue_" + appcode))

def SwitchEditor(appcode,channel):

    if r.exists("application_editor_" + appcode):

        if rDecode(r.get("application_editor_" + appcode)) == channel:

            appKey = "application_editor_" + appcode
            queueKey = "editor_queue_" + appcode
            nextEditor = rDecode(r.get(queueKey))
            r.set(appKey,nextEditor)