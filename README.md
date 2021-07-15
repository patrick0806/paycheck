# Configuração

#### O disparo de emails é feito pelo SendGrid a apikey de envio está ligada a conta patrick@digituz.com.br

#### Para fazer o app rodar na Digital Ocean App plataform é seguir estes passos

###### 1 Acesse https://cloud.digitalocean.com/apps e clique em Criar aplicativo.

###### 2 Selecione a fonte do seu aplicativo, no nosso caso o github.

###### 3 Selecione o repositorio e se quiser reimplar o aplicativo a cada alteração do Git selecione a opção Autodeploy code changes e clique em Next.

##### 4 Insira um nome para seu aplicativo e escolha a região onde deseja que seu aplicativo seja hospedado. Clique em Avançar.

para qualquer duvida o passo a passo completo pode ser encontrado neste [link](https://docs.digitalocean.com/products/app-platform/how-to/create-apps/) 

#### Para rodar em um servidor configurado manualmente a geração de contra cheques é necessario 

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
