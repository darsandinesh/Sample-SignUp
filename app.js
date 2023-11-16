const express = require('express')
const path = require('path')
const session = require('express-session')
const nocache = require('nocache')


const app = express()



app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(nocache())

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true
}))

function check(req, res, next) {
    if (req.session.isAuth){
        next()
    }
    else
        res.redirect('/')
}


const userinfo = { user: 'das', pass: '123' }

const product = [
    {
        title: " Poco X3",
        text: "19999",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0qA0UMWIUTpKJiegzpjxZJQl5wuZTha0bfw&usqp=CAU",
        goto: "https://www.flipkart.com/poco-x3-cobalt-blue-64-gb/p/itme71cba415d626?pid=MOBFVQJ5K89TYFXR&lid=LSTMOBFVQJ5K89TYFXR0TZFJC&marketplace=FLIPKART&q=poco+x3&store=tyy%2F4io&srno=s_1_1&otracker=search&otracker1=search&fm=organic&iid=45ab772f-88ae-4114-b29b-a157157e8f9b.MOBFVQJ5K89TYFXR.SEARCH&ppt=hp&ppn=homepage&ssid=h48mgzmxdc0000001698148378261&qH=5a2004e9a5a5938c"
    },
    {
        title: "Samsung",
        text: "33000",
        img: "https://images.samsung.com/is/image/samsung/p6pim/levant/2202/gallery/levant-galaxy-s22-ultra-s908-413037-sm-s908ezkgmea-530970280"
        , goto: "https://www.google.com/search?q=Samsung&tbm=isch&ved=2ahUKEwjJn6rK7ImCAxWN2jgGHZJYCLsQ2-cCegQIABAA&oq=Samsung&gs_lcp=CgNpbWcQAzIECCMQJzIHCAAQigUQQzIHCAAQigUQQzIHCAAQigUQQzIHCAAQigUQQzIHCAAQigUQQzIHCAAQigUQQzIHCAAQigUQQzIKCAAQigUQsQMQQzIHCAAQigUQQzoICAAQgAQQsQM6BQgAEIAEOgcIIxDqAhAnUOEGWMwJYNMMaAFwAHgAgAHRAYgB1wKSAQUwLjEuMZgBAKABAaoBC2d3cy13aXotaW1nsAEKwAEB&sclient=img&ei=US81ZYmzM4214-EPkrGh2As&bih=764&biw=1536"
    },
    {
        title: "Realme",
        text: "15000",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLpdLmq7U1xvP4x3CpMllQYP2FrXZoukfeZA&usqp=CAU",
        goto: "https://www.google.com/search?q=Realme&tbm=isch&ved=2ahUKEwjOu7_z7ImCAxXG7DgGHTzbCMEQ2-cCegQIABAA&oq=Realme&gs_lcp=CgNpbWcQAzIECCMQJzINCAAQigUQsQMQgwEQQzIKCAAQigUQsQMQQzINCAAQigUQsQMQgwEQQzIHCAAQigUQQzINCAAQigUQsQMQgwEQQzIHCAAQigUQQzIKCAAQigUQsQMQQzIHCAAQigUQQzIHCAAQigUQQ1CQCFiQCGCDCmgAcAB4AIABsQKIAbECkgEDMy0xmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=qC81Zc7HCsbZ4-EPvLajiAw&bih=764&biw=1536"
    },
    {
        title: "IPhone",
        text: "59000",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnHh-iPmbzxBW5AdvNljXfZAEbitPtgdQujA&usqp=CAU",
        goto: "https://www.google.com/search?q=IPhone&tbm=isch&ved=2ahUKEwiRzYyF7YmCAxXlm2MGHbe7AcgQ2-cCegQIABAA&oq=IPhone&gs_lcp=CgNpbWcQAzIECCMQJzINCAAQigUQsQMQgwEQQzINCAAQigUQsQMQgwEQQzIKCAAQigUQsQMQQzIKCAAQigUQsQMQQzIKCAAQigUQsQMQQzIHCAAQigUQQzIKCAAQigUQsQMQQzIKCAAQigUQsQMQQzIHCAAQigUQQzoFCAAQgAQ6CAgAEIAEELEDUPIHWPIHYM0KaABwAHgAgAHfAYgB-wKSAQUwLjEuMZgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=zS81ZdGyBeW3juMPt_eGwAw&bih=764&biw=1536"
    }
]

var datainfo


app.get('/', function (req, res) {
    if(req.session.isAuth){
        res. redirect('/home')
     }
     else{
         res.render('login')
     }
})

app.post('/login', function (req, res) {
    datainfo = req.body.username
    if (userinfo.user === req.body.username && userinfo.pass === req.body.password) {
        req.session.isAuth= true
        res.redirect('/home')
    }

    else {
        res.render('login', { notuser: true })
    }
})

app.get('/home',check, function (req, res) {
    res.render('home', { datainfo, value: true, product })
})

app.get('/logout', function (req, res) {
    req.session.isAuth = false
    req.session.destroy(()=>{
        res.render('login',{logging:true})
    })
})



app.listen(4000, function () {
    console.log("Server started")
})
