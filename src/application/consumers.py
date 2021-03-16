import json
import redis
from asgiref.sync import async_to_sync
from application.models import Project
from channels.generic.websocket import WebsocketConsumer
import application.wshandlers.auth as wsauth
import application.wshandlers.workspace as wsworkspace

#Connecting to the containerised redis server
r = redis.Redis(host="127.0.0.1", port="6379", db=0)

#A class that represents a single websocket connection
class ApplicationConsumer(WebsocketConsumer):
    def connect(self):

        try:
            self.app_code = self.scope["url_route"]["kwargs"]["app_code"]

            self.room_group_name = 'app_%s' % self.app_code
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )
            self.accept()
        except:
            print("HH")

    def disconnect(self, close_code):

        wsauth.Remove(self.channel_name)
        
        #The following code disconnects the websocket regardless of authentication success
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )


    def receive(self, text_data=None):

        text_data_json = json.loads(text_data)
        self.data = json.loads(text_data)
        eventName = text_data_json["type"]


        appcode = self.app_code

        if eventName == "auth":
            token = text_data_json["auth"]
            wsauth.Bind(token,self.channel_name)

        elif wsauth.Check(self.channel_name):

            #BLOCKLY_WORKSPACE_CHANGE
            #An edit to the Blockly workspace has been made
            #text_data_json["blockly_workspace"] will contain JSON used to recreate the whole workspace
            #text_data_json["blockly_content"] will contain JSON used to complete the change
            if eventName == "blockly_edit_has_been_made":
                
                isBlocklyMaster = True
                
                #Checking whether the current user has permission to change the workspace
                #If they don't their request to change the workspace will be ignored
                if isBlocklyMaster:
                
                    #Echoing the change so other users on the same workspace get the changes
                    async_to_sync(self.channel_layer.group_send)(
                        self.room_group_name,
                        {
                            "type" : "broadcast",
                            "sender_channel_name" : self.channel_name,
                            "data" : text_data_json
                        }
                    )

                    # Area for Storing Workspace 
                    currProject = Project.objects.get(name=self.app_code)
                    currProject.workspace = text_data_json["blockly_workspace"]
                    currProject.save()


            

            #BLOCKLY_EDIT_REQUEST
            #An request to become the editor of a workspace has been made
            elif eventName == "blockly_edit_request":
                
                if wsworkspace.EditRequest(self.app_code,self.channel_name):

                    async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                        {
                            "type" : "broadcast",
                            "sender_channel_name" : self.channel_name,
                            "data" : json.loads('{"type" : "blockly_edit_request"}')
                        }
                    )

                else:
                    print("Someone else has asked for permission, so the request has been ignored.")

            #BLOCKLY_EDIT_REQUEST_REPLY
            elif eventName == "blockly_edit_request_reply":
                
                if text_data_json["allow"]:

                    async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                        {
                            "type" : "unicast",
                            "sender_channel_name" : wsworkspace.GetNextEditor(self.app_code),
                            "data" : json.loads('{"type" : "blockly_edit_request_reply", "edit" : "true"}')
                        }
                    )

                else:
                    
                    async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                        {
                            "type" : "unicast",
                            "sender_channel_name" : wsworkspace.GetNextEditor(self.app_code),
                            "data" : json.loads('{"type" : "blockly_edit_request_reply", "edit" : "false"}')
                        }
                    )


            #BLOCKLY_EDIT_CHECK
            #Checks if the application is currently being edited
            elif eventName == "blockly_edit_check":

                if wsworkspace.EditCheck(self.app_code,self.channel_name):

                    async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                        {
                            "type" : "unicast",
                            "sender_channel_name" : self.channel_name,
                            "data" : json.loads('{"type" : "blockly_edit_check", "edit" : "true"}')
                        }
                    )

                else:
                    
                    async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                        {
                            "type" : "unicast",
                            "sender_channel_name" : self.channel_name,
                            "data" : json.loads('{"type" : "blockly_edit_check", "edit" : "false"}')
                        }
                    )
     
            else:
    
                async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                    {
                        "type" : "broadcast",
                        "sender_channel_name" : self.channel_name,
                        "data" : text_data_json
                    }
                )


        # If the user isn't authenticated, returns JSON containing 'auth':'false' (Work Item 42)
        else: 

            async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
                {
                    "type" : "unicast",
                    "sender_channel_name" : self.channel_name,
                    "data" : json.loads('{"auth" : "false"}')
                }
            )

    def broadcast(self, event):
        if self.channel_name != event["sender_channel_name"]:
            self.send(text_data = json.dumps(event["data"]))

    def unicast(self, event):
        if self.channel_name == event["sender_channel_name"]: 
            print(json.dumps(event["data"]))
            self.send(text_data = json.dumps(event["data"]))