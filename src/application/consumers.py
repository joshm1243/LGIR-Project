import json
import redis
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

r = redis.Redis(host="127.0.0.1", port="6379", db=0)

class ApplicationConsumer(WebsocketConsumer):
    
    def connect(self):

        self.app_code = self.scope["url_route"]["kwargs"]["app_code"]
        self.room_group_name = 'app_%s' % self.app_code
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnecct(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )


    def receive(self, text_data=None):
        text_data_json = json.loads(text_data)
        self.data = json.loads(text_data)

        if text_data_json["type"] == "blockly_edit_check":

            async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
                {
                    "type" : "unicast",
                    "sender_channel_name" : self.channel_name,
                    "data" : json.loads('{"type" : "blockly_edit_check", "edit" : "true"}')
                }
            )


        elif text_data_json["type"] =="blockly_edit_has_been_made":
            
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    "type" : "broadcast",
                    "sender_channel_name" : self.channel_name,
                    "data" : text_data_json
                }
            )


        elif text_data_json["type"] == "blockly_edit_request":
            pass
        elif text_data_json["type"] == "blockly_edit_request_reply":
            pass
        elif text_data_json["type"] == "blockly_serial_send":
            
            #self.data = json.loads('{"type" : "blockly_serial_send_reply", "msg" : "connecting"}')

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {
                                        "type" : "unicast",
                    "sender_channel_name" : self.channel_name,
                    "data" : json.loads('{"type" : "blockly_edit_request", "edit" : "true"}')
                }
            )


        else:

        #     blocklyGroupMaster = r.get(self.room_group_name + "_master").decode("utf-8")
        #     if blocklyGroupMaster is None or blocklyGroupMaster == "user1":
        #         r.set(blocklyGroupMaster,"user1")
      
     
        
            async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
                {
                    "type" : "broadcast",
                    "sender_channel_name" : self.channel_name,
                    "data" : text_data_json
                }
            )

    def broadcast(self, event):
        if self.channel_name != event["sender_channel_name"]:
            self.send(text_data = json.dumps(event["data"]))

    def unicast(self, event):
        if self.channel_name == event["sender_channel_name"]:
            self.send(text_data = json.dumps(event["data"]))