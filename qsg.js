const path = require('path');
const fs = require('fs');

module.exports = {
    generateData: function() {
        // Directory path
        const directoryPath = path.join(__dirname, 'assets/qsg');
    
        // Read files from directory
        var filenames = [];
        var files = fs.readdirSync(directoryPath, err => {
            if(err) throw err;
        });
        files.forEach(file => {
            filenames.push(file);
        });
    
        // Get data from json
        var data = fs.readFileSync('./assets/data2.json', err => {
            if(err) throw err;
        });
        var products = JSON.parse(data);
    
        // Process QSG ID in data
        products.forEach(product => {
            if(product.qsgid !== undefined) {
                var qsgid = product.qsgid;
                qsgid.forEach(id => {
                    var url = getUrl(id);
                    product.links.push(url);
                })
            }
        });
    
        // Get url to qsg file
        function getUrl(id) {
            var urlmatch;
            filenames.forEach(file => {
                if(file.startsWith(id)) {
                    // Found a match
                    urlmatch = `/assets/qsg/${file}`;
                }
            })
          
            return urlmatch;
            
        }
    
        // Write products with links to json file
        let qsgdata = JSON.stringify(products);
        fs.writeFileSync('./assets/qsg.json', qsgdata);
        console.log(qsgdata)
        return products;
        
    }
}
