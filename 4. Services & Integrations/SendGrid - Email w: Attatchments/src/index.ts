import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import * as fs from 'fs';

// npm install @sendgrid/mail
import * as sendGridMail from '@sendgrid/mail';
sendGridMail.setApiKey(
  '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'
);

const app = express();
app.use(cors({ origin: true }));
export const api = functions.https.onRequest(app);

app.post('/sendMail', async (request, response) => {
  const pathToAttachment = `${__dirname}/files/${request.body.file}`;
  const attachment = fs.readFileSync(pathToAttachment).toString('base64');
  const footer = fs
    .readFileSync(`${__dirname}/files/footer.png`)
    .toString('base64');
  const msg = {
    to: `${request.body.email}`, // Change to your recipient
    from: 'juan.perez@stambia.com', // Change to your verified sender
    subject: `${request.body.file.slice(0, -4)}`,
    text: `
    ${request.body.file.slice(10).slice(0, -4)}

    Que tal… Gracias por descargar el Documento solicitado aquí lo anexamos estoy seguro que le será gran utilidad.

    Stambia con su tecnología innovadora puede ser una alternativa inteligente frente a soluciones tradicionales!

    Adicional, pongo a tu disposición una presentación personalizada y demo con enfoque
    en la necesidad de negocio o tecnología que requiera para cubrir los retos locales y globales.

    Quedo al pendiente y espero puedas tener un espacio en tu agenda para pronto reunirnos...

    Cordialmente,`,
    html: `
    <strong>${request.body.file.slice(10).slice(0, -4)}</strong>
    <p>
    Que tal… Gracias por descargar el Documento solicitado aquí lo anexamos estoy seguro que le será gran utilidad.
    <br/>
    <br/>
    Stambia con su tecnología innovadora puede ser una alternativa inteligente frente a soluciones tradicionales!
    <br/>
    <br/>
    Adicional, pongo a tu disposición una presentación personalizada y demo con enfoque
    en la necesidad de negocio o tecnología que requiera para cubrir los retos locales y globales.
    <br/>
    <br/>
    Quedo al pendiente y espero puedas tener un espacio en tu agenda para pronto reunirnos...
    <br/>
    <br/>
    Cordialmente,
    <br/>
    </p>
    <img src="cid:logo" alt="image" />
    `,
    attachments: [
      {
        content: footer,
        filename: 'footer.png',
        type: 'image/png',
        content_id: 'logo',
        disposition: 'inline'
      },
      {
        content: attachment,
        filename: `${request.body.file}`,
        type: 'application/pdf',
        disposition: 'attachment'
      }
    ]
  };
  sendGridMail
    .send(msg)
    .then(() => response.json({ response: 'Email sent' }))
    .catch(err => response.json({ err }));
});
