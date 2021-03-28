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

        if text_data_json["type"] == "setting_schanged_viritual_name":
            pass

        elif text_data_json["type"] == "pin_mappings_changed":
            pass

    def broadcast(self, event):
        if self.channel_name != event["sender_channel_name"]:
            self.send(text_data = json.dumps(event["data"]))

    def unicast(self, event):
        if self.channel_name == event["sender_channel_name"]:
            self.send(text_data = json.dumps(event["data"]))