const http=require('http');
const fs=require('fs');
const path=require('path');
function requestListener(req,res){
    console.log(req.url);
if (req.url==='/' && req.method==='GET'){
    console.log('default');
    const fp=path.join(__dirname,'login.html');
    fs.readFile(fp,(err,data)=>{
        if (err){
            console.log('error');
            res.statusCode=404;
            return res.end();
        }
        else{
            res.setHeader('content-type','text/html');
            console.log(data);
            return res.end(data);
        }
    });
}
else if (req.url==='/logged' && req.method==='POST'){
    console.log('successfull Logged');  
    const fp1=path.join(__dirname,'profile.html');

    fs.readFile(fp1,(err,data)=>{
        if (err){
            console.log('error 2');
        }
        else{
            let bo=[];
        
            res.setHeader('content-type','text/html');
            req.on('data',(c)=>{
                const pairs=c.toString().split('&');
                pairs.forEach(e => {
                    bo.push(e.split('='));
                });
            });
            req.on('end',()=>{
                console.log(bo);
                data=data.toString();
                let result=data.replace('{{username}}',bo[0][1]);
                result=result.replace('{{hostelname}}',bo[10][1]);
                result=result.replace('{{rollno}}',bo[1][1]);
                result=result.replace('{{age}}',bo[2][1]);
                result=result.replace('{{gender}}',bo[3][1]);
                result=result.replace('{{dob}}',bo[4][1]);
                result=result.replace('{{pno}}',bo[5][1]);
                result=result.replace('{{address}}',decodeURIComponent(bo[7][1]).replace('+',' '));
                result=result.replace('{{email}}',decodeURIComponent(bo[6][1]));
                result=result.replace('{{pincode}}',bo[8][1]);
                result=result.replace('{{country}}',bo[9][1]);
                return res.end(result);
                
            });
            console.log('output 2');
            
        }

    });

}
}
const server=http.createServer(requestListener);
server.listen(3000);