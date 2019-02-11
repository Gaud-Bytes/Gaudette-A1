var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    //Part 1
    if(query['cmd'] == 'repeat')
    {
      
      console.log("Handling a request");
      console.log(query);
      
      for (var i = 0; i < query['word'].length; i++)
      {
          res.write("<pre>" + query['word'] + "</pre>")
      }
      res.end('');
      
    }
    else if(query['cmd'] == 'dotted')
    {
      
      console.log("Handling a request");
      console.log(query);
      
      var totalLen = 30;
      var currLen = (query['word1'].length + query['word2'].length);
      
      res.write('<pre>' + query['word1'])
      for(var i = 0; i < (totalLen - currLen); i++)
      {
        res.write('.');
      }
      
      res.end(query['word2'] + '</pre');
      
    }
    else if (query['cmd'] == 'stats')
    {
      console.log("Handling a request");
      console.log(query);
      var sum = 0;
      var max = query['grades'][0];
      var min = query['grades'][0];
      var avg = 0;
    
      for (var i in query['grades'])
      {
        sum = sum + parseInt(query['grades'][i]);
        
        if(query['grades'] > max)
        {
          max = query['grades'][i];
        }
        
        if(query['grades'] < min)
        {
          min = query['grades'][i];
        }

      }
      
      avg = sum / query['grades'].length;
      
      var size = query['grades'].length;
      
      res.write('<pre>AVG: '+ avg + ' MIN: ' + min + ' MAX: ' + max + '</pre>');
      res.end('');
    }
    else
    {
      console.log("CMD not found")
      res.end('');
    }

}