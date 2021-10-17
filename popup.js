document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var f = d.createElement('form');
      f.action = 'http://gtmetrix.com/analyze.html?bm';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();

     

      var start = tab.url.indexOf("//");
      var split1 = tab.url.substring(start+2 );
      console.log(split1);
      var end =  split1.indexOf('/');
      console.log(end);
      var URL = split1.substring( 0,end );
      console.log(URL);   
      document.getElementById("url").innerHTML = URL  ;


      var request = new XMLHttpRequest()
      request.open('GET', 'https://urlscan.io/api/verdict/'+URL, true)
      request.onload = function () {
        
        var data = JSON.parse(this.response);
        console.log(data);
        // document.getElementById("p1").innerHTML = JSON.stringify(data.whois_json.domainName);
        //document.getElementById("p2").innerHTML = JSON.stringify(data.whois_json.updatedDate);
        
        document.getElementById("p6").innerHTML = JSON.stringify(data.asn.country);



        var currentyear = new Date().getFullYear();                             //current year
        var domaincreateDate = data.whois_json.creationDate.substring( 0,5 ); 
        var fromDate = parseInt(domaincreateDate);                              //created year

        var AGE = currentyear - fromDate; 
        document.getElementById("p4").innerHTML = AGE+' Years old website ' ;


        var currentmonth = new Date().getMonth() + 1;                               //current month
        var dcreateDate = data.whois_json.updatedDate.substring( 5,7 ); 
        var updateDate = parseInt(dcreateDate);                                 //updated month
               

        //getting updatedyear of the damain
        var domainupdateDate = data.whois_json.updatedDate.substring( 0,5 );     //updated year
        var frDate = parseInt(domainupdateDate); 
       //var upyear = currentyear - frDate                                        //diff btw years

      //var Aage = currentmonth - updateDate;                                  //diff btw months

      
     let year = currentyear - frDate ;
      let totalyears;
      if(year == 1)
      {
          totalyears = currentmonth + (12 - updateDate);
      }
      else if(year == 0)
      {
        
          totalyears = currentmonth - updateDate;
      }
      else{
          totalyears = ((year-1)*12)+currentmonth + (12 - updateDate);
      }
      
      
      let yeargap = Math.floor(totalyears/12);
      let monthgap = Math.floor(totalyears % 12);
      document.getElementById("p2").innerHTML = "Last update was "+ yeargap +" Years " + monthgap + " months ago " ;
        
     // document.getElementById("p2").innerHTML = "Last update was "+ upyear +" Years " + (Aage+1) + " months ago " ;




        if ( AGE > 10   ){

          document.getElementById("p3").innerHTML = "Genuine website ";
        }else {

          document.getElementById("p5").innerHTML = "Might be not genuine..!";

        }
        

        }
      // Send request
      request.send()
          });
        }, false);
     }, false);