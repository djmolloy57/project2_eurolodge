window.addEventListener("load", function(){

    var country_divs = document.getElementById('hol_display');
    var div_display_state = getComputedStyle(country_divs).display;

     document.getElementById("cust_name").innerHTML=localStorage.getItem("customername_value");
     document.getElementById("selected_lodging").innerHTML=localStorage.getItem("accomdation_value");
     document.getElementById("flyin_airline").innerHTML=localStorage.getItem("airline_value");
     document.getElementById("selected_date").innerHTML=localStorage.getItem("date_value");

     if (div_display_state === "flex"){
      country_divs.style.display = "none";
   }

  });
  
/* Function Triggered on Windows Resizing event */
function reportWindowSize(){
  // on resizing window if in mobile view and generated maps and change to non mobilr view it wont display mobile maps

  var query = window.matchMedia("(min-width: 601px)");
 
  if (query.matches){
        //if the page is wider than 600px

        var device_view_map = "map_desktop";

        var mobile_map_frame=[];
        var mobile_btn_frame=[];

        for(var i= 1; i < 6; i++){
           mobile_map_frame[i] = document.getElementById("map"+i);
           mobile_map_frame[i].style.display = "none";
           mobile_btn_frame[i] =  document.getElementById("button"+i);
           mobile_btn_frame[i].style.display = "none";
        }

   }
   else {
       //device_view_map = map_div;
      var desktop_map_frame =  document.getElementById("map_desktop"); //tested by generating map on desktop view and reducing it to mobile view the desktop map should dissappear
      desktop_map_frame.style.display = "none"; 

      var desktop_btn_frame =  document.getElementById("book_button");
      desktop_btn_frame.style.display = "none";
  }

  
}

window.onresize = reportWindowSize;

  
  
/*This is the only Choose holiday type Get info button event */
  const hol_btn = document.querySelector('#hol_btn');
  const hol_picked = document.querySelector('#hol_picked');

  hol_btn.onclick = (event) => {
        document.getElementById("hol_btn").disabled = true;
        event.preventDefault();        
      
        getholCountry(hol_picked.value);
  };

 

  function enablebutton(){
    document.getElementById("hol_btn").disabled = false;

    var map_div = document.getElementById("hol_display"); //above link worked fix the map div to be visible
    var displayState = getComputedStyle(map_div).display;
    

    var div_desktop_container = document.getElementById("desktop_container");
    var div_desktop_book_button = document.getElementById("book_button");
    var div_desktop_map =  document.getElementById("map_desktop");
    
    var country_num=[];
    var div_locpic_num=[];
    var div_locinfo_num=[];
    var div_radio_dot_num=[];
    var div_label_dot_num=[];
    var div_labelmap_num=[];
    var mobile_map_frame_num=[];

    var checked_div_locpic_num = "";
    var checked_div_locinfo_num = "";
    var checked_div_radio_dot_num ="";
    var checked_div_label_dot_num = "";
    var checked_div_labelmap_num = "";


    for(var i= 1; i < 6; i++){
       country_num[i] = document.getElementById("country"+i);

       div_locpic_num[i] = document.getElementById("loc_pic"+i);

       div_locinfo_num[i]= document.getElementById("loc_info"+i);

       div_radio_dot_num[i] = document.getElementById("radio_dot"+i);

       div_label_dot_num[i] = document.getElementById("label_dot"+i);

       div_labelmap_num[i] = document.getElementById("label_map"+i);

       if (typeof(div_locpic_num[i]) != 'undefined' && div_locpic_num[i] != null)
       {
          checked_div_locpic_num = div_locpic_num[i];
       }
       if (typeof( div_locinfo_num[i]) != 'undefined' &&  div_locinfo_num[i] != null)
       {
          checked_div_locinfo_num =  div_locinfo_num[i];
       }
       if (typeof(div_radio_dot_num[i]) != 'undefined' &&   div_radio_dot_num[i] != null)
       {
          checked_div_radio_dot_num = div_radio_dot_num[i];
       }
       if (typeof(div_label_dot_num[i]) != 'undefined' &&   div_label_dot_num[i] != null)
       {
          checked_div_label_dot_num = div_label_dot_num[i];
       }
       if (typeof(div_labelmap_num[i])!= 'undefined' &&  div_labelmap_num[i] != null)
       {
          checked_div_labelmap_num = div_labelmap_num[i];
       }
       remove_old_elements(country_num[i],checked_div_locpic_num,checked_div_locinfo_num,checked_div_radio_dot_num,checked_div_label_dot_num,checked_div_labelmap_num);
    }
    /*To determine if you are in desktop view or mobile view - desktop view on have to hide the desktop container
      else you are in mobile view and their may have been a number of map location that have been generated on last holiday choice and have to be removed!!
    */
 
    if (is_DesktopMap_Div()){
      
        var desktop_container_map =  document.getElementById("desktop_container");
        desktop_container_map.style.display = "none";
    }else{
        
        map_div.style.display = "none";
        var map_div_parent_node = document.getElementById('hol_display').children;
        if (map_div.children.length > 0){
          var map_children = map_div.children;

          for (var i = 0; i < map_children.length; i++) {

             if (map_children[i].style.display=='block') {

               var country_id = "country" + map_children[i].id.slice(-1);
               map_children[i].style.display = "none";
             }
          }

        }
    }

 }
     
  

  function remove_old_elements(country_num,div_locpic_num,div_locinfo_num,div_radio_dot_num,div_label_dot_num,div_labelmap_num){

    if(typeof(div_locpic_num) != 'string') //check data type 
    {

        country_num.removeChild(div_locpic_num);
        country_num.removeChild(div_locinfo_num);
        country_num.removeChild(div_radio_dot_num);
        country_num.removeChild(div_label_dot_num);
        country_num.removeChild(div_labelmap_num);
    }
    
    
  }
   
   var place_info = [];
   var btn=null;
   
   //Javascript object with all holiday parameters in key value pairs to be reference
   //by function display_country_info() to create dom elements to dispplay on the site page
   //like holiday images and co-ordinates latitute and longtitude to be passed into Google Maps/places api
   //to generate maps and place name markers.
   var data = {
    "country" : {
      "Andorra": [
          {
            "coords": { "lat": "42.506317","lng":"1.521835"},
            "content": "Andorra",
            "Hol_type": "ski",
            "info": "Andorra is a independent principality situated between France and Spain in the Pyrenees mountains known budget ski resorts and a tax-haven that offers duty-free shopping.",
            "airlines": ["Air France","Lufthansa","RyanAir"],
            "loc_radius" : "240000", //100miles
            "pic" : "assets/images/pexels-andorra-skiing.jpeg"
          }
       ],
        "Austria": [
         {
           "coords": { "lat": "47.5162","lng":"14.5501"},
           "content": "Austria",
           "Hol_type": "ski",
           "info": "Austria's ski resorts are full of charm mostly pretty villages with onion-domed churches and a long tradition of hospitality beautiful ski areas with tree lined slopes and best lift system.",
           "airlines": ["Lauda Air","Lufthansa","RyanAir"],
           "loc_radius" : "120000", //50miles
           "pic" : "assets/images/pexels-austria-skiing.jpeg"
         }
       ],
        "France": [
         {
            "coords": { "lat": "46.2276","lng":"2.2137"},
            "content": "France",
            "Hol_type": "ski",
            "info": "France is a firm favourite for ski holidays loved for its excellent food and easy to reach resorts from the traditional to purpose built best-known ski areas many at high altitude.",
            "airlines": ["Aer Lingus","Air France","RyanAir"],
            "loc_radius" : "120000", //50miles
            "pic" : "assets/images/pexels-france-skiing.jpeg"
        }
      ],
        "Italy": [
        
          {
            "coords": { "lat": "45.9336","lng":"7.6298"},
            "content": "Italy",
            "Hol_type": "ski", 
            "info": "Ski holidays in Italy are all about relaxed and easy-going Italian hospitality, delicious gourmet food and variety scenic skiing across the resorts.",
            "airlines": ["Aer Lingus","Air Italia","British Airways"],
            "loc_radius" : "120000", //50miles
            "pic" : "assets/images/pexels-italy-skiing.jpeg" 
          }
      ],
        "Switzerland": [
          {
            "coords": { "lat": "46.8182","lng":"8.2275"},
            "content": "Switzerland",
            "Hol_type": "ski", 
            "info": "Switzerlands home to some of Europe???s best ski resorts. They are full of character, surrounded by breathtaking scenery and famous mountains.",
            "airlines": ["Aer Lingus","British Airways","Swiss Air"], 
            "loc_radius" : "120000", //50miles
            "pic" : "assets/images/pexels-switzerland-skiing.jpeg"  
          }
      ],
 
      "Southern_Spain": [
        {
          "coords": { "lat": "36.7212","lng":"4.4217"},
          "content": "South Spain",
          "Hol_type": "beach", 
          "info": "Spain is well known for its sun, sea and sand along the Costa del Sol. With clear blue skies and sunshine practically all year round. You will find budget friendly accommodation. Find out why holidays in the south of Spain are as popular as ever.",
          "airlines": ["Aer Lingus","Iberia","RyanAir"],
          "loc_radius" : "120000", //50miles
          "pic" : "assets/images/pexels-spain_beach1.jpeg"  
        }

    ],
    
    "Portugal": [

        {
          "coords": { "lat": "37.1028","lng":"8.6730"},
          "content": "Portugal",
          "Hol_type": "beach", 
          "info": "Portugal Its location on the Atlantic Ocean has influenced many aspects of its culture: salt cod and grilled sardines are national dishes, the Algarve's beaches are a major destination. You will find great value from the many budget friendly accommodation.", //will need to be an array - Need different info each holiday type
          "airlines": ["Aer Lingus","Tap Air","British Airways"],
          "loc_radius" : "120000", //50miles
          "pic" : "assets/images/pexels-portugal-beach3-bestone.jpeg"  //will need to be an array
        }

    ],
    "Southern_France": [

        {
          "coords": { "lat": "43.2548","lng":"6.6379"},
          "content": "Southern France",
          "Hol_type": "beach", 
          "info": "Beaches in the south of France are a great choice for brilliant weather. The area is know for vibrant towns and great cuisine. South of France is more expensive than locations like Portugal and Spain, however its charm and stunning beaches makes it worth it.", //will need to be an array - Need different info each holiday type
          "airlines": ["Aer Lingus","Air France","British Airways"],
          "loc_radius" : "120000", //50miles
          "pic" : "assets/images/pexels-southern-france.jpeg"  //will need to be an array
        }

    ],
    //40.8518?? N, 14.2681
    "Southern_Italy": [

        {
          "coords": { "lat": "40.8518","lng":"14.2681"},
          "content": "Southern Italy",
          "Hol_type": "beach", 
          "info": "Southern Italy with its Mediterranean climate, the southern region is a popular destination for beach holidays in Italy even during the off-peak autumn months. Explorer the beautiful Amalfi Coastline with its beaches and the wonderful cuisine.", //will need to be an array - Need different info each holiday type
          "airlines": ["Aer Lingus","Air Italia","British Airways"],
          "loc_radius" : "120000", //50miles
          "pic" : "assets/images/pexels-southern-italy-beach2.jpeg"  
        }

    ],
  
    "Croatia": [

        {
          "coords": { "lat": "42.6507","lng":"18.0944"},
          "content": "Croata",
          "Hol_type": "beach", 
          "info": "Croatia nestled alongside the breathtaking azure waters of the Adriatic Sea, the country is incredibly diverse, with a number of gorgeous beaches and island retreats. You can find both luxury to budget-friendly accomodation and it has many vibrant towns.", //will need to be an array - Need different info each holiday type
          "airlines": ["Aer Lingus","RyanAir","British Airways"],
          "loc_radius" : "120000", //50miles
          "pic" : "assets/images/pexels-croatia-beach1.jpeg"  
        }

    ],

    "Greece": [

        {
          "coords": { "lat": "37.9838","lng":"23.7275"},
          "content": "Greece",
          "Hol_type": "beach",
          "info": "Greece has many beautiful Islands with beautiful beaches and coves", 
          "airlines": ["Aer Lingus","EasyJet","British Airways"],
          "loc_radius" : "240000", //100miles
          "pic" : "assets/images/greece.jpg" 
        }
    ],

    "Berlin": [
      {
        "coords": { "lat": "52.5200","lng":"13.4050"},
        "content": "Berlin",
        "Hol_type": "tour",
        "info": "Berlin is rich in history, has great food and has a notorious nightlife scene. Just a short flight from Dublin, the ever evolving art scene and central hub of attractions, museums make it the perfect city break destination.", //will need to be an array - Need different info each holiday type
        "airlines": ["Aer Lingus","Lufthansa","British Airways"],
        "loc_radius" : "12000", //5 miles remember to convert it to int when passing to google map api
        "pic" : "assets/images/pexels-berlin2.jpeg"  
      }
    ],

    "Barcelona": [
      {
        
      "coords": { "lat": "41.3874","lng":"2.1686"},
      "content": "Barcelona",
      "Hol_type": "tour",
      "info": "Barcelona is an exciting blend of ancient city walls, 20th century architectural marvels, beach bliss and city buzz. Visit charming local neighbourhoods and fascinating architecture like Gaud?????s iconic Sagrada Familia.", //will need to be an array - Need different info each holiday type
      "airlines": ["Aer Lingus","RyanAir","British Airways"],
      "loc_radius" : "12000", //5 miles remember to convert it to int when passing to google map api
      "pic" : "assets/images/pexels-barcalona1.jpeg"
      }
    ],



    "London": [
      {
        "coords": { "lat": "51.5074","lng":"0.1278"},
        "content": "London",
        "Hol_type": "tour", 
        "info": "One of the worlds most beloved cities. London is a place of grace and grandeur on the banks of the River Thames. From its world famous bridges to its majestic museums, discover an endless array of things to do.", //will need to be an array - Need different info each holiday type
        "airlines": ["Aer Lingus","RyanAir","British Airways, EasyJet"],
        "loc_radius" : "12000", //5 miles remember to convert it to int when passing to google map api
        "pic" : "assets/images/pexels-london1.jpeg"  
      }
    ],

    "Paris": [
      {
        "coords": { "lat": "48.8566","lng":"2.3522"},
        "content": "Paris",
        "Hol_type": "tour", 
        "info": "Paris is a dream destination that you have to see at least once. Romantic cobbled streets, beautiful boulevards, majestic monuments and some of the world???s most recognisable architectural icons. Wonderful Restaurants and Mueseums.", //will need to be an array - Need different info each holiday type
        "airlines": ["Aer Lingus","Air France","British Airways, EasyJet"],
        "loc_radius" : "12000", //5 miles remember to convert it to int when passing to google map api
        "pic" : "assets/images/pexels-paris4.jpeg"  
      }
    ],

    "Rome":  [
      {
        "coords": { "lat": "41.9028","lng":"12.4964"},
        "content": "Rome",
        "Hol_type": "tour", 
        "info": "Rome stepping into antiquity, modern life is lived among the remnants of peoples form ancient times who have left their mark on every cobblestone and corner of this incredible city. Enjoy wonderful atmosphere, Italian cuisine and lively nightlife.", //will need to be an array - Need different info each holiday type
        "airlines": ["Aer Lingus","Air Italia","British Airways, RyanAir"],
        "loc_radius" : "12000", //5 miles remember to convert it to int when passing to google map api
        "pic" : "assets/images/pexels-rome1.jpeg"  
      }
    ]



    }
  }; 
  
  /*
  This function gathers holiday type and its associated country - I have a feeling its not needed as we are just passing the it parameter
  hol_type to another function display_country_info
  */
  function getholCountry(hol_type){
    
    var infodiv = document.getElementById('site_info'); 
    var div_display_state = getComputedStyle(infodiv).display;

    if (div_display_state == "block") {
                infodiv.style.display = "none";
                
    }
    console.log("in function getholCountry passed in holiday type is: " + hol_type);
    var options = [];
    var select = document.getElementById("selectNumber");

    if(hol_type === 'Skiing'){
      options = ["Andorra", "Austria", "France", "Italy","Switzerland"];
      
      display_country_info(options);
    }
    if(hol_type === 'Beach'){
      options = ["Southern_Spain", "Portugal", "Southern_France", "Southern_Italy","Croatia" ,"Greece"];
     
      display_country_info(options); //ERROR! at getholCountry (holinfo_javascript_test.js:431)
      
    }
    if(hol_type === 'City'){
      options= ["Berlin","Barcelona","London","Paris","Rome"];
     
      display_country_info(options);
   }

  }  
 


  /*
  This function initialize() takes in params that will be used in the google map api and google places api
  */
  function initialize(holtype,loc_radius,lat,lng,device_map,button_div,airlines_arr) { 


    //ensure desktop map is displaying after it was previously set to display none by function enablebutton()
    var desktop_container_map =  document.getElementById("desktop_container");
    desktop_container_map.style.display = "block";
    desktop_container_map.style.paddingTop = "10px";
    desktop_container_map.style.MarginTop = "10px";




    console.log("INITIALIZE MAP WITH COORDS " + lat + " " + lng);
    var center = new google.maps.LatLng(lat,lng)
    
    // device_map (which maybe desktop ver or mobile ver)
    map = new google.maps.Map(document.getElementById(device_map), {
      center: center,
      types: ['lodging'],
      zoom: 9
    });
    var request = {
      location: center,
      radius: loc_radius,
      //keyword: holtype
    };

    //creates the google places api object by passing in the google map object
    var service = new google.maps.places.PlacesService(map);
    
    //then using the google places api object calls its nearbySearch method with params request key value pairs (hol_type, radius and plot from center)
    //also includes calling a callback function
    service.nearbySearch(request,callback);


    var mapdiv = document.getElementById(device_map); //above link worked fix the map div to be visible
    var display_state = getComputedStyle(mapdiv).display;


    //If div display is none and if its being viewed on a desktop then display it with height 500px and width 800px in center div id=map_desktop
    if (display_state == "none" && device_map == "map_desktop") {
                mapdiv.style.display = "block";
                mapdiv.style.height= "500px";
                mapdiv.style.width= "800px";
   
    }

    /*else If div display is none and its its being viewed on a mobile device then display it with height 300px and width 400px in
    div id=map1 or id=map2 etc - depending which country is clicked
    */
   else if (display_state == "none" && device_map != "map_desktop"){
                mapdiv.style.display = "block";
                mapdiv.style.height= "300px";
                mapdiv.style.width= "400px";
    }
    
   

    /* a condition to only create book button if it doesnt exist */ 
    if (btn === null){      
      btn = document.createElement("button");
      btn.innerHTML = "BOOK";
    }
    if (display_state == "none" && device_map == "map_desktop") {
        
      var container = document.getElementById("book_button");//this is the desktop button div

      //set display to block for book_button  display style so it can be caught by remove child to remove old instances
      container.style.display = "block";
      
      
      container.appendChild(btn);
      console.log("IN END OF MAP INITIALIZE function device_map is  " + device_map);
    }
    else if (display_state == "none" && device_map != "map_desktop"){

   
      var container_mobile =  document.getElementById(button_div); //since non desktop referencing mobile button div button1, button2 ... 
  
      //to make sure button generated in mobile view are in display 'block' this condition will be used to remove old buttons when another holiday type is selected in mobile view
      container_mobile.style.display = "block";

      container_mobile.appendChild(btn);
    }  


    btn.onclick = function () {
 
        /*add code below where book button info  is moved to booking forms dropdown */
        //This adds marker info on map - book button moves it to booking form resort dropdown
        var select = document.getElementById("resort");
        for(var i = 0; i < place_info.length; i++) {
          var opt = place_info[i].name;
          console.log("add place: " + opt);
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          select.appendChild(el);
        }

        //This adds airlines which selected country moves it to booking form airlines dropdown
        //using the airlines_arr array which was passed into this initialize function 
        var airlines= document.getElementById("airlines");
      
        removeOptions(airlines);        

        for(var i = 0; i < airlines_arr.length; i++) {
          var opts = airlines_arr.split(',')[i]; 
          console.log('An element of Airlines array taken from json data var: ' + opts);
          
          if(opts === undefined){
            continue;
          }
          var ele = document.createElement("option");
          ele.textContent = opts;
          ele.value = opts;
          airlines.appendChild(ele);
        }
      
        window.location.href='#booking_form';


    };

  }
 
  function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
      selectElement.remove(i);
    }
  }

 
  function callback(results,status){

    var sel = document.getElementById('resort');
    for (i = sel.length - 1; i >= 0; i--){
        sel.remove(i);
    }

    if (place_info.length > 0) {
      place_info = [];
    }



    if(status == google.maps.places.PlacesServiceStatus.OK){
      for (var i = 0; i < results.length; i++){
        createMarker(results[i]);
        place_info.push(results[i]);

      }
    }


  }

  function placedetailalert(markerplace)
  {
    return markerplace;
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
    if(place){
      var infoWindow = new google.maps.InfoWindow({
        content: 'Name: ' + place.name + '. Address: ' + place.vicinity + '. RATING: ' + place.rating + '. Business Status: ' + place.business_status

      });
    }

    marker.addListener('click', function(){
      infoWindow.open(map, marker);
  
      //alert('Clicking on marker!!');
     });

  }

  

  /*This function receives the holiday parameter passed for the Choose Holiday drop
    triggered by the Get Info button. It then uses a nested for loop to look through
    the Json object data for the Holiday type (hol_type - eg skiing, beach, City Tour)
    to assign to variables all countries that refer to this Hol_type, country info, country pic
    co-ordinates and assign to variables. In cases of country info new element p tags are created
    and for pic new element img tags are created and radio elements and its label are created an added
    to the DOM. To display on the site   
  */

  function display_country_info(hol_countries){

  

    //add new to ensure hol_display section is displayed
    var map_div = document.getElementById("hol_display");
    map_div.style.display = "flex";

    var country_num=0; //initialise variable used to be added as counter for country1,country2.. elements on site page for all views
    var map_num=0; //initialise variable used to be added as counter for map1, map2.. elements on the site page for mobile view 
    var attr_num=0;

    for (var loc in hol_countries) {
       country_num = country_num + 1;
       map_num = map_num + 1;
       
       
       attr_num= attr_num + 1;

       for (var i = 0; i < data.country[hol_countries[loc]].length; i++) {
           
           var loc_coords_lat =  data.country[hol_countries[loc]][i].coords.lat;
           var loc_coords_lng = data.country[hol_countries[loc]][i].coords.lng;
           var place = data.country[hol_countries[loc]][i].content;
           
           var type_hol = data.country[hol_countries[loc]][i].Hol_type;
           var type_info = data.country[hol_countries[loc]][i].info;
           var type_pic = data.country[hol_countries[loc]][i].pic;

           var airlines_arr =  data.country[hol_countries[loc]][i].airlines;
           var loc_radius = data.country[hol_countries[loc]][i].loc_radius;
                               
           var tag = document.createElement("p");
         
           var text = document.createTextNode("info: " + type_info);
           
           tag.setAttribute('id', 'loc_info' + attr_num);
               
           tag.appendChild(text);


           var radioYes = document.createElement("input");
           radioYes.setAttribute("type", "radio");
           radioYes.setAttribute("name", "mapselect");
           radioYes.setAttribute("value", place);
           radioYes.setAttribute('id', 'radio_dot' + attr_num);
                     
           var map_div = "map" + map_num; //variable to be used to reference the map divs for mobile view on site page to pass to country_map()

           var button_div = "button" + map_num; //variable record button number eg button1, button2... to pass to country_map()
              
           radioYes.setAttribute("onclick","country_map('"+type_hol+"','"+loc_radius+"','"+loc_coords_lat+"','"+loc_coords_lng+"','"+map_div +"','"+button_div +"','"+airlines_arr+"');");
           

           var sel_generateMap = document.createElement("label");
           var textgenerateMap = document.createTextNode("select to generate Map");

           sel_generateMap.setAttribute('id', 'label_dot' + attr_num);       

           sel_generateMap.appendChild(textgenerateMap);

           var lblgenerateMap = document.createElement("label");
           lblgenerateMap.setAttribute('id', 'label_map' + attr_num);
                                          
           
           var country_div = "country" + country_num;
           console.log("what country_div is generated " + country_div);
           
           var element = document.getElementById(country_div);
           var oImg = document.createElement("img");
           oImg.setAttribute('src', type_pic);

           oImg.setAttribute('alt', 'na');
           oImg.setAttribute('height', '150px');
           oImg.setAttribute('width', '150px');
           oImg.setAttribute('id', 'loc_pic' + attr_num);
           
           if (typeof(oImg) != 'undefined' && element != null)
           {
              element.appendChild(oImg);
           }
           if (typeof(tag) != 'undefined' && element != null)
           {
              element.appendChild(tag);
           }
           if (typeof(radioYes) != 'undefined' && element != null)
           {
              element.appendChild(radioYes);
           }
           if (typeof(sel_generateMap) != 'undefined' && element != null)
           {
              element.appendChild(sel_generateMap);
           }

           if (typeof(lblgenerateMap) != 'undefined' && element != null)
           {
              element.appendChild(lblgenerateMap);
           }

           
           

       }
    }
   
    
  }
  function alert_str(place){
    alert('hello from ' + place);
  }
  function country_coord(place,holtype){
    alert('hello from ' + place + ' enjoy your ' + holtype);
  }
  function country_coord2(place,holtype,lat,lng){
    alert('hello from ' + place + ' enjoy your ' + holtype + ' on the following latitude ' + lat + ' and longtitude ' + lng);
  }

  function checkRadioBtnSelected(hol_type){
    var getSelectedValue = document.querySelector( 'input[name="mapselect"]:checked');
     if(getSelectedValue != null) {
          alert("Selected radio button values is: " + getSelectedValue.value);
    }
 }

 function is_DesktopMap_Div(){
  //check the device views site is larger than mobile view
    var query = window.matchMedia("(min-width: 601px)");
    if (query.matches){
        return true;
    }else{
        return false;
    }
  }
 
 /*This function will be used to call a function to google map api */ 
  function country_map(type_hol,loc_radius ,selected_lat,selected_lng, map_div, button_div ,airlines_arr){
    var device_view_map = "";
    
    
    //check the device views site is larger than mobile view then map div will be using the div map_desktop at center of screen 
    var query = window.matchMedia("(min-width: 601px)");
    if (query.matches){
      //if the page is wider than 600px
      device_view_map = "map_desktop";
    }
    else {
      device_view_map = map_div; //then the map div will be for mobile view map1, map2 etc
    }
    console.log("device_view_map is: " + device_view_map);

    var int_loc_radius = parseInt(loc_radius);

  // this passes the info here to a function which prepares a call to function which will use google map api and google places api
  google.maps.event.addDomListener(window, "load", initialize(type_hol,int_loc_radius, selected_lat, selected_lng,device_view_map, button_div ,airlines_arr));

}
 /*The function is below it to write values in the Booking for to a seperate booking history page  */
 function passvalues()
 {
   var customer_name = document.getElementById("formName").value;
   var accomodation_name = document.getElementById("resort").value;
   var date_goin = document.getElementById("hol_date").value;

   var select = document.getElementById('airlines');
   var selected_airline = select.options[select.selectedIndex].value;

   localStorage.setItem("customername_value",customer_name);
   localStorage.setItem("accomdation_value",accomodation_name);
   localStorage.setItem("date_value", date_goin);
   localStorage.setItem("airline_value",selected_airline);
   
   document.getElementById("cust_name").innerHTML=localStorage.getItem("customername_value");
   document.getElementById("selected_lodging").innerHTML=localStorage.getItem("accomdation_value");
   document.getElementById("flyin_airline").innerHTML=localStorage.getItem("airline_value");
   document.getElementById("selected_date").innerHTML=localStorage.getItem("date_value");

   alert("Your details are booked!! Please see Booking History Menu");

   return true;



 }



   

   



  
