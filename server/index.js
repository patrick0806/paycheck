const express = require("express");
const execa = require("execa");
const fs = require("fs-extra");
const multer = require("multer");
const readXlsxFile = require("read-excel-file/node");
const { format, sub } = require("date-fns");
const { ptBR } = require("date-fns/locale");
const cors = require("cors");

const app = express();
const router = express.Router();
app.use(cors());
app.use(router);
app.listen(3005,()=>{console.log("Api Running in 3005 port")});

const sgMail = require("@sendgrid/mail");

const sendgridKrebsEngKey =
"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";
sgMail.setApiKey(sendgridKrebsEngKey);

const upload = multer({ dest: "/tmp/" });



const files = upload.fields([
  { name: "pdf", maxCount: 1 },
  { name: "excel", maxCount: 1 },
]);

async function cleanUpOldImages() {
  try {
    await execa("rm", [`/tmp/contra-cheque*.png`]);
  } catch (err) {}
}

router.post("/", files, async (req, res) => {

  try {
    const { pdf, excel } = req.files;
    console.log("recebi os arquivos");

    await cleanUpOldImages();

    await execa("convert", [pdf[0].path, `/tmp/contra-cheque.png`]);
    console.log(excel[0]);
    const rows = await readXlsxFile(excel[0].path, { sheet: 3 });// for dev tests comment {sheet:3}

    let lineNumber = 0;

    const mesPassado = sub(new Date(), { months: 1 });
    const nomeDoMes = format(mesPassado, "MMMM", { locale: ptBR });
    const ano = format(mesPassado, "yyyy");
    const dataLegivel = `${nomeDoMes} de ${ano}`;

    for (const row of rows) {
      console.log("gerando a página de contra checeque");
      lineNumber++;
      if (lineNumber === 1) {
        continue;
      }

      const nome = row[2];// for dev use number 1 how indicie 
      if (!nome || !nome.trim()) break;

      const email = row[3];//for dev use number 2 how indicie
      if (!email) continue;

      const pagina = lineNumber - 2;

      const file = await fs.readFile(`/tmp/contra-cheque-${pagina}.png`);
      const attachment = file.toString("base64");
      console.log(email);
      const msg = {
        from: "Gilberto Krebs <gilberto@krebseng.com.br>",
        to: email,
        subject: `Contra-cheque ${dataLegivel}`,
        html: `<p>Olá, ${nome}</p><p>Neste e-mail você encontra o seu contra-cheque referente a ${dataLegivel}.</p>`,
        attachments: [
          {
            content: attachment,
            filename: "contra-cheque.png",
            type: "image/png",
            disposition: "attachment",
          },
        ],
      };
      console.log("disparando o email");
      await sgMail.send(msg);
    }
    res.send({message:"Emails Enviados com sucesso"});
    console.log("Todos os emails foram enviados com sucesso");
  } catch (err) {
    console.error("-----------------------");
    console.error(err);
    console.error("-----------------------");
    res.send(err);
  }
});

module.exports = router;