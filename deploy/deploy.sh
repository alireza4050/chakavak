#!/bin/bash
. api/.env

SSH="ssh -o IdentitiesOnly=yes -i ./deploy/ssh_key"
RSYNC="rsync -avzu --delete --progress -h"

$RSYNC -e "$SSH" ./dist/ $USER@$SSH_HOST:$PUBLIC_HTML &&
$RSYNC -e "$SSH" ./api/ $USER@$SSH_HOST:$APP_HOME/node &&
$RSYNC -e "$SSH" ./package.json $USER@$SSH_HOST:$APP_HOME/ &&
# $SSH $USER@$SSH_HOST 'npm install' &&
ssh $SSH_HOST " \
 sudo chmod a+x $APP_HOME && \
 sudo chown -R $USER:nginx $PUBLIC_HTML && \
 sudo chown -R $USER:$USER $APP_HOME/node && \
 sudo chmod -R o-rwx $APP_HOME/node && \
 sudo find $PUBLIC_HTML -type f -exec chmod 640 {} \; && \
 sudo find $PUBLIC_HTML -type d -exec chmod 750 {} \;  && \
 sudo restorecon -rv $APP_HOME && \
 sudo systemctl restart $NAME.service"
