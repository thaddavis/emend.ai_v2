# Setup SSL cert with Namecheap

## TLDR

1. You will generate an ssl cert on the server using open-source tools like `openssl`
ie: `https://www.namecheap.com/support/knowledgebase/article.aspx/9446/2290/generating-csr-on-apache-opensslmodsslnginx-heroku/#3`
2. Generate a .csr file
```.sh
sudo su
cd /etc/ssl/private
openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr
cat server.csr
```
3. After the .csr file is generated then it will need to be activated
ie: `https://www.namecheap.com/support/knowledgebase/article.aspx/794/67/how-do-i-activate-an-ssl-certificate/`
ie: multi-factor authentication comes into play (DCV -> Domain Control Validation) so you will get an email with the certificate values to install on the registrar's DNS (ie: Namecheap). Comodo was the official "Certificate Authority" that authorized the certificate.
4. Add the relevant CNAME records to the DNS config for the domain you are generating the certificate for 

## TIPS

### Finding the CNAME records in the Namecheap console

click Edit Methods > Get Record

### Concatenating the .crt files for installing on the server

```.sh
cat www_emend_ai.crt > www_emend_ai_chain.crt
echo >> www_emend_ai_chain.crt
cat www_emend_ai.ca-bundle >> www_emend_ai_chain.crt
```

### on ec2 server using an nginx server

- an example nginx config is found in `$PROJECT_ROOT/nginx.conf`

```
cd /etc/ssl/private
vi www_emend_ai_chain.crt
# paste in crt chain
/etc/ssl/private/www_emend_ai_chain.crt
```

path to .key
`/etc/ssl/private/server.key`

path to .crt
`/etc/ssl/private/www_emend_ai_chain.crt`

