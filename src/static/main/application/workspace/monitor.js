var bucketUploads = {
    "10.10.10 10.10.10" : [
        {
            "rows" : [
                {
                    "timestamp" : "00.00.00 00.00.00",
                    "value" : 10
                },
                {
                    "timestamp" : "00.00.00 00.00.00",
                    "value" : 20 
                },
    
            ]
        },
    ]
    }
    
    
var uploadResultsButton = document.getElementById("upload-results")
document.getElementById("upload-results").addEventListener("click",function(e){
   
    console.log("hello")
})
document.getElementById("monitor-container")
document.getElementsByClassName("bucket-select")
var uploadResultsArea = document.getElementById("upload-results-area")
var resultsDropdown = document.getElementById("results-dropdown")
document.getElementById("done-uploading").addEventListener("click",function(a){
    let tempOption = document.createElement("option")
    
    var currentDate = new Date();
    var currentSeconds = currentDate.getSeconds();
    var currentMinute = currentDate.getMinutes();
    var currentHour = currentDate.getHours();
    var currentMonth =currentDate.getMonth();
    var currentDayofMonth = currentDate.getDate();
    var currentYear = currentDate.getFullYear();
    var currentTimestamp = tempOption.textContent = currentDayofMonth + "-" + (currentMonth + 1) + "-" + currentYear + "-" + currentHour + "-" + currentMinute + "-" + currentSeconds;
    resultsDropdown.appendChild(tempOption)
    var uploadJSON = JSON.parse(uploadResultsArea.value)
    bucketUploads[currentTimestamp] = {}
    for (var key in uploadJSON) {
        bucketUploads[currentTimestamp][key] = []
        for(var i = 0; i<uploadJSON[key].length;i++){
            bucketUploads[currentTimestamp][key].push(uploadJSON[key][i])

        }      
            
        
    }
    console.log(bucketUploads)
    

})
