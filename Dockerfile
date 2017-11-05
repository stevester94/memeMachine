FROM ubuntu
RUN "apt-get" "update"
RUN "apt-get" "-y" "install" "nodejs" "npm"
RUN "/bin/mkdir" "/memeMachine"
RUN "npm" "install" "express" "multer"
ADD "run.sh"  "server.js" "/memeMachine/"
ADD node_modules /memeMachine/node_modules
ADD public /memeMachine/public

WORKDIR "/memeMachine"
CMD "./run.sh"
