// Initialize your app
var myApp = new Framework7({
    modalTitle: 'SSLNote',
    animateNavBackIcon: true,
	sortable: false,
	swipeout: false,
	modalPasswordPlaceholder: 'PiD',
	cache:false,
	pushState:true,
});

// Export selectors engine
var $$ = Framework7.$;

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function () {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});


// Als pageInit

$$(document).on('pageInit', function (e) {
  // Page Data contains all required information about loaded and initialized page 
 // console.log(e.detail.page); //5
 
//var myVar = setInterval(function(){myTimer()},30000);

//function myTimer() {
setTimeout(function(){
	
console.log('Timmer logout executed'); 

 if (sessionStorage.getItem("login")) {
	myApp.alert('You idle so you loged out.');
	sessionStorage.clear();
	
	mainView.loadPage("Slogin-screen-embedded.html")
 };

},(3*60) *1000);	
console.log('Timmer function loaded.'); 

//var t = 30000;
//setTimeout(function(){},t)
//console.log(t+ ' Logout timmer set'); 


//<button onclick="clearInterval(myVar)">Stop time</button>

//<button onclick = "setTimeout(function(){alert('Hello')},3000)">Try it</button>

//<button onclick="clearTimeout(myVar)">Try it</button>



var page = e.detail.page;

      var mid = page.query.mid;
	 var cgid = page.query.cgid;
	 var cpid = page.query.cpid;
	var cnick = page.query.cnick;
	
	console.log('check page :' + page); //5
	


	




	
if (cpid) {
	
	console.log('have page:' + page); //5
	
	sessionStorage.setItem("sendto", cgid +cpid);	
	
	sessionStorage.setItem(sessionStorage.getItem("sendto") +"mid", mid);
	sessionStorage.setItem(sessionStorage.getItem("sendto") +"cgid", cgid);
	sessionStorage.setItem(sessionStorage.getItem("sendto") +"cpid", cpid);
	sessionStorage.setItem(sessionStorage.getItem("sendto") +"cnick", cnick);

	
  console.log('mid :' +sessionStorage.getItem(sessionStorage.getItem("sendto")+"mid")); //5
	console.log('cgid :' +sessionStorage.getItem(sessionStorage.getItem("sendto")+"cgid")); //5
	console.log('cpid :' +sessionStorage.getItem(sessionStorage.getItem("sendto")+"cpid")); //5 
console.log('cnick :' +sessionStorage.getItem(sessionStorage.getItem("sendto")+"cnick")); //5 

	};
  //sessionStorage.setItem("url", page.url); 
 // console.log(sessionStorage.getItem("url")); //5
  

  
// update on all pages totall messages  

	 
  $$.ajax({
    type: 'POST',
    dataType: "jsonp",
    url: "https://sslnote.com/appie/Ctotalmessages.php",
	crossDomain: true,
	data: {loginpid : sessionStorage.getItem("login")},
			
    success: function (responseData, textStatus, jqXHR) {
	//console.log(responseData); 
  var listHTML = responseData ;
  $$(page.container).find('.totalmessages').append(listHTML);
  
 
	},
  });
  

// END update on all pages totall messages    
 


// update all pages user detail

$$(page.container).find('.yourinfo').append("<BR>YOUR PID : " +sessionStorage.getItem("pid"));




// end

if (page.name ==='Slogout') {
	
	console.log('Slogout page :'); //5
	
		sessionStorage.clear();

	mainView.loadPage("Slogin-screen-embedded.html");
	
};



if (page.name === 'Smessages-send') { 
    
	console.log('check page :' + page); //5
	
  //      var cgid = page.cgid;
	//	var cpid = page.cpid;
		//var cnick = page.cnick;
		
		console.log('check page :' + page); //5
        // Now we can generate some dummy list
       sessionStorage.setItem("sendto", cgid + cpid); 
	   
		var listHTML = "<BR>SEND MESSAGES TO :" +cgid +cpid + '(' + cnick +')' ;
		//var listHTML = '<ul>';
		//listHTML += '<li>' + cgid +cpid + cnick + '</li>';
       //listHTML += '</ul>';
        
		// And insert generated list to page content
$$(page.container).find('.messagessendto').append(listHTML);


	 // console.log(page.container); //5
 // console.log('query :' + page.query); //5
 

  console.log(sessionStorage.getItem("sendto")); //5
 console.log('cgid :' +cgid); //5
 console.log('cpid :' +cpid); //5
 console.log('cnick :' +cnick); //5
  console.log('url :' +page.url); //bar

 }
  

//  if (page.name === 'Smessages-read-load') { }
 
 
   if (page.name === 'Smessages-read') {
	   
	   $$(page.container).find('.messagessendto2').append(sessionStorage.getItem(sessionStorage.getItem("sendto") +"decryptmessage"));

$$(page.container).find('.messagessendto').append(sessionStorage.getItem(sessionStorage.getItem("sendto") +"messagessendto"));
   }
   
   
 //DECRYPT
   if (page.name === 'Smessages-read2') {
//$$('.Smessages-read-load').on('click', function () {
//myApp.onPageInit('Smessages-read-load', function (page) {
	//var page = r.detail.page;
	
	 var mid = page.query.mid;
	 var cgid = page.query.cgid;
	 var cpid = page.query.cpid;
	var cnick = page.query.cnick;
	
	if (mid) {
	
	sessionStorage.setItem("sendto", cgid +cpid);	
	
	sessionStorage.setItem(sessionStorage.getItem("sendto") +"mid", mid);
	sessionStorage.setItem(sessionStorage.getItem("sendto") +"cgid", cgid);
	sessionStorage.setItem(sessionStorage.getItem("sendto") +"cpid", cpid);
	sessionStorage.setItem(sessionStorage.getItem("sendto") +"cnick", cnick);

	
  console.log('mid :' +sessionStorage.getItem(sessionStorage.getItem("sendto")+"mid")); //5
	console.log('cgid :' +sessionStorage.getItem(sessionStorage.getItem("sendto")+"cgid")); //5
	console.log('cpid :' +sessionStorage.getItem(sessionStorage.getItem("sendto")+"cpid")); //5 
console.log('cnick :' +sessionStorage.getItem(sessionStorage.getItem("sendto")+"cnick")); //5 

	};
////////////////////////////////////////


if (sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey")) {
   //  sessionStorage.login = Number(sessionStorage.clickcount) ;
   // send data message and key session
   console.log('KEY SET ' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey")); //5
   
 // myApp.alert('KEY BESTAAT ' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey"));
   
//////////////////////////// send data to dbase
   
      myApp.hideIndicator();
 myApp.showPreloader('Recieving message');
 
console.log('collect data');	

$$.post('https://sslnote.com/appie/include/decrypt.php?mid='+	sessionStorage.getItem(sessionStorage.getItem("sendto") +"mid")
+'&key='+sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey"), function (decryptmessage) {
	

console.log(decryptmessage);	
	
	myApp.hidePreloader()
	console.log('hide preloader');	
	
	// end send data to dbse
	//  myApp.alert(decryptmessage);
		  console.log('store session message');	
 			sessionStorage.setItem(sessionStorage.getItem("sendto") +"decryptmessage", decryptmessage);
	  
	  // forwart on class $contactlist
	  
		//   mainView.loadPage("Smessages-read.html")
		   
});
   


   
} else {
	// key bestaat niet do POPUP ask key save session forward $messages-read.html

myApp.prompt('YOUR KEY', 'DEGRYPT MESSAGE', 
      function (value) {
       // action OK
	   console.log('YOUR KEY is "' + value + '". Ok button'); //5
	    //myApp.alert('YOUR KEY is "' + value + '". Ok button');
		sessionStorage.setItem(sessionStorage.getItem("sendto") +"encryptkey", value);
		
		// encrypt message and key
		
		console.log('KEY :"' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey") ); //5
	  
	//  myApp.alert('KEY:"' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey") );
		
//////////////////////////// send data to dbase
   
      myApp.hideIndicator();
 myApp.showPreloader('Recieving message');
 
console.log('collect data');	

$$.post('https://sslnote.com/appie/include/decrypt.php?mid='+	sessionStorage.getItem(sessionStorage.getItem("sendto")+"mid")
+'&key='+sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey"), function (decryptmessage) {
	

console.log(decryptmessage);	
	
	myApp.hidePreloader()
	console.log('hide preloader');	
	
	// end send data to dbse
	//  myApp.alert(decryptmessage);
		  console.log('store session message');	
 			sessionStorage.setItem(sessionStorage.getItem("sendto") +"decryptmessage", decryptmessage);
	  

	var messagessendto = "<BR>MESSAGE FROM :" +cgid +cpid + '(' + cnick +')' ;
	
	sessionStorage.setItem(sessionStorage.getItem("sendto") +"messagessendto", messagessendto);






	 // console.log(page.container); //5
 // console.log('query :' + page.query); //5
 

  console.log(sessionStorage.getItem("sendto")); //5
  
	
//	mainView.loadPage("Smessages-reading.html");	   
});

		
      						},
	  
      function (value) {
		   // action CANCEL
		   console.log('YOUR KEY is "' + value + '". Cancel button'); //5
        myApp.alert('SEND CANCELED');
      
	   // forwart on class $contactlist
	  
	  mainView.loadPage("Smessages.html")
	  						}
	  
    			); // end prompt
		



	  ///////////////////////////////////////////


   

} // end else
};

  
 if (page.name === 'about') {
        // We need to get count GET parameter from URL (about.html?count=10)
        var count = page.query.count;
        // Now we can generate some dummy list
        var listHTML = '<ul>';
        for (var i = 0; i < count; i++) {
            listHTML += '<li>' + i + '</li>';
        }
        listHTML += '</ul>';
        // And insert generated list to page content
        $$(page.container).find('.page-content').append(listHTML);
    }
	
	

// zoek alle messageslist
$$('.Smessagelist').on('click', function () {
//myApp.alert('check script');
//mainView.loadPage("Scontactlist.html")
	
$$.ajax({
    type: 'POST',
    dataType: "jsonp",
    url: "https://sslnote.com/appie/Cmessageslist.php",
	crossDomain: true,
	data: {loginpid : sessionStorage.getItem("login")},
			
    success: function (responseData, textStatus, jqXHR) {
	//console.log(responseData);
	


    mainView.loadContent(
        '<!-- Top Navbar-->' +
		'	<div class="navbar">' +
  		'		<div class="navbar-inner">' +
    	'			<div class="left sliding"><a href="index.html" class="back link"><i class="icon icon-back-blue"></i><span>Back</span></a></div>' +
    	'			<div class="center sliding">Smessagelistx.html</div>' +
    	'		</div>' +
		'	</div>' +


		'<div class="pages navbar-through">' +
 		' 	<div data-page="list-view" class="page">' +
  		'  	<!--	<div class="page-content">' +
   		'   	<div class="content-block">' +
		'  </div> -->' +
		' <div class="list-block">' +
		'<center><div class="yourinfo"></div></center>'+
      	'  <ul> ' 
        
 + responseData +
              

       ' 	</ul>' +
      	'</div>' +
      
    	'</div>' +
  		'</div>' +
		'</div>' 
           );

	//myApp.alert(responseData);	
	
	//mainView.loadPage("Scontactlist.html")
	   
   },
   error: function (responseData, textStatus, errorThrown) {
        console.log("something went wrong!! Error: "+textStatus);
		myApp.alert(responseData, textStatus, errorThrown + ' Error');//     does nothing
		
		mainView.loadPage("Smessages.html")
    				},
			});
 });
 
 
  

 // $messages-send
 
 $$('.Smessages-send').on('click', function () {
	 
console.log('click Smessages-send'); //5
   
//var page = e.detail.page;

   console.log(page); //5

	
	console.log(cgid); //5

mainView.loadPage("Smessages-send.html");

 });

// END $messages-send





//DECRYPT
$$('.Smessages-read-key').on('click', function () {
//myApp.alert('check script');
//mainView.loadPage("Scontactlist.html")

//collect url data
//var page = e.detail.page;

 
// check session key bestaat

if (sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey")) {
   //  sessionStorage.login = Number(sessionStorage.clickcount) ;
   // send data message and key session
   console.log('KEY SET ' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey")); //5
   
//  myApp.alert('KEY BESTAAT ' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey"));
   
//////////////////////////// send data to dbase
   
      myApp.hideIndicator();
 myApp.showPreloader('Recieving message');
 
console.log('collect data');	

$$.post('https://sslnote.com/appie/include/decrypt.php?mid='+	sessionStorage.getItem(sessionStorage.getItem("sendto")+"mid")
+'&key='+sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey"), function (decryptmessage) {
	

console.log(decryptmessage);	
	
	myApp.hidePreloader()
	console.log('hide preloader');	
	
	// end send data to dbse
	//  myApp.alert(decryptmessage);
		  console.log('store session message');	
 			sessionStorage.setItem(sessionStorage.getItem("sendto") +"decryptmessage", decryptmessage);
			
var messagessendto = "<BR>MESSAGE FROM :" +sessionStorage.getItem(sessionStorage.getItem("sendto") +"cgid") +sessionStorage.getItem(sessionStorage.getItem("sendto") +"cpid")+ '(' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"cnick"+")") ;
	
	sessionStorage.setItem(sessionStorage.getItem("sendto") +"messagessendto", messagessendto);
	  
	  // forwart on class $contactlist
		   mainView.loadPage("Smessages-read.html")
		   
});
   


   
} else {
	// key bestaat niet do POPUP ask key save session forward $messages-read.html

myApp.prompt('YOUR KEY', 'DEGRYPT MESSAGE', 
      function (value) {
       // action OK
	   console.log('YOUR KEY is "' + value + '". Ok button'); //5
	    //myApp.alert('YOUR KEY is "' + value + '". Ok button');
		sessionStorage.setItem(sessionStorage.getItem("sendto") +"encryptkey", value);
		
		// encrypt message and key
		
		console.log('KEY :"' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey") ); //5
	  
	//  myApp.alert('KEY:"' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey") );
		
//////////////////////////// send data to dbase
   
      myApp.hideIndicator();
 myApp.showPreloader('Recieving message');
 
console.log('collect data');	

$$.post('https://sslnote.com/appie/include/decrypt.php?mid='+	sessionStorage.getItem(sessionStorage.getItem("sendto")+"mid")
+'&key='+sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey"), function (decryptmessage) {
	

console.log(decryptmessage);	
	
	myApp.hidePreloader()
	console.log('hide preloader');	
	
	// end send data to dbse
	//  myApp.alert(decryptmessage);
	//	  console.log('store session message');	
 			sessionStorage.setItem(sessionStorage.getItem("sendto") +"decryptmessage", decryptmessage);
			
var messagessendto = "<BR>MESSAGE FROM :" +sessionStorage.getItem(sessionStorage.getItem("sendto") +"cgid") +sessionStorage.getItem(sessionStorage.getItem("sendto") +"cpid")+ '(' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"cnick"+")") ;
	
	sessionStorage.setItem(sessionStorage.getItem("sendto") +"messagessendto", messagessendto);
	  
	  // forwart on class $contactlist
		   mainView.loadPage("Smessages-read.html")
		   
});

		
      						},
	  
      function (value) {
		   // action CANCEL
		   console.log('YOUR KEY is "' + value + '". Cancel button'); //5
        myApp.alert('SEND CANCELED');
      
	   // forwart on class $contactlist
	  
	  mainView.loadPage("Smessages.html")
	  						}
	  
    			); // end prompt
		

} // end else


}); // end session



	
	
	})

// END Als pageInit

//////////////////////////////////////

/// Add main view
var mainView = myApp.addView('.view-main', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true
});
// Add another view, which is in right panel
var rightView = myApp.addView('.view-right', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true
});

// als sesion is gezet 

if (sessionStorage.getItem("login")) {
   //  sessionStorage.login = Number(sessionStorage.clickcount) ;
   mainView.loadPage("Smessages.html")
   
} else {
	mainView.loadPage("Slogin-screen-embedded.html")
	//myApp.openModal('.login-screen');
}

// END als sesion is gezet 

/* ===== Preloader Page events ===== */
myApp.onPageInit('preloader', function (page) {
    $$('.demo-indicator').on('click', function () {
        myApp.showIndicator();
        setTimeout(function () {
            myApp.hideIndicator();
        }, 2000);
    });
    $$('.demo-preloader').on('click', function () {
        myApp.showPreloader();
        setTimeout(function () {
            myApp.hidePreloader();
        }, 2000);
    });
    $$('.demo-preloader-custom').on('click', function () {
        myApp.showPreloader('My text...');
        setTimeout(function () {
            myApp.hidePreloader();
        }, 2000);
    });
});



/* ===== Pull To Refresh Demo ===== */
myApp.onPageInit('pull-to-refresh', function (page) {
    // Dummy Content
    var songs = ['Yellow Submarine', 'Don\'t Stop Me Now', 'Billie Jean', 'Californication'];
    var authors = ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'];
    // Pull to refresh content
    var ptrContent = $$(page.container).find('.pull-to-refresh-content');
    // Add 'refresh' listener on it
    ptrContent.on('refresh', function (e) {
        // Emulate 2s loading
        setTimeout(function () {
            var picURL = 'http://hhhhold.com/88/d/jpg?' + Math.round(Math.random() * 100);
            var song = songs[Math.floor(Math.random() * songs.length)];
            var author = authors[Math.floor(Math.random() * authors.length)];
            var linkHTML = '<li class="item-content">' +
                                '<div class="item-media"><img src="' + picURL + '" width="44"/></div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title-row">' +
                                        '<div class="item-title">' + song + '</div>' +
                                    '</div>' +
                                    '<div class="item-subtitle">' + author + '</div>' +
                                '</div>' +
                            '</li>';
            ptrContent.find('ul').prepend(linkHTML);
            // When loading done, we need to "close" it
            myApp.pullToRefreshDone();
        }, 2000);
    });
});



/* ===== Infinite Scroll Page ===== */
myApp.onPageInit('infinite-scroll', function (page) {
    // Loading trigger
    var loading = false;
    // Last loaded index, we need to pass it to script
    var lastLoadedIndex = $$('.infinite-scroll .list-block li').length;
    // Attach 'infinite' event handler
    $$('.infinite-scroll').on('infinite', function () {
        // Exit, if loading in progress
        if (loading) return;
        // Set loading trigger
        loading = true;
        // Request some file with data
        $$.get('https://sslnote.com/appie/infinite-scroll-load.php', {leftIndex: lastLoadedIndex + 1}, function (data) {
            loading = false;
            if (data === '') {
                // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                myApp.detachInfiniteScroll($$('.infinite-scroll'));
            }
            else {
                // Append loaded elements to list block
                $$('.infinite-scroll .list-block ul').append(data);
                // Update last loaded index
                lastLoadedIndex = $$('.infinite-scroll .list-block li').length;
            }
        });
    });
});

/* ===== Notifications Page ===== */
myApp.onPageInit('notifications', function (page) {
    $$('.ks-notification-simple').on('click', function () {
        myApp.addNotification({
            title: 'Framework7',
            message: 'This is a simple notification message with title and message'
        });
    });
    $$('.ks-notification-full').on('click', function () {
        myApp.addNotification({
            title: 'Framework7',
            subtitle: 'Notification subtitle',
            message: 'This is a simple notification message with custom icon and subtitle',
            media: '<i class="icon icon-f7"></i>'
        });
    });
    $$('.ks-notification-custom').on('click', function () {
        myApp.addNotification({
            title: 'My Awesome App',
            subtitle: 'New message from John Doe',
            message: 'Hello, how are you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut posuere erat. Pellentesque id elementum urna, a aliquam ante. Donec vitae volutpat orci. Aliquam sed molestie risus, quis tincidunt dui.',
            media: '<img width="44" height="44" style="border-radius:100%" src="http://lorempixel.com/output/people-q-c-100-100-9.jpg">'
        });
    });
    $$('.ks-notification-callback').on('click', function () {
        myApp.addNotification({
            title: 'My Awesome App',
            subtitle: 'New message from John Doe',
            message: 'Hello, how are you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut posuere erat. Pellentesque id elementum urna, a aliquam ante. Donec vitae volutpat orci. Aliquam sed molestie risus, quis tincidunt dui.',
            media: '<img width="44" height="44" style="border-radius:100%" src="http://lorempixel.com/output/people-q-c-100-100-9.jpg">',
            onClose: function () {
                myApp.alert('Notification closed');
            }
        });
    });
});

/* ===== Login screen page events ===== */

////////////////////////// SSLNOTE Codes

// alert form input TEMP

$$('form.ajax-submit').on('submitted', function (e) {
  var xhr = e.detail.xhr; // actual XHR object
 
  var data = e.detail.data; // Ajax repsonse from action file
  // do something with response data
  
  myApp.alert(e.detail.data +'data', e.detail.xhr +'xhr')

});

// END alert form input TEMP



/////////// login from
    $$('#login-form').on('submitted', function (e) {
		console.log(e.detail.data);
      var loginpid = $$('input[name=loginpid]').val();

	mainView.loadPage("Smessages.html");
	});
	
/////// end login from
  
  
  
  
  
  
// href index redirect to Slogin-screen-embedded.html
myApp.onPageInit('index', function (page) {

		//myApp.openModal('.login-screen')
		mainView.loadPage("Slogin-screen-embedded.html")
    });

// END href index redirect to Slogin-screen-embedded.html	






/* ===== Login screen page events ===== */
myApp.onPageInit('Slogin-screen-embedded', function (page) {
	
    $$(page.container).find('.list-button').on('click', function () {
      //  var username = $$(page.container).find('input[name="username"]').val();
        var loginpid = $$(page.container).find('input[name="loginpid"]').val();
      //  myApp.alert('Username: ' + username + ', password: ' + password, function () {
        //    mainView.goBack();
       // });

$$.ajax({
    type: 'POST',
    dataType: "jsonp",
    url: "https://sslnote.com/appie/Clogin-screen-embedded.php",
	crossDomain: true,
	data: {loginpid : loginpid},
			
    success: function (responseData, textStatus, jqXHR) {
      //console.log(responseData);
	  // myApp.alert(responseData, textStatus, jqXHR + ' Succes');//     does nothing

//var_dump(json_decode(responseData, true));
	  
	//var data_array = responseData.split(',');
	
	var jsonObject = (new Function("return " + responseData))();
	  
	 // myApp.alert(jsonObject.id);//     does nothing
	  
	   if (jsonObject.login === '1') { 
	   
	  // set sessionStorage.login
	  sessionStorage.setItem("login", jsonObject.id);
	  sessionStorage.setItem("pid", jsonObject.id);
	  //sessionStorage.login = jsonObject.id;
	   
	//  myApp.alert('SESSION Login: ' + sessionStorage.getItem("pid"));			 
					 
	  mainView.loadPage("Smessages.html") 
	  
	   } else {
		  
		  myApp.alert(jsonObject.msg);	
		  
		  mainView.loadPage("Slogin-screen-embedded.html") 
		  
	   };
	   
    },
    error: function (responseData, textStatus, errorThrown) {
        //console.log("something went wrong!! Error: "+textStatus);
		myApp.alert(responseData, textStatus, errorThrown + ' Error');//     does nothing
		
		mainView.loadPage("Slogin-screen-embedded.html")
    },
	
	
		});

	 
    });
	



});

// END  Login screen page events ===== */


///////////////////////////////////////////////////////////



// collect Smessages-send popup for KEY	
myApp.onPageInit('Smessages-send', function (page) {
	
	$$(document).on('ajaxStart', function () {
    myApp.hideIndicator();
});

$$(page.container).find('.list-button').on('click', function () {

var message = $$(page.container).find('textarea[name="message"]').val();

//console.log('MESS : ' +message); //5
sessionStorage.setItem(sessionStorage.getItem("sendto") +"message", message)	

//console.log('SESS : ' +sessionStorage.getItem(sessionStorage.getItem("sendto") +"message")); //5// if geen session var KEY cgip + cpid
	// popup for KEY

	//console.log('POPUP KEY'); //5
	//myApp.alert('ASK KEY');//
	
	//sessionStorage.message = message;
	// else Init Page


if (sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey")) {
   //  sessionStorage.login = Number(sessionStorage.clickcount) ;
   // send data message and key session
   console.log('KEY BESTAAT' ); //5
   
   console.log('KEY SET' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey")); //5
   
   
   
 // myApp.alert('KEY SET' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey")+" message send !");
   // forwart on class $contactlist
  
 myApp.showPreloader('Sending message...');
 
 // loginpid message message_old cgid cpid key

$$.post('https://sslnote.com/appie/include/encrypt.php?loginpid=' +sessionStorage.getItem("login")+'&sendto=' + sessionStorage.getItem("sendto") + '&key=' + sessionStorage.getItem(sessionStorage.getItem("sendto") + "encryptkey")  +'&message=' + sessionStorage.getItem(sessionStorage.getItem("sendto") + "message") + '&message_old=' + sessionStorage.getItem(sessionStorage.getItem("sendto") + "message_old"), function (encrypt) {
	

	
console.log(encrypt);	
	
	myApp.hidePreloader()
	console.log('hide preloader');	
	
	// end send data to dbse
	  myApp.alert(encrypt);
	  // forwart on class $contactlist
		mainView.loadPage("Smessages.html")
});
   
   
   
   
} // end session exist

else {
		
$$('.prompt-title-ok-cancel').on('click', function () {
    
	 console.log('KEY BESTAAT NIET' ); //5
	 
	myApp.prompt('YOUR KEY', 'ENCRYPT MESSAGE', 
      function (value) {
       // action OK
	   console.log('YOUR KEY is "' + value + '". Ok button'); //5
	    //myApp.alert('YOUR KEY is "' + value + '". Ok button');
		sessionStorage.setItem(sessionStorage.getItem("sendto") +"encryptkey", value);
		
		// encrypt message and key
		
		console.log('KEY:"' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey") + '". MESS:' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"message")); //5
	  
	//  myApp.alert('KEY:"' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"encryptkey") + '". MESS:' + sessionStorage.getItem(sessionStorage.getItem("sendto") +"message"));
		
	
		 myApp.showPreloader('Sending message...');
 
 // loginpid message message_old cgid cpid key

$$.post('https://sslnote.com/appie/include/encrypt.php?loginpid=' +sessionStorage.getItem("login")+'&sendto=' + sessionStorage.getItem("sendto") + '&key=' + sessionStorage.getItem(sessionStorage.getItem("sendto") + "encryptkey")  +'&message=' + sessionStorage.getItem(sessionStorage.getItem("sendto") + "message") + '&message_old=' + sessionStorage.getItem(sessionStorage.getItem("sendto") + "message_old"), function (encrypt) {
	
	
		//$$.post('include/encrypt.php?loginpid=9944&sendto=9988&key=1234&message=asdfghjkl', function (encrypt) {
	
console.log(encrypt);	
	
	myApp.hidePreloader()
	console.log('hide preloader');	
	
	// end send data to dbse
	  myApp.alert(encrypt);
	  // forwart on class $contactlist
		mainView.loadPage("Smessages.html")
});
		 
		
      						},
	  
      function (value) {
		   // action CANCEL
		   console.log('YOUR KEY is "' + value + '". Cancel button'); //5
        myApp.alert('SEND CANCELED');
      
	   // forwart on class $contactlist
	  
	  mainView.loadPage("Smessages.html")
	  						}
	  
    												);
	

}); // end .promt-title=ok-cancel     

}; // end else


}); // end page.container	


}); // end onPageInit

///////////////////////////////////////////////////////////




// collect contact list data via php	



/* ===== Logoff screen page events ===== */


	$$('.index').on('click', function () {
	//myApp.openModal('.login-screen')
	sessionStorage.clear();
	
	mainView.loadPage("Slogin-screen-embedded.html")

	
	});
	
// END ===== Logoff screen page events ===== */




// END collect contact list data via php	

myApp.onPageInit('Scontactlist-load', function (page) {
	
	if (sessionStorage.getItem("contactlist") == true ) {
		
		// skip collect data
		mainView.loadPage("Scontactlist.html");
	}
	else
	
	{
	// colect contactlist save in session
	
	console.log('start preloader');	
	myApp.showPreloader('Loading contacts');

$$.post('https://sslnote.com/appie/Ccontactlist.php?loginpid='+sessionStorage.getItem("login"), function (contactlist) {
	
console.log('make session contactlist',+contactlist);		
sessionStorage.setItem("contactlist",(contactlist));

 		console.log('hide preloader');	
	myApp.hidePreloader();	
	
	mainView.loadPage("Scontactlist.html")
 });		
	} // end else
 });		

myApp.onPageInit('Smessagelist-load', function (page) {
	
	// colect MESSAGESlist save in session
	console.log('start preloader');	
	myApp.showPreloader('Loading messages');
$$.post('https://sslnote.com/appie/Cmessageslist.php?loginpid='+sessionStorage.getItem("login"), function (messagelist) {
	
console.log('make session messageslist',+messagelist);		
sessionStorage.setItem("messagelist",(messagelist));
	
	console.log('hide preloader');	
	myApp.hidePreloader();	
	
	mainView.loadPage("Smessagelist.html")
 });		

});// END




myApp.onPageInit('Scontactlist', function (page) {

	console.log('insert session contactlist',+sessionStorage.getItem("contactlist"));

	$$(page.container).find('.contactlist').append(sessionStorage.getItem("contactlist"));
		

});

myApp.onPageInit('Smessagelist', function (page) {

	console.log('insert session messagelist',+sessionStorage.getItem("messagelist"));

	$$(page.container).find('.messagelist').append(sessionStorage.getItem("messagelist"));
		
});
