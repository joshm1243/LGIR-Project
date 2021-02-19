import sys #Allows parameters to be provided
import os #Allows the specrunner.html file to be specified

#Specifying the specrunner file
jasmineFile = "test_services/specrunner.html"

#Returns a list showing the available parameters
def IncorrectParameter():
    return """Avaiable parameters are:
+-----------------+-----------------------------------+
|ts.py runserver  | Starts the test server            |
|ts.py help       | Gets help using the test server   |
+-----------------+-----------------------------------+
"""

#Checking that there is at least one additional parameter
if len(sys.argv) > 1:
    
    #If the parameter is the runserver command
    if sys.argv[1] == "runserver":
        print("Attempting to start the TestServices server")

        #Checking if the Jasmine SpecRunner.html file exists
        if (os.path.isfile(jasmineFile)):
            os.system("start " + jasmineFile)
            print("\nTestServices was started successfully.")
            print("Feel free to close the Jasmine browser tab after testing.\n")

        #The SpecRunner.html file does not exist
        else:
            print("ERROR: The 'specrunner.html' Jasmine file could not be found.")
            print("Put a message in the LGIR teams project with this error.")

    #Checking if the user wishes to see the help files
    elif sys.argv[1] == "help":
        print("LGIR Test Server Help")
        print("\nCurrently, the help feature has not been implemented.")
        print("It will be added before the end of the next sprint.\n")
    
    #The command specified was invalid
    else:
        print("\nERROR: That was not a valid command.")
        print(IncorrectParameter())

#There were no commands specified
else:
    print("\nERROR: You must specify at least one parameter")
    print(IncorrectParameter())