

chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
  
  var regex = /(FALL|WIN|SUM){1}SEM[0-9]{4}-[0-9]{2}_CP[0-9]{4}.*_[A-Z]{2}[0-9]{2}_/;
  var text = item.filename; 
  var label;
  
  if (regex.test(text)){
    label = text.split(regex.exec(text)[0])[1];
    suggest({filename:label, 
            conflict_action: 'overwrite',
            conflictAction: 'overwrite'});
  }
  
  suggest({filename:text, 
          conflict_action: 'overwrite',
          conflictAction: 'overwrite'});
    
});

//sample download file - https://academics.vit.ac.in/faculty/Uploads/FALLSEM2015-16_CP0622_10-Jul-2015_RM01_UNIT-I.ppt


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-66597095-1', 'auto');
ga('send', 'pageview');


