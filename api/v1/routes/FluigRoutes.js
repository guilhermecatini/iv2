let router      = require('./SecurityRoutes')(globalParams.protectRoutes);
let soapRequest = require('easy-soap-request');
let xml2js      = require('xml2js');

function callback(res, err, data) {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
}

router.get('/ECMColleagueService/getColleagues', (req, res) => {

	let url = 'https://fluig.iv2.com.br/webdesk/ECMColleagueService?wsdl';
	let username = 'guilherme.catini';
	let password = 'ggcr2305';
    let companyId = 'IV2';

	let headers = {
        "Content-Type": "text/xml;charset=UTF-8",
        "Transfer-Encoding": "chunked"
    };

	let xml = `
	<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.foundation.ecm.technology.totvs.com/">
		<soapenv:Header/>
		<soapenv:Body>
			<ws:getColleagues>
				<username>${username}</username>
				<password>${password}</password>
				<companyId>${companyId}</companyId>
			</ws:getColleagues>
		</soapenv:Body>
	</soapenv:Envelope> 
  `;
	
    let parser = new xml2js.Parser();
    
	(async () => {
		const { response } = await soapRequest(url, headers, xml);
        const { body, statusCode } = response;
		parser.parseString(body, (err, result) => {
			let users = result['soap:Envelope']['soap:Body'][0]['ns1:getColleaguesResponse'][0]['result'][0]['item'];
			
			for (let i = 0; i < users.length; i++) {
				for(let key in users[i]) {
                    users[i][key] = users[i][key][0].toString();
                }
                
			}

			res.json(users);
		})
    })();
    
});

module.exports = router;