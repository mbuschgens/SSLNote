var myApp = new Framework7({
    modalTitle: 'SSLNote remote',
    animateNavBackIcon: true,
});

// Expose Internal DOM library
var $$ = Framework7.$;

// Add main view
var mainView = myApp.addView('.view-main', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true
});
// Add another view, which is in right panel
var rightView = myApp.addView('.view-right', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true
});

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function () {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});

// Callbacks for specific pages when it initialized
/* ===== Modals Page events  ===== */
myApp.onPageInit('modals', function (page) {
    $$('.demo-alert').on('click', function () {
        myApp.alert('Hello!');
    });
    $$('.demo-confirm').on('click', function () {
        myApp.confirm('Are you feel good today?', function () {
            myApp.alert('Great!');
        });
    });
    $$('.demo-prompt').on('click', function () {
        myApp.prompt('What is your name?', function (data) {
            // @data contains input value
            myApp.confirm('Are you sure that your name is ' + data + '?', function () {
                myApp.alert('Ok, your name is ' + data + ' ;)');
            });
        });
    });
    $$('.demo-login').on('click', function () {
        myApp.modalLogin('Enter your username and password', function (username, password) {
            myApp.alert('Thank you! Username: ' + username + ', password: ' + password);
        });
    });
    $$('.demo-password').on('click', function () {
        myApp.modalPassword('Enter your password', function (password) {
            myApp.alert('Thank you! Password: ' + password);
        });
    });
});


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

/* ===== Swipe to delete events callback demo ===== */
myApp.onPageInit('swipe-delete', function (page) {
    $$('.demo-remove-callback').on('deleted', function () {
        myApp.alert('Thanks, item removed!');
    });
});

/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('swipe-delete modals media-lists', function (page) {
    $$('.demo-actions').on('click', function () {
        myApp.actions([
            // First buttons group
            [
                // Group Label
                {
                    text: 'Here comes some optional description or warning for actions below',
                    label: true
                },
                // First button
                {
                    text: 'Alert',
                    onClick: function () {
                        myApp.alert('He Hoou!');
                    }
                },
                // Another red button
                {
                    text: 'Nice Red Button ',
                    red: true,
                    onClick: function () {
                        myApp.alert('You have clicked red button!');
                    }
                },
            ],
            // Second group
            [
                {
                    text: 'Cancel',
                    bold: true
                }
            ]
        ]);
    });
});

/* ===== Messages Page ===== */
myApp.onPageInit('messages', function (page) {
    var conversationStarted = false;
    var answers = [
        'Yes!',
        'No',
        'Hm...',
        'I am not sure',
        'And what about you?',
        'May be ;)',
        'Lorem ipsum dolor sit amet, consectetur',
        'What?',
        'Are you sure?',
        'Of course',
        'Need to think about it',
        'Amazing!!!',
    ];
    var people = [
        {
            name: 'Kate Johnson',
            avatar: 'http://lorempixel.com/output/people-q-c-100-100-9.jpg'
        },
        {
            name: 'Blue Ninja',
            avatar: 'http://lorempixel.com/output/people-q-c-100-100-7.jpg'
        },
        
    ];
    var answerTimeout;
    $$('.messagebar a.link').on('click', function () {
        var textarea = $$('.messagebar textarea');
        var messageText = textarea.val();
        if (messageText.length === 0) return;
        // Empty textarea
        textarea.val('').trigger('change');
        // Add Message
        myApp.addMessage({
            text: messageText,
            type: 'sent',
            day: !conversationStarted ? 'Today' : false,
            time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
        });
        conversationStarted = true;
        // Add answer after timeout
        if (answerTimeout) clearTimeout(answerTimeout);
        answerTimeout = setTimeout(function () {
            var answerText = answers[Math.floor(Math.random() * answers.length)];
            var person = people[Math.floor(Math.random() * people.length)];
            myApp.addMessage({
                text: answers[Math.floor(Math.random() * answers.length)],
                type: 'received',
                name: person.name,
                avatar: person.avatar
            });
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

/* ===== Sortable page ===== */
myApp.onPageInit('sortable-list', function (page) {
    // Sortable toggler
    $$('.list-block.sortable').on('open', function () {
        $$('.toggle-sortable').text('Done');
    });
    $$('.list-block.sortable').on('close', function () {
        $$('.toggle-sortable').text('Edit');
    });
});

/* ===== Photo Browser Examples ===== */
// Create photoprobsers first:
var photoBrowserPhotos = [
	{
		url: 'img/beach.jpg',
		caption: 'Amazing beach in Goa, India'
	},
    'http://placekitten.com/1024/1024',
    'img/lock.jpg',
    {
        url: 'img/monkey.jpg',
        caption: 'I met this monkey in Chinese mountains'
    },
    {
        url: 'img/mountains.jpg',
        caption: 'Beautiful mountains in Zhangjiajie, China'
    }
    
];
var photoBrowserStandalone = myApp.photoBrowser({
    photos: photoBrowserPhotos
});
var photoBrowserPopup = myApp.photoBrowser({
    photos: photoBrowserPhotos,
    type: 'popup'
});
var photoBrowserPage = myApp.photoBrowser({
    photos: photoBrowserPhotos,
    type: 'page',
    backLinkText: 'Back'
});
var photoBrowserDark = myApp.photoBrowser({
    photos: photoBrowserPhotos,
    theme: 'dark'
});
var photoBrowserPopupDark = myApp.photoBrowser({
    photos: photoBrowserPhotos,
    theme: 'dark',
    type: 'popup'
});
myApp.onPageInit('photo-browser', function (page) {
    $$('.ks-pb-standalone').on('click', function () {
        photoBrowserStandalone.open();
    });
    $$('.ks-pb-popup').on('click', function () {
        photoBrowserPopup.open();
    });
    $$('.ks-pb-page').on('click', function () {
        photoBrowserPage.open();
    });
    $$('.ks-pb-popup-dark').on('click', function () {
        photoBrowserPopupDark.open();
    });
    $$('.ks-pb-standalone-dark').on('click', function () {
        photoBrowserDark.open();
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
        $$.get('infinite-scroll-load.php', {leftIndex: lastLoadedIndex + 1}, function (data) {
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


/* ===== Demo Popover ===== */
$$('.popover a').on('click', function () {
    myApp.closeModal('.popover');
});

/* ===== Change statusbar bg when panel opened/closed ===== */
$$('.panel-left').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-left');
});
$$('.panel-right').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-right');
});
$$('.panel-left, .panel-right').on('close', function () {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

/* ===== Generate Content Dynamically ===== */
var dynamicPageIndex = 0;
function createContentPage() {
    mainView.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link">Back</a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-content" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or generate <a href="#" class="ks-generate-page">one more page</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
    return;
}
$$(document).on('click', '.ks-generate-page', createContentPage);


//////////////////////////////////////////////////////////////////


////////////////////////// SSLNOTE Codes



if (sessionStorage.login) {
   //  sessionStorage.login = Number(sessionStorage.clickcount) ;
   mainView.loadPage("Smessages.html")
   
} else {
	mainView.loadPage("Slogin-screen-embedded.html")
	//myApp.openModal('.login-screen');
}

$$('form.ajax-submit').on('submitted', function (e) {
  var xhr = e.detail.xhr; // actual XHR object
 
  var data = e.detail.data; // Ajax repsonse from action file
  // do something with response data
  
  myApp.alert(e.detail.data +'data', e.detail.xhr +'xhr')

});


    $$('#login-form').on('submitted', function (e) {
		console.log(e.detail.data)
      var loginpid = $$('input[name=loginpid]').val();
      
    
	//mainView.loadPage("Smessages.html");
	
	//myApp.alert(e.detail.data, loginpid)
	myApp.alert(loginpid, +'hallo')
	//myApp.closeModal('.login-screen');
	
	mainView.loadPage("Smessages.html");
	});
	

  
 /* ===== Login screen page events ===== */
myApp.onPageInit('index', function (page) {

		//myApp.openModal('.login-screen')
		mainView.loadPage("Slogin-screen-embedded.html")
    });

	

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
    url: "Clogin-screen-embedded.php",
	crossDomain: true,
	data: {loginpid : loginpid},
			
    success: function (responseData, textStatus, jqXHR) {
      // console.log("Yay!!!");
	  // myApp.alert(responseData, textStatus, jqXHR + ' Succes');//     does nothing

//var_dump(json_decode(responseData, true));
	  
	//var data_array = responseData.split(',');
	
	var jsonObject = (new Function("return " + responseData))();
	  
	 // myApp.alert(jsonObject.id);//     does nothing
	  
	   if (jsonObject.login === '1') { 
	   
	  // set sessionStorage.login
	  sessionStorage.login = jsonObject.id;
	   
	  myApp.alert('SESSION id: ' + sessionStorage.login);			 
					 
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


/* ===== Scontatlist page events ===== */
myApp.onPageInit('list-view', function (page) {
	
	
$$('.Scontactlist').on('click', function () {
//myApp.alert('check script');
//mainView.loadPage("Scontactlist.html")
	
$$.ajax({
    type: 'POST',
    dataType: "jsonp",
    url: "Ccontactlist.php",
	crossDomain: true,
	data: {loginpid : sessionStorage.login},
			
    success: function (responseData, textStatus, jqXHR) {
	console.log("Yay!!!");
	

    mainView.loadContent(
        '<!-- Top Navbar-->' +
		'	<div class="navbar">' +
  		'		<div class="navbar-inner">' +
    	'			<div class="left sliding"><a href="index.html" class="back link"><i class="icon icon-back-blue"></i><span>Back</span></a></div>' +
    	'			<div class="center sliding">ScontactList.html</div>' +
    	'		</div>' +
		'	</div>' +


		'<div class="pages navbar-through">' +
 		' 	<div data-page="list-view" class="page">' +
  		'  		<div class="page-content">' +
   		'   	<div class="content-block">' +
		'  </div>' +
		' <div class="list-block">' +
      	'  <ul>' 
        
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
	 
	
//myApp.alert('check script');
mainView.loadPage("Smessages-send.html")

 var loginpid = $$(page.container).find('input[name="loginpid"]').val();
 
 
$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});

// Usage for URL: http://my.site.com/location?locationId=53cc272c0364aefcb78756cd&shared=false
var allVars = $.getUrlVars();
$$('#MyId').html(allVars);





 });
 
 
 
 });


/* ===== Logoff screen page events ===== */


	$$('.index').on('click', function () {
	//myApp.openModal('.login-screen')
	sessionStorage.clear();
	mainView.loadPage("Slogin-screen-embedded.html")

	
	});


