var self = require('sdk/self');

const { Cc, Ci, Cu } = require('chrome');

Cu.import("resource://gre/modules/Downloads.jsm");
Cu.import("resource://gre/modules/osfile.jsm")
Cu.import("resource://gre/modules/Task.jsm");
 
Task.spawn(function(){  
  
  let list = yield Downloads.getList(Downloads.ALL); 
  let view = {  
    onDownloadAdded: download => {
      console.log("Added"); 
      var fname = download.target.path;
      var url = download.source.url;
      console.log(fname);
      console.log(url);
      
      var regex = /(FALL|WIN|SUM){1}SEM[0-9]{4}-[0-9]{2}_CP[0-9]{4}.*_[A-Z]{2}[0-9]{2}_/;
      var label, d_path;
      if (regex.test(fname)){
        
        download.cancel(); 				 
        download.finalize(true); 		
        download.removePartialData(); 	 
        
        label = fname.split(regex.exec(fname)[0])[1];
        d_path = fname.split(regex.exec(fname)[0])[0];
        console.log(label);
        console.log(d_path);
        
        Task.spawn(function () {
          // Another Approach (cannot add file to download list)
		  		// yield Downloads.fetch(url, d_path + label);
          let new_download = yield Downloads.createDownload({
            source:url,
            target:d_path + label,
          });
          list.add(new_download);
          try {
            new_download.start();
          }finally{
            console.log("started new Download");
          }
          console.log(d_path+label);
        }).then(null, Cu.reportError);
        
      }
    },
    onDownloadChanged: download => console.log("Changed"), 
    onDownloadRemoved: download => console.log("Removed")
  }; 
  yield list.addView(view);  
});  

//sample download file - https://academics.vit.ac.in/faculty/Uploads/FALLSEM2015-16_CP0622_10-Jul-2015_RM01_UNIT-I.ppt


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-66597095-1', 'auto');
ga('send', 'pageview');


