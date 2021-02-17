const express = require("express");
const request = require("request");
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
const rp = require('request-promise');
const $ = require('cheerio');
const translate = require('google-translate-free');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.json())
//team name
let team = "arsenal";
//Variable name for banner!
let host;
let data;
let guest;
let hostOdd;
let drawOdd;
let guestOdd;
let hostLogo;
let guestLogo;
let gameDate;
let players;
let players2;
let array = [];
let array2 = [];
let page = 1;
let enNameOne;
let enNameTwo;
let translates;
let arr = [];
let soccerTeam = "";
let change = "";
let post;
let num;
let gameId;
//Query
let query;
router.get("/", (req, res)=>{
    res.render("index");
})
router.get("/bahisal", (req, res)=>{
    res.render("bahisal");
})
router.get("/betkanyon", (req, res)=>{
    array.length = 0;
    array2.length = 0;
    // api for betkanyon simply to get the id's. 
    const betkanyonApi = "https://bonus-api.betkanyon100.com/SearchEvent.php?search="+team
    fetch(encodeURI(betkanyonApi))
    .then(res => res.json())
    .then(data =>{
        if(data.F == null){
            res.render("betkanyon", {data:"Search a Game"})
        }else{
            data = data.P
            res.render("betkanyon", {data, host, guest, hostOdd, drawOdd, guestOdd, hostLogo, guestLogo, gameDate, array, array2 })
            
        }    
    })
})



router.post("/bkrender", (req,res)=>{

console.log(req.body.name);
page = req.body.name

})


router.get("/bkrender2", (req,res)=>{
    
    res.json(array)
    

})

router.get("/bkrender" , (req,res)=>{
    
    res.render("bkrender" , {gameId,post,data ,host, guest, hostOdd, drawOdd, guestOdd, hostLogo, guestLogo, gameDate, array, array2 });
  
})

router.post("/betkanyon", (req, res)=>{
    
    

    if(req.body.gameName != ""){
        team = req.body.gameName;
    }
    console.log(req.body.gameName);
    res.redirect("/betkanyon")
})
//post for betkanyon for games
router.post("/postbk", (req, res)=>{
    if(req.body.bkdata != ""){
        const api = "https://bonus-api.betkanyon100.com/GetEvent.php?id="+req.body.bkdata;
        fetch(api)
        .then(res => res.json())
        .then(data =>{
            host = data[0].HT;
            guest = data[0].AT
            hostLogo = data[0].HSh;
            guestLogo =data[0].ASh;

            
            const dateInfo = data[0].D.slice(5,7) - 1
            if(data[0].D.slice(5,7) - 1 == -1) {
                dateInfo = data[0].D.slice(5,7) - 0
            }
            
            const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
            const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
           const timeUpdateGMT = data[0].D.slice(11, 16);
           const dNum = timeUpdateGMT.slice(0,2);
           const plusThree = Number(dNum) + 3
         
            gameDateInfo = data[0].D.slice(8,10) +" "+months[Number(dateInfo)] + " " +  plusThree + ':' +timeUpdateGMT.slice(3,5)
            
            gameDate = gameDateInfo;
            if(data[0].StakeTypes[0].N =='Maç Sonucu 1X2' ){
                hostOdd = data[0].StakeTypes[0].Stakes[0].F;
                drawOdd = data[0].StakeTypes[0].Stakes[1].F;
                guestOdd = data[0].StakeTypes[0].Stakes[2].F;
                gameId = data[0].Id
                
            }else{
                hostOdd = data[0].StakeTypes[1].Stakes[0].F;
                drawOdd = data[0].StakeTypes[1].Stakes[1].F;
                guestOdd = data[0].StakeTypes[1].Stakes[2].F;
                console.log(data[0].StakeTypes[1]);
                gameId = data[0].Id
            }
            res.redirect("/bkrender")
        })
    }
})

router.post("/query" , (req,res)=> {
    query = req.body.team;
    num = req.body.num;
    res.redirect("/bkrender")
})

router.get("/query" , (req,res)=> {
    array.length = 0;
    const url = `https://www.footyrenders.com/page/${num}/?s=${query}`;
    rp(encodeURI(url))
    .then(function(html){
      
      //success!
      console.log($('main > div > article > ul > li > div > a > img', html)[0].attribs['src'])

      for (let i = 0; i < 20; i++) {
        player = $('main > div > article > ul > li > div > a > img', html)[i].attribs['src'];
        array.push(player)
      }
      console.log(array);
      res.json(array)
    })
    .catch(function(err){
        res.json(array)
    });
    
})

//FOTTYRENDER TEST AREA
// router.get('/fottyrender', async (req, res) => {
//     if(host == "AC Milan"){
//         host = "milan";
//     }
//     if(host == "BorussiaDortmund"){
//         host = "dortmund";
//     }
//     const en = await translate(`${host}`, {to: 'en' })
//     .then(text =>{enNameOne = text.text})
    
    
//     players()
   
    
//    async function players() {
      
//     const url = `https://www.footyrenders.com/page/${page}/?s=${enNameOne}`;
//     rp(encodeURI(url))
//     .then(function(html){
      
//       //success!
//       console.log($('main > div > article > ul > li > div > a > img', html)[0].attribs['data-src'])

//       for (let i = 0; i < 20; i++) {
//         players = $('main > div > article > ul > li > div > a > img', html)[i].attribs['data-src'];
//         array.push(players)
//       }
//       console.log(array);
//       res.redirect("/fottyrender2")
//     })
   
//     .catch(function(err){
//         res.redirect("/fottyrender2")
//     });

    

//     }

   
// })
// router.post('/fottyname', (req, res)=>{
//     console.log(req.body.val);
//     soccerTeam = "";
//     page = 0;
//     array.length = 0;
//     res.redirect('/fottyrender');
// })
// router.post('/pagenumber', (req, res)=>{
//   console.log(req.body.val);
//   page = req.body.page;
//   res.redirect('/betkanyon');
// })



// //Request for second player!
// router.get('/fottyrender2', async (req, res) => {
    
//     if(guest == "BorussiaDortmund"){
//         guest = "dortmund";
//     }
//     if(guest == "AC Milan"){
//         guest = "milan";
//     }

//     const en = await translate(`${guest}`, {to: 'en' })
//     .then(text =>{enNameTwo = text.text})
    
//     players2(1)
//     players2(2)


//     async function players2(pages) {
//         const url = `https://www.footyrenders.com/page/${pages}/?s=${enNameTwo}`;
//     rp(encodeURI(url))
//     .then(function(html){

//       //success!
//       console.log($('main > div > article > ul > li > div > a > img', html)[0].attribs['data-src'])

//       for (let i = 0; i < 20; i++) {
//         players2 = $('main > div > article > ul > li > div > a > img', html)[i].attribs['data-src'];
//         array2.push(players2)
//       }
//       console.log(array2);
     
//       res.redirect("/bkrender")
//       res.redirect("/bkrender2")
//     })
   
//     .catch(function(err){
//         res.redirect("/bkrender")
//     });
//     }
    
    
// })
// router.post('/fottyname', (req, res)=>{
//     console.log(req.body.val);
//     soccerTeam = "";
//     page = 0;
//     res.redirect('/fottyrender2');
// })
// router.post('/pagenumber', (req, res)=>{
//   console.log(req.body.val);
//   page = req.body.page;
//   res.redirect('/fottyrender2');
// })


module.exports = router;