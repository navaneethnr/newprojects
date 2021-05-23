FROM bycedric/expo-cli 
WORKDIR /usr/src/app
COPY . .
#RUN npm cache clean --force
RUN npm -g config set user root

#RUN npm install
#RUN npm install -g npm@7.5.3
#RUN npm install axios --save
#RUN npm install  @material-ui/core

#RUN npm install -g bit-bin
#WORKDIR /usr/src/app
#RUN bit init
#RUN bit login --registry=https://node.bit.dev --scope=@bit --username=tsss --password=Nagaraju@7 --email=tsssinfotechtestrails@gmail.com


RUN npm install
RUN npm install axios --save
WORKDIR /usr/src/app
EXPOSE 19006
CMD ["expo", "start", "-w"]
