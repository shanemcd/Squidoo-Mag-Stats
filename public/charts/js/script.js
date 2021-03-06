$(document).ready(function() {  
	
	//for Caching
	var $content = $('#content');
		
		
		/*----------------------------------------------------------------------*/
		/* datatable plugin
		/*----------------------------------------------------------------------*/
		
		$content.find("table.datatable").dataTable({
					"sPaginationType": "full_numbers"
		});
		
		/*----------------------------------------------------------------------*/
		/* Charts
		/*----------------------------------------------------------------------*/

		$content.find('table.chart').wl_Chart({
			onClick: function(value, legend, label, id){
				$.msg("value is "+value+" from "+legend+" at "+label+" ("+id+")",{header:'Custom Callback'});
			}
		});
		
		
		/*----------------------------------------------------------------------*/
		/* Tipsy Tooltip
		/*----------------------------------------------------------------------*/
		
		
		$content.find('input[title]').tipsy({
			gravity: function(){return ($(this).data('tooltip-gravity') || config.tooltip.gravity); },
			fade: config.tooltip.fade,
			opacity: config.tooltip.opacity,
			color: config.tooltip.color,
			offset: config.tooltip.offset
		});
		
		
		/*----------------------------------------------------------------------*/
		/* Accordions
		/*----------------------------------------------------------------------*/
		
		$content.find('div.accordion').accordion({
				collapsible:true,
				autoHeight:false
		});
		
		/*----------------------------------------------------------------------*/
		/* Navigation Stuff
		/*----------------------------------------------------------------------*/
		
		
		//Top Pageoptions
		$('#wl_config').click(function(){
			var $pageoptions = $('#pageoptions');
			if($pageoptions.height() < 200){
				$pageoptions.animate({'height':200});
				$(this).addClass('active');
			}else{
				$pageoptions.animate({'height':20});
				$(this).removeClass('active');
			}
			return false;
		});
		
		
		//Header navigation for smaller screens
		var $headernav = $('ul#headernav');
		
		$headernav.bind('click',function(){
			//if(window.innerWidth > 800) return false;
			var ul = $headernav.find('ul').eq(0);
			(ul.is(':hidden')) ? ul.addClass('shown') : ul.removeClass('shown');
		});
		
		$headernav.find('ul > li').bind('click',function(event){
			event.stopPropagation();
			var children = $(this).children('ul');
			
			if(children.length){
				(children.is(':hidden')) ? children.addClass('shown') : children.removeClass('shown');
				return false;
			}
		});
		
		//Search Field Stuff		
		var $searchform = $('#searchform'),
			$searchfield = $('#search'),
			livesearch = true;
		
		$searchfield
			.bind({
				'focus.wl': function(){
		   			$searchfield.select().parent().animate({width: '150px'},100);
				},
				'blur.wl': function(){
	   				$searchfield.parent().animate({width: '90px'},100);
					if(livesearch)$searchboxresult.fadeOut();
				}
		});
			
		//livesearch is active
		if(livesearch){
			
			$searchfield.attr('placeholder','Live Search');
			
			var $searchboxresult = $('#searchboxresult'),
				searchdelay = 800,  //delay of search in milliseconds (prevent flooding)
				searchminimum = 3, //minimum of letter when search should start
				searchtimeout, searchterm, resulttitle;
			
			//insert the container if missing
			if(!$searchboxresult.length) $searchboxresult = $('<div id="searchboxresult"></div>').insertAfter('#searchbox');
			
			//bind the key event
			$searchfield
				.bind({
					'keyup.wl': function(event){
						
						//do nothing if the term hasn't change
						if(searchterm == $searchfield.val()) return false;
						
						//the current search value
						searchterm = $searchfield.val();
						
						//clear the old timeout and start a new one
						clearTimeout(searchtimeout);
						
						//stop if term is too short
						if(searchterm.length < searchminimum){
							$searchboxresult.fadeOut();
							$searchfield.removeClass('load');
							return false;
						}
						
	
						searchtimeout = setTimeout(function(){
							$searchfield.addClass('load');
							
							//get results with ajax
							$.post("search.php", { term: searchterm },
							 function(data){
								$searchfield.removeClass('load');
								//search value don't has to be too short
								if(searchterm.length < searchminimum){
									$searchboxresult.fadeOut();
									return false;
								}
								
								var count = data.length, html = '';
								
								//we have results
								if(count){
									for(var i = 0; i< count; i++){
										resulttitle = '';
										if(data[i].text.length > 105){
											resulttitle = 'title="'+data[i].text+'"';
											data[i].text = $.trim(data[i].text.substr(0,100))+'&hellip;';
										}
										html += '<li><a href="'+data[i].href+'" '+resulttitle+'>';
										if(data[i].img) html += '<img src="'+data[i].img+'" width="50">';
										html += ''+data[i].text+'</a></li>';
									}	
								//no result to this search term
								}else{
									html += '<li><a class="noresult">Nothing found for<br>"'+searchterm+'"</a></li>';
								}
								
								//insert it and show
								$searchboxresult.html(html).fadeIn();
								
							}, "json");
	
						},searchdelay);
					}
				});
		}
			
		$searchform
			.bind('submit.wl',function(){
				//do something on submit				
				var query = $searchfield.val();
			});
			
		
			
		
		//Main Navigation		
		var $nav = $('#nav');
			
		$nav.delegate('li','click.wl', function(event){
			var _this = $(this),
				_parent = _this.parent(),
				a = _parent.find('a');
			_parent.find('ul').slideUp('fast');
			a.removeClass('active');
			_this.find('ul:hidden').slideDown('fast');
			_this.find('a').eq(0).addClass('active');
			event.stopPropagation();
		});
		
		/*----------------------------------------------------------------------*/
		/* Helpers
		/*----------------------------------------------------------------------*/
		
		//placholder in inputs is not implemented well in all browsers, so we need to trick this		
		$("[placeholder]").bind('focus.placeholder',function() {
			var el = $(this);
			if (el.val() == el.attr("placeholder") && !el.data('uservalue')) {
				el.val("");
				el.removeClass("placeholder");
			}
		}).bind('blur.placeholder',function() {
			var el = $(this);
			if (el.val() == "" || el.val() == el.attr("placeholder") && !el.data('uservalue')) {
				el.addClass("placeholder");
				el.val(el.attr("placeholder"));
				el.data("uservalue",false);
			}else{
			
			}
		}).bind('keyup.placeholder',function() {
			var el = $(this);
			if (el.val() == "") {
				el.data("uservalue",false);
			}else{
				el.data("uservalue",true);
			}
		}).trigger('blur.placeholder');

		
		
/*-----------------------------------------------------------------------------------------------------------------------------*/
/* 		Following code is for the Demonstration only!
/*		Get inspired and use it further or just remove it!
/*-----------------------------------------------------------------------------------------------------------------------------*/
		
		
		/*----------------------------------------------------------------------*/
		
		/*----------------------------------------------------------------------*/
		
		
		/*----------------------------------------------------------------------*/
		/* Button to clear localStorage
		/* http://revaxarts-themes.com/whitelabel/widgets.html
		/*----------------------------------------------------------------------*/
		
			$content.find('.clearLocalStorage').bind('click',function(){
				var wl_Store = new $.wl_Store();
				if(wl_Store.flush()){
					$.msg("LocalStorage as been cleared!");
				};
				return false;
			});
		
		/*----------------------------------------------------------------------*/
		
		/*----------------------------------------------------------------------*/
		/* needed for the Store Documentation
		/* http://revaxarts-themes.com/whitelabel/doc-store.html
		/*----------------------------------------------------------------------*/
			
			$content.find('#save_store').bind('click',function(){
				$.prompt('Storing some values?','This text is for the storage',function(value){
					var wl_Store = new $.wl_Store('doc-store');
					if(wl_Store.save('testvalue', value)){
						$.msg('Your data has been saved!. You can reload the page now!',{live:10000});
					}else{
						$.msg('Sorry, but a problem while storing your data occurs! Maybe your browser isn\'t supported!',{live:10000});
					}
				});
			});
			
			$content.find('#restore_store').bind('click',function(){
				var wl_Store = new $.wl_Store('doc-store');
				var value = wl_Store.get('testvalue');
				if(value){
					$.alert('your value is:\n'+value);
				}else{
					$.alert('No value is set!');
				}
			});
		
		/*----------------------------------------------------------------------*/
		
		/*----------------------------------------------------------------------*/
		/* Confirm Box for the Form Filler
		/* http://revaxarts-themes.com/whitelabel/form.html
		/*----------------------------------------------------------------------*/
		
			$('#formfiller').click(function(){
				var _this = this;
				$.confirm('To fill a form with your data you have to add a query string to the location.\nhttp://domain.tld/path?key=value&key2=value2',function(){
					window.location.href = _this.href;
				});
				return false;
			});
			
		/*----------------------------------------------------------------------*/
		/* Toggle to nativ/ajax submit
		/* http://revaxarts-themes.com/whitelabel/form.html
		/*----------------------------------------------------------------------*/
		
			$('#formsubmitswitcher').click(function(){
				var _this = $(this);
				if(_this.text() == 'send form natively'){
					$content.find('form').wl_Form('set','ajax',false);
					$.msg('The form will now use the browser native submit method');
					_this.text('send form with ajax');
				}else{
					$content.find('form').wl_Form('set','ajax',true);
					$.msg('The form will now be sent with an ajax request');
					_this.text('send form natively');
				}
				return false;
			});
					
		/*----------------------------------------------------------------------*/
		
		
		/*----------------------------------------------------------------------*/
		/* Message trigger buttons
		/* http://revaxarts-themes.com/whitelabel/dialogs_and_buttons.html
		/*----------------------------------------------------------------------*/
		
			$('#message').click(function(){
				$.msg("This is a simple Message");
			});
			$('#message_sticky').click(function(){
				$.msg("This Message will stay until you click the cross",{sticky:true});
			});
			$('#message_header').click(function(){
				$.msg("This is with a custom Header",{header:'Custom Header'});
			});
			$('#message_delay').click(function(){
				$.msg("This stays exactly 10 seconds",{live:10000});
			});
			$('#message_methods').click(function(){
				var m = $.msg("This message can be accessed via public methods",{sticky:true});
				
				//do some action with a delay
				setTimeout(function(){
					if(m)m.setHeader('Set a Header');				
				},3000);
				setTimeout(function(){
					if(m)m.setBody('Set a custom Body');				
				},5000);
				setTimeout(function(){
					if(m)m.setBody('..and close it with an optional callback function');				
				},8000);
				setTimeout(function(){
					if(m)m.close(function(){
						$.alert('This is the Callback function');				  
					});
				},12000);
			});
			

		/*----------------------------------------------------------------------*/
		
		
		/*----------------------------------------------------------------------*/
		/* Dialog trigger buttons
		/* http://revaxarts-themes.com/whitelabel/dialogs_and_buttons.html
		/*----------------------------------------------------------------------*/
		
			
			$('#dialog').click(function(){
				$.alert("This is a simple Message");
			});
			$('#dialog_confirm').click(function(){
				$.confirm("Do you really like to confirm this?",
				function(){
					$.msg("confirmed!");
				},
				function(){
					$.msg("You clicked cancel!");
				});
			});
			$('#dialog_prompt').click(function(){
				$.prompt("What do you really like?","Pizza",
				function(value){
					$.msg("So, you like '"+value+"'?");
				},
				function(){
					$.msg("You clicked cancel!");
				});
			});
			$('#dialog_switch').click(function(){
				if($.alert.defaults.nativ){
					$(this).text('switch to nativ dialogs');
				}else{
					$(this).text('switch to jQuery Dialogs');
				}
				$.alert.defaults.nativ = !$.alert.defaults.nativ;
			});
			$('#dialog_methods').click(function(){
				var a = $.alert("This message can be accessed via public methods");
				
				//do some action with a delay
				setTimeout(function(){
					if(a)a.setHeader('Set a Header');				
				},3000);
				setTimeout(function(){
					if(a)a.setBody('Set a custom Body');				
				},5000);
				setTimeout(function(){
					if(a)a.setBody('..and close it with an optional callback function');				
				},8000);
				setTimeout(function(){
					if(a)a.close(function(){
						$.msg('This is the Callback function');				  
					});
				},12000);
			});
			
		/*----------------------------------------------------------------------*/
	
		/*----------------------------------------------------------------------*/
		/* Helps to make current section active in the Mainbar
		/*----------------------------------------------------------------------*/
			
			var loc = location.pathname.replace(/\/([^.]+)\//g,'');
			var current = $nav.find('a[href="'+loc+'"]');
			
			if(current.parent().parent().is('#nav')){
				current.addClass('active');
			}else{
				current.parent().parent().parent().find('a').eq(0).addClass('active').next().show();
				current.addClass('active');
	
			}


		
		/*----------------------------------------------------------------------*/

});


/*----------------------------------------------------------------------*/
/* Autocomplete Function must be available befor wl_Autocomplete is called
/*----------------------------------------------------------------------*/

window.myAutocompleteFunction = function(){
	return ['Lorem ipsum dolor','sit amet consectetur adipiscing','elit Nulla et justo','est Vestibulum libero','enim adipiscing in','porta mollis sem','Duis lacinia','velit et est rhoncus','mattis Aliquam at','diam eu ipsum','rutrum tincidunt Etiam','nec porta erat Pellentesque','et elit sed sem','bibendum posuere Curabitur id','purus erat vel pretium','erat Ut ultricies semper','quam eu dignissim Cras sed','sapien arcu Phasellus sit amet','venenatis sapien Nulla facilisi','Curabitur ut','bibendum odio Fusce','vitae velit hendrerit','dui convallis tristique','eget nec leo','Vestibulum fermentum leo','ac rutrum interdum mauris','felis sodales arcu','non vehicula odio magna sed','tortor Etiam enim leo','interdum vitae elementum id','laoreet at massa Curabitur nisi dui','lobortis ut rutrum','quis gravida ut velit','Phasellus augue quam gravida non','vulputate vel tempus sit amet','nunc Proin convallis tristique purus'];
};

