const htmlRecuperacion = (username, token, url) => {
  const htmlRetrun = `<table width="100%" cellspacing="0" cellpadding="0" bgcolor="#0b0b0e">
  <tr>
    <td align="center" valign="top">
      <table
        width="600"
        cellspacing="0"
        cellpadding="0"
        bgcolor="#0b0b0e"
        style="
          border: 1px solid #aaa;
          border-radius: 10px;
          margin: 10px;
          padding: 20px 0;
        "
      >
        <tr>
          <td align="center" valign="top" style="padding: 0 20px; height: 113px;">
            <img
              src="https://genarogg.github.io/email-html/vr/media/vr-logotipo.png"
              alt="Logo VueltaRapida"
              style="width: 100%; max-width: 380px"
            />
          </td>
        </tr>
        <tr>
          <td align="center" valign="top" style="padding: 0 20px">
            <h1 style="color: #ccc">Recuperación de Contraseña</h1>
            <p style="color: #ccc">
              Hola ${username}, Has solicitado restablecer tu contraseña.
            </p>
            <p style="color: #ccc">
              Haz clic en el siguiente botón para continuar:
            </p>
            <a
              href="${url + token}"
              style="
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 4px;
              "
              >Restablecer Contraseña</a
            >
            <p style="color: #ccc">
              Si no has solicitado esto, puedes ignorar este mensaje.
            </p>
            <p style="color: #ccc">Tu equipo de soporte 💙</p>
          </td>
        </tr>
        <tr>
          <td align="center" valign="top" style="padding: 0 20px">
            <a
              href="https://t.me/vueltarapidagame"
              style="margin: 0 10px; text-decoration: none"
            >
              <img
                src="https://cdn.icon-icons.com/icons2/923/PNG/96/telegram_icon-icons.com_72055.png"
                alt="Telegram vueltarapida"
                style="width: 30px; height: 30px"
              />
            </a>
            <a
              href="https://twitter.com/vueltarapidagam"
              style="margin: 0 10px; text-decoration: none"
            >
              <img
                src="https://cdn.icon-icons.com/icons2/175/PNG/512/Twitter-Icon_22117.png"
                alt="twitter vueltarapida"
                style="width: 30px; height: 30px"
              />
            </a>

            <a
              href="https://www.youtube.com/@vueltarapidagame"
              style="margin: 0 10px; text-decoration: none"
            >
              <img
                src="https://cdn.icon-icons.com/icons2/175/PNG/96/Youtube-Icon_22119.png"
                alt="YouTube vueltarapida"
                style="width: 30px; height: 30px"
              />
            </a>

            <a
              href="mailto:team@vueltarapida.net"
              style="margin: 0 10px; text-decoration: none"
            >
              <img
                src="https://cdn.icon-icons.com/icons2/175/PNG/96/Email-Icon_22044.png"
                alt="Email vueltarapida"
                style="width: 30px; height: 30px"
              />
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`


  return (htmlRetrun)
}

module.exports = { htmlRecuperacion };