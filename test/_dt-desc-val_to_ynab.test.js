/* global describe, it */
const assert = require("assert");
const fs = require("fs");

const macroPath = "./macros/_dt-desc-val_to_ynab.js";
const macroCode = fs.readFileSync(macroPath, "utf8");
const macroFn = new Function("documentContent", macroCode);

describe("_dt-desc-val_to_ynab", function () {
  it("Convert example", function () {
    const example = `
Data	Estabelecimento	Valor
25/09/2023	EMPORIO VALLEJU	R$25,98
26/09/2023	CARDIN	R$24,20
26/09/2023	DELIRIO TROPICAL	R$71,20
26/09/2023	ECORODO BR 040 COMBUST	R$88,39
26/09/2023	NOVO ALEMAO LANCHONETE	R$30,25
28/09/2023	APPLE.COM/BILL	R$4,90
28/09/2023	MERCADOLIVRE*RFSOLUTION	R$554,90
`;
    const expected = `Date,Payee,Category,Memo,Outflow,Inflow
25/09/2023,Emporio valleju,,,,25.98
26/09/2023,Cardin,,,,24.20
26/09/2023,Delirio tropical,,,,71.20
26/09/2023,Ecorodo br 040 combust,,,,88.39
26/09/2023,Novo alemao lanchonete,,,,30.25
28/09/2023,Apple.com/bill,,,,4.90
28/09/2023,Mercadolivre*rfsolution,,,,554.90`;

    const converted = macroFn(example);

    assert.equal(expected, converted);
  });
});
