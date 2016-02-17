(function(){
  "use strict";


  var Moosipurk = function(){

    //SINGELTON PATTERN
    if(Moosipurk.instance){
      return Moosipurk.instance;
    }
    Moosipurk.instance = this; //this viitab moosipurgile

    this.routes = Moosipurk.routes;


    console.log(this);
    //console.log('moosipurgi sees');

    //KÕIK MUUTJUJAD, mis on üldised ja muudetavad
    this.currentRoute = null; //hoian meeles, mis lehel olen
    this.interval = null;

    this.click_count = 0;

    this.init();
  };

  //kirjeldatud kõik lehed
  Moosipurk.routes = {
    "home-view": {
      render: function(){
      //käivitan siis kui jõuan lehele
      console.log('JS avalehel');

      // kui olemas, teen nulliks
        if(this.interval){ clearInterval(this.interval); }

      var seconds = 0;
      //setInterval(fn, ms); function(){}
      this.interval = window.setInterval(function(){
        seconds++;
        document.querySelector('#counter').innerHTML = seconds;
      }, 1000); //iga 1000 ms tagant käivitub

      }
    },
    "list-view": {
      render: function(){
        console.log('JS loendi lehel');
      }
    },
    "manage-view": {
      render: function(){
        console.log('JS halduse lehel');
      }
    }

  };
  //kõik moosipurgifunktsioonid tulevad siia sisse
  Moosipurk.prototype = {
    init: function(){
      console.log('rakendus käivitus');
      //siia tuleb esialgne loogika



      window.addEventListener('hashchange', this.routeChange.bind(this));
      //vaatan, mis lehel olen, kui ei ole hashi lisan avalehe
      console.log(window.location.hash);
      if(!window.location.hash){
        window.location.hash = "home-view";
      }else{
        this.routeChange();
      }

      //hakka kuulama hiireklõpse
      this.bindMouseEvents();
    },
    bindMouseEvents: function(){
      document.querySelector('.add-new-jar').addEventListener('click',this.addNewClick.bind(this));
    },
    addNewClick: function(event){
      //console.log(event);
      this.click_count++;
      console.log(this.click_count);
    },
    routeChange: function(event){
      //console.log('>>>>>' + window.location.hash);

      this.currentRoute = window.location.hash.slice(1);

      //kas leht on olemas
      if(this.routes[this.currentRoute]){
        console.log('>>>>>' + this.currentRoute);
        //käivitan selle lehe jaoks ettenähtud js
        this.routes[this.currentRoute].render();
      }else{
        //404?
        console.log('404');
        window.location.hash = 'home-view';
      }
    }

  };

  window.onload = function(){
    var app = new Moosipurk();


  };



})();
