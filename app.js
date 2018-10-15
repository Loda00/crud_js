// const express = require('express');
// const port = process.env.PORT || 3030;
// const _ = require('lodash');

// var app = express();


// app.get('/',(req,res)=>{
//     res.write('Probando Lodash');
//     res.end();
// })  


// app.listen(port,()=>{
//     console.log('ok 200');
// })

var compiled = _.template ("hola: <%- name %>");

console.log(compiled({name:'moe'}))

var tpl = _.template("<h1>Some text: <%- foo %></h1>");
console.log(tpl({foo: "blahblah"}))

// var temp = _.template ("<b><%= valor%></b>");
// temp({valor: 'script'})

// console.log(temp())


// _.templateSettings = { 
//     interpolar: /\{\{(.+?)\}\}/g 
//     }; 

// var template = _.template ('<h1>Hello <%=names%>!</h1>'); 
  
// console.log(template({name: "Bigote"}))

// (function() {
  
//   // set up underscore template variable
//   _.templateSettings.variable = 'item'; // call this something meaningful as it will be used as the base for your template variables
  
//   // this is what hooks into the template in the HTML above
//   var template = _.template(
//     $('script.template').html()
//   );
//   // dummy data for this example, each object in the array is an indivdual tweet; sorry if the image links are broken!
//   var tweets = [
//     {id: 'wer2erg', userName: 'Rick Ashtley', userImg: 'https://success.salesforce.com/resource/1473465600000/sharedlayout/img/new-user-image-default.png', msg: 'never gonna give you up, never gonna let you down'},
//     {id: 'sefqwef', userName: 'Psy', userImg: 'https://success.salesforce.com/resource/1473465600000/sharedlayout/img/new-user-image-default.png', msg: 'opa gandam style'},
//     {id: '4f34f3f', userName: 'Robin', userImg: 'https://success.salesforce.com/resource/1473465600000/sharedlayout/img/new-user-image-default.png', msg: 'One More Thing!'},
//     {id: 'sdfvahg', userName: 'Connor', userImg: 'https://success.salesforce.com/resource/1473465600000/sharedlayout/img/new-user-image-default.png', msg: 'Slytherin 4LYFE'},
//     {id: '786785j', userName: 'Justine', userImg: 'https://success.salesforce.com/resource/1473465600000/sharedlayout/img/new-user-image-default.png', msg: 'it\'ll be fine...'},
//     {id: 'r6jgfhu', userName: 'Andrew', userImg: 'https://success.salesforce.com/resource/1473465600000/sharedlayout/img/new-user-image-default.png', msg: 'thanks for checking out this repo!'},
//     {id: 'dfgh5h5', userName: 'Natalie', userImg: 'https://success.salesforce.com/resource/1473465600000/sharedlayout/img/new-user-image-default.png', msg: 'New York, New York'},
//     {id: 'srft67s', userName: 'Johanna', userImg: 'https://success.salesforce.com/resource/1473465600000/sharedlayout/img/new-user-image-default.png', msg: 'At least you tried...'},
//     {id: 'rt54hgw', userName: 'Li-Ming', userImg: 'https://success.salesforce.com/resource/1473465600000/sharedlayout/img/new-user-image-default.png', msg: 'Should we even be here?!'},
//     {id: 'gh34434', userName: 'angry peon', userImg: 'https://success.salesforce.com/resource/1473465600000/sharedlayout/img/new-user-image-default.png', msg: 'zug zug'}
//   ];
//   // iterate over the collection and pass each item into the template rendering function
//   var renderTweets = function() {
//     _.each(_.shuffle(tweets), function(tweet) {
//       $('#feed').prepend(template(tweet));
//       $('div.post').fadeIn(800);
//     });
//   };
//   renderTweets();
//   // example AJAX request, will error in the console, insert options to get it working
//   $.ajax({
//     url: 'http://www.example.com/api-endpoint',
//     type: 'GET',
//     success: function(data) {
//       renderTweets(data);
//     },
//     error: function(err) {
//       console.error('something broke with the ajax request, you probably need to get it set up with real options');
//     }
//   });
//   // // // styling stuff, not functional components // // //
  
//   // render 10 more results
//   $('body').on('click', 'button#btn_add', function(e) {
//     e.preventDefault();
//     renderTweets();
//   });
//   // remove all results
//   $('body').on('click', 'button#btn_rmv', function(e) {
//     e.preventDefault();
//     $('#feed').html('');
//   }); 
// })();