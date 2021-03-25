import json
from asgiref.sync import async_to_sync
from application.models import Project
from channels.generic.websocket import WebsocketConsumer


#A class that represents a single websocket connection
class DashboardConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def receive(self, text_data=None):
        text_data_json = json.loads(text_data)
        eventName = text_data_json["type"]
        if eventName == "project_join_request":
            self.send(text_data=json.dumps(
                {
                    "type" : "project_join_reply",
                    "joined" : "true",
                    "name" : "NAME",
                    "users" : "USERS",
                    "code" : "CODE",
                    "modified" : "MODIFIED"
                }
            ))

        elif eventName == "project_create":
            print("This")
            self.send(text_data=json.dumps(
                {
                    "type" : "project_create_reply",
                    "created" : "true"
                }
            ))



    def disconnect(self, close_code):
        pass