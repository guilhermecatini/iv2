let express = require('express');
let router = express.Router();
let fs = require('fs');

router.get('/gerador-assinatura', (req, res) => {
  res.render('frm-gerador-assinatura', { data: {} });
});

router.post('/gerador-assinatura/getHtml', (req, res) => {
  let customHtml = fs.readFileSync('utilities/templates/template-assinatura.html', 'utf8');
  customHtml = customHtml.split('{{{nome_completo}}}').join(req.body.nome_completo);
  customHtml = customHtml.split('{{{cargo}}}').join(req.body.cargo);
  customHtml = customHtml.split('{{{email}}}').join(req.body.email);
  customHtml = customHtml.split('{{{celular}}}').join(req.body.celular);
  customHtml = customHtml.split('{{{celular_formatado}}}').join(req.body.celular.replace(/[^0-9]/ig, ''));
  res.json({ error: false, html: customHtml });
});

router.post('/gerador-assinatura/gerar-assinatura', (req, res) => {
  let data = req.body;
  data.celular = data.celular.replace(/[^0-9]/ig, '');
  res.render('gerador-assinatura', { data: data });
});

module.exports = router;
