#!/bin/bash
. api/.env
scp -r ./dist/app $SSH_HOST:/tmp/public_html &&
scp -r ./api $SSH_HOST:/tmp/node &&
ssh $SSH_HOST "sudo rm -rf $PUBLIC_HTML && \
 sudo rm -rf $APP_HOME/node && \
 sudo mv /tmp/public_html $APP_HOME && \
 sudo mv /tmp/node $APP_HOME && \
 sudo chmod a+x $APP_HOME && \
 sudo chown -R $USER:nginx $PUBLIC_HTML && \
 sudo chown -R $USER:$USER $APP_HOME/node && \
 sudo chmod -R o-rwx $APP_HOME/node && \
 sudo find $PUBLIC_HTML -type f -exec chmod 640 {} \; && \
 sudo find $PUBLIC_HTML -type d -exec chmod 750 {} \;  && \
 sudo restorecon -rv $APP_HOME && \
 sudo systemctl restart $NAME.service"
