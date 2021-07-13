Para rodar a geração de contra cheques dependendo do servidor é necessario instalar Imagemick 
```bash
sudo apt-get install imagemick
```

liberar a leitura e escrita de pdfs indo para 

```bash
sudo nano /etc/ImageMagick-6/policy.xml
```
```nano
<!-- disable ghostscript format types --> 
<policy domain="coder" rights="none" pattern="PS"/>
<policy domain="coder" rights="none" pattern="EPS"/>
<policy domain="coder" rights="none" pattern="PDF" /> <------- Edite esse linha!! 
<policy domain="coder" rights="none" pattern="XPS" />


<policy domain="coder" rights="read | write" pattern="PDF" /> <------ com esse código
```

https://contra-cheque-r58j6.ondigitalocean.app/
