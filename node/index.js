const express = require("express");
const app = express();
const xlsx = require("node-xlsx");
app.use(express.static("public"));
var obj = xlsx.parse(__dirname + "\\..\\owid-covid-data_sint_beta.xlsx"); // parses a file
const foglio1 = obj.find(o => o.name == "Sheet1").data;
const nazioni = Array.from(new Set(foglio1.map(o => o[2]).filter(o => o != ""&&o!="location"))).filter(nazione=>nazione!=undefined);
const date = Array.from(new Set(foglio1.map(o => o[3]).filter(o => o != ""))).filter(data=>data!="date");
const casiTotali = {};
for (const nazione of nazioni) {
	if (casiTotali[nazione] == undefined) {
		casiTotali[nazione] = [];
	}
	for (const data of date) {
		let casi = foglio1.find(o => o[2] == nazione && o[3] == data);
		if (casi == undefined) casi = 0;
		else casi = casi[4];
		casiTotali[nazione].push({casi,data});
	}
}
app.listen(3000, () => console.log("Server partito"));
app.get("/dati",(req,res)=>{
	res.send(casiTotali);
})
console.log(casiTotali);