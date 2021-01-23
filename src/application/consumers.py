import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class ApplicationConsumer(WebsocketConsumer):
    def connect(self):
        self.app_code = self.scope["url_route"]["kwargs"]["app_code"]
        self.room_group_name = 'app_%s' % self.app_code

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        # self.send(json.dumps({"message" : "hello", "connection" : "hello"}))

        self.accept()

    def disconnecct(self, close_code):

        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type" : "chat_message",
                "message" : message
            }
        )
    
    def chat_message(self, event):
        message = event["message"]

        self.send(text_data=json.dumps({
            "message" : message
        }))
