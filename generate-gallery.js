const fs = require('fs');
const brands = ['audi', 'bmw', 'hyundai', 'jeep', 'kia', 'mg', 'suzuki'];
let html = '<html><body style="background:#333;color:white"><h1>Car Images</h1>';
for(const b of brands){
  html += '<h2>' + b + '</h2><div style="display:flex;flex-wrap:wrap;gap:10px">';
  const files = fs.readdirSync('public/images/cars/' + b).filter(f => f.endsWith('.jpg'));
  for(const f of files){
    html += '<div style="border:1px solid #777;padding:5px"><img src="/images/cars/' + b + '/' + f + '" style="width:200px;height:auto;display:block"><p>' + f + '</p></div>';
  }
  html += '</div>';
}
html += '</body></html>';
fs.writeFileSync('public/test-cars.html', html);
console.log('done');
