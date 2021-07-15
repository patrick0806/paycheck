# Configuração

## O disparo de emails é feito pelo SendGrid a apikey de envio está ligada a conta patrick@digituz.com.br

## Para fazer o app rodar na Digital Ocean App plataform tudo que é preciso é deixar o código no github e vincular com a DigitalOcean


## Para rodar em um servidor configurado manualmente a geração de contra cheques é necessario 

Instalar Imagemick 
```bash
sudo apt-get install imagemick
```

habilitar a leitura e escrita de pdfs e permitir que rode mais tempo por conta da qualidade das imagens indo para 

```bash
sudo nano /etc/ImageMagick-6/policy.xml
```
```nano
change this
<policy domain="resource" name="disk" value="1GiB"/>

for this 
<policy domain="resource" name="disk" value="8GiB"/>

<!-- disable ghostscript format types --> 
<policy domain="coder" rights="none" pattern="PS"/>
<policy domain="coder" rights="none" pattern="EPS"/>
<policy domain="coder" rights="none" pattern="PDF" /> <------- Edite esse linha!! 
<policy domain="coder" rights="none" pattern="XPS" />


<policy domain="coder" rights="read | write" pattern="PDF" /> <------ com esse código
```

https://contra-cheque-r58j6.ondigitalocean.app/
