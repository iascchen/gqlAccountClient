# gqlAccountClient
React Client for gqlAccount

## 快速开始

    yarn
    yarn start

## Docker for development

    git clone https://github.com/iascchen/gqlAccountClient.git
    cd gqlAccountClient
    
    ./docker_build.sh
    
为容器指定环境变量 `REACT_APP_ACCOUNT_CENTER=http://ip:9000`    
    
    ./docker_run.sh
   
访问 [http://localhost:9001](http://localhost:9001)
