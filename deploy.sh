#!/bin/bash
. api/.env
scp -r ./dist rahnema:/tmp/public_html &&
ssh rahnema "sudo rm -rf $PUBLIC_HTML && \
 sudo mv public_html $APP_HOME && \
 sudo chmod a+x $APP_HOME && \
 sudo chown -R dev:nginx $PUBLIC_HTML && \
 sudo find $PUBLIC_HTML -type f -exec chmod 640 {} \; && \
 sudo find $PUBLIC_HTML -type d -exec chmod 750 {} \;  && \
 sudo restorecon -rv $APP_HOME"
