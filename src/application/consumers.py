import json

from channels.generic.websocket import WebsocketConsumer


class ApplicationConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.send(json.dumps({"message" : "hello", "connection" : "hello"}))
    def receive(self, text_data=None, bytes_data=None):
        print("recieve",text_data)
        self.send(text_data=json.dumps({
            'message': "messasge"
        }))
    def disconnect(self, event):
        pass
