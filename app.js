(function(){
  "use strict";


  var Moosipurk = function(){

    // SINGLETON PATTERN (4 rida)
    if(Moosipurk.instance){
      return Moosipurk.instance;
    }
    Moosipurk.instance = this; // this viitab moosipurgile

    this.routes = Moosipurk.routes;

    console.log(this);
    //console.log('moosipurgi sees');

    // KĆ•IK MUUTUJAD, mis on Ć¼ldised ja muudetavad
    this.currentRoute = null; // hoian meeles mis lehel olen (home-view, ...)
    this.interval = null;



    //panen rakenduse tĆ¶Ć¶le
    this.init();
  };

  // kirjeldatud kĆµik lehed
  Moosipurk.routes = {
    "home-view": {
      render: function(){
        // kĆ¤ivitan siis kui jĆµuan lehele
        console.log('JS avalehel');

        // kui olemas, teen nulliks
        if(this.interval){ clearInterval(this.interval); }

        // kui jĆµuan avalehele siis kĆ¤ivitub timer, mis hakkab trĆ¼kkima kulunud sekundeid
        // divi sisse #counter
        // hakkab 0st
        var seconds = 0;
        this.interval = window.setInterval(function(){
          seconds++;
          document.querySelector('#counter').innerHTML = seconds;
        }, 1000); //iga 1000ms tagant kĆ¤ivitub

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

  //kĆµik moosipurgi funktsioonid tulevad siia sisse
  Moosipurk.prototype = {
    init: function(){
      console.log('rakendus kĆ¤ivitus');
      // Siia tuleb esialgne loogika

      window.addEventListener('hashchange', this.routeChange.bind(this));

      //vaatan mis lehel olen, kui ei ole hashi lisan avalehe
      console.log(window.location.hash);
      if(!window.location.hash){
        window.location.hash = "home-view";
      }else{
        //hash oli olemas, kĆ¤ivitan routeChange fn
        this.routeChange();

      }


      // hakka kuulama hiireklĆµpse
      this.bindMouseEvents();
    },
    bindMouseEvents: function(){
      document.querySelector('.add-new-jar').addEventListener('click', this.addNewClick.bind(this));
    },
    addNewClick: function(event){
      // lisa uus purk
      var title = document.querySelector('.title').value;
      var ingredients = document.querySelector('.ingredients').value;
      var color = document.querySelector('.color').value;
      console.log(title + ' ' + ingredients + ' ' + color);

      var new_jar = new Jar(title, ingredients, color);
      var li = new_jar.createHtmlElement();
      document.querySelector('.list-of-jars').appendChild(li);


    },
    routeChange: function(event){

      // slice vĆµtab vĆµtab # Ć¤ra #home-view >> home-view
      this.currentRoute = window.location.hash.slice(1);

      // kas leht on olemas
      if(this.routes[this.currentRoute]){
        //jah

        this.updateMenu();

        console.log('>>> ' + this.currentRoute);
        //kĆ¤ivitan selle lehe jaoks ettenĆ¤htud js
        this.routes[this.currentRoute].render();
      }else{
        // 404?
        console.log('404');
        window.location.hash = 'home-view';
      }

    },

    updateMenu: function(){

      //kui on mingil menĆ¼Ć¼l klass active-menu siis vĆµtame Ć¤ra
      document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace(' active-menu', '');

      //kĆ¤esolevale lehele lisan juurde
      document.querySelector('.' + this.currentRoute).className += ' active-menu';

    }

  };


  var Jar = function(new_title, new_ingredients, new_color){
    this.title = new_title;
    this.ingredients = new_ingredients;
    this.color = new_color;
  };

  Jar.prototype = {
    createHtmlElement: function(){
      // anda tagasi ilus html

      // li
      //   span.letter
      //     M
      //   span.content
      //     Maasikamoos | maasikas, Ćµun

      var li = document.createElement('li');

      var span = document.createElement('span');
      span.className = 'letter';

      var letter = document.createTextNode(this.title.charAt(0));
      span.appendChild(letter);

      li.appendChild(span);

      var content_span = document.createElement('span');
      content_span.className = 'content';

      var content = document.createTextNode(this.title + ' | ' + this.ingredients + ' | ' + this.color);
      content_span.appendChild(content);

      li.appendChild(content_span);

      console.log(li);

      return li;
    }
  };


  window.onload = function(){
    var app = new Moosipurk();
  };

})();
