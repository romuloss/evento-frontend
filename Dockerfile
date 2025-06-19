# Imagem Node para o Buid
from node:lts-alpine as build

# Diretorio de Trabalho
workdir /eventos

# Copia arquivos para o container
copy package.json package-lock.json ./

# Executa o clean install das denepencias
run npm ci

# Copia Tudo
copy . .

# Executa o Buid
run npm run build --configuration=production

# Imagem para angular
from nginx:alpine

# remove o arquivo de configuracao Padrao
run rm /etc/nginx/conf.d/default.conf

# Copia a configuracao local para container
copy nginx.conf /etc/nginx/conf.d/default.conf


# Copia o resultado do build para a pasta
copy --from=build /eventos/dist/evento-front /usr/share/nginx/html

# Expoe a porta 80
expose 80

# Executa o comando para executar o angular em background
cmd ["nginx", "-g", "daemon off;"]
