import json
from asgiref.sync import async_to_sync
from application.models import Project
from application.models import ProjectMappings
from channels.generic.websocket import WebsocketConsumer

#A class that represents a single websocket connection
class DashboardConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def receive(self, text_data=None):
        eventData = json.loads(text_data)
        eventName = eventData["type"]
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

            code = "ahs8dj1k"

            project = Project(name="Name",description="Desc",code="a7sh1kf1",workspace="",user=self.scope["user"])
            project.save()

            self.send(text_data=json.dumps(
                {
                    "type" : "project_create_reply",
                    "created" : "true"
                }
            ))

        elif eventName == "project_remove":
            print(eventData["code"])

            #Projects.objecst.filter(id).delete()
            
            self.send(text_data=json.dumps(
                {
                    "type" : "project_remove_reply",
                    "removed" : "true"
                }
            ))
        
        elif eventName == "hello":
            self.send(text_data=json.dumps(
                {
                    "type" : "hello_reply"
                }
            ))



    def disconnect(self, close_code):
        pass