 var http    =   require("http");
var url     =   require('url');
var qStrins =   require('querystring');
var router  =   require('routes')();
var view    =   require('swig');
var mysql   =   require('mysql');
var connection  =   mysql.createConnection({
    host : "localhost",
    port : 3306,
    database : "hitungin",
    user    : "root",
    password   : ""
});



router.addRoute('/',function (req,res) {
     connection.query("select * from bandung",function (err,rows,field) {
         if (err) throw err;

         var html = view.compileFile('./template/index.html')({
             title : "Harga Dari Bandung ke ?",
             data : rows
         });

         res.writeHead(200,{"Content-Type" : "text/html"});
         res.end(html);

     });


 });

 router.addRoute('/rute',function (req,res) {
     connection.query("select * from bandung",function (err,rows,field) {
         if (err) throw err;

         var html = view.compileFile('./template/rute.html')({
             title : "Harga Dari Bandung ke ?",
             data : rows
         });

         res.writeHead(200,{"Content-Type" : "text/html"});
         res.end(html);

     });


 });

 router.addRoute('/rute1',function (req,res) {
     connection.query("select * from jakarta",function (err,rows,field) {
         if (err) throw err;

         var html = view.compileFile('./template/rute1.html')({
             title : "Harga Dari Jakarta ke ?",
             data : rows
         });

         res.writeHead(200,{"Content-Type" : "text/html"});
         res.end(html);

     });


 });

router.addRoute('/insert',function (req,res) {

    /**/

    if (req.method.toUpperCase() == "POST"){
        var data_post = "";
        req.on('data',function (chuncks) {
            data_post += chuncks;
        });

        req.on('end',function () {
            data_post = qStrins.parse(data_post);
            connection.query("insert into bandung set ?",data_post,
                function (err,field) {
                if(err) throw err;

                res.writeHead(302,{"Location" : "/"});
                res.end();
            });
        });
    }else {
        var html = view.compileFile('./template/form.html')();
        res.writeHead(200,{"Content-Type" : "text/html"});
        res.end(html);
    }
});


 router.addRoute('/insert1',function (req,res) {

     /**/

     if (req.method.toUpperCase() == "POST"){
         var data_post = "";
         req.on('data',function (chuncks) {
             data_post += chuncks;
         });

         req.on('end',function () {
             data_post = qStrins.parse(data_post);
             connection.query("insert into bandung set ?",data_post,
                 function (err,field) {
                     if(err) throw err;

                     res.writeHead(302,{"Location" : "/"});
                     res.end();
                 });
         });
     }else {
         var html = view.compileFile('./template/form.html')();
         res.writeHead(200,{"Content-Type" : "text/html"});
         res.end(html);
     }
 });

router.addRoute('/update',function (req,res) {
    connection.query("update bandung set ? where ?",[
        { nama : "ayamkecap"},
        { no_induk : "14111023"}
    ],function (err,fields) {
        if (err) throw err;

        res.writeHead(200,{"Content-Type" : "text/plain"});
        res.end(fields.changedRows+" Rows Updated");
    });

});

router.addRoute('/delete',function (req,res) {
    connection.query("delete from bandung where ?",
        { no_induk : "14111024"},
        function (err,fields) {
            if (err) throw err;

            res.writeHead(200,{"Content-Type" : "text/plain"});
            res.end(fields.affectedRows+" Rows Deleted");
        }
    );

});

router.addRoute('/contact',function (req,res) {
    var html = view.compileFile('./template/contact.html')();
    res.writeHead(200,{"Content-Type": "text/html"});
    res.end(html);
});

http.createServer(function (req,res) {
    var path = url.parse(req.url).pathname;
    var match = router.match(path);
    if(match){
        match.fn(req,res);
    }else{
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("Page Not Found");
    }
}).listen(8888);

console.log("Server Is Running...");